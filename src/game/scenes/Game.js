import { Input, Scene } from "phaser";
import CONFIG from "../config";

export class Game extends Scene {
	#playerOne;
	#playerTwo;
	#ball;
	#playerOneKeys;
	#playerTwoKeys;
	#playerVelocity;
	constructor() {
		super("Game");
		this.#playerVelocity = 400;
	}

	preload() {
		this.load.image("player-1", "assets/Player.png");
		this.load.image("player-2", "assets/Computer.png");
		this.load.image("ball", "assets/Ball.png");
	}

	create() {
		const heightDividedBy2 = CONFIG.height / 2;
		const separatedSpace = 25;
		this.add.image(CONFIG.width / 2, heightDividedBy2, "background").setAlpha(0.5);

		this.#playerOne = this.physics.add.sprite(separatedSpace, heightDividedBy2, "player-1");
		this.#playerOne.setPushable(false); // When ball bounces, don't push player one
		this.#playerTwo = this.physics.add.sprite(CONFIG.width - separatedSpace, heightDividedBy2, "player-2");
		this.#playerTwo.setPushable(false); // When ball bounces, don't push player two
		this.#ball = this.physics.add
			.sprite(CONFIG.width / 2, heightDividedBy2, "ball")
			.setBounce(1)
			.setCollideWorldBounds(true, 1, 1, true);

		// Controls
		this.#playerOneKeys = this.input.keyboard.addKeys({
			up: Input.Keyboard.KeyCodes.Z,
			down: Input.Keyboard.KeyCodes.S,
		});

		this.#playerTwoKeys = this.input.keyboard.addKeys({
			up: Input.Keyboard.KeyCodes.UP,
			down: Input.Keyboard.KeyCodes.DOWN,
		});

		// Collissions
		this.physics.add.collider(this.#ball, this.#playerOne);
		this.physics.add.collider(this.#ball, this.#playerTwo);

		// Initialize ball movement
		this.#ball.setVelocity(200, 200);

		this.physics.world.on("worldbounds", (body, up, down, left, right) => {
			// When left and right world bound touches, then game over
			if ((left, right)) this.scene.start("GameOver");
		});
	}

	update() {
		const midHeight = CONFIG.player.height / 2;

		// Player 1
		if (this.#playerOneKeys?.up.isDown && this.#playerOne.y - midHeight > 0) {
			this.#playerOne.setVelocityY(-this.#playerVelocity);
		} else if (this.#playerOneKeys?.down.isDown && this.#playerOne.y + midHeight < CONFIG.height) {
			this.#playerOne.setVelocityY(this.#playerVelocity);
		} else {
			this.#playerOne.setVelocityY(0);
		}

		// Player 2
		if (this.#playerTwoKeys?.up.isDown && this.#playerTwo.y - midHeight > 0) {
			this.#playerTwo.setVelocityY(-this.#playerVelocity);
		} else if (this.#playerTwoKeys?.down.isDown && this.#playerTwo.y + midHeight < CONFIG.height) {
			this.#playerTwo.setVelocityY(this.#playerVelocity);
		} else {
			this.#playerTwo.setVelocityY(0);
		}
	}
}
