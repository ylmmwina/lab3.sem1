// src/scenes/StartScene.js
import { SceneManager } from './SceneManager.js';

export class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    create() {
        const { width, height } = this.game.config;

        // Темний фон
        this.cameras.main.setBackgroundColor('#000000');

        // Заголовок
        this.add.text(width / 2, height / 2 - 50, 'COIN RUSH', {
            fontSize: '64px',
            fill: '#FFD700',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Інструкція
        const startText = this.add.text(width / 2, height / 2 + 50, 'Натисніть, щоб почати', {
            fontSize: '24px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        // Анімація миготіння тексту
        this.tweens.add({
            targets: startText,
            alpha: 0,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Обробка кліку/натискання для старту
        this.input.on('pointerdown', () => {
            SceneManager.startGame(this);
        });

        // Стартуємо також на пробіл
        this.input.keyboard.on('keydown-SPACE', () => {
            SceneManager.startGame(this);
        });
    }
}