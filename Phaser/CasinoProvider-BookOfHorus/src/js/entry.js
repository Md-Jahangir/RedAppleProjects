import Phaser from "phaser";
import GamePreloader from "./scenes/game-preloader";
import SplashScene from "./scenes/splash-loader";
import GameMain from "./scenes/game";
import GameError from "./scenes/error";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
window.onload = function () {
	let config = {
		type: Phaser.AUTO,
		parent: "bookofhorusslotgame",
		scale: {
			mode: Phaser.Scale.RESIZE,
			width: window.innerWidth,
			height: window.innerHeight
		},
		plugins: {
			scene: [
				{
					key: 'SpinePlugin',
					plugin: window.SpinePlugin,
					sceneKey: 'spine'
				},
				{
					key: "rexUI",
					plugin: UIPlugin,
					mapping: "rexUI",
				},
			]
		},
		scene: [GamePreloader, SplashScene, GameMain, GameError]
	};


	const game = new Phaser.Game(config);

	window.addEventListener("resize", resize, false);

	function resize() {
		let clientWidth = window.innerWidth;
		let clientHeight = window.innerHeight;
		game.events.emit("resize", clientWidth, clientHeight);
	};
}
