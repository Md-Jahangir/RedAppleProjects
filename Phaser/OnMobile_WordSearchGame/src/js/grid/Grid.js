/* eslint-disable nonblock-statement-body-position */
/* global Phaser */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 19-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 26-09-2024
 * @Description :- Creates tiles of the gameboard.
 ************************************/

import { Constant } from '../Constant';
import PlaceWords from './PlaceWords';
import CheckWord from './CheckWord';
import ButtonTween from '../game-objects/ButtonTween';

class Grid {
  constructor(scene, width, column, row, words, gridFontSize) {
    this.scene = scene;
    this.width = width;
    this.column = column;
    this.row = row;
    this.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.wordList = words;
    this.gridFontSize = gridFontSize;
    this.numberOfWordsForPlace = this.row - 1;
    this.selectedCellsArray = [];
    this.indices = [];
    this.panelContainer = null;
    this.panel = null;
    this.boardWidth = null;

    this.CreateGridTable();
    this.placeWords = new PlaceWords(this.scene, this.boardGrid, this.column, this.numberOfWordsForPlace, this.wordList);
    this.FillEmptyCell();
  }

  CreateGridTable() {
    this.panelContainer = this.scene.add.container(0, 0);
    this.panel = this.CreatePanel(this.scene)
      .setMinSize(750, 750)
      .setPosition(0, 195)
      .layout();

    // this.panelContainer.add(this.panel);

    this.TracePointOver(this.panel);
    this.PrintSelection();
  }

  CreatePanel(scene) {
    const background = scene.add.image(0, 0, 'bBG');
    const gridFontSize = this.gridFontSize;

    this.boardWidth = background.width;


    this.boardGrid = scene.rexUI.add.gridSizer({
      column: this.column,
      columnProportions: 1,
      row: this.row,
      rowProportions: 1,

      createCellContainerCallback(scene, x, y, config) {
        config.expand = true;
        const text = (x * 10) + y;

        return scene.rexUI.add.label({
          background: scene.add.image(0, 0, 'lBase'),
          text: scene.add.text(0, 0, '', {
            fontFamily: 'Fredoka-Bold',
            fontSize: gridFontSize,
            color: '#753100',
            fontStyle: 'bold',
            expand: { width: 107, height: 122 },
            align: 'center',
          }).setName(text).setData({ selection: false, fill: '#753100' }),//.setOrigin(0.5, 0.1),
          align: 'center',
          width: 50, // Desired width
          height: 60 // Desired height
        });
      },

      space: {
        left: 25,
        right: 25,
        top: 25,
        bottom: 25,
        row: 1,
        column: 1
      }
    })
      .addBackground(background, 0, 'background');

    return this.boardGrid;

  }

  //////////////////////////////////////////////
  PrintSelection() {
    this.panel
      .on('tracestart', function () {
        // Optional: you can show something like "Tracing..."
      })
      .on('traceend', (result) => {
        if (this.boardGrid.isPointerInBounds()) {
          this.searchedWord = result.join('');
          this.checkWord = new CheckWord(
            this.scene,
            this.searchedWord,
            this.wordList,
            this.selectedCellsArray
          );
        } else {
          this.searchedWord = result.join('');
          if (this.searchedWord.length > 0)
            this.checkWord = new CheckWord(this.scene, this.searchedWord, this.wordList, this.selectedCellsArray);
        }
      });
  };


  TracePointOver(panel) {
    let tracing = false;
    const result = [];
    this.dragDirArray = [];

    const onTraceStart = (cell) => {
      if (!this.scene.isTweenActive) {
        tracing = true;
        result.length = 0;
        this.selectedCellsArray = [];

        if (cell) {
          cell.children[1].data.list.selection = true;
          result.push(cell.text);
          this.scene.dragDirCheckArray.push(cell.children[1].name);
          cell.getElement('background').setTexture('color_box_0');
          cell.getElement('text').setStyle({ fill: '#753100' });
          this.selectedCellsArray.push(cell);

          this.btnTween = new ButtonTween(
            this.scene,
            cell.getElement('background'),
            null,
            1 * Constant.newScale,
            1 * Constant.newScale,
            120,
            1.2,
            true
          );

          panel.emit('tracestart');
        }
      }
    };

    const onTraceNewButton = (cell) => {
      const selection = cell.children[1].data.list.selection;
      if (!selection) {
        cell.children[1].data.list.selection = true;
        result.push(cell.text);
        this.scene.dragDirCheckArray.push(cell.children[1].name);
        cell.getElement('background').setTexture('color_box_0');
        cell.getElement('text').setStyle({ fill: '#753100' });
        this.btnTween = new ButtonTween(
          this.scene,
          cell.getElement('background'),
          null,
          1 * Constant.newScale,
          1 * Constant.newScale,
          120,
          1.2,
          true
        );
        this.selectedCellsArray.push(cell);
      }
    };

    const onTraceEnd = () => {
      if (!tracing) return;
      tracing = false;
      panel.emit('traceend', result);
    };

    // ✅ Make each cell interactive (start point)
    panel.getElement('items').forEach((cell) => {
      cell.setInteractive(new Phaser.Geom.Rectangle(10, 10, cell.width / 1.4, cell.height / 1.7), // Custom rectangle hit area
        Phaser.Geom.Rectangle.Contains // Defines how to check if the pointer is inside the rectangle
      )
        .on('pointerdown', () => {
          onTraceStart(cell);
        });
    });

    panel.scene.input.on('pointermove', (pointer) => {
      if (!tracing) return;

      // Use Phaser's hitTestPointer to get the exact interactive cell
      const hitList = panel.scene.input.hitTestPointer(pointer);

      if (hitList && hitList.length > 0) {
        // Find the first grid cell that’s in the hit list
        const cell = panel.getElement('items').find((c) => hitList.includes(c));
        if (cell) {
          onTraceNewButton(cell);
        }
      }
    });


    // ✅ End trace
    panel.scene.input.on('pointerup', () => {
      onTraceEnd();
    });

    panel.scene.input.on('gameout', () => {
      onTraceEnd();
    });
  }

