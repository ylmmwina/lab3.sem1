// src/game_objects/AssetsManager.js
// ООП-клас для керування шляхами до ресурсів.

export class AssetsManager {
    /**
     * Метод повертає мапу ресурсів для завантаження у preload().
     * Коли ви намалюєте свої спрайти, ви оновите ці шляхи.
     */
    static getAssetsMap() {
        return {
            // Player assets
            player: { key: 'player_sprite', path: 'assets/player.png' },
            // Collectable assets
            coin: { key: 'coin_sprite', path: 'assets/coin.png' },
            // Obstacle assets
            obstacle: { key: 'obstacle_sprite', path: 'assets/obstacle.png' },
            // Platform assets (можна використовувати просту текстуру або tilemap)
            platform: { key: 'platform_sprite', path: 'assets/platform.png' }
        };
    }
}