namespace SpriteKind {
    export const Info = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Heart = SpriteKind.create()
    export const PowerUp = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(Splash)) {
        Car.vy = -32
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    info.changeScoreBy(randint(5, 20))
    sprite.startEffect(effects.halo, 100)
    otherSprite.destroy(effects.disintegrate, 100)
    music.powerUp.play()
})
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
    get_last_slowcar().vx = speed
    sprites.setDataNumber(get_last_slowcar(), "Num", num)
    sprites.setDataBoolean(get_last_slowcar(), "Destroy", true)
    multilights.addLightSource(get_last_slowcar(), 8)
    tiles.placeOnTile(get_last_slowcar(), tiles.getTileLocation(x, y))
}
sprites.onDestroyed(SpriteKind.Coin, function (sprite) {
    multilights.removeLightSource(sprite)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Splash) {
        SelectedCarImage += 1
        if (SelectedCarImage == 3) {
            SelectedCarImage = 0
        }
        Car.startEffect(effects.halo, 2000)
        imagemorph.morph(Car, CarImages[SelectedCarImage][0])
        blockSettings.writeNumber("HONK!:SelectedCarImage", SelectedCarImage)
        pause(1000)
    } else {
        color.startFade(color.originalPalette, color.Black, 250)
        color.pauseUntilFadeDone()
        Night = !(Night)
        multilights.toggleLighting(Night)
        color.startFade(color.Black, color.originalPalette, 250)
    }
})
function make_slow_cars_undestructible () {
    for (let SlowCar of SlowCars) {
        sprites.setDataBoolean(SlowCar, "Destroy", false)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(Dead)) {
        if (Splash) {
            color.startFade(color.originalPalette, color.Black, 500)
            color.pauseUntilFadeDone()
            pause(1000)
            init_car_location(8)
            Car.x = 23 * 16
            Splash = false
            info.setScore(0)
            info.setLife(3)
            SplashScreen.destroy()
            color.startFade(color.Black, color.originalPalette, 500)
        } else {
            if (SlowCars.length >= HonkPos && sprites.readDataBoolean(SlowCars[HonkPos], "Destroy")) {
                sprites.changeDataNumberBy(SlowCars[HonkPos], "Num", HonkPower * -1)
                info.changeScoreBy(HonkPower)
            }
            Car.setImage(CarImages[SelectedCarImage][1])
            timer.throttle("Honk", music.beat(BeatFraction.Half), function () {
                music.playTone(554, music.beat(BeatFraction.Half))
            })
        }
    }
})
function run_crash_noise () {
    timer.background(function () {
        for (let index = 0; index < 16; index++) {
            music.playTone(139, music.beat(BeatFraction.Sixteenth))
            music.rest(music.beat(BeatFraction.Sixteenth))
        }
    })
}
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    Car.vy = 0
    for (let index = 0; index < Car.bottom % 16; index++) {
        Car.y += 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    if (sprites.readDataString(otherSprite, "Type") == "extra noise") {
        HonkPower += 1
        Car.say("Honk power: " + HonkPower, 2000)
    }
    sprite.startEffect(effects.halo, 100)
    otherSprite.destroy(effects.disintegrate, 100)
    music.powerUp.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Heart, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    sprite.startEffect(effects.halo, 100)
    otherSprite.destroy(effects.disintegrate, 100)
    music.powerUp.play()
})
sprites.onDestroyed(SpriteKind.PowerUp, function (sprite) {
    multilights.removeLightSource(sprite)
})
function summon_heart (x: number, y: number) {
    HeartSprite = sprites.create(img`
        . c 2 2 . . 2 2 . 
        c 2 2 2 2 2 2 2 2 
        c 2 2 2 2 2 2 2 2 
        c 2 2 2 2 2 2 2 2 
        . c 2 2 2 2 2 2 . 
        . . c 2 2 2 2 . . 
        . . . c 2 2 . . . 
        `, SpriteKind.Heart)
    HeartSprite.lifespan = 5000
    multilights.addLightSource(HeartSprite, 4)
    tiles.placeOnTile(HeartSprite, tiles.getTileLocation(x, y))
}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    Car.setImage(CarImages[SelectedCarImage][0])
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    Car.vy = 0
    for (let index = 0; index < 16 - Car.top % 16; index++) {
        Car.y += -1
    }
})
function get_last_slowcar () {
    return SlowCars[SlowCars.length - 1]
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(Splash)) {
        Car.vy = 32
    }
})
function summon_powerup_extra_noise (x: number, y: number) {
    PowerUpSprite = sprites.create(img`
        ..........cccbb.........
        .........cb11dbb........
        ........cd11cbdb....6...
        ....ccccb11cccbdb....6..
        .ccccbcc11cccccdb..6..6.
        cb1cb1bb11cdbccbc...6..6
        cdbb11bb1dcddcfbc.6..6.6
        cdbbd1bbddbdbffbc..6.6.6
        cdbbddbbddbbcffbc..6.6.6
        cdbbbdbbddfffffbc.6..6.6
        cbdbbbbbddcfffcbc...6..6
        .ccccbccddbfffbdb..6..6.
        ....ccccb11dcbdb.....6..
        ........cb111dbb....6...
        .........cccccb.........
        ........................
        `, SpriteKind.PowerUp)
    PowerUpSprite.lifespan = 5000
    sprites.setDataString(PowerUpSprite, "Type", "extra noise")
    multilights.addLightSource(PowerUpSprite, 4)
    tiles.placeOnTile(PowerUpSprite, tiles.getTileLocation(x, y))
}
info.onLifeZero(function () {
    Car.destroy(effects.fire, 100)
    make_slow_cars_undestructible()
    Dead = true
    run_crash_noise()
    timer.after(5000, function () {
        game.over(false)
    })
})
sprites.onDestroyed(SpriteKind.Heart, function (sprite) {
    multilights.removeLightSource(sprite)
})
function summon_coin (x: number, y: number) {
    CoinSprite = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `, SpriteKind.Coin)
    CoinSprite.lifespan = 5000
    multilights.addLightSource(CoinSprite, 4)
    tiles.placeOnTile(CoinSprite, tiles.getTileLocation(x, y))
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    for (let SlowCar of SlowCars) {
        SlowCar.ax = Math.abs(SlowCar.vx) * -2
        SlowCar.setFlag(SpriteFlag.AutoDestroy, true)
    }
    make_slow_cars_undestructible()
    SlowCars.removeAt(SlowCars.indexOf(sprite))
    multilights.removeLightSource(sprite)
})
function init_car_location (speed: number) {
    tiles.placeOnTile(Car, tiles.getTileLocation(0, 4))
    Car.x = 16
    Car.vx = speed
}
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    multilights.removeLightSource(sprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.fire, 100)
    info.changeLifeBy(-1)
    run_crash_noise()
    make_slow_cars_undestructible()
    sprite.vx = sprite.vx * 0.9
})
let CoinSprite: Sprite = null
let PowerUpSprite: Sprite = null
let HeartSprite: Sprite = null
let RandomNumber = 0
let SelectedCarImage = 0
let CarImages: Image[][] = []
let SplashScreen: Sprite = null
let Dead = false
let Night = false
let HonkPower = 0
let HonkPos = 0
let SlowCars: Sprite[] = []
let Splash = false
let Car: Sprite = null
Car = sprites.create(img`
    ........................
    ....22222222............
    ...24222222c2...........
    ..2c4222222cc2..........
    .2cc4444442cc42d........
    .2c2eeeeeeebc422........
    .22ebbebbbeeb422........
    .2ebbbebbbbe2222........
    .ee222e22222e222........
    .eeeeeefeeefe2dd........
    .eeeeeefeefeee2d........
    .eeeeeefffeeeeee........
    .effffeeeefffeee........
    ..fffffeefffffe.........
    ...fff....ffff..........
    ........................
    `, SpriteKind.Player)
Car.setFlag(SpriteFlag.StayInScreen, true)
Car.setFlag(SpriteFlag.ShowPhysics, false)
multilights.addLightSource(Car, 10)
tiles.setTilemap(tiles.createTilemap(hex`1e000900040101050101040301010104010301010104010401010501010403010101010103010104010105010301010104010301010101030101040101050103020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202010104010101050101010103010101050101010101040101010501010101050101030104010301010401010401010301010501010301040103010104`, img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, [myTiles.transparency16,myTiles.tile1,sprites.vehicle.roadHorizontal,sprites.castle.tileGrass2,sprites.castle.tileGrass1,sprites.castle.tileGrass3], TileScale.Sixteen))
init_car_location(64)
scene.cameraFollowSprite(Car)
Splash = true
SlowCars = []
HonkPos = 2
HonkPower = 1
let SlowCarHonks = 1
Night = false
Dead = false
SplashScreen = sprites.create(img`
    ................................................................................................................................................................
    .................................................................................................................22222222...................1.....66666666......
    ..ff....ff....ffff....ff.....ff..ff....ff..ff..fff..f...f.fff.f.f.fff.fff.fff.ff..fff...........................24222222c2................111....69666666c6.....
    ..ff....ff....ffff....fff....ff..ff...fff..ff..f.f..ff.ff.f.f.f.f.f...f...f.f.f.f.f............................2c4222222cc2..........f..dd11....6c9666666cc6....
    ..ff....ff..ff....ff..ffff...ff..ff..fff...ff..fff..f.f.f.fff.ff..fff.f...f.f.f.f.fff.........................2cc4444442cc42d.......f...d.1....6cc9999996cc96d..
    ..ff....ff..ff....ff..fffff..ff..ff.fff....ff..f.f..f...f.f.f.f.f.f...f...f.f.f.f.f...........................2c2eeeeeeebc422......fff..dd11...6c68888888bc966..
    ..ff....ff..ff....ff..ff.fff.ff..fffff.....ff..f.f..f...f.f.f.f.f.fff.fff.fff.ff..fff.........................22ebbebbbeeb422....fff....1ddd1..668bb8bbb88b966..
    ..ffffffff..ff....ff..ff..fffff..ffff......ff.................................................................2ebbbebbbbe2222...ffffff..1dd1d..68bbb8bbbb86666..
    ..ffffffff..ff....ff..ff...ffff..ffff......ff.................................................................ee222e22222e222..fff......11dd11.886668666668666..
    ..ff....ff..ff....ff..ff....fff..fffff.....ff..fff.fff.fff.fff.ff..fff..ffff.fff.f...f...fff.fff.f...f.fff....eeeeeefeeefe2dd...ffffff..11d111.888888f888f86dd..
    ..ff....ff..ff....ff..ff.....ff..ff.fff....ff..f.f.f.f.f...f.f.f.f.f......f..f.f.ff.ff..f....f.f.ff.ff.f......eeeeeefeefeee2d....fff.....1d....888888f88f8886d..
    ..ff....ff..ff....ff..ff.....ff..ff..fff.......fff.ff..f...fff.f.f.fff....f..fff.f.f.f..f.f..fff.f.f.f.fff....eeeeeefffeeeeee......fff...1.d...888888fff888888..
    ..ff....ff....ffff....ff.....ff..ff...fff..ff..f.f.f.f.f...f.f.f.f.f....f.f..f.f.f...f..f..f.f.f.f...f.f......effffeeeefffeee.......f....11dd..8ffff8888fff888..
    ..ff....ff....ffff....ff.....ff..ff....ff..ff..f.f.f.f.fff.f.f.ff..fff..fff..f.f.f...f...fff.f.f.f...f.fff.....fffffeefffffe.........f....11dd..fffff88fffff8...
    ................................................................................................................fff....ffff................1111..fff....ffff....
    ................................................................................................................................................................
    `, SpriteKind.Info)
SplashScreen.setFlag(SpriteFlag.RelativeToCamera, true)
SplashScreen.top = 0
SplashScreen.left = 0
CarImages = [[img`
    ........................
    ....22222222............
    ...24222222c2...........
    ..2c4222222cc2..........
    .2cc4444442cc42d........
    .2c2eeeeeeebc422........
    .22ebbebbbeeb422........
    .2ebbbebbbbe2222........
    .ee222e22222e222........
    .eeeeeefeeefe2dd........
    .eeeeeefeefeee2d........
    .eeeeeefffeeeeee........
    .effffeeeefffeee........
    ..fffffeefffffe.........
    ...fff....ffff..........
    ........................
    `, img`
    ........................
    ....22222222............
    ...24222222c2...........
    ..2c4222222cc2........f.
    .2cc4444442cc42d.....f..
    .2c2eeeeeeebc422....f...
    .22ebbebbbeeb422...f.ff.
    .2ebbbebbbbe2222..fff...
    .ee222e22222e222.ffffff.
    .eeeeeefeeefe2dd..fff...
    .eeeeeefeefeee2d...f.ff.
    .eeeeeefffeeeeee....f...
    .effffeeeefffeee.....f..
    ..fffffeefffffe.......f.
    ...fff....ffff..........
    ........................
    `], [img`
    ........................
    ....66666666............
    ...69666666c6...........
    ..6c9666666cc6..........
    .6cc9999996cc96d........
    .6c68888888bc966........
    .668bb8bbb88b966........
    .68bbb8bbbb86666........
    .886668666668666........
    .888888f888f86dd........
    .888888f88f8886d........
    .888888fff888888........
    .8ffff8888fff888........
    ..fffff88fffff8.........
    ...fff....ffff..........
    ........................
    `, img`
    ........................
    ....66666666............
    ...69666666c6...........
    ..6c9666666cc6........f.
    .6cc9999996cc96d.....f..
    .6c68888888bc966....f...
    .668bb8bbb88b966...f.ff.
    .68bbb8bbbb86666..fff...
    .886668666668666.ffffff.
    .888888f888f86dd..fff...
    .888888f88f8886d...f.ff.
    .888888fff888888....f...
    .8ffff8888fff888.....f..
    ..fffff88fffff8.......f.
    ...fff....ffff..........
    ........................
    `], [img`
    ........................
    ....33333333............
    ...3d333333c3...........
    ..3cd333333cc3..........
    .3ccdddddd3ccd3d........
    .3c3aaaaaaabcd33........
    .33abbabbbaabd33........
    .3abbbabbbba3333........
    .aa333a33333a333........
    .aaaaaafaaafa3dd........
    .aaaaaafaafaaa3d........
    .aaaaaafffaaaaaa........
    .affffaaaafffaaa........
    ..fffffaafffffa.........
    ...fff....ffff..........
    ........................
    `, img`
    ........................
    ....33333333............
    ...3d333333c3...........
    ..3cd333333cc3........f.
    .3ccdddddd3ccd3d.....f..
    .3c3aaaaaaabcd33....f...
    .33abbabbbaabd33...f.ff.
    .3abbbabbbba3333..fff...
    .aa333a33333a333.ffffff.
    .aaaaaafaaafa3dd..fff...
    .aaaaaafaafaaa3d...f.ff.
    .aaaaaafffaaaaaa....f...
    .affffaaaafffaaa.....f..
    ..fffffaafffffa.......f.
    ...fff....ffff..........
    ........................
    `]]
if (blockSettings.exists("HONK!:SelectedCarImage")) {
    SelectedCarImage = blockSettings.readNumber("HONK!:SelectedCarImage")
} else {
    SelectedCarImage = 0
}
Car.setImage(CarImages[SelectedCarImage][0])
game.onUpdate(function () {
    if (Car.y < 16 * 3) {
        HonkPos = 0
    } else if (Car.y < 16 * 4) {
        HonkPos = 1
    } else if (Car.y < 16 * 5) {
        HonkPos = 2
    } else if (Car.y < 16 * 6) {
        HonkPos = 3
    } else {
        HonkPos = 4
    }
})
game.onUpdate(function () {
    if (Car.x > 24 * 16) {
        Car.x = 5 * 16
        if (!(Splash)) {
            Car.vx += 8
            RandomNumber = randint(0, 4)
            for (let Index = 0; Index <= 4; Index++) {
                if (Index == RandomNumber) {
                    summon_slow_car(Car.vx * 0.333, randint(SlowCarHonks, SlowCarHonks + 3), 11, Index + 2)
                } else {
                    summon_slow_car(Car.vx * 0.333, randint(SlowCarHonks + 4, SlowCarHonks + 14), 11, Index + 2)
                }
            }
            if (Math.percentChance(30)) {
                summon_coin(11, randint(0, 4) + 2)
            }
            if (Math.percentChance(20)) {
                summon_heart(11, randint(0, 4) + 2)
            }
            if (Math.percentChance(10)) {
                summon_powerup_extra_noise(11, randint(0, 4) + 2)
                SlowCarHonks += randint(1, 3)
            }
        }
    }
})
game.onUpdate(function () {
    for (let SlowCar of SlowCars) {
        SlowCar.say(convertToText(sprites.readDataNumber(SlowCar, "Num")))
        if (sprites.readDataNumber(SlowCar, "Num") <= 0 && sprites.readDataBoolean(SlowCar, "Destroy")) {
            SlowCar.destroy(effects.halo, 100)
            music.magicWand.play()
            make_slow_cars_undestructible()
        }
    }
})
forever(function () {
    if (Splash) {
        imagemorph.morph(SplashScreen, img`
            ................................................................................................................................................................
            .................................................................................................................22222222...................1.....66666666......
            ..ff....ff....ffff....ff.....ff..ff....ff..ff..fff..f...f.fff.f.f.fff.fff.fff.ff..fff...........................24222222c2................111....69666666c6.....
            ..ff....ff....ffff....fff....ff..ff...fff..ff..f.f..ff.ff.f.f.f.f.f...f...f.f.f.f.f............................2c4222222cc2..........f..dd11....6c9666666cc6....
            ..ff....ff..ff....ff..ffff...ff..ff..fff...ff..fff..f.f.f.fff.ff..fff.f...f.f.f.f.fff.........................2cc4444442cc42d.......f...d.1....6cc9999996cc96d..
            ..ff....ff..ff....ff..fffff..ff..ff.fff....ff..f.f..f...f.f.f.f.f.f...f...f.f.f.f.f...........................2c2eeeeeeebc422......fff..dd11...6c68888888bc966..
            ..ff....ff..ff....ff..ff.fff.ff..fffff.....ff..f.f..f...f.f.f.f.f.fff.fff.fff.ff..fff.........................22ebbebbbeeb422....fff....1ddd1..668bb8bbb88b966..
            ..ffffffff..ff....ff..ff..fffff..ffff......ff.................................................................2ebbbebbbbe2222...ffffff..1dd1d..68bbb8bbbb86666..
            ..ffffffff..ff....ff..ff...ffff..ffff......ff.................................................................ee222e22222e222..fff......11dd11.886668666668666..
            ..ff....ff..ff....ff..ff....fff..fffff.....ff..fff.fff.fff.fff.ff..fff..ffff.fff.f...f...fff.fff.f...f.fff....eeeeeefeeefe2dd...ffffff..11d111.888888f888f86dd..
            ..ff....ff..ff....ff..ff.....ff..ff.fff....ff..f.f.f.f.f...f.f.f.f.f......f..f.f.ff.ff..f....f.f.ff.ff.f......eeeeeefeefeee2d....fff.....1d....888888f88f8886d..
            ..ff....ff..ff....ff..ff.....ff..ff..fff.......fff.ff..f...fff.f.f.fff....f..fff.f.f.f..f.f..fff.f.f.f.fff....eeeeeefffeeeeee......fff...1.d...888888fff888888..
            ..ff....ff....ffff....ff.....ff..ff...fff..ff..f.f.f.f.f...f.f.f.f.f....f.f..f.f.f...f..f..f.f.f.f...f.f......effffeeeefffeee.......f....11dd..8ffff8888fff888..
            ..ff....ff....ffff....ff.....ff..ff....ff..ff..f.f.f.f.fff.f.f.ff..fff..fff..f.f.f...f...fff.f.f.f...f.fff.....fffffeefffffe.........f....11dd..fffff88fffff8...
            ................................................................................................................fff....ffff................1111..fff....ffff....
            ................................................................................................................................................................
            `)
        pause(5000)
        imagemorph.morph(SplashScreen, img`
            ................................................................................................................................................................
            ..fff..f...f.fff.f.f.fff.fff.fff.ff..fff..fff.ff..fff.fff.ff..fff...fff.fff.f...f.fff..ff..f.f..................................................................
            ..f.f..ff.ff.f.f.f.f.f...f...f.f.f.f.f....f.f.f.f.f...f.f.f.f.f....f....f.f.ff.ff.f....f.f.f.f..................................................................
            ..fff..f.f.f.fff.ff..fff.f...f.f.f.f.fff..fff.ff..f...fff.f.f.fff..f.f..fff.f.f.f.fff..ff...f...................................................................
            ..f.f..f...f.f.f.f.f.f...f...f.f.f.f.f....f.f.f.f.f...f.f.f.f.f....f..f.f.f.f...f.f....f.f..f...................................................................
            ..f.f..f...f.f.f.f.f.fff.fff.fff.ff..fff..f.f.f.f.fff.f.f.ff..fff...fff.f.f.f...f.fff..ff...f...................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ..f.f.f..f.fff.fff..fff.f..f.fff.ff......fff.ff..ff..f.f.fff.f..f.fff..fff.f..f..fff.f.f.fff..f...f.fff.f.f.fff.fff.fff.ff..fff..fff.fff.ff..f.f.f...f.fff......
            ..f.f.ff.f.f....f..f....ff.f.f...f.f.....f.f.f.f.f.f.f.f..f..ff.f.f.f..f.f.ff.f...f..f.f.f....ff.ff.f.f.f.f.f...f...f.f.f.f.f....f...f.f.f.f.f.f.ff.ff.f........
            ..f.f.f.ff.fff..f..f.f..f.ff.fff.f.f.....fff.ff..f.f.f.f..f..f.ff.f.f..f.f.f.ff...f..fff.fff..f.f.f.fff.ff..fff.f...f.f.f.f.fff..fff.f.f.ff..f.f.f.f.f.fff......
            ..f.f.f..f...f..f..f..f.f..f.f...f.f.....f.f.f.f.f.f.f.f..f..f..f.f.f..f.f.f..f...f..f.f.f....f...f.f.f.f.f.f...f...f.f.f.f.f....f...f.f.f.f.f.f.f...f...f......
            ..fff.f..f.fff.fff..fff.f..f.fff.ff..fff.f.f.f.f.ff..fff.fff.f..f.fff..fff.f..f...f..f.f.fff..f...f.f.f.f.f.fff.fff.fff.ff..fff..f...fff.f.f.fff.f...f.fff......
            ................................................................................................................................................................
            `)
        pause(5000)
        imagemorph.morph(SplashScreen, img`
            ................................................................................................................................................................
            ..f.f.fff.....f.ff..fff.f.f.f.f..f..ffff.fff.f.f.fff.fff.fff.fff.f.f.....f.ff......fff.fff.ff......f.fff.ff..ff..fff.f.f.f..f.f.fff.f.f.fff.....f...............
            ..f.f.f.f....f..f.f.f.f.f.f.f.ff.f....f..f.f.f.f.f....f...f..f...f.f....f..f.f.....f.f.f.f.f.f....f..f.f.f.f.f.f.f.f.f.f.f..f.f.f...f.f.f......f................
            ..f.f.fff...f...f.f.f.f.f.f.f.f.ff....f..f.f..f..fff..f...f..f...ff....f...f.f.fff.fff.fff.f.f...f...fff.ff..ff..f.f.f.f.f..ff..fff..f..fff...f.................
            ..f.f.f....f....f.f.f.f.f.f.f.f..f..f.f..f.f..f....f..f...f..f...f.f..f....f.f.....f...f.f.f.f..f....f.f.f.f.f.f.f.f.f.f.f..f.f.f....f....f..f..................
            ..fff.f...f.....ff..fff..f.f..f..f..fff..fff..f..fff..f..fff.fff.f.f.f.....ff......f...f.f.ff..f.....f.f.f.f.f.f.fff..f.f...f.f.fff..f..fff.f...................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ..f.f.f.fff.fff.ff...f.f.fff.f.f.fff....fff.f.f.f.fff.fff.fff.f.f..f...fff.f..f.fff.fff.........................................................................
            ..f.f.f.f.f.f...f.f..f.f.f...f.f.f...f..f...f.f.f..f...f..f...f.f..f...f.f.ff.f.f...f...........................................................................
            ..f.f.f.fff.fff.f.f..ff..fff..f..fff....fff.f.f.f..f...f..f...fff..f...fff.f.ff.fff.fff.........................................................................
            ..f.f.f.f.f...f.f.f..f.f.f....f....f.f....f.f.f.f..f...f..f...f.f..f...f.f.f..f.f.....f.........................................................................
            ...f.f..f.f.fff.ff...f.f.fff..f..fff....fff..f.f..fff..f..fff.f.f..fff.f.f.f..f.fff.fff.........................................................................
            ................................................................................................................................................................
            `)
        pause(5000)
        imagemorph.morph(SplashScreen, img`
            ................................................................................................................................................................
            ..fff..ff..f.f.fff.fff.fff.f..f.....f.fff.fff.fff.fff.fff..ff..fff.ff......f.ffff..f.f.fff.f.f.....f.ffff..f.f.fff.f.f..........................................
            ..f.f..f.f.f.f..f...f..f.f.ff.f....f..f...f.f.f.f.f...f....f.f.f.f.f.f....f..f..f..f.f.f...f.f....f.....f..f.f.f...f.f.f........................................
            ..fff..ff..f.f..f...f..f.f.f.ff...f...fff.fff.fff.f...fff..ff..fff.ff....f...f..f..ff..fff..f....f.....f...ff..fff..f...........................................
            ..f.f..f.f.f.f..f...f..f.f.f..f..f......f.f...f.f.f...f....f.f.f.f.f.f..f....f..f..f.f.f....f...f.....f....f.f.f....f..f........................................
            ..f.f..ff..fff..f...f..fff.f..f.f.....fff.f...f.f.fff.fff..ff..f.f.f.f.f.....ffff..f.f.fff..f..f.....ffff..f.f.fff..f...........................................
            ...............................................................................f................................................................................
            ................................................................................ff..............................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ..f.f.fff.f..f.f.f.f............................................................................................................................................
            ..f.f.f.f.ff.f.f.f.f............................................................................................................................................
            ..fff.f.f.f.ff.ff..f............................................................................................................................................
            ..f.f.f.f.f..f.f.f..............................................................................................................................................
            ..f.f.fff.f..f.f.f.f............................................................................................................................................
            ................................................................................................................................................................
            `)
        pause(5000)
        imagemorph.morph(SplashScreen, img`
            ................................................................................................................................................................
            ..fff.ff..fff.fff.fff..fff.f.f.fff..fff..ff..f.f.fff.fff.fff.f..f.....f.fff.fff.fff.fff.fff..ff..fff.ff......f.ffff..f.f.fff.f.f..fff.fff..fff.fff.fff.ff..fff..
            ..f.f.f.f.f...f...f.....f..f.f.f....f.f..f.f.f.f..f...f..f.f.ff.f....f..f...f.f.f.f.f...f....f.f.f.f.f.f....f..f..f..f.f.f...f.f...f..f.f..f....f..f.f.f.f..f...
            ..fff.ff..fff.fff.fff...f..fff.fff..fff..ff..f.f..f...f..f.f.f.ff...f...fff.fff.fff.f...fff..ff..fff.ff....f...f..f..ff..fff..f....f..f.f..fff..f..fff.ff...f...
            ..f...f.f.f.....f...f...f..f.f.f....f.f..f.f.f.f..f...f..f.f.f..f..f......f.f...f.f.f...f....f.f.f.f.f.f..f....f..f..f.f.f....f....f..f.f....f..f..f.f.f.f..f...
            ..f...f.f.fff.fff.fff...f..f.f.fff..f.f..ff..fff..f...f..fff.f..f.f.....fff.f...f.f.fff.fff..ff..f.f.f.f.f.....ffff..f.f.fff..f....f..fff..fff..f..f.f.f.f..f...
            .................................................................................................................f..............................................
            ..................................................................................................................ff............................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ..fff.f.f.fff...fff.fff.f...f.fff.f.............................................................................................................................
            ...f..f.f.f....f....f.f.ff.ff.f...f.............................................................................................................................
            ...f..fff.fff..f.f..fff.f.f.f.fff.f.............................................................................................................................
            ...f..f.f.f....f..f.f.f.f...f.f.................................................................................................................................
            ...f..f.f.fff...fff.f.f.f...f.fff.f.............................................................................................................................
            ................................................................................................................................................................
            `)
        pause(5000)
    }
})
