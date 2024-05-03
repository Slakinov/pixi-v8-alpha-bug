import * as PIXI from "pixi.js";


export default class System {

	constructor(args) {
		this.elem = args.elem;
		this.init();
	}

	async init() {
		this.renderer = await PIXI.autoDetectRenderer({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x303030,
			antialias: false,
			transparent: false,
			autoDensity: false,
			resolution: 1,
		});
		this.elem.appendChild(this.renderer.view.canvas);
		this.renderer.view.canvas.style.imageRendering = 'pixelated';
		
		this.stage = new PIXI.Container();
		this.stage.eventMode = 'passive';

		let g = new PIXI.Graphics();
		g.eventMode = 'none';
		g.position.set(100, 100);
		g.moveTo(0, 0);
		for(let d=0; d<400; d+=10) {
			g.lineTo(d, d).stroke({ width: 3, color: 0x00ff00, alpha: (d*0.01)%1 });
		}
		g.rotation = 0.1;
		this.stage.addChild(g);

		this.graphic = g;
		window.system = this;

		this.loop();
	}

	loop() {
		this.graphic.rotation += 0.01;
		this.render();
		requestAnimationFrame(this.loop.bind(this));
	}

	render() {
		this.renderer.render(this.stage);
	}
}