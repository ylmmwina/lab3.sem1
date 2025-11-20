// src/game_objects/Obstacle.js
// ООП-клас, що інкапсулює логіку перешкоди.
// Його interact() демонструє поліморфізм порівняно з Coin.interact().

export class Obstacle extends Phaser.Physics.Arcade.Sprite {
    /**
     * Конструктор перешкоди.
     */
    constructor(scene, x, y) {
        // Використовуємо 'obstacle_sprite' як ключ текстури
        super(scene, x, y, 'obstacle_sprite');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Налаштовуємо фізику: перешкоди не мають рухатися і не мають падати
        this.body.setAllowGravity(false);
        this.setImmovable(true);
        this.setDisplaySize(32, 32);

        console.log("Obstacle: Об'єкт успішно ініціалізовано.");
    }

    /**
     * interact(): Метод взаємодії з гравцем.
     * Тут реалізується логіка завершення гри.
     */
    interact(player) {
        // Запускаємо логіку "Game Over"
        console.log("Obstacle: Game Over! Гравець зіткнувся з перешкодою.");

        // Зупиняємо сцену
        this.scene.physics.pause();

        // Робимо гравця прозорим або змінюємо його вигляд, щоб позначити кінець гри
        player.setTint(0x999999); // Сірий колір
        player.anims.stop();

        // TODO: Пізніше тут буде перехід на GameOverScene
    }
}