/* global window */
/********* Script_Details ************
 * @Original_Creator :- Tanmay Mukherjee.
 * @Created_Date :- 29-10-2024.
 * @Last_Update_By :- Tanmay Mukherjee.
 * @Last_Updatd_Date :- 29-10-2024
 * @Description :- Design and handling for the Buyin message.
 ************************************/

import Button from '../ui/Button';
import { SelectedResolution } from '../ResolutionSelector.js';
import { Utils } from '../Utils.js';
import Text from '../ui/Text.js';
import { Client } from '../services/Client.js';

export default class ChatPopup {
  constructor(scene) {
    this.scene = scene;
    this.chatButtonPos = { x: 64, y: 41 };
    this.chatSectionContainer = null;
    this.chatPanelHeightGap = 0;
    this.CreateChatSection();
  }
  CreateChatSection() {
    this.chatButton = new Button(this.scene, 0, 0, 'chat_icon', null);
    this.chatButton.setClickCallback(this.OnChatButtonClicked, this);
    this.chatButton.setDepth(2);
    this.chatButton.setVisible(false);

    this.CreateChatArea();
    this.hideChatButton = new Button(this.scene, 0, 0, 'chat_hide_button', null);
    this.hideChatButton.setDepth(2);
    this.hideChatButton.setClickCallback(this.OnHideChatButtonClicked, this);
    this.CreateChatTextInputArea();
    this.ShowHideChatPopup(false);
  }
  CreateChatArea() {
    this.chatSectionContainer = this.scene.add.container(0, 0).setDepth(2);
    this.chatBase = this.scene.add.image(-818, 43, 'chat_base');
    this.chatBaseText = this.scene.add.image(-885, -384, 'chat_base_text');
    this.chatSectionContainer.add([this.chatBase, this.chatBaseText]);
    this.CreateShowChatPanel(970);
  }
  //#region chat Panel Area Using Rex Scroller
  CreateShowChatPanel(_height) {
    this.chatDataContainer = this.scene.add.container(0, 0).setScale(1).setSize(300, _height).setDepth(2);
    this.recievedChatPanel = this.scene.rexUI.add.scrollablePanel({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      width: 270,
      height: 750,

      scrollMode: 'y',
      origin: (0, 0),

      panel: {
        child: this.chatDataContainer,
        mask: {
          padding: 5, // or {left, right, top, bottom}
          updateMode: 1,
        }
      },
      mouseWheelScroller: {
        focus: false,
        speed: 0.2
      },
      // slider: {
      //     track: this.scene.rexUI.add.roundRectangle({
      //         width: 20, radius: 10,
      //         color: 0xB0DE5F,
      //     }),
      //     thumb: this.scene.rexUI.add.roundRectangle({
      //         radius: 13,
      //         color: 0xDBE1DD,
      //     }),
      // },

      // space: {
      //     slider: 5,
      // }
    }).layout();
    this.recievedChatPanel.setDepth(2);

  }
  //#endregion

  //#region Other User msg Recieved Design
  MakeOtherUserChatArea(_time, _userName, _userChat) {
    _userChat = this.ModifyRecievedMsg(_userChat, 18);
    let _heightGap = null;
    _heightGap = this.chatPanelHeightGap;
    this.recievedChatPanel.layout();
    let baseHeight = 80;
    const newlineCount = _userChat.split('\n').length - 1;
    if (newlineCount > 0) {
      baseHeight += (newlineCount * 22);
    };
    if (_userChat.length > 30) {
      const chatLine = parseInt(_userChat.length / 30);
      baseHeight += (chatLine * 22);
    };
    let timeText = null;
    if (_time > 59) {
      _time = Math.floor(_time / 60);
      timeText = 'mins';
    } else {
      timeText = 'sec';
    };
    const userBase = this.scene.add.image(30, 30 + _heightGap, 'user_base').setOrigin(0.5).setScale(0.35);
    const userImage = this.scene.add.image(30, 30 + _heightGap, 'profile_pic_0').setOrigin(0.5).setScale(0.35);
    const userRing = this.scene.add.image(30, 30 + _heightGap, 'user_ring').setOrigin(0.5).setScale(0.35);
    const usersChatBase = this.scene.add.graphics();
    usersChatBase.fillStyle(0x2B333F, 0.7);
    usersChatBase.fillRoundedRect(65, 0 + _heightGap, 200, baseHeight, 15);
    usersChatBase.fillStyle(0xff00ff, 1);
    const chatTimetextStyle = { fontFamily: 'Poppins-Regular', fontSize: '12px', fill: '#B2BEB5', fontStyle: 'normal', align: 'center', wordWrap: { width: 180 } };
    // const chatTimeText = this.scene.add.text(250, 10 + _heightGap, `${_time} ${timeText} ` + 'ago', chatTimetextStyle).setOrigin(1, 0);
    const chatTimeText = this.scene.add.text(250, 10 + _heightGap, `${_time} ${timeText} ago`, chatTimetextStyle).setOrigin(1, 0);
    const userNametextStyle = { fontFamily: 'Poppins-Regular', fontSize: '18px', fill: '#87CEEB ', fontStyle: 'bold', align: 'center', wordWrap: { width: 180 } };
    const userNameText = this.scene.add.text(75, 26 + _heightGap, _userName, userNametextStyle).setOrigin(0, 0);
    const userChatText = new Text(this.scene, 75, 50 + _heightGap, {
      text: _userChat,
      fontFamily: 'Poppins-Regular',
      fontSize: '14px',
      fontStyle: 'normal',
      color: '#ffffff',
      align: 'left',
      wordWrap: { width: 180 },
      shadow: {},
    }
    );
    userChatText.setOrigin(0, 0);
    this.chatDataContainer.add([userBase, userImage, userRing, usersChatBase, chatTimeText, userNameText, userChatText.textNormal]);
    this.chatPanelHeightGap = _heightGap + baseHeight + 20;
  }
  //#endregion

