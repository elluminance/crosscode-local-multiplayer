export {}

declare global {
    namespace ig {
        interface Input {
            currentPlayer: number,
            tempPlayer: number,

            setTempPlayer(this: this, playerNum: number): void;
            resetTempPlayer(this: this): void;
        }

        interface Game {
            player2Entity: ig.ENTITY.Player;
            playerCameraHandle: ig.Camera.TargetHandle;
        }

        namespace ENTITY {
            namespace Player {
                interface Settings {
                    playerNum?: number;
                }
            }
            interface Player {
                playerIconGfx: Image;
                playerNum: number;

                doPlayerTeleport(this: this): void;
            }
        }
    }

    namespace sc {
        interface GameModel {
            player2: sc.PlayerModel;
        }

        interface FontSystem {
            gamepadUpdate: boolean
        }

        interface CrossCode {
            fontTimer: number;

            getPlayer1and2Distance(this: this): number;
        }
    }
}