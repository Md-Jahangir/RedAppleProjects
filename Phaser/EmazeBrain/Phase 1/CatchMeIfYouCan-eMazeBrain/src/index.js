import Application from "./application/Application"
// import { TweenLite } from "gsap"
import gsap from "gsap";
import * as PIXI from "pixi.js"
import Facade from "@/Facade";

window.PIXI = PIXI
require("pixi-spine")

// gsap.ticker.useRAF(true)
gsap.ticker.lagSmoothing(0);

console.log("3.0.1");
new Application()
