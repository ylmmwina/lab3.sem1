// tests/GameObjects.test.js
import { Coin } from '../src/game_objects/Coin.js';
import { runTest, assertEqual, assertNotEqual } from './testUtils.js';

export function runGameObjectTests() {
    console.group('%c🧪 Тестування структури: GameObjects (Coin)', 'color: magenta; font-weight: bold;');

    // ТЕСТ 1: Перевіряємо, чи клас взагалі існує і експортується
    runTest('Клас Coin має бути визначений', () => {
        assertNotEqual(Coin, undefined, "Помилка: Клас Coin не знайдено (можливо, проблема з експортом)");
        assertEqual(typeof Coin, 'function', "Помилка: Coin має бути класом (функцією-конструктором)");
    });

    // ТЕСТ 2: Перевіряємо, чи ти додала метод interact (поліморфізм)
    // Ми дивимося в "прототип" класу - інструкцію, за якою створюються об'єкти.
    runTest('Клас Coin має містити власний метод interact', () => {
        // Перевіряємо, чи є така функція в описі класу
        const hasInteractMethod = typeof Coin.prototype.interact === 'function';

        assertEqual(hasInteractMethod, true, "Помилка: Метод interact() відсутній у класі Coin");
    });
    console.groupEnd();
}