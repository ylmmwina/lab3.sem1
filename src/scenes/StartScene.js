// src/scenes/StartScene.js
import { SceneManager } from './SceneManager.js';

export class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    create() {
        const { width, height } = this.game.config;

        this.cameras.main.setBackgroundColor('#000000');

        // Заголовок
        this.add.text(width / 2, height / 2 - 80, 'COIN RUSH', {
            fontSize: '64px',
            fill: '#FFD700',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // --- ЛОГІКА HIGH SCORE ---
        // Отримуємо збережений рекорд з пам'яті браузера (або 0, якщо його немає)
        const highScore = localStorage.getItem('coin_rush_highscore') || 0;

        this.add.text(width / 2, height / 2, `РЕКОРД: ${highScore}`, {
            fontSize: '32px',
            fill: '#00FF00' // Зелений колір
        }).setOrigin(0.5);
        // -------------------------

        // Інструкція
        const startText = this.add.text(width / 2, height / 2 + 80, 'Натисніть, щоб почати', {
            fontSize: '24px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        // Анімація
        this.tweens.add({
            targets: startText,
            alpha: 0,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Старт
        this.input.on('pointerdown', () => {
            SceneManager.startGame(this);
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            SceneManager.startGame(this);
        });
    }
}