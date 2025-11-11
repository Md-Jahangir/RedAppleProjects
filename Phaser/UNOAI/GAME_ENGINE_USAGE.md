# UNO Game Engine & Bot Player - Usage Guide

## Overview
The game engine and bot player have been integrated into your UNO game. The core gameplay logic is now handled by `GameEngine.js` and bot players are controlled by `BotPlayer.js`.

## Files Created

### 1. `src/js/services/GameEngine.js`
Core game logic that handles:
- Turn management (clockwise/counterclockwise)
- Card validation (checking if a card can be played)
- Special card effects (Skip, Reverse, Draw 2, Draw 4, Wild)
- Draw stack management (stacking +2 and +4 cards)
- UNO calling and penalties
- Win condition checking
- Game state management

### 2. `src/js/services/BotPlayer.js`
AI logic for bot players:
- Smart card selection strategy
- Automatic turn execution with realistic delays
- UNO calling behavior
- Color selection for wild cards
- Difficulty levels (easy, medium, hard)

## How It Works

### Game Flow
1. **Game Start**: Cards are dealt to all players (7 cards each)
2. **First Card**: A card is placed on the discard pile
3. **Turn System**: Players take turns clockwise (or counterclockwise after Reverse)
4. **Player Actions**: 
   - Play a valid card
   - Draw a card if no valid play
   - Call UNO when down to 1 card
5. **Win Condition**: First player to discard all cards wins

### Card Validation Rules
- **Number Cards**: Must match color OR number
- **Action Cards** (Skip, Reverse, Draw 2): Must match color OR action type
- **Wild Cards**: Can be played anytime
- **Wild Draw 4**: Can be played anytime
- **Draw Stack**: When a Draw 2 or Draw 4 is played, next player must draw or play another Draw card

### Bot Strategy
The bot uses a priority-based strategy:
1. If only 1 card left, play it
2. Play action cards (Skip, Reverse, Draw 2) first
3. Play cards matching current color
4. Save wild cards for later
5. Use Wild Draw 4 as last resort

### Events System
The game uses Phaser's event system for communication:

```javascript
// Turn changed
Constant.game.events.emit('evtTurnChanged', playerIndex);

// Bot plays a card
Constant.game.events.emit('evtBotPlayCard', player, card, chosenColor);

// Bot draws a card
Constant.game.events.emit('evtBotDrawCard', player);

// Bot draws penalty cards
Constant.game.events.emit('evtBotDrawPenalty', player, count);

// Game over
Constant.game.events.emit('evtGameOver', winner);

// Player selects card (human player)
Constant.game.events.emit('evtPlayerSelectCardForDiscardPile', player, card);

// Player draws card (human player)
Constant.game.events.emit('evtPlayerDrawCardRequest');
```

## Integration Points

### In GameScene.js
```javascript
// Initialize
this.gameEngine = new GameEngine(this);
this.botPlayer = new BotPlayer(this, this.gameEngine);

// Start game after dealing
this.gameEngine.StartGame(this.allPlayerArray, firstCard);

// Check if card can be played
if (this.gameEngine.CanPlayCard(card)) {
  this.gameEngine.PlayCard(player, card, chosenColor);
}

// Get playable cards for a player
const playableCards = this.gameEngine.GetPlayableCards(player);

// Player draws card
this.gameEngine.PlayerDrawCard(player);
```

## Customization

### Bot Difficulty
You can adjust bot thinking time:
```javascript
this.botPlayer.SetDifficulty('easy');   // 1500-3000ms
this.botPlayer.SetDifficulty('medium'); // 1000-2000ms (default)
this.botPlayer.SetDifficulty('hard');   // 500-1500ms
```

### Game Rules
You can modify rules in `GameEngine.js`:
- Starting hand size (currently 7)
- UNO penalty (currently 2 cards)
- Draw stack behavior
- First card handling

## Future Enhancements

### Recommended Features to Add:
1. **Color Picker UI**: For human players to choose wild card colors
2. **UNO Button**: Allow human players to call UNO
3. **Challenge System**: Allow challenging Wild Draw 4 cards
4. **Score System**: Track points across multiple rounds
5. **Animations**: Add visual effects for special cards
6. **Sound Effects**: Card play, draw, UNO call, etc.
7. **Chat/Emotes**: Bot reactions and messages
8. **Difficulty Selection**: Let players choose bot difficulty
9. **Replay System**: Restart game without going to menu

## Testing

To test the game:
1. Run your development server
2. Start a game from the menu
3. Cards will be dealt automatically
4. Human player (Player 1) can click playable cards
5. Bots will automatically play their turns
6. Game ends when a player runs out of cards

## Troubleshooting

**Cards not clickable?**
- Check that `isLocalPlayer` is set to `true` for Player 1
- Verify `EnableInputToCard()` is being called with playable cards

**Bots not playing?**
- Check console for bot turn logs
- Verify `evtTurnChanged` event is firing
- Check that bot players have `isLocalPlayer = false`

**Game not ending?**
- Verify `evtGameOver` event listener is registered
- Check that `EndGame()` is being called when player has 0 cards

**Draw pile empty?**
- Implement deck reshuffling from discard pile
- Check `ReshuffleDeck()` event handler

## Notes

- The game engine is stateless and can be reset for new games
- All game logic is centralized in GameEngine.js
- Bot behavior is deterministic but includes randomness for variety
- The system supports 2-4 players (1 human + 1-3 bots)
