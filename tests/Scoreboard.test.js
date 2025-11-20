// tests/Scoreboard.test.js
import { Scoreboard } from '../src/game_objects/Scoreboard.js';
import { runTest, assertEqual } from './testUtils.js';

// --- ОНОВЛЕНА ФЕЙКОВА СЦЕНА (Версія 3.0) ---
const createMockScene = () => {
    // Ми створюємо об'єкт сцени і текст окремо, щоб зв'язати їх.

    const mockText = {
        setScrollFactor: () => {},
        setDepth: () => {},
        // Цей метод буде викликатися при оновленні рахунку
        setText: function(newText) {
            // 'this' тут вказує на сам mockText.
            // Ми записуємо значення у сцену, до якої прив'язаний цей текст.
            this.scene.lastTextSet = newText;
        },
        scene: null // Посилання на сцену (заповнимо нижче)
    };

    const mockScene = {
        lastTextSet: '',
        events: {
            on: () => {},
            off: () => {},
            once: () => {}
        },
        add: {
            // Коли Scoreboard просить створити текст, ми віддаємо наш підготовлений об'єкт
            text: () => mockText
        }
    };

    // НАЙГОЛОВНІШЕ: Зв'язуємо текст зі сценою
    mockText.scene = mockScene;

    return mockScene;
};
// --------------------------------------------------

export function runScoreboardTests() {
    console.group('%c🧪 Тестування модуля: Scoreboard.js', 'color: orange; font-weight: bold;');

    runTest('Початковий рахунок має бути 0', () => {
        const mockScene = createMockScene();
        const scoreboard = new Scoreboard(mockScene);
        assertEqual(scoreboard.getScore(), 0, "Початковий рахунок не дорівнює нулю");
    });

    runTest('Метод addScore має коректно додавати бали', () => {
        const mockScene = createMockScene();
        const scoreboard = new Scoreboard(mockScene);

        // Тепер це не повинно викликати помилку 'null'
        scoreboard.addScore(10);
        assertEqual(scoreboard.getScore(), 10, "Бали не додалися перший раз");

        scoreboard.addScore(5);
        assertEqual(scoreboard.getScore(), 15, "Бали не підсумовуються");
    });

    runTest('Текст на екрані має оновлюватися після зміни рахунку', () => {
        const mockScene = createMockScene();
        const scoreboard = new Scoreboard(mockScene);
        scoreboard.addScore(100);

        // Перевіряємо, що текст справді оновився в нашій фейковій сцені
        assertEqual(
            mockScene.lastTextSet,
            'Score: 100',
            "Текст рахунку не оновився або має неправильний формат"
        );
    });

    console.groupEnd();
}