import { _decorator, Component } from 'cc';
import { COIN_TYPE } from '../Constant';
import { GameManager } from '../GameManager';

const { ccclass, property } = _decorator;

@ccclass('ScoreMultiplayer')
export class ScoreMultiplayer extends Component {

    playerScore: number = 0;
    botScore: number = 0;

    playerSelectedCoin: COIN_TYPE = COIN_TYPE.WHITE;
    isPlayerTurn: boolean = true;

    coinValues = {
        White: 1,
        Black: 1,
        Queen: 0,
    };

    queenPocketedBy: 'player' | 'bot' | null = null;

    SetPlayerCoinType(coinType: COIN_TYPE): void {
        this.playerSelectedCoin = coinType;
    }

    GetPlayerScore(): number {
        let sendScore: number = this.playerScore;
        if (this.queenPocketedBy === 'player') {
            sendScore += 5;
        }
        return sendScore;
    }

    UpdateScore(isPlayerTurn: boolean, coinType: COIN_TYPE): void {
        const currentPlayer = isPlayerTurn ? 'player' : 'bot';

        if (coinType === COIN_TYPE.QUEEN) {
            this.handleQueenPocketed(currentPlayer);
            return;
        }

        this.addScore(coinType);

        // Queen cover check
        if (GameManager.instance.isQueenPocket && !GameManager.instance.isQueenCovered && this.queenPocketedBy === currentPlayer) {
            this.scheduleOnce(() => {
                if (GameManager.instance.PawnQuantityCounter(COIN_TYPE.QUEEN) === 0) {
                    GameManager.instance.isQueenCovered = true;
                }
            }, 1);
        }
    }

    Foul(coinType: COIN_TYPE): void {
        const owner = this.getCoinOwner(coinType);
        const scoreToDeduct = this.coinValues[coinType];

        if (coinType === COIN_TYPE.QUEEN) {
            if (this.queenPocketedBy) {
                this.adjustScore(this.queenPocketedBy, -scoreToDeduct);
            }
        } else {
            this.adjustScore(owner, -scoreToDeduct);
        }
    }

    ResetQueen(): void {
        GameManager.instance.isQueenPocket = false;
        GameManager.instance.isQueenCovered = false;
        this.queenPocketedBy = null;
    }

    // ---------- Helper Methods ----------
    private addScore(pocketedCoin: COIN_TYPE): void {
        let scoreReceiver: 'player' | 'bot';

        if (pocketedCoin === COIN_TYPE.QUEEN) {
            scoreReceiver = this.queenPocketedBy;
        } else {
            scoreReceiver = (this.playerSelectedCoin === pocketedCoin) ? 'player' : 'bot';
        };

        this.adjustScore(scoreReceiver, this.coinValues[pocketedCoin]);
    }

    private adjustScore(player: 'player' | 'bot', amount: number): void {
        if (player === 'player') {
            this.playerScore = Math.max(0, this.playerScore + amount);
        } else {
            this.botScore = Math.max(0, this.botScore + amount);
        }
    }

    private getCoinOwner(coinType: COIN_TYPE): 'player' | 'bot' {
        return this.playerSelectedCoin === coinType ? 'player' : 'bot';
    }

    private handleQueenPocketed(player: 'player' | 'bot'): void {
        GameManager.instance.isQueenPocket = true;
        GameManager.instance.isQueenCovered = false;
        this.queenPocketedBy = player;
        this.addScore(COIN_TYPE.QUEEN);
    }
}
