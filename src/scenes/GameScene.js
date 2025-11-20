// src/scenes/GameScene.js
// Реалізує основну ігрову логіку та інтегрує модулі.

import { Player } from '../game_objects/Player.js';
import { Coin } from '../game_objects/Coin.js';

/**
 * GameScene успадковує функціональність від Phaser.Scene.
 */
export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.cursors = null;
        this.platforms = null;
        this.coins = null; // Нова група для монеток
    }

    preload() {
        console.log("GameScene: Завантаження ресурсів...");

        // Створюємо тимчасові текстури для візуалізації
        this.textures.create('placeholder', [0, 0, 0, 0], 1, 1);
        this.textures.create('coin_sprite', [0, 0, 0, 0], 1, 1); // Ключ для Coin.js
    }

    create() {
        console.log("GameScene: Створення об'єктів сцени...");

        this.add.text(10, 10, 'Coin Rush: Збір Монеток', { fontSize: '24px', fill: '#fff' });

        // 1. Створення об'єкта Player
        this.player = new Player(this, 100, 450);
        this.player.setTexture('placeholder');
        this.player.setDisplaySize(32, 32);
        this.player.setTint(0xff0000); // Червоний

        // 2. Налаштування керування
        this.cursors = this.input.keyboard.createCursorKeys();

        // 3. Створення платформи (землі)
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 584, 'placeholder')
            .setTint(0x00ff00) // Зелений
            .setDisplaySize(800, 32)
            .refreshBody();

        // 4. Створення Групи Монеток (Coins)
        this.coins = this.physics.add.group();
        this.coins.add(new Coin(this, 300, 500));
        this.coins.add(new Coin(this, 400, 500));
        this.coins.add(new Coin(this, 500, 500));

        // Встановлюємо візуальний вигляд монеткам
        this.coins.children.entries.forEach(coin => {
            coin.setTexture('coin_sprite');
            coin.setTint(0xffd700); // Золотий колір
            coin.setDisplaySize(24, 24);
        });

        // 5. Налаштування Колізій
        this.physics.add.collider(this.player, this.platforms);

        // 6. Налаштування Перекриття (Overlap) між гравцем та монетками
        this.physics.add.overlap(this.player, this.coins, this.handleCoinCollection, null, this);
    }

    /**
     * handleCoinCollection: Обробник збору монетки.
     * Викликає поліморфний метод interact() на об'єкті монетки.
     */
    handleCoinCollection(player, coin) {
        coin.interact(player);
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