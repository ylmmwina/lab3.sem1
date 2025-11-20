// src/scenes/GameScene.js
// Реалізує основну ігрову логіку та інтегрує всі модулі.

import { Player } from '../game_objects/Player.js';
import { Coin } from '../game_objects/Coin.js';
import { Obstacle } from '../game_objects/Obstacle.js';
import { Scoreboard } from '../game_objects/Scoreboard.js';
import { AssetsManager } from '../game_objects/AssetsManager.js'; // <-- НОВИЙ ІМПОРТ

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
        this.obstacles = null;
        this.scoreboard = null;
    }

    preload() {
        console.log("GameScene: Завантаження ресурсів...");

        // Використовуємо AssetsManager для завантаження всіх ресурсів
        const assets = AssetsManager.getAssetsMap();

        // Завантаження зображень (спрайтів)
        this.load.image(assets.player.key, assets.player.path);
        this.load.image(assets.coin.key, assets.coin.path);
        this.load.image(assets.obstacle.key, assets.obstacle.path);
        this.load.image(assets.platform.key, assets.platform.path);

        // ! Тимчасово створюємо плейсхолдери, якщо файли ще не намальовані,
        // ! щоб уникнути помилок, але вони будуть замінені реальними спрайтами.
        // ! ПРИБЕРІТЬ ЦЕЙ БЛОК, ЯК ТІЛЬКИ ДОДАСТЕ ВЛАСНІ ФАЙЛИ У /assets
        if (!this.textures.exists('player_sprite')) {
            this.textures.create('player_sprite', [0, 0, 0, 0], 1, 1);
            this.textures.create('coin_sprite', [0, 0, 0, 0], 1, 1);
            this.textures.create('obstacle_sprite', [0, 0, 0, 0], 1, 1);
            this.textures.create('platform_sprite', [0, 0, 0, 0], 1, 1);
        }
    }

    create() {
        console.log("GameScene: Створення об'єктів сцени...");

        // 1. Створення Scoreboard
        this.scoreboard = new Scoreboard(this);
        this.add.text(10, 10, 'Coin Rush: Збір Монеток', { fontSize: '24px', fill: '#fff' });

        // 2. Створення об'єкта Player
        this.player = new Player(this, 100, 450);
        this.player.setTexture('player_sprite'); // Використовуємо ключ з AssetsManager
        this.player.setDisplaySize(32, 32);
        this.player.setTint(0xff0000);

        // 3. Налаштування керування
        this.cursors = this.input.keyboard.createCursorKeys();

        // 4. Створення платформи
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 584, 'platform_sprite') // Використовуємо ключ з AssetsManager
            .setTint(0x00ff00)
            .setDisplaySize(800, 32)
            .refreshBody();

        // 5. Створення Групи Монеток (Coins)
        this.coins = this.physics.add.group();
        // При створенні ми автоматично передаємо ключ 'coin_sprite' через Coin.js
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
        // При створенні ми автоматично передаємо ключ 'obstacle_sprite' через Obstacle.js
        this.obstacles.add(new Obstacle(this, 650, 550));

        this.obstacles.children.entries.forEach(obs => {
            obs.setTexture('obstacle_sprite');
            obs.setTint(0x0000ff);
        });


        // 7. Налаштування Колізій та Взаємодій
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.coins, this.handleCoinCollection, null, this);
        this.physics.add.overlap(this.player, this.obstacles, this.handleObstacleCollision, null, this);
    }

    // ... (handleCoinCollection та handleObstacleCollision залишаються без змін)
    handleCoinCollection(player, coin) {
        coin.interact(player);
        this.scoreboard.addScore(coin.scoreValue);
    }

    handleObstacleCollision(player, obstacle) {
        obstacle.interact(player);
        this.scene.pause();
    }

    update(time, delta) {
        // Логіка керування Player
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