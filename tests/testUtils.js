// tests/testUtils.js

/**
 * Проста функція для запуску тесту.
 * Виводить зелену галочку, якщо тест пройшов, і червоний хрестик з помилкою, якщо ні.
 */
export function runTest(testName, testFn) {
    try {
        testFn();
        console.log(`%c  ✅ PASS: ${testName}`, 'color: green;');
    } catch (error) {
        console.error(`%c  ❌ FAIL: ${testName}`, 'color: red; font-weight: bold;');
        console.error(`     Причина: ${error.message}`);
    }
}

/**
 * Перевіряє, чи два значення однакові.
 * Якщо ні — кидає помилку, яку ловить runTest.
 */
export function assertEqual(actual, expected, errorMessage) {
    if (actual !== expected) {
        throw new Error(errorMessage || `Очікувалося ${expected}, але отримано ${actual}`);
    }
}

/**
 * Перевіряє, чи два значення НЕ однакові.
 * Використовується, щоб переконатися, що змінна не дорівнює undefined або null.
 */
export function assertNotEqual(actual, expected, errorMessage) {
    if (actual === expected) {
        throw new Error(errorMessage || `Очікувалося, що значення не дорівнює ${expected}, але отримано ${actual}`);
    }
}