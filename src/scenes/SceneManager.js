// src/scenes/SceneManager.js
// Клас для централізованого керування сценами гри (Фасад).

import { GameScene } from './GameScene.js';

/**
 * SceneManager (поки що дуже простий) ініціалізує всі сцени, які нам потрібні.
 */
export class SceneManager {
    /**
     * Запускає необхідні сцени.
     * @param {Phaser.Game} game - Екземпляр гри Phaser.
     */
    static startScenes(game) {
        // Ми додамо UIScene та інші сцени пізніше.
        // Наразі просто переконаємося, що GameScene працює.
        game.scene.add('GameScene', GameScene);
        game.scene.start('GameScene');

        console.log("SceneManager: Головна сцена запущена.");
    }

    // TODO: Пізніше тут будуть методи для переходу між сценами (меню, гра, кінець гри)
}