/********* GameAI ************
 * @Author: ChatGPT
 * @Description: Smarter, risk-aware Minimax AI for checkers-style game
 * (Now always captures when possible + first move is random)
 ************************************/

export class GameAI {
    constructor(aiPlayer = 1, maxDepth = 6) {
        this.aiPlayer = aiPlayer;
        this.humanPlayer = aiPlayer === 1 ? 0 : 1;
        this.maxDepth = maxDepth;
        this.firstMoveDone = false; // track first AI move
    }

    getBestMove(gameScreen) {
        const board = this.serializeBoard(gameScreen);

        // ---- RANDOM FIRST MOVE ----
        if (!this.firstMoveDone) {
            const allMoves = this.getAllMoves(gameScreen, board, this.aiPlayer);
            if (allMoves.length > 0) {
                const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
                this.firstMoveDone = true;
                return randomMove;
            }
        }

        // ---- NORMAL MINIMAX ----
        const best = this.minimax(gameScreen, board, this.maxDepth, this.aiPlayer, -Infinity, Infinity);
        this.firstMoveDone = true;
        return best.move;
    }

    minimax(gameScreen, board, depth, currentPlayer, alpha, beta) {
        const winner = this.checkWinner(board);
        if (depth === 0 || winner !== null) {
            return { score: this.evaluateBoard(board), move: null };
        }

        const moves = this.getAllMoves(gameScreen, board, currentPlayer);
        if (moves.length === 0) {
            return { score: this.evaluateBoard(board), move: null };
        }

        let bestMove = null;

        if (currentPlayer === this.aiPlayer) {
            let maxEval = -Infinity;
            for (const move of moves) {
                const newBoard = this.simulateMove(board, move, currentPlayer);
                const evalScore = this.minimax(gameScreen, newBoard, depth - 1, this.humanPlayer, alpha, beta).score;
                const riskAdjusted = this.adjustForRisk(move, board, evalScore) + Math.random() * 0.01;
                if (riskAdjusted > maxEval) {
                    maxEval = riskAdjusted;
                    bestMove = move;
                }
                alpha = Math.max(alpha, riskAdjusted);
                if (beta <= alpha) break;
            }
            return { score: maxEval, move: bestMove };
        } else {
            let minEval = Infinity;
            for (const move of moves) {
                const newBoard = this.simulateMove(board, move, currentPlayer);
                const evalScore = this.minimax(gameScreen, newBoard, depth - 1, this.aiPlayer, alpha, beta).score;
                const riskAdjusted = this.adjustForRisk(move, board, evalScore) + Math.random() * 0.01;
                if (riskAdjusted < minEval) {
                    minEval = riskAdjusted;
                    bestMove = move;
                }
                beta = Math.min(beta, riskAdjusted);
                if (beta <= alpha) break;
            }
            return { score: minEval, move: bestMove };
        }
    }

    serializeBoard(gameScreen) {
        return gameScreen.gameTileArr.map(tile => ({
            isTakenBy: tile.isTakenBy,
            isKing: tile.isKing || false
        }));
    }

    getAllMoves(gameScreen, board, player) {
        const moves = [];
        const jumps = [];
        const pawns = [...gameScreen.playerArr[player].playerPawnContainer.children];

        for (let i = pawns.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pawns[i], pawns[j]] = [pawns[j], pawns[i]];
        }

        for (const pawn of pawns) {
            if (!pawn.visible || pawn.isRemoved) continue;

            const canMove = Object.entries(pawn.canMoveTo || {});
            const canLeap = Object.entries(pawn.canLeapTo || {});

            for (const [key, tileNum] of canLeap.sort(() => Math.random() - 0.5)) {
                jumps.push({
                    pawnId: pawn.currBlockNum,
                    tileNum,
                    key,
                    type: 'jump',
                    chain: pawn.chainMoves || []
                });
            }

            if (jumps.length === 0) {
                for (const [key, tileNum] of canMove.sort(() => Math.random() - 0.5)) {
                    moves.push({
                        pawnId: pawn.currBlockNum,
                        tileNum,
                        key,
                        type: 'move'
                    });
                }
            }
        }

        return jumps.length > 0 ? jumps : moves;
    }

    simulateMove(board, move, player) {
        const newBoard = board.map(tile => ({ ...tile }));
        newBoard[move.pawnId].isTakenBy = false;
        newBoard[move.pawnId].isKing = false;

        if (move.type === 'jump' && move.key) {
            const middleIndex = move.key;
            if (newBoard[middleIndex]) newBoard[middleIndex].isTakenBy = false;
        }

        newBoard[move.tileNum].isTakenBy = player;

        if (this.shouldPromoteToKing(move.tileNum, player)) {
            newBoard[move.tileNum].isKing = true;
        }

        return newBoard;
    }

    shouldPromoteToKing(tileNum, player) {
        const row = Math.floor(tileNum / 8);
        return (player === 1 && row === 0) || (player === 0 && row === 7);
    }

    checkWinner(board) {
        const aiTiles = board.filter(t => t.isTakenBy === this.aiPlayer).length;
        const humanTiles = board.filter(t => t.isTakenBy === this.humanPlayer).length;
        if (aiTiles === 0) return this.humanPlayer;
        if (humanTiles === 0) return this.aiPlayer;
        return null;
    }

    evaluateBoard(board) {
        let score = 0;
        for (let i = 0; i < board.length; i++) {
            const tile = board[i];
            if (tile.isTakenBy === this.aiPlayer) {
                score += 10;
                if (tile.isKing) score += 20;
                if (this.willBeKingNextMove(i, board, tile.isTakenBy)) score += 15;
                score += this.positionScore(i, true);
            } else if (tile.isTakenBy === this.humanPlayer) {
                score -= 10;
                if (tile.isKing) score -= 20;
                if (this.willBeKingNextMove(i, board, tile.isTakenBy)) score -= 15;
                score -= this.positionScore(i, false);
            }
        }
        return score;
    }

    willBeKingNextMove(tileNum, board, player) {
        const row = Math.floor(tileNum / 8);
        return (player === 1 && row === 1) || (player === 0 && row === 6);
    }

    positionScore(index, isAI) {
        const row = Math.floor(index / 8);
        const col = index % 8;
        let score = 0;
        if (row >= 2 && row <= 5 && col >= 2 && col <= 5) score += 1;
        score += isAI ? (7 - row) : -row;
        return score;
    }

    adjustForRisk(move, board, score) {
        const tileNum = move.tileNum;
        const row = Math.floor(tileNum / 8);
        const col = tileNum % 8;
        let riskPenalty = 0;
        const vulnerableNeighbors = [tileNum - 7, tileNum - 9, tileNum + 7, tileNum + 9];
        for (const n of vulnerableNeighbors) {
            if (board[n] && board[n].isTakenBy === this.humanPlayer) {
                riskPenalty += 8;
            }
        }
        if (Math.random() < 0.2) {
            return score;
        }
        return score - riskPenalty;
    }
}