  // PrintSelection() {
  //   this.panel
  //     .on('tracestart', function () {
  //       // print.text = 'Start';

  //     })
  //     .on('traceend', (result) => {
  //       // print.text = result;//.join('');

  //       if (this.boardGrid.isPointerInBounds()) {
  //         this.searchedWord = result.join('');
  //         this.checkWord = new CheckWord(this.scene, this.searchedWord, this.wordList, this.selectedCellsArray);
  //       }
  //       else {
  //         this.searchedWord = result.join('');
  //         if (this.searchedWord.length > 0) this.checkWord = new CheckWord(this.scene, this.searchedWord, this.wordList, this.selectedCellsArray);
  //       }
  //     });

  // }

  // TracePointOver(panel) {
  //   let tracing = false;
  //   const result = [];

  //   this.dragDirArray = [];

  //   const onTraceStart = (cell) => {
  //     if (!this.scene.isTweenActive) {
  //       tracing = true;
  //       result.length = 0;
  //       this.selectedCellsArray = [];
  //       // panel.getElement('items').forEach(function (cell) {
  //       if (cell) {
  //         // console.log("tracing start ");

  //         cell.children[1].data.list.selection = true;
  //         result.push(cell.text);
  //         this.scene.dragDirCheckArray.push(cell.children[1].name);
  //         cell.getElement('background').setTexture('color_box_0');
  //         cell.getElement('text').setStyle({ fill: '#753100' });
  //         this.selectedCellsArray.push(cell);
  //         this.btnTween = new ButtonTween(this.scene, cell.getElement('background'), null, 1 * Constant.newScale, 1 * Constant.newScale, 120, 1.2, true);
  //         panel.emit('tracestart');
  //       }
  //     }
  //   };


  //   const onTraceNewButton = (cell) => {
  //     const selection = cell.children[1].data.list.selection;

  //     if (!selection) {
  //       cell.children[1].data.list.selection = true;
  //       result.push(cell.text);
  //       this.scene.dragDirCheckArray.push(cell.children[1].name);
  //       cell.getElement('background').setTexture('color_box_0');
  //       cell.getElement('text').setStyle({ fill: '#753100' });
  //       this.btnTween = new ButtonTween(this.scene, cell.getElement('background'), null, 1 * Constant.newScale, 1 * Constant.newScale, 120, 1.2, true);
  //       this.selectedCellsArray.push(cell);
  //     }
  //     // console.log('silu', this.scene.dragDirCheckArray);

  //   };

  //   // console.log("someCArray2", someCArray);

  //   const onTraceEnd = () => {
  //     if (!tracing) {
  //       return;
  //     }
  //     tracing = false;
  //     panel.emit('traceend', result);
  //   };

  //   panel.getElement('items').forEach(function (cell) {
  //     cell
  //       .setInteractive(new Phaser.Geom.Rectangle(10, 10, cell.width / 1.4, cell.height / 1.7), // Custom rectangle hit area
  //         Phaser.Geom.Rectangle.Contains // Defines how to check if the pointer is inside the rectangle
  //       )
  //       .on('pointerdown', function () {
  //         onTraceStart(cell);

  //         // onTraceNewButton(cell);
  //       })
  //       .on('pointerover', function () {
  //         if (!tracing) {
  //           return;
  //         }
  //         onTraceNewButton(cell);
  //       })
  //       .on('pointerup', function () {
  //         onTraceEnd();
  //       });
  //   });

  //   panel.scene.input
  //     .on('pointerdown', function () {
  //       if (tracing) {
  //         return;
  //       }
  //       onTraceStart();
  //     })
  //     .on('pointerup', function () {
  //       onTraceEnd();
  //     })
  //     .on('pointermove', function () {
  //       if (panel.isPointerInBounds()) {
  //         return;
  //       }
  //       onTraceEnd();
  //     });

  // }


  //////////////////////////////////////////////

  FillEmptyCell() {
    for (let index = 0; index < this.boardGrid.sizerChildren.length; index++) {
      if (this.boardGrid.sizerChildren[index].children[1].text === '') {
        const alphabet = this.alphabets[parseInt(Phaser.Math.Between(0, this.alphabets.length - 1))];
        this.boardGrid.sizerChildren[index].children[1].setText(alphabet).setOrigin(0.5, 0.1);
      }
    }
  }

  BoardResize(newWidth, newHeight, newScale) {
    // this.panel.setPosition(0, 960 * newScale);
    // // this.boardGrid
    this.panel.x = newWidth / 2;
    this.panel.y = (newHeight / 2) + (200 * newScale);
    this.panel.scale = newScale;


    // if (this.panelContainer !== null) {
    //   this.panelContainer.setPosition((newWidth / 2), (newHeight / 2));
    //   this.panelContainer.setScale(newScale);
    //   // this.boardGrid.setScale(newScale);
    //   // this.boardGrid.setPosition((newWidth / 2), (newHeight / 2));
    // }
  }

  RemovePanelListeners() {
    if (this.panel) {
      // Remove all event listeners linked to the panel
      this.panel.removeAllListeners();
      this.panel.scene.input.off('pointerdown');
      this.panel.scene.input.off('pointerup');
      this.panel.scene.input.off('pointermove');
    }
  }

}

export default Grid;