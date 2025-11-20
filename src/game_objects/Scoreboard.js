// src/game_objects/Scoreboard.js
export class Scoreboard {
    constructor(scene) {
        this.currentScore = 0;

        this.scoreText = scene.add.text(16, 16, 'SCORE: 0', {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: '"Press Start 2P", cursive', // <-- НОВИЙ ШРИФТ
            stroke: '#000000', // Чорна обводка для контрасту
            strokeThickness: 4
        });

        this.scoreText.setScrollFactor(0);
    }

    // ... методи addScore і getScore без змін
    addScore(value) {
        this.currentScore += value;
        this.scoreText.setText('SCORE: ' + this.currentScore);
    }

    getScore() {
        return this.currentScore;
    }
}