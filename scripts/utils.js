Array.prototype.parse2D = function() {
    const rows = [];
    
    for(let i = 0; i < this.length; i += 20) {
        rows.push(this.slice(i, i + 20));
    }

    return rows;
}

Array.prototype.createObjectsFrom2D = function() {
    const objects = []

    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 293 || symbol === 250 || symbol == 323) {
                objects.push(
                    new CollisionBlock({
                        position: {
                            x: x * 64,
                            y: y * 64
                        }
                    })
                )
            } else if (symbol === 292 || symbol == 322) {
                objects.push(
                    new CollisionBeam({
                        position: {
                            x: x * 64,
                            y: y * 64
                        }
                    })
                )
            } else if (symbol === 291 || symbol == 321) {
                objects.push(
                    new CollisionPlank({
                        position: {
                            x: x * 64,
                            y: y * 64
                        }
                    })
                )
            }
        })
    })

    return objects;
}