sc.GameModel.inject({
    init() {
        this.parent();

        this.player2 = new sc.PlayerModel;
        this.player2.setConfig(this.leaConfig);
    }
})

let vec3_temp1 = Vec3.create();

ig.ENTITY.Player.inject({
    playerNum: 1,

    init(x, y, z, settings) {
        this.parent(x, y, z, settings);
        this.playerNum = settings.playerNum || 1;

        if(settings.playerNum == 2) {
            if(sc.model) {
                this.model = sc.model.player2;
            }
        }
    },

    update() {
        ig.input.currentPlayer = this.playerNum;
        this.parent();
        ig.input.currentPlayer = 0;

        //temporary solution, will be refined later :P
        if(ig.game.getPlayer1and2Distance() > 500) {
            ig.game.player2Entity.setPos(ig.game.playerEntity.coll.pos.x, ig.game.playerEntity.coll.pos.y, ig.game.playerEntity.coll.pos.z)
        }
    },

    _updateCameraHandle(a) {
        if(ig.game.player2Entity) {
            this.cameraTargets.push(ig.game.player2Entity)
        }
        this.parent(a);
        if(this.playerNum == 1) {
            ig.game.player2Entity.cameraHandle = this.cameraHandle;
        }
    },

    //note: does not work yet :)
    doPlayerTeleport() {
        let target;
        if(this.playerNum == 1) {
            target = ig.game.player2Entity;
        } else {
            target = ig.game.playerEntity;
        }

        let currentPos = this.getAlignedPos(ig.ENTITY_ALIGN.BOTTOM, vec3_temp1),
            newPos = Vec3.create(target.coll.pos);
        Vec2.addMulF(newPos, this.coll.size, 0.5);
        let duration = (Vec3.distance(newPos, currentPos)).limit(0.5, 1.5);

        this.effects.death.spawnFixed("respawnLine", currentPos.x, currentPos.y, currentPos.z, this, {
            target2Point: newPos,
            duration: duration + 0.1
        })

        this.invincibleTimer = -1;
        
        this.respawn.timer = duration + 0.1;
        this.respawn.duration = duration;
        this.respawn.damage = 0;

        Vec3.assign(newPos, this.coll.pos);
    }
});

sc.CrossCode.inject({
    createPlayer() {
        this.parent();

        this.player2Entity = ig.game.spawnEntity("Player", 0, 0, 0, {playerNum: 2});
    },

    getPlayer1and2Distance() {
        return ig.CollTools.getScreenDistance(this.playerEntity.coll, this.player2Entity.coll);
    }
});

ig.Game.inject({
    playerCameraHandle: null,

    loadLevel(b, a, d) {
        this.parent(b, a, d);

        if(this.player2Entity) {
            this.player2Entity.coll.level = this.playerEntity.coll.level;
            this.player2Entity.coll.baseZPos = this.playerEntity.coll.baseZPos;
            this.player2Entity.coll.face = ig.copy(this.playerEntity.coll.face);
            this.player2Entity.coll.pos = ig.copy(this.playerEntity.coll.pos);
        }
    }
})
