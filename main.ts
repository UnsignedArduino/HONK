let Car = sprites.create(img`
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
    `, SpriteKind.Player)
Car.setFlag(SpriteFlag.StayInScreen, true)
Car.setFlag(SpriteFlag.ShowPhysics, true)
controller.moveSprite(Car, 0, 64)
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
tiles.placeOnTile(Car, tiles.getTileLocation(0, 4))
Car.x = 16
Car.vx = 64
scene.cameraFollowSprite(Car)
game.onUpdate(function () {
    if (Car.x > 24 * 16) {
        Car.x = 5 * 16
    }
})