  //#region  Local User msg Recieved Design
  MakeLocalUserChatArea(_time, _userName, _userChat) {
    _userChat = this.ModifyRecievedMsg(_userChat, 27);
    let _heightGap = null;
    _heightGap = this.chatPanelHeightGap;
    this.recievedChatPanel.layout();
    let baseHeight = 80;
    const newlineCount = _userChat.split('\n').length - 1;
    if (newlineCount > 0) {
      baseHeight += (newlineCount * 18);
    };
    if (_userChat.length > 40) {
      const chatLine = parseInt(_userChat.length / 40);
      baseHeight += (chatLine * 22);
    };
    let timeText = null;
    if (_time > 59) {
      _time = Math.floor(_time / 60);
      timeText = 'mins';
    } else {
      timeText = 'sec';
    };
    const userBase = this.scene.add.image(40, 30 + _heightGap, 'user_base').setOrigin(0.5).setScale(0.35).setVisible(false);
    const userImage = this.scene.add.image(40, 30 + _heightGap, 'profile_pic_0').setOrigin(0.5).setScale(0.35).setVisible(false);
    const userRing = this.scene.add.image(40, 30 + _heightGap, 'user_ring').setOrigin(0.5).setScale(0.35).setVisible(false);
    const usersChatBase = this.scene.add.graphics();
    usersChatBase.fillStyle(0x1E386A, 0.7);
    usersChatBase.fillRoundedRect(10, 0 + _heightGap, 255, baseHeight, 15);
    usersChatBase.fillStyle(0x4f42b5, 1);
    const chatTimetextStyle = { fontFamily: 'Poppins-Regular', fontSize: '12px', fill: '#B2BEB5', fontStyle: 'normal', align: 'center', wordWrap: { width: 180 } };
    const chatTimeText = this.scene.add.text(250, 10 + _heightGap, `${_time} ${timeText} ago`, chatTimetextStyle).setOrigin(1, 0);
    const userNametextStyle = { fontFamily: 'Poppins-Regular', fontSize: '18px', fill: '#87CEEB ', fontStyle: 'bold', align: 'center', wordWrap: { width: 180 } };
    const userNameText = this.scene.add.text(90, 30 + _heightGap, _userName, userNametextStyle).setOrigin(0, 0).setVisible(false);
    const userChatText = new Text(this.scene, 25, 50 + _heightGap, {
      text: _userChat,
      fontFamily: 'Poppins-Regular',
      fontSize: '14px',
      fontStyle: 'normal',
      color: '#ffffff',
      align: 'right',
      wordWrap: { width: 235 },
      shadow: {},
    }
    );
    userChatText.setOrigin(0, 0);
    this.chatDataContainer.add([userBase, userImage, userRing, usersChatBase, chatTimeText, userNameText, userChatText.textNormal]);
    this.chatPanelHeightGap = _heightGap + baseHeight + 20;
  }
  //#endregion

