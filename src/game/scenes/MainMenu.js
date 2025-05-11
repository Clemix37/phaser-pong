import { Scene } from "phaser";

export class MainMenu extends Scene {
	#playBtn;
	constructor() {
		super("MainMenu");
	}

	create() {
		this.add.image(512, 384, "background");
		this.add.text(445, 350, "P0NG", {
			fontFamily: "Arial Black",
			fontSize: 45,
			color: "#b6e5f8",
			stroke: "#000000",
			strokeThickness: 8,
			align: "center",
		});

		this.add.image(512, 300, "logo");

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

		this.#playBtn.on("pointerover", () => (this.#playBtn = this.#playBtn.setScale(1.25)));
		this.#playBtn.on("pointerout", () => (this.#playBtn = this.#playBtn.setScale(1)));

		this.#playBtn.on("pointerdown", () => {
			this.scene.start("Game");
		});
	}
}
