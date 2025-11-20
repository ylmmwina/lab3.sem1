// src/scenes/GameScene.js
import { Player } from '../game_objects/Player.js';
import { Coin } from '../game_objects/Coin.js';
import { Obstacle } from '../game_objects/Obstacle.js';
import { Scoreboard } from '../game_objects/Scoreboard.js';
import { AssetsManager } from '../game_objects/AssetsManager.js';
import { SceneManager } from './SceneManager.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        const assets = AssetsManager.getAssetsMap();
        this.load.image(assets.player.key, assets.player.path);
        this.load.image(assets.coin.key, assets.coin.path);
        this.load.image(assets.obstacle.key, assets.obstacle.path);
        this.load.image(assets.platform.key, assets.platform.path);
    }

    create() {
        // 1. UI та Фон
        this.cameras.main.setBackgroundColor('#333333'); // Сірий фон всередині гри
        this.scoreboard = new Scoreboard(this);

        // 2. Платформа
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 584, 'platform_sprite')
            .setTint(0xffffff)
            .setDisplaySize(800, 32)
            .refreshBody();

        // 3. Гравець
        this.player = new Player(this, 100, 450);
        this.player.setTexture('player_sprite');
        this.player.setDisplaySize(32, 64);
        this.player.setTint(0xffffff);

        // 4. Керування
        this.cursors = this.input.keyboard.createCursorKeys();

        // 5. Монетки
        // ВИПРАВЛЕННЯ: Використовуємо this.add.group() замість this.physics.add.group()
        // Це запобігає перезапису налаштувань гравітації (щоб монети не падали)
        this.coins = this.add.group();
        this.coins.add(new Coin(this, 300, 450));
        this.coins.add(new Coin(this, 450, 400));
        this.coins.add(new Coin(this, 600, 450));

        // Налаштування вигляду для всіх монет
        this.coins.children.entries.forEach(coin => {
            coin.setTexture('coin_sprite');
            coin.setTint(0xffffff);
            coin.setDisplaySize(32, 32);
        });

        // 6. Перешкоди
        // ВИПРАВЛЕННЯ: Теж звичайна група
        this.obstacles = this.add.group();
        this.obstacles.add(new Obstacle(this, 500, 545)); // Y підібрано, щоб стояв на землі

        this.obstacles.children.entries.forEach(obs => {
            obs.setTexture('obstacle_sprite');
            obs.setTint(0xffffff);
            obs.setDisplaySize(32, 48);
        });

        // 7. Колізії
        this.physics.add.collider(this.player, this.platforms);

        // Оскільки групи тепер не фізичні, ми передаємо масив їхніх дітей у overlap
        this.physics.add.overlap(this.player, this.coins.getChildren(), this.handleCoinCollection, null, this);
        this.physics.add.overlap(this.player, this.obstacles.getChildren(), this.handleObstacleCollision, null, this);
    }

    handleCoinCollection(player, coin) {
        coin.interact(player);
        this.scoreboard.addScore(coin.scoreValue);
    }

    handleObstacleCollision(player, obstacle) {
        obstacle.interact(player);
        SceneManager.gameOver(this, this.scoreboard.getScore());
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.move(-1);
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.player.move(1);
            this.player.setFlipX(false);
        } else {
            this.player.move(0);
        }

        if (this.cursors.up.isDown) {
            this.player.jump();
        }
    }
}