  ModifyRecievedMsg(input, interval) {
    let output = '';
    let currentIndex = 0;
    if (input.length >= interval) {
      while (currentIndex < input.length) {
        const segment = input.slice(currentIndex, currentIndex + interval);
        if (!segment.includes(' ') && !segment.includes('\n') && segment.length === interval) {
          output += `${segment}\n`;
        } else {
          output += segment;
        }
        currentIndex += interval;
      }
      return output;
    }
    else {
      return input;
    }
  }

  //#region Chat Box Button Clicked Functionality
  OnChatButtonClicked() {
    this.chatButtonPos.x = 317;
    this.ShowHideChatPopup(true);
    const currScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, window.innerWidth, window.innerHeight);
    this.resize(window.innerWidth, window.innerHeight, currScale);
  }
  //#endregion

  //#region  Chat Box Button Hide Functionality
  OnHideChatButtonClicked() {
    this.chatButtonPos.x = 64;
    this.ShowHideChatPopup(false);
    const currScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, window.innerWidth, window.innerHeight);
    this.resize(window.innerWidth, window.innerHeight, currScale);
  }
  //#endregion

  //#region Chat Input Area Interactive Functionality
  CreateChatTextInputArea() {
    this.inputTextBase = this.scene.add.image(-826, 497, 'inputText_base');
    this.sendButton = new Button(this.scene, 0, 0, 'send_button', null);
    this.sendButton.setClickCallback(this.OnSendButtonClicked, this);
    this.sendButton.setDepth(2);
    this.chatSectionContainer.add(this.inputTextBase);
    this.inputText = this.scene.add.rexInputText(400, 400, 10, 2, {
      type: 'textarea',
      text: '',
      fontSize: '20px',
      color: '#7F8FA6',
    })
      .resize(200, 50)
      .setOrigin(0.5)
      .on('textchange', () => {
        // printText.text = inputText.text;
      })
      .on('focus', () => {
        // console.log('On focus');
      })
      .on('blur', () => {
        // console.log('On blur');
      })
      .on('click', () => {
        // console.log('On click');
      })
      .on('dblclick', () => {
        // console.log('On dblclick');
      });

    this.scene.input.on('pointerdown', () => {
      this.inputText.setBlur();
    });

    this.inputText.on('keydown', (inputText, e) => {
      if ((inputText.inputType !== 'textarea') && (e.key === 'Enter')) {
        this.inputText.setBlur();
      }
    });
    this.inputText.displayHeight = 50;
    // this.inputText.setEnabled(false);
  }
  //#endregion

  //#region  Message Sent Button Clicked and emit send-message Event 
  OnSendButtonClicked() {
    if (this.inputText.text.length > 0) {
      Client.SendMessage(this.inputText.text);
      this.inputText.text = '';
      const currScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, window.innerWidth, window.innerHeight);
      this.resize(window.innerWidth, window.innerHeight, currScale);
    }
  }
  //#endregion

  //#region  Show Hide Control this Chat Popup
  ShowHideChatPopup(_status) {
    this.chatSectionContainer.setVisible(_status);
    this.inputText.setVisible(_status);
    this.recievedChatPanel.setVisible(_status);
    if (_status) {
      this.chatButton.disable();
      this.hideChatButton.show();
      this.hideChatButton.enable();
      this.sendButton.show();
      this.sendButton.enable();
    }
    else {
      this.chatButton.enable();
      this.hideChatButton.hide();
      this.sendButton.hide();
    }
  }
  //#endregion

  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.chatButton.setScale(_newScale);
    this.chatButton.setPosition((this.chatButtonPos.x * _newScale), (_newHeight) - (this.chatButtonPos.y * _newScale));
    this.hideChatButton.setScale(_newScale);
    this.hideChatButton.setPosition((248 * _newScale), (_newHeight) - (957 * _newScale));
    this.chatSectionContainer.setScale(_newScale);
    this.chatSectionContainer.setPosition((960 * _newScale), (_newHeight) - (540 * _newScale));
    this.inputText.setScale(_newScale);
    this.inputText.setPosition((110 * _newScale), (_newHeight) - (40 * _newScale));
    this.sendButton.setScale(_newScale);
    this.sendButton.setPosition((241 * _newScale), (_newHeight) - (40 * _newScale));
    this.recievedChatPanel.x = (5 * _newScale);
    this.recievedChatPanel.y = (_newHeight) - (875 * _newScale);
    this.chatDataContainer.setSize(270 * _newScale, this.chatPanelHeightGap + (970 * _newScale)).setScale(_newScale);
    this.recievedChatPanel.setScale(_newScale);
    this.recievedChatPanel.layout();
  };
  //#endregion
}