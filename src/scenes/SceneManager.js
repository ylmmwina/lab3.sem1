// src/scenes/SceneManager.js
// Клас для централізованого керування сценами гри (Фасад).

import { GameScene } from './GameScene.js';
import { UIScene } from './UIScene.js'; // <-- НОВИЙ ІМПОРТ
import { GameOverScene } from './GameOverScene.js'; // <-- НОВИЙ ІМПОРТ

/**
 * SceneManager (Фасад) ініціалізує всі сцени, які нам потрібні.
 */
export class SceneManager {
    /**
     * Запускає необхідні сцени.
     */
    static startScenes(game) {
        // Додаємо всі сцени
        game.scene.add('GameScene', GameScene);
        game.scene.add('UIScene', UIScene);
        game.scene.add('GameOverScene', GameOverScene);

        // Запускаємо GameScene (головна гра) та UIScene (інтерфейс) одночасно
        game.scene.start('GameScene');
        game.scene.start('UIScene');

        console.log("SceneManager: GameScene та UIScene запущені паралельно.");
    }

    // Метод для переходу до кінцевої сцени
    static gameOver(scene, score) {
        // Зупиняємо сцену UI та Game
        scene.scene.stop('UIScene');
        scene.scene.stop('GameScene');

        // Запускаємо сцену "Game Over", передаючи фінальний рахунок
        scene.scene.start('GameOverScene', { score: score });
    }
}