class Level {
    constructor({
        collisions = [],
        background,
        doors = [],
        pigs = [],
        items = []
    }) {
        this.parsedCollisions = collisions.parse2D();
        this.collisionObjects = this.parsedCollisions.createObjectsFrom2D();

        this.background = background;
        this.doors = doors;
        this.pigs = pigs;
        this.items = items;
    }

    update() {
        if (player.currentAnimation) player.currentAnimation.isActive = false;
        player.collisionObjects = this.collisionObjects;
        player.position.x = 64 * 2.5;
        player.position.y = 64 * 2;

        this.pigs.forEach((pig) => {
            pig.collisionObjects = this.collisionObjects;
        })
        this.items.forEach((item) => {
            item.collisionObjects = this.collisionObjects;
        })

        collisionObjects = this.collisionObjects;
        background = this.background;
        doors = this.doors;
        pigs = this.pigs;
        items = this.items;
    }
}