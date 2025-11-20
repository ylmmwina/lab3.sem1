// src/game.js
// Точка входу: конфігурація та ініціалізація гри.

// Імпортуємо SceneManager, який керуватиме сценами
import { SceneManager } from './scenes/SceneManager.js';

/**
 * Конфігурація гри Phaser.
 */
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
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
    // Тут ми більше не реєструємо сцени, це зробить SceneManager!
    scene: []
};

// Ініціалізація об'єкта гри
const game = new Phaser.Game(config);

// Запускаємо сцени через наш ООП-менеджер
SceneManager.startScenes(game);