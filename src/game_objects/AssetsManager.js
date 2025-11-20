// src/game_objects/AssetsManager.js

export class AssetsManager {
    static getAssetsMap() {
        return {
            // ВАЖЛИВО: Ось тут була помилка. Тепер шлях правильний:
            player: { key: 'player_sprite', path: 'assets/player_cat.png' },

            coin: { key: 'coin_sprite', path: 'assets/coin.png' },
            obstacle: { key: 'obstacle_sprite', path: 'assets/obstacle.png' },
            platform: { key: 'platform_sprite', path: 'assets/platform.png' },

            // Фон з хмарами (переконайтеся, що файл так і називається у вас)
            clouds: { key: 'clouds_bg', path: 'assets/clouds.png' }
        };
    }
}