// GameLogic.js

export const CheckersGame = {
    setup: () => {
        const board = createInitialBoard();
        const pawns = initializePawns();
        return { board, pawns, turn: 0, winner: null, scores: [0, 0] };
    },

    moves: {
        movePawn(G, ctx, fromIdx, toIdx) {
            if (!isLegalMove(G, ctx, fromIdx, toIdx)) return;
            const pawn = G.pawns.find(p => p.pos === fromIdx && p.player === G.turn);
            pawn.pos = toIdx;
            if (shouldKing(pawn, toIdx)) pawn.isKing = true;
            G.board[fromIdx].isTakenBy = null;
            G.board[toIdx].isTakenBy = G.turn;
            G.turn = G.turn === 0 ? 1 : 0;
        },

        jumpPawn(G, ctx, fromIdx, toIdx, captureIdx) {
            if (!isLegalJump(G, ctx, fromIdx, toIdx, captureIdx)) return;
            const pawn = G.pawns.find(p => p.pos === fromIdx && p.player === G.turn);
            pawn.pos = toIdx;
            const captured = G.pawns.find(p => p.pos === captureIdx && p.player !== G.turn);
            if (captured) {
                captured.pos = null;
                G.scores[G.turn] += 1;
            }
            if (shouldKing(pawn, toIdx)) pawn.isKing = true;
            G.board[fromIdx].isTakenBy = null;
            G.board[toIdx].isTakenBy = G.turn;
            G.board[captureIdx].isTakenBy = null;
            G.turn = G.turn === 0 ? 1 : 0;
        }
    },

    endIf: (G, ctx) => {
        const opponent = G.turn === 0 ? 1 : 0;
        const oppPawns = G.pawns.filter(p => p.player === opponent && p.pos !== null);
        if (oppPawns.length === 0 || getAllMoves(G, opponent).length === 0) {
            return { winner: G.turn };
        }
        if (getAllMoves(G, 0).length === 0 && getAllMoves(G, 1).length === 0) {
            return { draw: true };
        }
        return undefined;
    }
};

function createInitialBoard() {
    const board = [];
    for (let i = 0; i < 64; i++) {
        board.push({
            idx: i,
            isBlack: (Math.floor(i / 8) + i) % 2 === 1,
            isTakenBy: null
        });
    }
    return board;
}

function initializePawns() {
    const pawns = [];
    const userIdx = [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62];
    const botIdx = [1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23];
    for (let i = 0; i < 12; i++) {
        pawns.push({ player: 0, pos: userIdx[i], isKing: false });
    }
    for (let i = 0; i < 12; i++) {
        pawns.push({ player: 1, pos: botIdx[i], isKing: false });
    }
    return pawns;
}

function isLegalMove(G, ctx, fromIdx, toIdx) {
    if (G.board[toIdx].isTakenBy !== null) return false;
    if (!G.board[toIdx].isBlack) return false;
    const pawn = G.pawns.find(p => p.pos === fromIdx);
    if (!pawn || pawn.player !== G.turn) return false;
    const fr = Math.floor(fromIdx / 8), fc = fromIdx % 8;
    const tr = Math.floor(toIdx / 8), tc = toIdx % 8;
    if (Math.abs(tr - fr) !== 1 || Math.abs(tc - fc) !== 1) return false;
    if (!pawn.isKing) {
        if (pawn.player === 0 && tr >= fr) return false;
        if (pawn.player === 1 && tr <= fr) return false;
    }
    return true;
}

function isLegalJump(G, ctx, fromIdx, toIdx, captureIdx) {
    if (G.board[toIdx].isTakenBy !== null) return false;
    if (!G.board[toIdx].isBlack) return false;
    const pawn = G.pawns.find(p => p.pos === fromIdx);
    if (!pawn || pawn.player !== G.turn) return false;
    const fr = Math.floor(fromIdx / 8), fc = fromIdx % 8;
    const tr = Math.floor(toIdx / 8), tc = toIdx % 8;
    const cr = Math.floor(captureIdx / 8), cc = captureIdx % 8;
    if (Math.abs(tr - fr) !== 2 || Math.abs(tc - fc) !== 2) return false;
    if (cr !== (fr + (tr - fr) / 2) || cc !== (fc + (tc - fc) / 2)) return false;
    if (!pawn.isKing) {
        if (pawn.player === 0 && tr >= fr) return false;
        if (pawn.player === 1 && tr <= fr) return false;
    }
    const cap = G.pawns.find(p => p.pos === captureIdx && p.player !== pawn.player);
    if (!cap) return false;
    return true;
}

function shouldKing(pawn, idx) {
    if (pawn.isKing) return false;
    if (pawn.player === 0 && Math.floor(idx / 8) === 0) return true;
    if (pawn.player === 1 && Math.floor(idx / 8) === 7) return true;
    return false;
}

function getPawnMoves(G, pawn) {
    const moves = [];
    const fromIdx = pawn.pos;
    const r = Math.floor(fromIdx / 8), c = fromIdx % 8;
    const dirs = [];
    if (pawn.player === 0 || pawn.isKing) dirs.push([-1, -1], [-1, 1]);
    if (pawn.player === 1 || pawn.isKing) dirs.push([1, -1], [1, 1]);
    dirs.forEach(([dr, dc]) => {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
            const toIdx = nr * 8 + nc;
            if (isLegalMove(G, null, fromIdx, toIdx)) {
                moves.push({ type: 'move', from: fromIdx, to: toIdx });
            }
        }
    });
    return moves;
}

function getPawnJumps(G, pawn) {
    const jumps = [];
    const fromIdx = pawn.pos;
    const r = Math.floor(fromIdx / 8), c = fromIdx % 8;
    const dirs = [];
    if (pawn.player === 0 || pawn.isKing) dirs.push([-1, -1], [-1, 1]);
    if (pawn.player === 1 || pawn.isKing) dirs.push([1, -1], [1, 1]);
    dirs.forEach(([dr, dc]) => {
        const jr = r + dr, jc = c + dc;
        const lr = r + dr * 2, lc = c + dc * 2;
        if (lr >= 0 && lr < 8 && lc >= 0 && lc < 8) {
            const jumpIdx = lr * 8 + lc, capIdx = jr * 8 + jc;
            if (isLegalJump(G, null, fromIdx, jumpIdx, capIdx)) {
                jumps.push({ type: 'jump', from: fromIdx, to: jumpIdx, capture: capIdx });
            }
        }
    });
    return jumps;
}

function getAllMoves(G, player) {
    const pawns = G.pawns.filter(p => p.player === player && p.pos !== null);
    const jumps = [];
    pawns.forEach(p => jumps.push(...getPawnJumps(G, p)));
    if (jumps.length > 0) return jumps;
    const moves = [];
    pawns.forEach(p => moves.push(...getPawnMoves(G, p)));
    return moves;
}

export { getAllMoves, isLegalMove, isLegalJump, shouldKing };
