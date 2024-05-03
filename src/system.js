import * as PIXI from "pixi.js";
import { BloomFilter } from 'pixi-filters';
import { ZoomBlurFilter } from 'pixi-filters';

export default class System {

	constructor(args) {
		this.elem = args.elem;
		this.init();
	}

	async init() {
		this.renderer = await PIXI.autoDetectRenderer({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x202020,
			antialias: false,
			transparent: false,
			autoDensity: false,
			resolution: 1,
		});
		this.elem.appendChild(this.renderer.view.canvas);
		this.renderer.view.canvas.style.imageRendering = 'pixelated';

		this.stage = new PIXI.Container();
		this.stage.eventMode = 'passive';

		this.stage.filters = [
			new PIXI.BlurFilter({
				strength:0.5,
				quality:1,
				resolution:1,
				kernelSize:5
			}),
			new BloomFilter({
				strength: 24,
				quality: 7,
				resolution: 1,
				kernelSize: 5,
				padding: 64,
			})
		];
	
		let g = new PIXI.Graphics();
		g.position.set(window.innerWidth/2, window.innerHeight/2);
		g.blendMode = 'add';
		this.stage.addChild(g);
		this.graphic = g;
	
		this.loop();
	}

	loop() {
		let g = this.graphic;
		g.clear();
		g.moveTo(this.fuzz(-200), this.fuzz(-200));
		for(let d=-175; d<=200; d+=25) {
			g.lineTo(this.fuzz(d), this.fuzz(d)).stroke({
				width: 3,
				color: 0x00ff33,
				alpha: Math.random() > 0.7 ? 1 : 0,
				alignment: 0.5,
				cap: 'square',
			});
		}
		g.rotation += 0.001;

		this.render();
		requestAnimationFrame(this.loop.bind(this));
	}

	fuzz(x) {
		return x-5 + Math.random()*10;
	}

	render() {
		this.renderer.render(this.stage);
	}
}