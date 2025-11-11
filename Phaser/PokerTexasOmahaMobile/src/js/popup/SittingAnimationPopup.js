/* global */
import { Model } from '../Model.js';
export default class SittingAnimationPopup {
  constructor(scene) {
    this.scene = scene;
    this.CreatePlayerPlacedAnim();
  }
  //#region - Create Player Sit Dummy Data
  CreatePlayerPlacedAnim() {
    this.playerPosArray = [
      { x: 6, y: 485 },//middle down//0
      { x: -385, y: 56 },//left down//1
      { x: -330, y: -421 },//left up//2
      { x: 0, y: -684 },//middle up//3
      { x: 334, y: -421 },//right up//4
      { x: 387, y: 56 },//right down//5
    ];
    this.placedAnimContainerArray = [];
    const userNameTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '32px', fill: '#FFF3F2', fontStyle: 'normal', align: 'center' };
    for (let i = 0; i < this.scene.placeHolderContainerArray.length; i++) {

      const placedAnimContainer = this.scene.add.container(0, 0).setVisible(false).setDepth(2);
      const placeHolderBase = this.scene.add.image(0, 0, 'user_base').setOrigin(0.5);
      const placeHolderArrow = this.scene.add.image(0, 0, 'sit_in_arrow').setOrigin(0.5);
      const playerUserName = this.scene.add.text(0, 90, 'Poker', userNameTextStyle).setOrigin(0.5).setVisible(false);
      const userImage = this.scene.add.image(0, -8, 'profile_pic_0').setOrigin(0.5).setVisible(false);

      placedAnimContainer.add([placeHolderBase, placeHolderArrow, playerUserName, userImage]);
      placedAnimContainer.setSize(placeHolderBase.width, placeHolderBase.height);
      placedAnimContainer.index = i;
      this.placedAnimContainerArray.push(placedAnimContainer);
    }
  };
  //#endregion

  //#region - Create Player Sit Anim
  PlayerPlacedAnim(_localPlayerIndex, _isSitIn) {
    this.scene.allPlayerArray.forEach(element => {
      element.playerContainer.setVisible(false);
    });
    let listIndex;
    if (_localPlayerIndex) {
      listIndex = this.placedAnimContainerArray[_localPlayerIndex].list.length - 1;
    }

    if (_isSitIn === true) {
      const localPlayerData = Model.GetLocalPlayerData();
      if (listIndex) {
        if (localPlayerData.profile.profile_pic) {
          this.placedAnimContainerArray[_localPlayerIndex].list[listIndex].setTexture(localPlayerData.profile.profile_pic);
          // this.placedAnimContainerArray[_localPlayerIndex].list[1].setVisible(false);
        } else {
          this.placedAnimContainerArray[_localPlayerIndex].list[listIndex].setTexture('profile_pic_0');
          // this.placedAnimContainerArray[_localPlayerIndex].list[1].setVisible(false);
        }
        this.placedAnimContainerArray[_localPlayerIndex].list[listIndex].setVisible(true);
        this.placedAnimContainerArray[_localPlayerIndex].list[listIndex - 1].setText(Model.GetLocalUserName());
        this.placedAnimContainerArray[_localPlayerIndex].list[listIndex - 1].setVisible(true);
      }
    }

    const players = Model.GetPlayersData();
    players.forEach((element) => {
      if (element.profile.profile_pic) {
        this.placedAnimContainerArray[element.seat_no].list[listIndex].setTexture(element.profile.profile_pic);
        // this.placedAnimContainerArray[element.seat_no].list[1].setVisible(false);
      } else {
        this.placedAnimContainerArray[element.seat_no].list[listIndex].setTexture('profile_pic_0');
        // this.placedAnimContainerArray[element.seat_no].list[1].setVisible(false);
      }
      this.placedAnimContainerArray[element.seat_no].list[listIndex].setVisible(true);
      this.placedAnimContainerArray[element.seat_no].list[listIndex - 1].setText(element.user_name);
      this.placedAnimContainerArray[element.seat_no].list[listIndex - 1].setVisible(true);
    });

    for (let j = 0; j < this.placedAnimContainerArray.length; j++) {
      _isSitIn ? this.PlacedAnimLoopSitIn(_localPlayerIndex, 1, j, _localPlayerIndex) : this.PlacedAnimLoopSitOut(j, _localPlayerIndex, -1 * (_localPlayerIndex - 1), _localPlayerIndex);
    }
  }
  //#endregion


  //#region - Sitting Animation Loop Control SitOut
  PlacedAnimLoopSitOut(_index, moves, currentIndex, _timerRatio) {
    currentIndex = (currentIndex + _index + 6) % 6;
    if (moves > 0) {
      this.scene.add.tween({
        targets: this.placedAnimContainerArray[_index],
        x: this.scene.placeHolderContainerArray[currentIndex].x,
        y: this.scene.placeHolderContainerArray[currentIndex].y,
        duration: (1500 / _timerRatio),
        ease: 'Power2',
        onComplete: () => {
          currentIndex = (currentIndex > 4) ? currentIndex - 6 : currentIndex;
          currentIndex += this.SetCurrentIndex(_index);
          this.PlacedAnimLoopSitOut(_index, moves - 1, currentIndex, _timerRatio);
        }
      });
    }
    if (_index === 5 && moves === 0) {
      this.scene.ControlPlayerAndEmptyPlaceVisibility();
      this.placedAnimContainerArray.forEach(element => {
        element.setVisible(false);
        element.list.slice(-2).forEach(item => item.setVisible(false));
      });
    }
  }
  //#endregion

  SetCurrentIndex(_index) {
    switch (_index) {
      case 0:
        return 1;
      case 1:
        return 0;
      case 2:
        return -1;
      case 3:
        return -2;
      case 4:
        return -3;
      case 5:
        return -4;
    }
  }

  //#region - Sitting Animation Loop Control SitIn
  PlacedAnimLoopSitIn(_localPlayerIndex, _changeIndex, _index, _timerRatio) {
    const currIndex = (this.placedAnimContainerArray[_index].index - _changeIndex + 6) % 6;
    this.scene.add.tween({
      targets: this.placedAnimContainerArray[_index],
      x: this.scene.placeHolderContainerArray[currIndex].x,
      y: this.scene.placeHolderContainerArray[currIndex].y,
      ease: 'Power2',
      duration: (1500 / _timerRatio),
      callbackScope: this,
      onComplete: function () {
        _localPlayerIndex--;
        _changeIndex++;
        if (_localPlayerIndex > 0) {
          this.PlacedAnimLoopSitIn(_localPlayerIndex, _changeIndex, _index, _timerRatio);
        }
        if (_index === (this.placedAnimContainerArray.length - 1) && _localPlayerIndex === 0) {
          this.scene.ControlPlayerAndEmptyPlaceVisibility();
          this.placedAnimContainerArray.forEach(element => {
            element.setVisible(false);
            element.list.slice(-2).forEach(item => item.setVisible(false));
          });
        }
      }
    });
  }
  //#endregion

  SitOutResizePlayerPlaceHolderAnim(_newWidth, _newHeight, _newScale, _changedAnimPos) {
    for (let i = 0; i < this.placedAnimContainerArray.length; i++) {
      let index = i - _changedAnimPos;
      if (index < 0) {
        index += 6;
      }
      this.placedAnimContainerArray[i].setScale(_newScale);
      this.placedAnimContainerArray[i].setPosition((_newWidth / 2) + (this.playerPosArray[index].x * _newScale), (_newHeight / 2) + (this.playerPosArray[index].y * _newScale));
    }
  }


  //#region - Resize PlaceHolder
  ResizePlayerPlaceHolderAnim(_newWidth, _newHeight, _newScale) {
    for (let i = 0; i < this.placedAnimContainerArray.length; i++) {
      this.placedAnimContainerArray[i].setScale(_newScale);
      this.placedAnimContainerArray[i].setPosition((_newWidth / 2) + (this.playerPosArray[i].x * _newScale), (_newHeight / 2) + (this.playerPosArray[i].y * _newScale));
    }
  };
  //#endregion
}