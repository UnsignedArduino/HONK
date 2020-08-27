function summon_slow_car (speed: number, num: number, x: number, y: number) {
    RandomNumber = randint(0, 2)
    if (RandomNumber == 0) {
        SlowCars.push(sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . 2 4 2 2 2 2 2 2 c 2 . . . 
            . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
            . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
            . 2 c 2 e e e e e e e b c 4 2 2 
            . 2 2 e b b e b b b e e b 4 2 2 
            . 2 e b b b e b b b b e 2 2 2 2 
            . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
            . e e e e e e f e e e f e 2 d d 
            . e e e e e e f e e f e e e 2 d 
            . e e e e e e f f f e e e e e e 
            . e f f f f e e e e f f f e e e 
            . . f f f f f e e f f f f f e . 
            . . . f f f . . . . f f f f . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy))
    } else if (RandomNumber == 1) {
        SlowCars.push(sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 6 6 6 6 6 6 6 6 . . . . 
            . . . 6 9 6 6 6 6 6 6 c 6 . . . 
            . . 6 c 9 6 6 6 6 6 6 c c 6 . . 
            . 6 c c 9 9 9 9 9 9 6 c c 9 6 d 
            . 6 c 6 8 8 8 8 8 8 8 b c 9 6 6 
            . 6 6 8 b b 8 b b b 8 8 b 9 6 6 
            . 6 8 b b b 8 b b b b 8 6 6 6 6 
            . 8 8 6 6 6 8 6 6 6 6 6 8 6 6 6 
            . 8 8 8 8 8 8 f 8 8 8 f 8 6 d d 
            . 8 8 8 8 8 8 f 8 8 f 8 8 8 6 d 
            . 8 8 8 8 8 8 f f f 8 8 8 8 8 8 
            . 8 f f f f 8 8 8 8 f f f 8 8 8 
            . . f f f f f 8 8 f f f f f 8 . 
            . . . f f f . . . . f f f f . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy))
    } else {
        SlowCars.push(sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 3 3 3 3 3 3 3 3 . . . . 
            . . . 3 d 3 3 3 3 3 3 c 3 . . . 
            . . 3 c d 3 3 3 3 3 3 c c 3 . . 
            . 3 c c d d d d d d 3 c c d 3 d 
            . 3 c 3 a a a a a a a b c d 3 3 
            . 3 3 a b b a b b b a a b d 3 3 
            . 3 a b b b a b b b b a 3 3 3 3 
            . a a 3 3 3 a 3 3 3 3 3 a 3 3 3 
            . a a a a a a f a a a f a 3 d d 
            . a a a a a a f a a f a a a 3 d 
            . a a a a a a f f f a a a a a a 
            . a f f f f a a a a f f f a a a 
            . . f f f f f a a f f f f f a . 
            . . . f f f . . . . f f f f . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy))
    }
    SlowCars[SlowCars.length - 1].vx = speed
    sprites.setDataNumber(SlowCars[SlowCars.length - 1], "Num", num)
    sprites.setDataBoolean(SlowCars[SlowCars.length - 1], "Destroy", true)
    tiles.placeOnTile(SlowCars[SlowCars.length - 1], tiles.getTileLocation(x, y))
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Splash) {
        color.startFade(color.originalPalette, color.Black, 500)
        color.pauseUntilFadeDone()
        pause(1000)
        controller.moveSprite(Car, 0, 64)
        init_car_location(32)
        Splash = false
        color.startFade(color.Black, color.originalPalette, 500)
    } else {
        if (SlowCars.length >= HonkPos && sprites.readDataBoolean(SlowCars[HonkPos], "Destroy")) {
            sprites.changeDataNumberBy(SlowCars[HonkPos], "Num", -1)
        }
        Car.setImage(img`
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . . . . . . . . . 
            . . . 2 4 2 2 2 2 2 2 c 2 . . . . . . . . . . . 
            . . 2 c 4 2 2 2 2 2 2 c c 2 . . . . . . . . f . 
            . 2 c c 4 4 4 4 4 4 2 c c 4 2 d . . . . . f . . 
            . 2 c 2 e e e e e e e b c 4 2 2 . . . . f . . . 
            . 2 2 e b b e b b b e e b 4 2 2 . . . f . f f . 
            . 2 e b b b e b b b b e 2 2 2 2 . . f f f . . . 
            . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 . f f f f f f . 
            . e e e e e e f e e e f e 2 d d . . f f f . . . 
            . e e e e e e f e e f e e e 2 d . . . f . f f . 
            . e e e e e e f f f e e e e e e . . . . f . . . 
            . e f f f f e e e e f f f e e e . . . . . f . . 
            . . f f f f f e e f f f f f e . . . . . . . f . 
            . . . f f f . . . . f f f f . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            `)
    }
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    Car.setImage(img`
        . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . 2 2 2 2 2 2 2 2 . . . . . . . . . . . . 
        . . . 2 4 2 2 2 2 2 2 c 2 . . . . . . . . . . . 
        . . 2 c 4 2 2 2 2 2 2 c c 2 . . . . . . . . . . 
        . 2 c c 4 4 4 4 4 4 2 c c 4 2 d . . . . . . . . 
        . 2 c 2 e e e e e e e b c 4 2 2 . . . . . . . . 
        . 2 2 e b b e b b b e e b 4 2 2 . . . . . . . . 
        . 2 e b b b e b b b b e 2 2 2 2 . . . . . . . . 
        . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 . . . . . . . . 
        . e e e e e e f e e e f e 2 d d . . . . . . . . 
        . e e e e e e f e e f e e e 2 d . . . . . . . . 
        . e e e e e e f f f e e e e e e . . . . . . . . 
        . e f f f f e e e e f f f e e e . . . . . . . . 
        . . f f f f f e e f f f f f e . . . . . . . . . 
        . . . f f f . . . . f f f f . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        `)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    for (let SlowCar of SlowCars) {
        SlowCar.ax = SlowCar.vx * -2
        SlowCar.setFlag(SpriteFlag.AutoDestroy, true)
    }
    SlowCars.removeAt(SlowCars.indexOf(sprite))
})
function init_car_location (speed: number) {
    tiles.placeOnTile(Car, tiles.getTileLocation(0, 4))
    Car.x = 16
    Car.vx = speed
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.startEffect(effects.fire)
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    pause(5000)
    game.over(false)
})
let RandomNumber = 0
let HonkPos = 0
let SlowCars: Sprite[] = []
let Splash = false
let Car: Sprite = null
Car = sprites.create(img`
    . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . . . . . . . . . 
    . . . 2 4 2 2 2 2 2 2 c 2 . . . . . . . . . . . 
    . . 2 c 4 2 2 2 2 2 2 c c 2 . . . . . . . . . . 
    . 2 c c 4 4 4 4 4 4 2 c c 4 2 d . . . . . . . . 
    . 2 c 2 e e e e e e e b c 4 2 2 . . . . . . . . 
    . 2 2 e b b e b b b e e b 4 2 2 . . . . . . . . 
    . 2 e b b b e b b b b e 2 2 2 2 . . . . . . . . 
    . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 . . . . . . . . 
    . e e e e e e f e e e f e 2 d d . . . . . . . . 
    . e e e e e e f e e f e e e 2 d . . . . . . . . 
    . e e e e e e f f f e e e e e e . . . . . . . . 
    . e f f f f e e e e f f f e e e . . . . . . . . 
    . . f f f f f e e f f f f f e . . . . . . . . . 
    . . . f f f . . . . f f f f . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
Car.setFlag(SpriteFlag.StayInScreen, true)
Car.setFlag(SpriteFlag.ShowPhysics, true)
tiles.setTilemap(tiles.createTilemap(hex`1e000900040101050101040301010104010301010104010401010501010403010101010103010104010105010301010104010301010101030101040101050103020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020206020202020202020202020202020202020202060202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202010104010101050101010103010101050101010101040101010501010101050101030104010301010401010401010301010501010301040103010104`, img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, [myTiles.transparency16,myTiles.tile1,sprites.vehicle.roadHorizontal,sprites.castle.tileGrass2,sprites.castle.tileGrass1,sprites.castle.tileGrass3,sprites.dungeon.collectibleInsignia], TileScale.Sixteen))
init_car_location(64)
scene.cameraFollowSprite(Car)
Splash = true
SlowCars = []
HonkPos = 2
game.onUpdate(function () {
    if (Car.x > 24 * 16) {
        Car.x = 5 * 16
        Car.vx += 8
        if (!(Splash)) {
            for (let Index = 0; Index <= 4; Index++) {
                summon_slow_car(Car.vx * 0.333, 2, 11, Index + 2)
            }
        }
    }
    if (Car.y < 16 * 4 - 16) {
        HonkPos = 0
    } else if (Car.y < 16 * 5 - 16) {
        HonkPos = 1
    } else if (Car.y < 16 * 6 - 16) {
        HonkPos = 2
    } else if (Car.y < 16 * 7 - 16) {
        HonkPos = 3
    } else {
        HonkPos = 4
    }
    if (!(Splash)) {
        Car.say(convertToText(HonkPos))
    }
    for (let SlowCar of SlowCars) {
        SlowCar.say(convertToText(sprites.readDataNumber(SlowCar, "Num")))
        if (sprites.readDataNumber(SlowCar, "Num") <= 0 && sprites.readDataBoolean(SlowCar, "Destroy")) {
            SlowCar.destroy(effects.halo, 100)
            for (let SlowCar of SlowCars) {
                sprites.setDataBoolean(SlowCar, "Destroy", false)
            }
        }
    }
})
