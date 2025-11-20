// src/game_objects/Player.js
// ООП-клас, що інкапсулює логіку гравця (рух, стрибок).

/**
 * Клас Player, наслідує від Phaser.Physics.Arcade.Sprite.
 */
export class Player extends Phaser.Physics.Arcade.Sprite {
    /**
     * Конструктор гравця.
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'placeholder');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Інкапсульовані властивості
        this.moveSpeed = 200;
        this.jumpForce = 400;

        // Фізичні властивості
        this.setCollideWorldBounds(true);
        this.setDragX(500);

        console.log("Player: Об'єкт успішно ініціалізовано.");
    }

    /**
     * move(): Метод для горизонтального руху.
     */
    move(direction) {
        this.setVelocityX(direction * this.moveSpeed);
    }

    /**
     * jump(): Метод для стрибка.
     */
    jump() {
        // Викликаємо стрибок, якщо гравець торкається землі.
        if (this.body.touching.down) {
            this.setVelocityY(-this.jumpForce);
        }
    }
}