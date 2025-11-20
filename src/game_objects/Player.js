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
        super(scene, x, y, 'player_sprite');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.moveSpeed = 200;
        this.jumpForce = 400;

        // Встановлюємо розмір фізичного тіла, щоб воно відповідало спрайту (32x32)
        this.setBodySize(32, 32);

        // Встановлення фізичних властивостей
        this.setCollideWorldBounds(true);
        this.setDragX(500);
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
        if (this.body.touching.down) {
            this.setVelocityY(-this.jumpForce);
        }
    }
}