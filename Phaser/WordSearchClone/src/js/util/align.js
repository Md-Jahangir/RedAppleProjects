import { Constant } from "../Constant.js";
class Align {
	constructor(scene) {

		this.scene = scene;

	}
	scaleToGameW(obj, per) {
		obj.displayWidth = Constant.game.config.width * per;
		obj.scaleY = obj.scaleX;
	}
	centerH(obj) {
		obj.x = Constant.round(Constant.game.config.width / 2) - obj.displayWidth / 2;
	}
	centerV(obj) {
		obj.y = Constant.round(Constant.game.config.height / 2) - obj.displayHeight / 2;
	}
	center2(obj) {
		obj.x = Constant.round(Constant.game.config.width / 2) - obj.displayWidth / 2;
		obj.y = Constant.round(Constant.game.config.height / 2) - obj.displayHeight / 2;
	}
	center(obj) {
		obj.x = Constant.round(Constant.game.config.width / 2);
		obj.y = Constant.round(Constant.game.config.height / 2);
	}
	placeAt(x, y, obj) {
		obj.x = Constant.round(Constant.game.config.width / x);
		obj.y = Constant.round(Constant.game.config.height / y);
	}
	generateRandomNumber(_min, _max) {
		let rnd = Phaser.Math.Between(_min, _max);
		return rnd;
	}
	generateUniqueRandomNumbers(count, min, max) {
		let numbers = [];

		if (count > max - min + 1) {
			throw new Error("The count is larger than the possible number of unique values.");
		}

		while (numbers.length < count) {
			let randNum = this.generateRandomNumber(min, max);

			if (!numbers.includes(randNum)) {
				numbers.push(randNum);
			}
		}

		return numbers;
	}
	shuffleArray(_arr) {
		_arr.sort((a, b) => 0.5 - Math.random());
	}
	compareArrays(a, b) {
		const areEqual = a.length === b.length && a.every((value, index) => value === b[index]);
		return areEqual;
		// _a.join() == _b.join();
		// return console.log("compare", _a, _b);
	}
	sortInAscending(array) {
		return array.sort();
	}
}

let align = new Align();
export { align as Align };