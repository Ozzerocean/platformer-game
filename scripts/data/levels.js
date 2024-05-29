function initLevels() {
    levels = [];

    levels.push(
        new Level({
            collisions: collisionsLevel0,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 0.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 9 + 17,
                        y: 64 * 12 - 112
                    },
                    level: 0,
                }),
            ],
        })
    );
    
    levels.push(
        new Level({
            collisions: collisionsLevel1,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 1.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 4 + 34,
                        y: 64 * 14 - 112
                    },
                    level: 1,
                    toDoor: levels[0].doors[0]
                }),
                new Door({
                    position: {
                        x: 64 * 16 + 24,
                        y: 64 * 4 - 112
                    },
                    level: 1,
                }),
            ],
            pigs: [
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 5 - 16,
                        y: 64 * 8
                    },
                    lastDirection: 'left'
                }),
                new CannonPig({
                    collisionObjects,
                    position: {
                        x: 64 * 10 + 32,
                        y: 64 * 9.5
                    },
                    lastDirection: 'right'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 12,
                        y: 64 * 5
                    },
                    lastDirection: 'right'
                })
            ],
            cannons: [
                new Cannon({
                    collisionObjects,
                    position: {
                        x: 64 * 7,
                        y: 64 * 9
                    },
                    direction: 'left',
                }),
                new Cannon({
                    collisionObjects,
                    position: {
                        x: 64 * 11,
                        y: 64 * 9
                    },
                    affectedArea: {
                        width: 64 * 3,
                        height: 64 * 5,
                    },
                    direction: 'right',
                    power: 4.5
                }),
            ],
            items: [
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 5,
                        y: 64 * 3 + 24
                    },
                }),
                new BigHeart({
                    collisionObjects,
                    position: {
                        x: 64 * 12,
                        y: 64 * 2 + 24
                    },
                })
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel2,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 2.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 3 + 17,
                        y: 64 * 10 - 112
                    },
                    level: 2,
                    toDoor: levels[1].doors[1]
                }),
                new Door({
                    position: {
                        x: 64 * 8 + 17,
                        y: 64 * 10 - 112
                    },
                    level: 2,
                }),
                new Door({
                    position: {
                        x: 64 * 15 + 17,
                        y: 64 * 10 - 112
                    },
                    level: 2,
                }),
            ],
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel3,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 3.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 6 + 17,
                        y: 64 * 13 - 112
                    },
                    level: 3,
                    toDoor: levels[2].doors[2]
                }),
            ],
            pigs: [
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 2 + 18,
                        y: 64 * 12
                    },
                    lastDirection: 'right'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 8 + 18,
                        y: 64 * 13
                    },
                    lastDirection: 'left'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 10 + 18,
                        y: 64 * 9
                    },
                    lastDirection: 'left'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 6 + 18,
                        y: 64 * 8
                    },
                    lastDirection: 'right'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 14 + 18,
                        y: 64 * 13
                    },
                    lastDirection: 'left'
                }),
            ],
            items: [
                new BigHeart({
                    collisionObjects,
                    position: {
                        x: 64 * 2,
                        y: 64 * 8 + 24
                    },
                }),
                new BigHeart({
                    collisionObjects,
                    position: {
                        x: 64 * 9,
                        y: 64 * 3 + 24
                    },
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 13,
                        y: 64 * 6 + 24
                    }
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 12,
                        y: 64 * 11 + 24
                    }
                })
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel4,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 4.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 8 + 17,
                        y: 64 * 15 - 112
                    },
                    level: 4,
                    toDoor: levels[2].doors[1]
                }),
                new Door({
                    position: {
                        x: 64 * 6 + 17,
                        y: 64 * 4 - 112
                    },
                    level: 4,
                }),
            ],
            pigs: [
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 11 + 18,
                        y: 64 * 10
                    },
                    lastDirection: 'left'
                }),
                new CannonPig({
                    collisionObjects,
                    position: {
                        x: 64 * 7 + 32,
                        y: 64 * 4
                    },
                    lastDirection: 'right'
                }),
            ],
            cannons: [
                new Cannon({
                    collisionObjects,
                    position: {
                        x: 64 * 8,
                        y: 64 * 4
                    },
                    affectedArea: {
                        width: 64 * 3,
                        height: 64 * 3,
                    },
                    direction: 'right',
                    power: 5
                }),
            ],
            items: [
                new BigHeart({
                    collisionObjects,
                    position: {
                        x: 64 * 13 + 12,
                        y: 64 * 5 + 24
                    },
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 7 - 12,
                        y: 64 * 6 + 24
                    }
                }),
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel5,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 5.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 13 + 17,
                        y: 64 * 13 - 112
                    },
                    level: 5,
                    toDoor: levels[4].doors[1]
                }),
                new Door({
                    position: {
                        x: 64 * 8 + 17,
                        y: 64 * 9 - 112
                    },
                    level: 5,
                }),
            ],
            pigs: [
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 3 + 18,
                        y: 64 * 10
                    },
                    lastDirection: 'right'
                }),
                new CannonPig({
                    collisionObjects,
                    position: {
                        x: 64 * 7 + 32,
                        y: 64 * 10
                    },
                    lastDirection: 'right'
                }),
            ],
            cannons: [
                new Cannon({
                    collisionObjects,
                    position: {
                        x: 64 * 8,
                        y: 64 * 9
                    },
                    affectedArea: {
                        width: 64 * 3,
                        height: 64 * 3,
                    },
                    direction: 'right',
                    power: 5
                }),
            ],
            items: [
                new BigHeart({
                    collisionObjects,
                    position: {
                        x: 64 * 11,
                        y: 64 * 5 + 24
                    },
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 6 - 4,
                        y: 64 * 4 + 24
                    }
                }),
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel6,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 6.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 5 + 17,
                        y: 64 * 12 - 112
                    },
                    level: 6,
                    toDoor: levels[5].doors[1]
                }),
                new Door({
                    position: {
                        x: 64 * 10 + 17,
                        y: 64 * 7 - 112
                    },
                    level: 6,
                }),
            ],
            pigs: [
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 12 + 18,
                        y: 64 * 9
                    },
                    lastDirection: 'left'
                }),
                new CannonPig({
                    collisionObjects,
                    position: {
                        x: 64 * 9 + 4,
                        y: 64 * 8
                    },
                    lastDirection: 'left'
                }),
            ],
            cannons: [
                new Cannon({
                    collisionObjects,
                    position: {
                        x: 64 * 8,
                        y: 64 * 8
                    },
                    affectedArea: {
                        width: 64 * 3,
                        height: 64 * 3,
                    },
                    direction: 'left',
                    power: 5
                }),
            ],
            items: [
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 3,
                        y: 64 * 5 + 24
                    }
                }),
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel7,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 7.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 7 + 17,
                        y: 64 * 5 - 112
                    },
                    level: 7,
                    toDoor: levels[6].doors[1]
                }),
                new Door({
                    position: {
                        x: 64 * 12 + 17,
                        y: 64 * 15 - 112
                    },
                    level: 7,
                }),
            ],
            pigs: [
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 7 + 6,
                        y: 64 * 14
                    },
                    lastDirection: 'right'
                }),
                new CannonPig({
                    collisionObjects,
                    position: {
                        x: 64 * 8 + 28,
                        y: 64 * 8
                    },
                    lastDirection: 'right'
                }),
            ],
            cannons: [
                new Cannon({
                    collisionObjects,
                    position: {
                        x: 64 * 9,
                        y: 64 * 8
                    },
                    affectedArea: {
                        width: 64 * 3,
                        height: 64 * 3,
                    },
                    direction: 'right',
                    power: 5
                }),
            ],
            items: [
                new BigHeart({
                    collisionObjects,
                    position: {
                        x: 64 * 6,
                        y: 64 * 8 + 24
                    },
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 8,
                        y: 64 * 13 + 24
                    }
                })
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel8,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 8.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 3 + 34,
                        y: 64 * 10 - 112
                    },
                    level: 8,
                    toDoor: levels[7].doors[1]
                }),
                new Door({
                    position: {
                        x: 64 * 9 + 17,
                        y: 64 * 11 - 112
                    },
                    level: 8,
                }),
                new Door({
                    position: {
                        x: 64 * 15 + 17,
                        y: 64 * 9 - 112
                    },
                    level: 8,
                }),
            ],
            items: [
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 9 - 8,
                        y: 64 * 6 + 24
                    }
                })
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel9,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 9.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 9 + 17,
                        y: 64 * 6 - 112
                    },
                    level: 9,
                    toDoor: levels[8].doors[1]
                }),
            ],
            pigs: [
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 5 + 18,
                        y: 64 * 6
                    },
                    lastDirection: 'right'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 6 + 18,
                        y: 64 * 12
                    },
                    lastDirection: 'left'
                }),
                new CannonPig({
                    collisionObjects,
                    position: {
                        x: 64 * 9 + 4,
                        y: 64 * 10
                    },
                    lastDirection: 'left'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 11 + 18,
                        y: 64 * 12
                    },
                    lastDirection: 'right'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 12 + 18,
                        y: 64 * 6
                    },
                    lastDirection: 'right'
                }),
            ],
            cannons: [
                new Cannon({
                    collisionObjects,
                    position: {
                        x: 64 * 8,
                        y: 64 * 9
                    },
                    affectedArea: {
                        width: 64 * 3,
                        height: 64 * 3,
                    },
                    direction: 'left',
                    power: 5
                }),
            ],
            items: [
                new BigHeart({
                    collisionObjects,
                    position: {
                        x: 64 * 6,
                        y: 64 * 7 + 24
                    },
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 12 + 16,
                        y: 64 * 7 + 24
                    }
                })
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel10,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 10.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 3 + 17,
                        y: 64 * 11 - 112
                    },
                    level: 10,
                    toDoor: levels[8].doors[2]
                }),
                new Door({
                    position: {
                        x: 64 * 16,
                        y: 64 * 6 - 112
                    },
                    level: 10,
                }),
            ],
            pigs: [
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 4 + 8,
                        y: 64 * 5
                    },
                    lastDirection: 'right'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 8 + 24,
                        y: 64 * 10
                    },
                    lastDirection: 'left'
                }),
            ],
            items: [
                new BigHeart({
                    collisionObjects,
                    position: {
                        x: 64 * 7 + 16,
                        y: 64 * 9 + 24
                    },
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 5 - 6,
                        y: 64 * 4 + 24
                    }
                })
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel11,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 11.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 15 + 17,
                        y: 64 * 9 - 112
                    },
                    level: 11,
                    toDoor: levels[10].doors[1]
                }),
                new Door({
                    position: {
                        x: 64 * 3 + 34,
                        y: 64 * 8 - 112
                    },
                    level: 11,
                }),
            ],
            pigs: [
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 4 + 18,
                        y: 64 * 7
                    },
                    lastDirection: 'right'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 12 + 18,
                        y: 64 * 10
                    },
                    lastDirection: 'left'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 13 + 18,
                        y: 64 * 9
                    },
                    lastDirection: 'left'
                }),
            ],
            items: [
                new BigHeart({
                    collisionObjects,
                    position: {
                        x: 64 * 9,
                        y: 64 * 7 + 24
                    },
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 3,
                        y: 64 * 9 + 24
                    }
                })
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel12,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 12.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 4 + 17,
                        y: 64 * 10 - 112
                    },
                    level: 12,
                    toDoor: levels[11].doors[1]
                }),
                new Door({
                    position: {
                        x: 64 * 9 + 17,
                        y: 64 * 8 - 112
                    },
                    level: 12,
                }),
                new Door({
                    position: {
                        x: 64 * 14 + 17,
                        y: 64 * 10 - 112
                    },
                    level: 12,
                }),
            ],
            pigs: [
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 6 + 18,
                        y: 64 * 10
                    },
                    lastDirection: 'right'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 13 + 18,
                        y: 64 * 9
                    },
                    lastDirection: 'left'
                }),
            ],
            items: [
                new BigHeart({
                    collisionObjects,
                    position: {
                        x: 64 * 9,
                        y: 64 * 10 + 24
                    },
                }),
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel13,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 13.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 6 + 17,
                        y: 64 * 12 - 112
                    },
                    level: 13,
                    toDoor: levels[12].doors[2]
                }),
                new Door({
                    position: {
                        x: 64 * 13 + 17,
                        y: 64 * 7 - 112
                    },
                    level: 13,
                }),
            ],
            pigs: [
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 8 + 8,
                        y: 64 * 8
                    },
                    lastDirection: 'right'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 6 + 24,
                        y: 64 * 8
                    },
                    lastDirection: 'left'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 12 + 18,
                        y: 64 * 11
                    },
                    lastDirection: 'left'
                }),
            ],
            items: [
                new BigHeart({
                    collisionObjects,
                    position: {
                        x: 64 * 14 + 12,
                        y: 64 * 9 + 24
                    },
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 7,
                        y: 64 * 5 + 24
                    }
                })
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel14,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 14.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 9 + 17,
                        y: 64 * 7 - 112
                    },
                    level: 14,
                    toDoor: levels[13].doors[1]
                }),
            ],
            pigs: [
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 3 + 18,
                        y: 64 * 6 + 24
                    },
                    lastDirection: 'right'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 7 + 24,
                        y: 64 * 13 + 24
                    },
                    lastDirection: 'right'
                }),
                new CannonPig({
                    collisionObjects,
                    position: {
                        x: 64 * 9 + 4,
                        y: 64 * 10
                    },
                    lastDirection: 'left'
                }),
                new Pig({
                    collisionObjects,
                    position: {
                        x: 64 * 15 + 18,
                        y: 64 * 9
                    },
                    lastDirection: 'left'
                }),
            ],
            cannons: [
                new Cannon({
                    collisionObjects,
                    position: {
                        x: 64 * 8,
                        y: 64 * 9
                    },
                    affectedArea: {
                        width: 64 * 3,
                        height: 64 * 1,
                    },
                    direction: 'left',
                    power: 5
                }),
            ],
            items: [
                new BigHeart({
                    collisionObjects,
                    position: {
                        x: 64 * 9,
                        y: 64 * 2 + 24
                    },
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 14 + 12,
                        y: 64 * 10 + 24
                    }
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 8 + 12,
                        y: 64 * 12 + 24
                    }
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 7 + 4,
                        y: 64 * 9 + 24
                    }
                }),
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 2 + 6,
                        y: 64 * 6 + 24
                    }
                })
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel15,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 15.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 3 + 17,
                        y: 64 * 10 - 112
                    },
                    level: 15,
                    toDoor: levels[12].doors[1]
                }),
                new Door({
                    position: {
                        x: 64 * 15 + 17,
                        y: 64 * 10 - 112
                    },
                    level: 15,
                    diamondsToEnter: 15,
                    canBeOpened: false
                }),
            ],
            pigs: [
                new TraitorPig({
                    collisionObjects,
                    position: {
                        x: 64 * 16,
                        y: 64 * 9
                    },
                })
            ],
            items: [
                new Diamond({
                    collisionObjects,
                    position: {
                        x: 64 * 7,
                        y: 64 * 6 + 24
                    }
                })
            ]
        })
    );

    levels.push(
        new Level({
            collisions: collisionsLevel16,
            background: new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/Level 16.png'
            }),
            doors: [
                new Door({
                    position: {
                        x: 64 * 5 + 17,
                        y: 64 * 10 - 112
                    },
                    level: 16,
                    toDoor: levels[15].doors[1]
                }),
            ],
            pigs: [
                new KingPig({
                    collisionObjects,
                    position: {
                        x: 64 * 13,
                        y: 64 * 6
                    },
                })
            ]
        })
    );
}