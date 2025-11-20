// src/scenes/GameScene.js
// Реалізує основну ігрову логіку та інтегрує модулі.

import { Player } from '../game_objects/Player.js';

/**
 * GameScene успадковує функціональність від Phaser.Scene.
 */
export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.cursors = null;
        this.platforms = null;
    }

    preload() {
        console.log("GameScene: Завантаження ресурсів...");

        // Створюємо тимчасову текстуру для візуалізації
        this.textures.create('placeholder', [0, 0, 0, 0], 1, 1);
    }

    create() {
        console.log("GameScene: Створення об'єктів сцени...");

        // Створюємо екземпляр нашого ООП-класу Player
        this.player = new Player(this, 100, 450);
        this.player.setTexture('placeholder');
        this.player.setDisplaySize(32, 32);
        this.player.setTint(0xff0000);

        // Налаштування керування
        this.cursors = this.input.keyboard.createCursorKeys();

        // Створення платформи (землі)
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 584, 'placeholder')
            .setTint(0x00ff00)
            .setDisplaySize(800, 32)
            .refreshBody();

        // Налаштування колізії (зіткнення) між гравцем та платформами
        this.physics.add.collider(this.player, this.platforms);
    }

    update(time, delta) {
        // Логіка оновлення керування (викликає інкапсульовані методи Player)
        if (this.cursors.left.isDown) {
            this.player.move(-1);
        } else if (this.cursors.right.isDown) {
            this.player.move(1);
        } else {
            this.player.move(0);
        }

        if (this.cursors.up.isDown) {
            this.player.jump();
        }
    }
}