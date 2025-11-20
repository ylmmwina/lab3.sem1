// src/game.js
// Точка входу: конфігурація та ініціалізація гри.

// Імпортуємо головну сцену як окремий модуль.
import { GameScene } from './scenes/GameScene.js';

/**
 * Конфігурація гри Phaser.
 */
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // Встановлюємо масштабування для чіткої піксельної графіки
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    // Вмикаємо 2D-фізику Arcade
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    render: {
        pixelArt: true
    },
    // Реєструємо сцени
    scene: [GameScene]
};

// Ініціалізація об'єкта гри
const game = new Phaser.Game(config);