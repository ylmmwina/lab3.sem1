// src/game_objects/Scoreboard.js
// ООП-клас, що інкапсулює логіку рахунку та його відображення.

export class Scoreboard {
    /**
     * Конструктор.
     * @param {Phaser.Scene} scene - Сцена для додавання тексту.
     */
    constructor(scene) {
        this.currentScore = 0;

        // Створюємо текстовий об'єкт Phaser для відображення
        this.scoreText = scene.add.text(
            16, 40,
            'SCORE: 0',
            { fontSize: '20px', fill: '#FFD700', fontStyle: 'bold' }
        );

        // Фіксуємо текст на камері, щоб він не рухався разом зі сценою
        this.scoreText.setScrollFactor(0);

        console.log("Scoreboard: Об'єкт успішно ініціалізовано.");
    }

    /**
     * addScore(): Збільшує рахунок та оновлює відображення.
     * @param {number} value - Кількість очок для додавання.
     */
    addScore(value) {
        this.currentScore += value;
        this.scoreText.setText('SCORE: ' + this.currentScore);
    }

    /**
     * getScore(): Повертає поточний рахунок.
     */
    getScore() {
        return this.currentScore;
    }
}