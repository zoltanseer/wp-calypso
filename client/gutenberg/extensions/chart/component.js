/** @format */

/**
 * External dependencies
 */
import { Component, createRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import GoogleDocLoader from './google-doc-loader';
import { includes } from 'lodash';
import classnames from 'classnames';
import { settings as chartSettings } from './settings.js';

export class Chart extends Component {
	constructor() {
		super( ...arguments );
		this.state = {};
		this.c3 = null;
		this.d3 = null;
		this.chartRef = createRef();
	}
	componentDidMount() {
		Promise.all( [
			import( /* webpackChunkName: "chart/c3" */ 'c3' ),
			import( /* webpackChunkName: "chart/d3" */ 'd3' ),
		] ).then( ( [ c3, d3 ] ) => {
			this.c3 = c3;
			this.d3 = d3;
			this.fetchGoogleSheet();
		} );
	}
	componentDidUpdate( prevProps ) {
		const { chartType, colors, googleSheetURL, numberFormat, xAxisLabel, yAxisLabel } = this.props;
		const { data, theChart } = this.state;
		if ( googleSheetURL !== prevProps.googleSheetURL ) {
			this.fetchGoogleSheet();
		}
		if ( numberFormat !== prevProps.numberFormat ) {
			this.makeChart();
		}
		if ( ! theChart ) {
			return;
		}
		if ( chartType !== prevProps.chartType ) {
			this.resizeChart();
			theChart.transform( chartType );
		}
		if ( colors !== prevProps.colors ) {
			data.keyedColors = this.generateColors( data.keys );
			theChart.data.colors( data.keyedColors );
		}

		if ( xAxisLabel !== prevProps.xAxisLabel || yAxisLabel !== prevProps.yAxisLabel ) {
			theChart.axis.labels( {
				x: xAxisLabel,
				y: yAxisLabel,
			} );
		}
	}
	render = () => {
		const { chartType, children } = this.props;
		const { hasPoints } = this.state;
		const classes = classnames(
			includes( [ 'donut', 'pie' ], chartType ) ? 'centered-legend' : null,
			hasPoints ? null : 'pointless'
		);
		return (
			<div className={ classes }>
				{ children }
				<div className="jetpack-chart-wrapper jetpack-cover-text-color" ref={ this.chartRef } />
			</div>
		);
	};
	fetchGoogleSheet = () => {
		const { googleSheetURL } = this.props;
		const { loadedGoogleSheetURL } = this.state;
		if ( ! this.validateURL( googleSheetURL ) || googleSheetURL === loadedGoogleSheetURL ) {
			return;
		}
		const googleDocLoader = new GoogleDocLoader( {
			url: googleSheetURL,
			jQuery: window.jQuery,
			success: data => {
				this.setState( {
					loadedGoogleSheetURL: googleSheetURL,
				} );
				this.parseGoogleSheet( data );
			},
		} );
		return googleDocLoader;
	};
	parseGoogleSheet = rawData => {
		const { onUpdateColors } = this.props;
		const categories = rawData.rows[ 0 ].cells.slice( 1 );
		const columns = rawData.rows.slice( 1 ).map( column => column.cells );
		const keys = rawData.rows.slice( 1 ).map( column => column.cells[ 0 ] );
		const timeseries = false; // TK
		const type = timeseries ? 'timeseries' : 'category';
		const values = timeseries ? timeseries.values : null;
		const format = timeseries ? timeseries.format : null;
		const keyedColors = this.generateColors( keys );
		const data = {
			categories,
			columns,
			keys,
			timeseries,
			type,
			values,
			format,
			keyedColors,
		};
		onUpdateColors( columns );
		this.setState( { data }, this.makeChart );
	};
	makeChart = () => {
		const { admin, chartType, numberFormat, xAxisLabel, yAxisLabel } = this.props;
		const { data } = this.state;
		const { categories, columns, type, keyedColors } = data;
		const xtick = {
			culling: {
				max: 20,
			},
			fit: type === 'category',
			outer: true,
			multiline: false,
			rotate: this.shouldRotate( type ) ? 50 : 0,
		};
		const ytick = {
			culling: true,
			fit: true,
			format: function() {
				const format = this.d3.format( ',.2f' ),
					stripTrailingZeros = function( d ) {
						const result = format( d );
						return result.replace( /\.0+$/, '' );
					};

				if ( numberFormat === 'percent' ) {
					return function( d ) {
						return stripTrailingZeros( d ) + '%';
					};
				} else if ( numberFormat === 'euro' ) {
					return function( d ) {
						return stripTrailingZeros( d ) + '€';
					};
				} else if ( numberFormat === 'pound' ) {
					return function( d ) {
						return '£' + stripTrailingZeros( d );
					};
				} else if ( numberFormat === 'dollar' ) {
					return function( d ) {
						return '$' + stripTrailingZeros( d );
					};
				}
				return stripTrailingZeros;
			}.bind( this )(),
		};
		const legend = {
			show: false,
			position: 'bottom',
		};
		const point = {
			show: categories.length < 80,
		};
		const xAxis = {
			type: type,
			tick: xtick,
			categories: type === 'category' ? categories : null,
			label:
				xAxisLabel.length || admin
					? {
							text: xAxisLabel,
							position: 'outer-center',
					  }
					: null,
		};
		const yAxis = {
			tick: ytick,
			label:
				yAxisLabel.length || admin
					? {
							text: yAxisLabel,
							position: 'outer-middle',
					  }
					: null,
		};
		const chartData = {
			columns,
			type: chartType,
			colors: keyedColors,
		};
		// if ( type === 'timeseries' ) {
		// 	rows.splice( 0, 0, header );
		// 	dataObject.x = 'x';
		// 	xtick.format = data.format;
		// 	xtick.values = data.values;
		// }

		const tooltip = {
			format:
				type === 'timeseries'
					? {
							title: function( x ) {
								const dateFormatter = this.d3.time.format( '%m/%d/%Y' );
								return dateFormatter( x );
							},
					  }
					: null,
		};

		if ( 'ontouchstart' in window ) {
			tooltip.show = false;
		}
		const c3Data = {
			padding: {
				right: 35,
			},
			bindto: this.chartRef.current,
			transition: {
				duration: 350,
			},
			data: chartData,
			axis: {
				x: xAxis,
				y: yAxis,
			},
			legend: legend,
			point: point,
			tooltip: tooltip,
		};
		c3Data.onrendered = () => {
			const ticks = this.chartRef.current.querySelectorAll( '.c3-axis-x .tick' );
			for ( let i = 0; i < ticks.length; i++ ) {
				const tick = ticks[ i ],
					text = tick.querySelector( 'text' );
				if ( text.style.display === 'block' ) {
					this.addClassToSVG( tick, 'populated' );
				}
			}
		};
		const theChart = this.c3.generate( c3Data );
		this.setState(
			{
				theChart,
				hasPoints: point.show,
			},
			() => {
				this.makeLegend();
				this.resizeChart();
			}
		);
	};
	makeLegend = () => {
		const { d3 } = this;
		const { data, theChart } = this.state;
		const yAxisOffset = this.getYAxisOffset();
		d3.select( this.chartRef.current )
			.insert( 'div', '.jetpack-chart-wrapper' )
			.attr( 'class', 'top-legend' )
			.style( 'margin-left', yAxisOffset + 'px' )
			.selectAll( 'span' )
			.data( Object.keys( data.keyedColors ) )
			.enter()
			.append( 'span' )
			.attr( 'data-id', function( id ) {
				return id;
			} )
			.attr( 'class', 'top-legend-item' )
			.html( function( id ) {
				return '<span class="legend-label">' + id + '</span>';
			} )
			.each( function( id ) {
				d3.select( this )
					.insert( 'span', ':first-child' )
					.attr( 'class', 'legend-color' )
					.style( 'background-color', theChart.color( id ) );
			} );
		// this.chartTitleRef.current.style.paddingLeft = yAxisOffset + 'px';
		// this.chartTitleRef.current.style.paddingLeft = yAxisOffset + 'px';
	};
	generateColors = keys => {
		const { colors } = this.props;
		const keyedColors = {};
		keys.forEach( ( key, index ) => {
			keyedColors[ key ] =
				colors[ index ] || chartSettings.allColors[ index % chartSettings.allColors.length ];
		} );
		return keyedColors;
	};
	shouldRotate = type => {
		const { data } = this.state;
		const formats = this.getFormats();
		if ( type !== 'timeseries' ) {
			// True if any categories exceed five characters
			return data.categories.filter( category => category.length > 5 ).length > 0;
		}
		if ( data.format === formats.y || data.format === formats.cy ) {
			return false;
		}
		return this.chartRef.current.clientWidth < 600;
	};

	getYAxisOffset = () => {
		const { chartType } = this.props;
		if ( chartType === 'pie' || chartType === 'donut' ) {
			return 0;
		}
		const blockLeft = this.chartRef.current.getBoundingClientRect().left;
		const axisLeft = this.chartRef.current
			.querySelector( '.c3-axis.c3-axis-y' )
			.getBoundingClientRect().left;
		return axisLeft - blockLeft;
	};
	validateURL( url ) {
		return /pubhtml/.test( url ) || /spreadsheets\/d/.test( url ) || /key=/.test( url );
	}
	getFormats() {
		return {
			y: '’%y',
			cy: '%Y',
			cmy: '%m/%Y',
			my: '%m/%y',
			dmy: '%m/%d/%y',
			cdmy: '%m/%d/%Y',
		};
	}
	addClassToSVG( $element, className ) {
		const classList = $element.getAttribute( 'class' ).split( ' ' );
		for ( let x = 0; x < classList.length; x++ ) {
			if ( classList[ x ] === className ) {
				return;
			}
		}

		classList.push( className );
		$element.setAttribute( 'class', classList.join( ' ' ) );
	}
	resizeChart = () => {
		const { align } = this.props;
		const { theChart } = this.state;
		const wrapperWidth = this.chartRef.current.clientWidth;
		const wrapperHeight = align === 'full' && wrapperWidth > 800 ? 450 : 320;
		theChart.resize( {
			width: wrapperWidth,
			height: wrapperHeight,
		} );
	};
}

Chart.defaultProps = {
	googleSheetURL: '',
	xAxisLabel: '',
	yAxisLabel: '',
	chartType: '',
	numberFormat: '',
	admin: false,
	align: null,
	colors: [],
	onUpdateColors: () => {},
};

export default Chart;
