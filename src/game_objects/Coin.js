// src/game_objects/Coin.js
// Конкретний ООП-клас "Монетка". Наслідує від Collectable.

import { Collectable } from './Collectable.js';

export class Coin extends Collectable {
    /**
     * Конструктор монетки.
     */
    constructor(scene, x, y) {
        // Викликаємо конструктор батьківського класу Collectable
        super(scene, x, y, 'coin_sprite');

        this.scoreValue = 10;
        this.setScale(0.7); // Трохи зменшимо розмір
    }

    /**
     * interact(): Перевизначення (поліморфізм) батьківського методу.
     * Додає очки гравцю (логіка буде додана пізніше).
     * @param {Player} player - Екземпляр нашого класу Player.
     */
    interact(player) {
        // Логіка додавання очок (поки що лише консоль)

        // Викликаємо батьківську логіку (зникнення об'єкта)
        super.interact(player);

        console.log(`Coin: Додано ${this.scoreValue} очок!`);
    }
}