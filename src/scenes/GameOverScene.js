// src/scenes/GameOverScene.js
export class GameOverScene extends Phaser.Scene {
    init(data) {
        this.finalScore = data.score || 0;
    }

    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        const { width, height } = this.game.config;

        // Темний прозорий фон
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.8);

        // Текст "GAME OVER"
        this.add.text(width / 2, height / 2 - 100, 'GAME OVER', {
            fontSize: '64px',
            fill: '#FF0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // --- ЛОГІКА HIGH SCORE ---
        // 1. Отримуємо старий рекорд
        let highScore = localStorage.getItem('coin_rush_highscore') || 0;
        let isNewRecord = false;

        // 2. Перевіряємо, чи побили ми його
        if (this.finalScore > highScore) {
            highScore = this.finalScore;
            localStorage.setItem('coin_rush_highscore', highScore); // Зберігаємо новий
            isNewRecord = true;
        }

        // 3. Відображаємо поточний рахунок
        this.add.text(width / 2, height / 2, `Ваш рахунок: ${this.finalScore}`, {
            fontSize: '40px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        // 4. Відображаємо рекорд (або вітання)
        if (isNewRecord) {
            this.add.text(width / 2, height / 2 + 50, `НОВИЙ РЕКОРД! 🏆`, {
                fontSize: '32px',
                fill: '#FFD700', // Золотий
                fontStyle: 'bold'
            }).setOrigin(0.5);
        } else {
            this.add.text(width / 2, height / 2 + 50, `Найкращий: ${highScore}`, {
                fontSize: '24px',
                fill: '#AAAAAA'
            }).setOrigin(0.5);
        }
        // -------------------------

        // Кнопка "Перезапуск"
        const restartButton = this.add.text(width / 2, height / 2 + 120, 'Спробувати ще раз', {
            fontSize: '28px',
            fill: '#00FF00',
            backgroundColor: '#111111',
            padding: { x: 10, y: 5 }
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true }); // Курсор-рука при наведенні

        restartButton.on('pointerdown', () => {
            this.scene.stop('GameOverScene');

            // Повертаємось до StartScene, щоб побачити оновлений рекорд там теж
            // (або можна одразу в GameScene, як вам зручніше)
            this.scene.start('StartScene');
        });
    }
}