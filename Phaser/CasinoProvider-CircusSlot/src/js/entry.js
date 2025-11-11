import Phaser from "phaser";
import GamePreloader from "./scenes/game-preloader";
import SplashScene from "./scenes/splash-loader";
import GameMain from "./scenes/game";
import GameError from "./scenes/error";

let config = {
	type: Phaser.AUTO,
	parent: "circusslotgame",

	plugins: {
		scene: [{
			key: 'SpinePlugin',
			plugin: window.SpinePlugin,
			sceneKey: 'spine',
			// mapping: 'spine'
		}]
	},
	scale: {
		mode: Phaser.Scale.RESIZE,
		width: window.innerWidth,
		height: window.innerHeight
	},
	scene: [GamePreloader, GameMain, GameError, SplashScene]
};

const game = new Phaser.Game(config);

window.addEventListener("resize", resize, false);

function resize() {
	let clientWidth = window.innerWidth;
	let clientHeight = window.innerHeight;
	game.events.emit("resize", clientWidth, clientHeight);
};
