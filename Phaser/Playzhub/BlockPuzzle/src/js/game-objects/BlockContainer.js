/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 09-12-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 09-12-2024
 * @Description :- Coin tweens.
 ************************************/

import BlockIcon from './BlockIcon';

export default class BlockContainer {
  constructor(scene, _posX, _posY, _i, _holdersNum, _maxHolders, _iconData, _fIconData, _iconPosY) {
    this.scene = scene;
    this.x = _posX;
    this.y = _posY;
    this.i = _i;
    this.holdersNum = _holdersNum;
    this.maxHolders = _maxHolders;
    this.iconData = _iconData;
    this.flipIconData = _fIconData;
    this.iconPosY = _iconPosY;

    this.clickCount = 0;
    this.firstContainer = null;
    this.secondContainer = null;

    this.CreateBlockContainer();
  }

  CreateBlockContainer() {
    this.blockContainer = this.scene.add.container().setName(this.i);
    this.blockContainer.setData({ iconNum: this.holdersNum, maxIcon: this.maxHolders });

    this.blockImg = this.scene.add.image(this.x, this.y, 'game_obj', 'cake_rack_small').setInteractive({ useHandCursor: true });
    this.blockContainer.add(this.blockImg);

    this.bIcons = {}; // Object to store all icons with dynamic keys


    for (let i = 0; i < this.holdersNum; i++) {
      const iconKey = `bIcon${i + 1}`; // Dynamically generate a key name

      this.bIcons = new BlockIcon(this.scene, this.x, iconKey, i, this.iconData[i], this.flipIconData ? this.flipIconData[i] : null, this.iconPosY);

      this.bIcons[iconKey] = this.bIcons;
      this.blockContainer.add(this.bIcons.bIcons);

    }
    // Attach the pointerup event
    this.blockImg.on('pointerup', this.OnClick, this);
  }

  OnClick() {
    if (this.scene.containerTypeArray.length < 2) {
      // const containerName = this.blockImg.parentContainer.name;
      // console.log('container Name', this.blockImg.parentContainer.name);
      this.scene.containerTypeArray.push(this.blockImg.parentContainer.name);
    }
    // console.log('OnClick---------------', this.scene.containerTypeArray);
    if (this.scene.containerTypeArray.length === 1) this.FirstClick();
    else if (this.scene.containerTypeArray.length === 2) {
      if (this.scene.containerTypeArray[0] === this.scene.containerTypeArray[1]) {
        this.blockImg.removeInteractive();
        const checkExistenceSame = setInterval(() => {
          if (this.scene.selectedBlockIconsArray && this.scene.animState === null) {
            // console.log("same selected fired with new conditional");
            if (this.scene.isProcessing) return;
            this.scene.isProcessing = true;
            this.scene.containerTypeArray = [];
            if (this.scene.containerTypeArray.length === 0) this.scene.events.emit('same_selected', true);
            clearInterval(checkExistenceSame); // Stop checking after the first success
          }
        }, 100); // Check every 100ms
      }
      else if (this.scene.containerTypeArray[0] !== this.scene.containerTypeArray[1]) {
        const checkExistenceTarget = setInterval(() => {
          if (this.scene.animState === null && this.scene.floatCounter !== 0 && this.scene.selectedBlockIconsArray) {
            if (this.scene.isProcessing) return;
            this.scene.isProcessing = true;
            this.scene.containerTypeArray = [];
            if (this.scene.containerTypeArray.length === 0) this.scene.events.emit('target_selected', this.blockImg.parentContainer);
            clearInterval(checkExistenceTarget); // Stop checking after the first success
          }
        }, 100); // Check every 100ms
        // this.scene.events.emit('target_selected', this.blockImg.parentContainer);
      }
    }
  }


  FirstClick() {
    // console.log("first click");
    this.blockImg.removeInteractive();
    const children = this.blockImg.parentContainer.list;
    const matchingElements = []; // Array to store matching elements
    const topmostName = children[children.length - 1]?.name; // Get the name of the topmost element

    if (!topmostName) {
      // console.log('No elements found in the container.');
      this.scene.containerTypeArray = [];
      return;
    }

    // Check if the very next element exists and has the same name
    if (children.length > 1) {
      const nextName = children[children.length - 2]?.name;
      if (nextName !== topmostName) {
        matchingElements.push(children[children.length - 1]);
        // console.log('No matches found as the very next element does not have the same name.');
        // Emit event after all checks (even if no match is found)
        if (this.scene.isProcessing) return;
        this.scene.isProcessing = true;
        this.scene.events.emit('first_selected', matchingElements, this.blockImg.parentContainer);
        return;
      }
    }

    // If the check above passes, continue adding matching elements
    for (let i = children.length - 1; i >= 0; i--) {
      const currentName = children[i]?.name;

      if (currentName === topmostName) {
        matchingElements.push(children[i]); // Add the matching element to the array
      } else {
        break; // Stop the loop if the name doesn't match
      }
    }

    // Emit the event after all checks are complete and matching elements are collected
    if (this.scene.isProcessing) return;
    this.scene.isProcessing = true;
    this.scene.events.emit('first_selected', matchingElements, this.blockImg.parentContainer);
    // console.log('event-----', this.scene.events);
  }

}
