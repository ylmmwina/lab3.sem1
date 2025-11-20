// tests/AssetsManager.test.js

// Імпортуємо з папки src
import { AssetsManager } from '../src/game_objects/AssetsManager.js';
// Імпортуємо утиліти з поточної папки tests
import { runTest, assertEqual } from './testUtils.js';

export function runAssetsManagerTests() {
    console.group('%c🧪 Тестування модуля: AssetsManager.js', 'color: blue; font-weight: bold;');

    runTest('Має повертати правильний шлях до спрайта гравця (котика)', () => {
        const assets = AssetsManager.getAssetsMap();
        assertEqual(
            assets.player.path,
            'assets/player_cat.png',
            "Шлях до файлу гравця неправильний"
        );
    });

    runTest('Має повертати правильний шлях до фону з хмарами', () => {
        const assets = AssetsManager.getAssetsMap();
        assertEqual(
            assets.clouds.path,
            'assets/clouds.png',
            "Шлях до файлу хмар неправильний"
        );
    });

    runTest('Має містити ключі для платформи та монетки', () => {
        const assets = AssetsManager.getAssetsMap();
        if (!assets.platform) throw new Error("Відсутній ключ 'platform'");
        if (!assets.coin) throw new Error("Відсутній ключ 'coin'");
    });

    console.groupEnd();
}