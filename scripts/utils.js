Array.prototype.parse2D = function() {
    const rows = [];
    
    for(let i = 0; i < this.length; i += 19) {
        rows.push(this.slice(i, i + 19));
    }

    return rows;
}

Array.prototype.createObjectsFrom2D = function() {
    const objects = []

    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 293 || symbol === 250) {
                objects.push(
                    new CollisionBlock({
                        position: {
                            x: x * 64,
                            y: y * 64
                        }
                    })
                )
            } else if (symbol === 292) {
                objects.push(
                    new CollisionBeam({
                        position: {
                            x: x * 64,
                            y: y * 64
                        }
                    })
                )
            } else if (symbol === 291) {
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