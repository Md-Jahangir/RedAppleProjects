# Skip Card & Animation Blocking Fix

## Problems

### Problem 1: Turn Being Skipped Incorrectly
Sometimes the human player's turn would be skipped, or turns would advance incorrectly.

### Problem 2: Bot Gets Stuck After Drawing
Bot would draw a card, decide to play it, but then get blocked with:
```
Bot decides to play the drawn card
OnBotPlayCard blocked - animation in progress
```
The game would then freeze.

## Root Causes

### Cause 1: Double NextTurn() on Skip Cards

When a Skip card was played, `NextTurn()` was being called **TWICE**:

```javascript
// In GameEngine.HandleCardEffect():
case 'skip':
  this.NextTurn(); // ❌ CALL #1 - Skip next player

// Then in GameScene after PlayCard():
this.gameEngine.NextTurn(); // ❌ CALL #2 - Advance again
```

**Result**: If Player 1 played Skip:
- Should skip Player 2, go to Player 3
- Actually skipped Player 2 AND Player 3, went to Player 4

This caused turns to be skipped incorrectly.

### Cause 2: Animation Flag Not Cleared

When a bot drew a card and decided to play it:

```javascript
OnBotDrawCard() {
  this.isAnimating = true; // Set during draw
  
  // After animation...
  if (bot wants to play drawn card) {
    this.OnBotPlayCard(); // ❌ isAnimating still true!
  }
}

OnBotPlayCard() {
  if (this.isAnimating) {
    return; // ❌ Blocked! Game stuck!
  }
}
```

The `isAnimating` flag was still `true` from the draw animation, so `OnBotPlayCard` would immediately return, leaving the game stuck.

## The Fixes

### Fix 1: Skip Card - Single Turn Advance

Changed `HandleCardEffect` to directly modify `currentPlayerIndex` instead of calling `NextTurn()`:

```javascript
// BEFORE (WRONG):
case 'skip':
  this.NextTurn(); // ❌ Causes double advance

// AFTER (CORRECT):
case 'skip':
  this.currentPlayerIndex = this.GetNextPlayerIndex(); // ✅ Skip one player
  // Scene will call NextTurn() once, which advances from the skipped player
```

**Flow Now**:
```
Player 1 plays Skip card
  ↓
HandleCardEffect() sets currentPlayerIndex to Player 2 (skipped)
  ↓
Scene calls NextTurn()
  ↓
NextTurn() advances from Player 2 to Player 3
  ↓
Player 3's turn starts ✅
```

### Fix 2: Clear Animation Flag Before Playing

Clear `isAnimating` before calling `OnBotPlayCard`:

```javascript
// BEFORE (WRONG):
if (bot wants to play drawn card) {
  this.OnBotPlayCard(); // ❌ isAnimating still true
}

// AFTER (CORRECT):
if (bot wants to play drawn card) {
  this.isAnimating = false; // ✅ Clear flag first
  this.time.delayedCall(500, () => {
    this.OnBotPlayCard(); // ✅ Now it works
  });
}
```

## Complete Flows

### Skip Card Flow:
```
Player 1 plays Skip card
  ↓
PlayCard() called
  ↓
HandleCardEffect('skip')
  ↓
currentPlayerIndex = 1 (Player 2 - skipped)
  ↓
PlayCard() returns false
  ↓
Scene calls NextTurn()
  ↓
currentPlayerIndex = 2 (Player 3)
  ↓
Player 3's turn starts ✅
```

### Reverse Card Flow (4 players):
```
Player 1 plays Reverse
  ↓
HandleCardEffect('reverse')
  ↓
direction *= -1 (now counterclockwise)
  ↓
Scene calls NextTurn()
  ↓
currentPlayerIndex = 0 (Player 4, going backwards)
  ↓
Player 4's turn starts ✅
```

### Bot Draw and Play Flow:
```
Bot has no playable cards
  ↓
OnBotDrawCard()
  ↓
isAnimating = true
  ↓
Card animates (800ms)
  ↓
Check if playable
  ↓
Bot decides to play (50% chance)
  ↓
isAnimating = false ✅ (cleared)
  ↓
Wait 500ms
  ↓
OnBotPlayCard()
  ↓
isAnimating check passes ✅
  ↓
Card plays successfully ✅
```

## Files Modified

**src/js/services/GameEngine.js**
- Changed `HandleCardEffect` to modify `currentPlayerIndex` directly
- Removed `NextTurn()` calls from Skip and Reverse cases
- Skip and Reverse now work with single `NextTurn()` call from scene

**src/js/scenes/GameScene.js**
- Added `isAnimating = false` before bot plays drawn card
- Prevents blocking when bot wants to play after drawing

## Result

✅ **Skip Works Correctly**: Skips exactly one player
✅ **Reverse Works Correctly**: Changes direction properly
✅ **Bot Can Play After Draw**: No more blocking
✅ **No Stuck States**: Game flows smoothly
✅ **Turn Order Correct**: All players get their turns

## Testing Scenarios

1. **Player 1 plays Skip**:
   - Player 2 is skipped ✅
   - Player 3 goes next ✅

2. **Player 1 plays Reverse** (4 players):
   - Direction reverses ✅
   - Player 4 goes next ✅

3. **Bot draws and can play**:
   - Bot draws card ✅
   - Bot plays it (50% chance) ✅
   - No blocking ✅

4. **Bot draws and passes**:
   - Bot draws card ✅
   - Bot passes (50% chance) ✅
   - Next player's turn ✅

The game now handles all special cards and bot actions correctly!
