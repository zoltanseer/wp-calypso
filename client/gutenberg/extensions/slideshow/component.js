/** @format */

/**
 * External dependencies
 */
import { createRef, Children, Component } from '@wordpress/element';
import classnames from 'classnames';

/**
 * Internal dependencies
 */

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

export class Slideshow extends Component {
	constructor() {
		super( ...arguments );
<<<<<<< HEAD
		this.state = {
			images: [],
			imageHeight: 400,
		};
=======
>>>>>>> Basic functioning port of Atavist slideshow block. No captions or dymamic sizing yet.
		this.slideshowRef = createRef();
		this.btnNextRef = createRef();
		this.btnPrevRef = createRef();
		this.paginationRef = createRef();
	}
	render() {
		const { children, className } = this.props;
<<<<<<< HEAD
		const { imageHeight } = this.state;
=======
>>>>>>> Basic functioning port of Atavist slideshow block. No captions or dymamic sizing yet.
		const classNames = classnames( className, 'swiper-container' );
		return (
			<div className={ classNames } ref={ this.slideshowRef }>
				<div className="swiper-wrapper">
					{ Children.map( children, child => {
						if ( ! child.props.children ) {
							return null;
						}
						const img = child.props.children[ 0 ];
						const figcaption = child.props.children[ 1 ];
						const { src, alt } = img.props;
<<<<<<< HEAD
						const caption = figcaption.props.children || '';
						const style = {
							backgroundImage: `url(${ src })`,
							height: imageHeight,
=======
						const { caption } = figcaption.props.children;
						const style = {
							backgroundImage: `url(${ src })`,
>>>>>>> Basic functioning port of Atavist slideshow block. No captions or dymamic sizing yet.
						};
						return (
							<div className="swiper-slide">
								<div className="slide-background atavist-cover-background-color" />
								<div className="wp-block-slideshow-image-container" style={ style } title={ alt } />
								<p className="slideshow-slide-caption">{ caption }</p>
							</div>
						);
					} ) }
				</div>
				<div className="swiper-pagination swiper-pagination-white" ref={ this.paginationRef } />
				<div className="swiper-button-prev swiper-button-white" ref={ this.btnPrevRef } />
				<div className="swiper-button-next swiper-button-white" ref={ this.btnNextRef } />
			</div>
		);
	}
	componentDidMount() {
<<<<<<< HEAD
		this.buildImageMetadata( this.buildSwiper );
	}
	componentDidUpdate( prevProps ) {
		const { swiperInstance } = this.state;
		const { align, autoplayDelayInSeconds, autoplayEnabled, effect, children } = this.props;
		if ( children !== prevProps.children ) {
			this.buildImageMetadata( this.sizeSlideshow );
		}
=======
		this.buildSwiper();
	}
	componentWillUnmount() {}
	componentDidUpdate( prevProps ) {
		const { swiperInstance } = this.state;
		const { align, effect, children } = this.props;
>>>>>>> Basic functioning port of Atavist slideshow block. No captions or dymamic sizing yet.
		/* A change in alignment or images only needs an update */
		if ( align !== prevProps.align || children !== prevProps.children ) {
			swiperInstance.update();
		}
		/* A change in effect requires a full rebuild */
<<<<<<< HEAD
		if (
			effect !== prevProps.effect ||
			autoplayEnabled !== prevProps.autoplayEnabled ||
			autoplayDelayInSeconds !== prevProps.autoplayDelayInSeconds
		) {
=======
		if ( effect !== prevProps.effect ) {
>>>>>>> Basic functioning port of Atavist slideshow block. No captions or dymamic sizing yet.
			const activeIndex = swiperInstance.activeIndex;
			swiperInstance.destroy( true, true );
			this.buildSwiper( activeIndex );
		}
	}
<<<<<<< HEAD
	buildImageMetadata = callback => {
		const { children } = this.props;
		this.setState(
			{
				images: Children.map( children, child => {
					const image = child.props.children[ 0 ];
					const meta = {
						width: image.props[ 'data-width' ],
						height: image.props[ 'data-height' ],
					};
					meta.ratio = meta.width / meta.height;
					return meta;
				} ),
			},
			callback
		);
	};
	buildSwiper = ( initialSlide = 0 ) => {
		const { autoplayDelayInSeconds, autoplayEnabled, effect } = this.props;
		const settings = {
=======
	buildSwiper = ( initialSlide = 0 ) => {
		const { effect } = this.props;
		const swiperInstance = new Swiper( this.slideshowRef.current, {
>>>>>>> Basic functioning port of Atavist slideshow block. No captions or dymamic sizing yet.
			effect: effect,
			grabCursor: true,
			init: false,
			initialSlide: initialSlide,
			navigation: {
				nextEl: this.btnNextRef.current,
				prevEl: this.btnPrevRef.current,
			},
			pagination: {
				clickable: true,
				el: this.paginationRef.current,
				type: 'bullets',
			},
			preventClicksPropagation: false /* Necessary for normal block interactions */,
			releaseFormElements: false,
			setWrapperSize: true,
			touchStartPreventDefault: false,
<<<<<<< HEAD
		};
		if ( autoplayEnabled ) {
			settings.autoplay = {
				delay: autoplayDelayInSeconds * 1000,
			};
		}
		const swiperInstance = new Swiper( this.slideshowRef.current, settings );
=======
		} );
>>>>>>> Basic functioning port of Atavist slideshow block. No captions or dymamic sizing yet.
		this.setState(
			{
				swiperInstance,
			},
			() => {
				swiperInstance.init();
<<<<<<< HEAD
				this.sizeSlideshow();
			}
		);
	};

	sizeSlideshow = () => {
		const { images, swiperInstance } = this.state;
		const ratio = Math.max( Math.min( images[ 0 ].ratio, 16 / 9 ), 1 );
		const sanityHeight = window.innerHeight * 0.8;
		const imageHeight = Math.min( swiperInstance.width / ratio, sanityHeight );
		this.setState( { imageHeight } );
	};
=======
			}
		);
	};
>>>>>>> Basic functioning port of Atavist slideshow block. No captions or dymamic sizing yet.
}

Slideshow.defaultProps = {
	effect: 'slide',
};

export default Slideshow;
