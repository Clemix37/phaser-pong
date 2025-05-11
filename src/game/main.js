import CONFIG from "./config";
import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { AUTO, Game } from "phaser";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
	type: AUTO,
	width: CONFIG.width,
	height: CONFIG.height,
	parent: "game-container",
	backgroundColor: "#028af8",
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: "arcade",
		arcade: {
			// gravity: { x: 0, y: 300 },
			debug: false,
		},
	},
	scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

function startGame(parent) {
	return new Game({ ...config, parent });
}

export default startGame;
