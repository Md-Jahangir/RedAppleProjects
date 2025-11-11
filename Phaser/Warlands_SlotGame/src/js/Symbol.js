// const cache = {};

// export default class Symbol {
//   constructor(name = Symbol.random()) {
//     this.name = name;

//     if (cache[name]) {
//       this.img = cache[name].cloneNode();
//     } else {s
//       this.img = new Image();
//       // this.img.src = require(`../assets/symbols/svg/${name}.svg`).default;
//       this.img.src = require(`../assets/symbols/png/Newfolder/${name}.png`).default;
//       // this.img.src = require(`../assets/images/gameplay/reel/symbols/org/${name}.png`).default;

//       cache[name] = this.img;
//     }
//   }

//   static preload() {
//     Symbol.symbols.forEach((symbol) => new Symbol(symbol));
//   }

//   static get symbols() {
//     // return [
//     //   "at_at",
//     //   "c3po",
//     //   "darth_vader",
//     //   "death_star",
//     //   "falcon",
//     //   "r2d2",
//     //   "stormtrooper",
//     //   "tie_ln",
//     //   "yoda",
//     // ];
//     return [
//       "9",
//       "10",
//       "a",
//       "j",
//       "k",
//       "q",
//       "character_1",
//       "character_2",
//       "character_3",
//       "character_4",
//       "misterey",
//       "scatter"
//     ];
//   }

//   static random() {
//     return this.symbols[Math.floor(Math.random() * this.symbols.length)];
//   }
// }
