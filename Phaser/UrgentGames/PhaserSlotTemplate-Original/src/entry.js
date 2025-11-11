import Phaser from "phaser";
import GamePreloader from "./scenes/game-preloader";
import GameMain from "./scenes/game";
import GameError from "./scenes/error";

let config = {
	type: Phaser.CANVAS,
	parent: "slotgame",
	scale: {
		mode: Phaser.Scale.RESIZE,
		width: window.innerWidth,
		height: window.innerHeight
	},
    scene: [GamePreloader, GameMain, GameError]
};

const game = new Phaser.Game(config);

window.addEventListener("resize", resize, false);

/**
 * Call each time window is resized.
 * @fires resize
 */
function resize() {
	let clientWidth = window.innerWidth;
	let clientHeight = window.innerHeight;
	game.events.emit("resize", clientWidth, clientHeight);
};