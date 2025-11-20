// src/scenes/GameOverScene.js
// Сцена, що відображається після програшу.

export class GameOverScene extends Phaser.Scene {
    /**
     * Дані передаються в init() при запуску сцени.
     * @param {object} data - Об'єкт, що містить фінальний рахунок.
     */
    init(data) {
        this.finalScore = data.score || 0;
    }

    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        console.log("GameOverScene: Кінець гри.");

        const { width, height } = this.game.config;

        // Задній фон
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);

        // Текст "GAME OVER"
        this.add.text(width / 2, height / 2 - 80, 'GAME OVER', {
            fontSize: '64px',
            fill: '#FF0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Фінальний рахунок
        this.add.text(width / 2, height / 2, `Ваш рахунок: ${this.finalScore}`, {
            fontSize: '32px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        // Кнопка "Перезапуск"
        const restartButton = this.add.text(width / 2, height / 2 + 80, 'Спробувати ще раз', {
            fontSize: '32px',
            fill: '#00FF00',
            backgroundColor: '#111111'
        })
            .setOrigin(0.5)
            .setInteractive();

        // Логіка перезапуску
        restartButton.on('pointerdown', () => {
            // Зупиняємо цю сцену та перезапускаємо GameScene
            this.scene.stop('GameOverScene');
            this.scene.start('GameScene');
        });
    }
}