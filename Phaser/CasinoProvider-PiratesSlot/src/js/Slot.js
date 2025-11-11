// import Reel from "./Reel.js";
// import Symbol from "./Symbol.js";

// export default class Slot {
//   constructor(domElement, config = {}) {
//     Symbol.preload();

//     this.currentSymbols = [
//       ["character_1", "k", "10"],
//       ["character_2", "a", "9"],
//       ["character_3", "misterey", "j"],
//       ["character_4", "q", "misterey"],
//       ["9", "scatter", "character_1"],
//     ];

//     this.nextSymbols = [
//       ["character_1", "character_1", "character_1"],
//       ["character_1", "character_1", "character_1"],
//       ["character_1", "character_1", "character_1"],
//       ["character_1", "character_1", "character_1"],
//       ["character_1", "character_1", "character_1"],
//     ];

//     this.container = domElement;

//     this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
//       (reelContainer, idx) =>
//         new Reel(reelContainer, idx, this.currentSymbols[idx])
//     );

//     this.spinButton = document.getElementById("spin");
//     this.spinButton.addEventListener("click", () => this.spin());

//     this.autoPlayCheckbox = document.getElementById("autoplay");

//     if (config.inverted) {
//       this.container.classList.add("inverted");
//     }
//   }

//   spin() {
//     this.onSpinStart();

//     this.currentSymbols = this.nextSymbols;
//     this.nextSymbols = [
//       [Symbol.random(), Symbol.random(), Symbol.random()],
//       [Symbol.random(), Symbol.random(), Symbol.random()],
//       [Symbol.random(), Symbol.random(), Symbol.random()],
//       [Symbol.random(), Symbol.random(), Symbol.random()],
//       [Symbol.random(), Symbol.random(), Symbol.random()],
//     ];

//     return Promise.all(
//       this.reels.map((reel) => {
//         reel.renderSymbols(this.nextSymbols[reel.idx]);
//         return reel.spin();
//       })
//     ).then(() => this.onSpinEnd());
//   }

//   onSpinStart() {
//     this.spinButton.disabled = true;


//   onSpinEnd() {
//     this.spinButton.disabled = false;


//     if (this.autoPlayCheckbox.checked)
//       return window.setTimeout(() => this.spin(), 200);
//   }
// }
