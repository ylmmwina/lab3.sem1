// src/scenes/GameScene.js
// Реалізує основну ігрову логіку та інтегрує всі модулі.

import { Player } from '../game_objects/Player.js';
import { Coin } from '../game_objects/Coin.js';
import { Obstacle } from '../game_objects/Obstacle.js'; // <-- НОВИЙ ІМПОРТ
import { Scoreboard } from '../game_objects/Scoreboard.js'; // <-- НОВИЙ ІМПОРТ

/**
 * GameScene успадковує функціональність від Phaser.Scene.
 */
export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.cursors = null;
        this.platforms = null;
        this.coins = null;
        this.obstacles = null; // <-- НОВА ВЛАСТИВІСТЬ
        this.scoreboard = null; // <-- НОВА ВЛАСТИВІСТЬ
    }

    preload() {
        console.log("GameScene: Завантаження ресурсів...");

        // Створюємо тимчасові текстури для візуалізації
        this.textures.create('placeholder', [0, 0, 0, 0], 1, 1);
        this.textures.create('coin_sprite', [0, 0, 0, 0], 1, 1);
        this.textures.create('obstacle_sprite', [0, 0, 0, 0], 1, 1); // Ключ для Obstacle.js
    }

    create() {
        console.log("GameScene: Створення об'єктів сцени...");

        // 1. Створення Scoreboard (Об'єкт для керування рахунком)
        this.scoreboard = new Scoreboard(this);
        this.add.text(10, 10, 'Coin Rush: Збір Монеток', { fontSize: '24px', fill: '#fff' });

        // 2. Створення об'єкта Player
        this.player = new Player(this, 100, 450);
        this.player.setTexture('placeholder');
        this.player.setDisplaySize(32, 32);
        this.player.setTint(0xff0000);

        // 3. Налаштування керування
        this.cursors = this.input.keyboard.createCursorKeys();

        // 4. Створення платформи
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 584, 'placeholder')
            .setTint(0x00ff00)
            .setDisplaySize(800, 32)
            .refreshBody();

        // 5. Створення Групи Монеток (Coins)
        this.coins = this.physics.add.group();
        this.coins.add(new Coin(this, 300, 500));
        this.coins.add(new Coin(this, 400, 500));
        this.coins.add(new Coin(this, 500, 500));

        this.coins.children.entries.forEach(coin => {
            coin.setTexture('coin_sprite');
            coin.setTint(0xffd700);
            coin.setDisplaySize(24, 24);
        });

        // 6. Створення Групи Перешкод (Obstacles)
        this.obstacles = this.physics.add.group();
        this.obstacles.add(new Obstacle(this, 650, 550));

        this.obstacles.children.entries.forEach(obs => {
            obs.setTexture('obstacle_sprite');
            obs.setTint(0x0000ff); // Синій
        });


        // 7. Налаштування Колізій та Взаємодій
        this.physics.add.collider(this.player, this.platforms);

        // Взаємодія з монетками
        this.physics.add.overlap(this.player, this.coins, this.handleCoinCollection, null, this);

        // Взаємодія з перешкодами (виклик методу Obstacle.interact())
        this.physics.add.overlap(this.player, this.obstacles, this.handleObstacleCollision, null, this);
    }

    /**
     * handleCoinCollection: Обробник збору монетки.
     */
    handleCoinCollection(player, coin) {
        // Викликаємо поліморфний метод Coin.interact()
        coin.interact(player);

        // Додаємо очки через інкапсульований клас Scoreboard
        this.scoreboard.addScore(coin.scoreValue);
    }

    /**
     * handleObstacleCollision: Обробник зіткнення з перешкодою.
     */
    handleObstacleCollision(player, obstacle) {
        // Викликаємо поліморфний метод Obstacle.interact()
        obstacle.interact(player);

        // Призупиняємо оновлення всього коду сцени, щоб гра зупинилася
        this.scene.pause();
    }

    update(time, delta) {
        // ... (код керування Player залишається без змін)
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