import { Scene } from "phaser";

export class MainMenu extends Scene {
	#playBtn;
	constructor() {
		super("MainMenu");
	}

	create() {
		this.add.image(512, 384, "background");
		// Title over Phaser Logo
		this.add.image(512, 300, "logo");
		this.add.text(445, 350, "P0NG", {
			fontFamily: "Arial Black",
			fontSize: 45,
			color: "#b6e5f8",
			stroke: "#000000",
			strokeThickness: 8,
			align: "center",
		});

		// Commands display
		const configTextPlayerCommands = {
			fontFamily: "Arial Black",
			fontSize: 30,
			color: "#b6e5f8",
			stroke: "#000000",
			strokeThickness: 8,
			align: "center",
		};
		this.add.text(275, 600, "Left Player commands: Z / S", configTextPlayerCommands);
		this.add.text(125, 650, "Right Player commands: UpArrow / DownArrow", configTextPlayerCommands);

		this.#playBtn = this.add
			.text(512, 460, "Play", {
				fontFamily: "Arial Black",
				fontSize: 38,
				color: "#ffffff",
				stroke: "#000000",
				strokeThickness: 8,
				align: "center",
			})
			.setOrigin(0.5)
			// Can be clicked
			.setInteractive({ useHandCursor: true });

		// Hover: scale 1.25
		this.#playBtn.on("pointerover", () => (this.#playBtn = this.#playBtn.setScale(1.25)));
		this.#playBtn.on("pointerout", () => (this.#playBtn = this.#playBtn.setScale(1)));

		// Clicking: go to Game scene
		this.#playBtn.on("pointerdown", () => {
			this.scene.start("Game");
		});
	}
}
