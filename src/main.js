// src/main.js

// --- Імпорт сцен гри ---
import { StartScene } from './scenes/StartScene.js';
import { GameScene } from './scenes/GameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

// --- ІМПОРТ МОДУЛЬНИХ ТЕСТІВ (з папки tests) ---
// Ми використовуємо '../tests/', щоб вийти з папки src і зайти в tests
import { runAssetsManagerTests } from '../tests/AssetsManager.test.js';
import { runScoreboardTests } from '../tests/Scoreboard.test.js';
import { runGameObjectTests } from '../tests/GameObjects.test.js';


// =================================================================
// БЛОК ЗАПУСКУ ТЕСТІВ
// Цей код виконується в браузері перед початком гри.
// Результати виводяться в консоль розробника (F12).
// =================================================================
console.log(
    '%c===== ЗАПУСК МОДУЛЬНИХ ТЕСТІВ =====',
    'color: purple; font-weight: bold; font-size: 16px; margin-top: 20px;'
);

// 1. Тестуємо Менеджер Ресурсів
runAssetsManagerTests();

// 2. Тестуємо Таблицю Рахунку
runScoreboardTests();

// 3. Тестуємо Ігрові Об'єкти (Монетку)
runGameObjectTests();

console.log(
    '%c==================================',
    'color: purple; font-weight: bold; font-size: 16px; margin-bottom: 20px;'
);
// =================================================================


// --- Конфігурація гри Phaser ---
const config = {
    type: Phaser.AUTO, // Автоматичний вибір WebGL або Canvas
    width: 800,        // Ширина екрану гри
    height: 600,       // Висота екрану гри
    parent: 'game-container', // ID елемента в HTML, куди вставиться гра (якщо є)
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Гравітацію ми налаштовуємо окремо в GameScene
            debug: false       // Змініть на true, якщо хочете бачити хітбокси
        }
    },
    // Список сцен. Перша сцена у списку запускається автоматично.
    scene: [
        StartScene,    // Спочатку стартовий екран
        GameScene,     // Потім основна гра
        GameOverScene  // Екран програшу
    ]
};

// --- Створення екземпляра гри ---
new Phaser.Game(config);