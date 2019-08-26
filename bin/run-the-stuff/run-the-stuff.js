const readline = require( 'readline-sync' );
const chalk = require( 'chalk' );
const { log } = console;
const args = require( 'yargs' )
	.boolean( 'ss' )
	.boolean( 'sandbox-sync' )
	.boolean( 'all' ).argv;
const { spawn } = require( 'child_process' );
const { flatten } = require( 'lodash' );

let sandboxUsername = null;
let sandboxURL = null;
function getSandboxUsername() {
	if ( ! sandboxUsername ) {
		sandboxUsername = readline.question( 'What is your sandbox username? i.e. "wpdev": ' );
	}
	return sandboxUsername;
}
function getSandboxURL() {
	if ( ! sandboxURL ) {
		sandboxURL = readline.question(
			'What is your sandbox URL? i.e. "person.dev.dfw.wordpress.com": '
		);
	}
	return sandboxURL;
}

const spawnedProcesses = [];

process.on( 'SIGINT', quit );
function quit() {
	process.exit( 0 );
}
process.on( 'exit', onExit );
function onExit() {
	log( chalk.blue( '\nCome back again soon! 👋' ) );
	spawnedProcesses.forEach( p => p.kill() );
}

function generateSandboxPath( path ) {
	return `ssh://${ getSandboxUsername() }@${ getSandboxURL() }//${ path }`;
}

const unisonIgnores = [
	'Name .htaccess',
	'Path .svn',
	'Path .unison',
	'Path .ssh',
	'Name Thumbs.db',
	'Path .idea',
	'Path .settings',
	'Name .buildpath',
	'Name .project',
].map( val => [ '-ignore', val ] );

function createUnisonCommand( remotePath, localPath, logPath ) {
	return [
		'unison',
		[
			'-ui',
			'text',
			'-repeat',
			'watch',
			'-force',
			localPath,
			'-root',
			generateSandboxPath( remotePath ),
			'-root',
			localPath,
			'-logfile',
			logPath,
			...flatten( unisonIgnores ),
		],
	];
}

const options = [
	{
		label: 'Full Site Editing Plugin',
		key: 'full-site-editing',
		sandboxPath: 'home/wpcom/public_html/wp-content/plugins/full-site-editing-plugin/0.6.1',
		localPath: 'apps/full-site-editing/full-site-editing-plugin',
		logPath: '/tmp/fse-plugin-sandbox.log',
		devCommand: [
			'npx',
			[ 'lerna', 'run', 'dev', '--scope=@automattic/full-site-editing', '--stream' ],
		],
	},
	{
		label: 'Gutenberg iFrame Bridge Server',
		key: 'block-editor-package',
		sandboxPath: 'home/wpcom/public_html/widgets.wp.com/wpcom-block-editor',
		localPath: './apps/wpcom-block-editor/dist',
		logPath: '/tmp/block-editor-sandbox.log',
		devCommand: [
			'npx',
			[
				'lerna',
				'run',
				'build',
				'--scope=@automattic/wpcom-block-editor',
				'--stream',
				'-- -- --watch',
			],
		],
	},
	{
		label: 'Local Calypso',
		key: 'calypso-localhost',
		devCommand: [ 'npm', [ 'start' ] ],
	},
];

function isError( str ) {
	return str.includes( 'ERROR' ) || str.includes( 'ERR' );
}

function createProcess() {
	const newProcess = spawn( ...arguments );

	newProcess.stdout.on( 'data', data => {
		const msg = data.toString();
		console.log();
		if ( isError( msg ) ) {
			log( chalk.red( msg ) );
		} else if ( /\d+ modules/.test( msg ) ) {
			log( chalk.green( 'Bundles compiled! 🚀' ) );
		} else {
			log( msg );
		}
	} );

	spawnedProcesses.push( newProcess );
}

function runOption( option, shouldSync ) {
	createProcess( ...option.devCommand );

	if ( shouldSync && option.sandboxPath ) {
		const { sandboxPath, localPath, logPath } = option;
		const command = createUnisonCommand( sandboxPath, localPath, logPath );
		createProcess( ...command );
	}
}

function getWantedOptions() {
	if ( args.all ) {
		console.log( 1 );
		return options;
	}
	log( chalk.blue.underline( 'Choose what you want to run:' ) );
	return options.filter( ( { name } ) => readline.keyInYN( name ) );
}

const wanted = getWantedOptions();
if ( ! wanted.length ) {
	quit();
}

log(
	chalk.blue( 'Looks like we want to spin up', chalk.underline( wanted.length ), 'node processes!' )
);

const shouldSync = args.ss || args[ 'sandbox-sync' ];

shouldSync && log( chalk.blue( 'Everything will be syncd to your sandbox.' ) );

wanted.forEach( option => runOption( option, shouldSync ) );

exports.options = options;
