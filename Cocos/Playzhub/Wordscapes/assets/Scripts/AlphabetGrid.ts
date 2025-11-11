import { _decorator, Component, Graphics, Input, input, instantiate, Node, Prefab, Vec2, EventTouch, UITransform, Label, tween, Vec3, sp } from 'cc';
import { Constant } from './globals/Constant';
import { LetterDatabase } from './LetterDatabase';
import { GameManager } from './GameManager';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('AlphabetGrid')
export class AlphabetGrid extends Component {
    //#region -Fields
    //letter
    @property(Prefab) letterPrefab: Prefab = null;
    @property(Node) letterPoolNode: Node = null;
    @property(Node) letterSelectionUI: Node = null; // selected word print node..

    @property(Node) circleSprite: Node = null;
    letterArray: string[] = [];
    selectedLetterID: number[] = [];
    selectedLetterArray: LetterDatabase[] = [];
    interactiveNodes: Node[] = []; // For Detect Node while touch pointer position on Node.
    letterSelectionUIText: Label = null;
    letterSelectionUIOutlineText: Label = null;
    letterSelectionUIShadowText: Label = null;
    alphabetsArray: Node[] = [];

    // game logics
    isTouchStart: boolean = false;
    dragStartPosition = null;
    dragEndPosition = null;

    //graphics
    @property(Graphics) graphics: Graphics = null; // for runtime fake/dummy create line.
    @property(Graphics) alphabetGraphics: Graphics = null; // for selected alphabets popup background.

    //Spine
    @property(sp.Skeleton) rippleSpine: sp.Skeleton = null;
    //#endregion

    //#region -onEnable
    protected onEnable(): void {
        //events
        input.on(Input.EventType.TOUCH_START, this.OnTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.OnTouchOver, this);
        input.on(Input.EventType.TOUCH_END, this.OnTouchEnd, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.OnTouchEnd, this);

        //Initial reference assign.
        this.letterSelectionUIText = this.letterSelectionUI.getComponent(Label);
        this.letterSelectionUIOutlineText = this.letterSelectionUI.children[0].getComponent(Label);
        this.letterSelectionUIShadowText = this.letterSelectionUI.children[1].getComponent(Label);

        //Initial variable set.
        this.graphics.lineWidth = Constant.SELECTION_GRAPHIC_LINEWIDTH;

        this.rippleSpine.setCompleteListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name === "big_ripple") {
                this.rippleSpine.clearTracks();
                this.rippleSpine.setBonesToSetupPose();
            }
        })
    }
    //#endregion

    //#region -SpawnLetterNode
    /**
     * @description - 
     */
    SpawnLetterNode(): void {
        this.letterPoolNode.active = true;// For Optimizing purpose.
        const placingPosition = this.LettersPosition();
        for (let i: number = 0; i < placingPosition.length; i++) {
            // Get Letter nodes and set position and parent.
            const letterNode: Node = this.GetLetterNode(this.letterPrefab);
            letterNode.setParent(this.node);
            letterNode.setPosition(placingPosition[i]['x'], placingPosition[i]['y']);

            //Set Data of Node.
            const letterNodeDatabase: LetterDatabase = letterNode.getComponent(LetterDatabase);
            letterNodeDatabase.SetLetter(Constant.LEVEL_JSON['letters'][i]);
            letterNodeDatabase.SetID(i);

            //Adding Letters in array.
            this.interactiveNodes.push(letterNode);
            this.alphabetsArray.push(letterNode);

            //Animation play

            //Sound play
        }
        this.letterPoolNode.active = false; // For optimizing purpose....
        this.CursorArrowInteractive();
    }
    //#endregion

    //#region CursorArrowInteractive
    CursorArrowInteractive(): void {
        this.interactiveNodes.forEach((_node: Node, _index: number) => {
            _node.on(Node.EventType.MOUSE_ENTER, () => {
                GameManager.instance.canvas.style.cursor = "pointer";
            })
            _node.on(Node.EventType.MOUSE_LEAVE, () => {
                GameManager.instance.canvas.style.cursor = "default";
            })
        })
    }
    //#endregion

    //#region CursorArrowRemoveInteractive
    CursorArrowRemoveInteractive(): void {
        this.interactiveNodes.forEach((_node: Node, _index: number) => {
            _node.off(Node.EventType.MOUSE_ENTER)
            _node.off(Node.EventType.MOUSE_LEAVE)
        })
    }
    //#endregion

    //#region -OnTouchStart
    /**
     * @description - Callback of Mouse Down or Touch start.
     * @param _eventData 
     * @returns 
     */
    OnTouchStart(_eventData: EventTouch): void {
        // variable assign
        const uiLocation = _eventData.getUILocation()
        this.dragStartPosition = uiLocation;
        // Select letter while click on it
        const detectedNode = this.DetectSelectedNode(uiLocation);
        if (detectedNode) {
            this.isTouchStart = true;
            //Graphic initiated
            this.graphics.clear()
            this.graphics.moveTo(this.dragStartPosition.x, this.dragStartPosition.y);
            // Pushing Letter to array.
            const selectedLetterNode = detectedNode.getComponent(LetterDatabase);
            const alphabetID: number = selectedLetterNode.GetID();
            const index = this.CheckLetterExistence(alphabetID)[1];

            if (!this.CheckLetterExistence(alphabetID)[0]) {
                this.PushData(selectedLetterNode, alphabetID);
                this.dragStartPosition = selectedLetterNode.node.getWorldPosition();
            }
            else {
                this.ModifySelection(index);
                this.dragStartPosition = selectedLetterNode.node.getWorldPosition();
            }

            //Animations and Sound
            this.rippleSpine.setAnimation(0, "big_ripple", false); //Animation    
            this.node.parent.setScale(0.99, 0.99, 1);
            tween(this.node.parent).to(1, { scale: new Vec3(1, 1, 1) }, { easing: 'bounceOut' }).start();
            SoundManager.instance.AlphabetSelectionSound();
        }
    }
    //#endregion

    //#region -OnTouchOver
    /**
     * @description- Callback of Mouse Move or Touch Move.
     * @param _eventData 
     * @returns 
     */
    OnTouchOver(_eventData: EventTouch): void {
        if (!this.isTouchStart || GameManager.instance.gameOver || GameManager.instance.isGamePaused) return; // return if not selecting letter.
        //Variable assign
        const uiLocation = _eventData.getUILocation()
        this.dragEndPosition = uiLocation;

        //Graphics rendering while pointer move
        this.graphics.clear()
        this.graphics.moveTo(this.dragStartPosition.x, this.dragStartPosition.y);
        this.graphics.lineTo(this.dragEndPosition.x, this.dragEndPosition.y)
        this.graphics.stroke();

        //Select letter while pointer over the letter node.
        const detectedNode = this.DetectSelectedNode(uiLocation);
        this.WordSelection(detectedNode, this.graphics);
    }
    //#endregion

    //#region - OnTouchEnd
    /**
     * @description - Callback of Mouse up or Touch End or Cancel.
     * @param _eventData 
     */
    OnTouchEnd(_eventData: EventTouch): void {
        if (GameManager.instance.gameOver) return;
        //Variable sets.
        this.isTouchStart = false;
        const uiLocation = _eventData.getUILocation()
        this.dragEndPosition = uiLocation;

        //Selected alphabets join and call check function.
        const letter: string = this.GetSelectedLetter(this.letterArray);
        if (letter.length > 0)
            GameManager.instance.CheckMatch(letter);

        //Reset Reusable Varaibles.
        this.ResetAlphabetGrid();
        this.graphics.clear();
        //alphabet reset
        this.SelectedAlphabetUIRender();
        this.alphabetGraphics.clear();

        // this.rippleSpine.setAnimation(0, "big_ripple", false); //Animation
    }
    //#endregion

    //#region -GetSelectedLetter
    GetSelectedLetter(_stringArray: string[]): string {
        return _stringArray.join('');
    }
    //#endregion

    //#region -DetectSelectedNode
    /**
     * @description - Alternate function of Mouse Move in Android.
     * @param touchPoint 
     * @returns 
     */
    DetectSelectedNode(touchPoint: Vec2): Node | null {
        // Check which node the touch point overlaps
        for (const node of this.interactiveNodes) {
            const worldPos = node.getWorldPosition();
            const nodePos = new Vec2(worldPos.x, worldPos.y);

            // Assuming simple bounding box detection
            const nodeSize = node.getComponent(UITransform).contentSize;
            const rect = {
                x: nodePos.x - nodeSize.width / 2,
                y: nodePos.y - nodeSize.height / 2,
                width: nodeSize.width,
                height: nodeSize.height,
            };

            if (
                touchPoint.x >= rect.x &&
                touchPoint.x <= rect.x + rect.width &&
                touchPoint.y >= rect.y &&
                touchPoint.y <= rect.y + rect.height
            ) {
                return node;
            }
        }
        return null; // No node detected
    }
    //#endregion

    //#region -WordSelection
    /**
     * @description - This function is resonsible for which letter will select or deselect.
     * @param _detectedNode 
     */
    WordSelection(_detectedNode: Node, _graphics: Graphics): void {
        if (_detectedNode) {
            const selectedLetterNode = _detectedNode.getComponent(LetterDatabase);
            const alphabetID: number = selectedLetterNode.GetID();
            const index = this.CheckLetterExistence(alphabetID)[1];

            if (!this.CheckLetterExistence(alphabetID)[0]) {
                this.PushData(selectedLetterNode, alphabetID);
                selectedLetterNode.SetGraphicalLine(this.dragStartPosition.x, this.dragStartPosition.y, selectedLetterNode.node.getWorldPosition().x, selectedLetterNode.node.getWorldPosition().y, Constant.GRAPHICS_LINE_OFFSET);
                this.dragStartPosition = selectedLetterNode.node.getWorldPosition();
                //Sound
                SoundManager.instance.AlphabetSelectionSound();
            }
            else {
                this.ModifySelection(index);
                this.dragStartPosition = selectedLetterNode.node.getWorldPosition();
            }
        }
    }
    //#endregion

    //#region -CheckLetterExistence
    /**
     * @description -For prevent multiple selection of same letter/alphabet and also getting index number of _alphabetID.
     * @param _alphabetID 
     * @returns In the form of array of bool and number.
     */
    CheckLetterExistence(_alphabetID: number): [boolean, number] {
        const idExist = this.selectedLetterID.findIndex((_value: number, _index: number) => _value == _alphabetID);
        return [idExist !== -1, idExist];
    }
    //#endregion

    //#region -PushData
    /**
     * @description - Pushing selected alphabet and enable background image.
     * @param _selectedLetterNode 
     * @param _alphabetID 
     */
    PushData(_selectedLetterNode: LetterDatabase, _alphabetID: number): void {
        this.selectedLetterID.push(_alphabetID);
        _selectedLetterNode.SetBackgroundSprite(true);
        const selectedAlphabet = _selectedLetterNode.GetLetter();
        this.letterArray.push(selectedAlphabet);
        this.selectedLetterArray.push(_selectedLetterNode);
        //letter UI
        this.SelectedAlphabetUIRender();
    }
    //#endregion

    //#region -ModifySelection
    /**
     * @description - For deselect Letter/Alphabet.
     * @param _index 
     */
    ModifySelection(_index: number): void {
        if (_index !== -1) {
            this.selectedLetterID.splice(_index + 1, this.selectedLetterID.length - _index);
            this.letterArray.splice(_index + 1, this.letterArray.length - _index);
            for (let i = this.selectedLetterArray.length - 1; i > _index; i--) {
                this.selectedLetterArray[i].SetBackgroundSprite(false);
            }
            this.selectedLetterArray.splice(_index + 1, this.selectedLetterArray.length - _index);
            this.SelectedAlphabetUIRender();
        }
    }
    //#endregion

    //#region -ShuffleAlphabetContainer
    /**
     * @description - Shuffle alphabet container's alphabets position.
     */
    ShuffleAlphabetContainer(): void {
        const shufflePosition = this.LettersPosition();
        this.ShuffleArray(this.alphabetsArray);

        this.alphabetsArray.forEach((_alphabetNode: Node, _index: number) => {
            tween(_alphabetNode).to(0.6, { position: new Vec3(shufflePosition[_index]['x'], shufflePosition[_index]['y'], 1) }, { easing: 'backOut' }).start();
        })
    }
    //#endregion

    //#region -SelectedAlphabetUIRender
    SelectedAlphabetUIRender(): void {
        const selectedAphabetText: string = this.GetSelectedLetter(this.letterArray)
        this.letterSelectionUIText.string = selectedAphabetText;
        this.letterSelectionUIOutlineText.string = selectedAphabetText;
        this.letterSelectionUIShadowText.string = selectedAphabetText;

        const uiTransform = this.letterSelectionUIText.getComponent(UITransform);
        const rectWidth = uiTransform.width + Constant.SELECTION_POPUP_ALPHABET_ENLARGE;
        const rectHeight = (uiTransform.height + Constant.SELECTION_POPUP_ALPHABET_ENLARGE) / 2;

        const worldPos = this.alphabetGraphics.node.getWorldPosition();
        const posX = worldPos.x - rectWidth / 2;
        const posY = worldPos.y - rectHeight / 2;

        this.alphabetGraphics.clear();
        if (this.letterSelectionUIText.string.length < 2)
            this.alphabetGraphics.circle(worldPos.x, worldPos.y, rectHeight / 2);
        else
            this.alphabetGraphics.roundRect(posX, posY, rectWidth, rectHeight, Constant.SELECTION_POPUP_RADIUS);

        this.alphabetGraphics.fill();
        this.alphabetGraphics.stroke();
    }
    //#endregion

    //#region -ResetAlphabetGrid
    /**
     * @description - Reset some temporary variable/array for Reselecting Letters/Alphabet for match.
     */
    ResetAlphabetGrid(): void {
        this.letterArray = [];
        this.selectedLetterID = [];
        for (let i = 0; i < this.selectedLetterArray.length; i++) {
            this.selectedLetterArray[i].SetBackgroundSprite(false);
        }
        this.selectedLetterArray = [];
    }
    //#endregion

    //#region -LettersPosition
    /**
     * @description - For Calculate dynamicaly position for letters.
     * @returns Position of placing Alphabet/Letters in Circle.
     */
    LettersPosition(): Object[] {
        const positions = [];
        const totalNumberOfLetters = Constant.LEVEL_JSON['letters'].length;

        for (let i = 0; i < totalNumberOfLetters; i++) {
            const angle = ((2 * Math.PI / totalNumberOfLetters) * i) + Constant.ANGLULAR_OFFSET_IN_RADIAN;
            const x = Math.round(Constant.RADIUS_OF_ALPHABET_CONTAINER * Math.cos(angle));
            const y = Math.round(Constant.RADIUS_OF_ALPHABET_CONTAINER * Math.sin(angle));
            positions.push({ x, y });
        }
        return positions;
    }
    //#endregion

    //#region -GetLetterNode
    /**
     * @description - For reuse letter node if already instantiated and available.
     * @param _prefab Letter/Alphabet Node
     * @returns Letter/Alphabet Node.
     */
    GetLetterNode(_prefab: Prefab): Node {
        if (this.letterPoolNode.children.length > 0) {
            return this.letterPoolNode.children[0];
        } else {
            return instantiate(_prefab);
        }
    }
    //#endregion

    //#region -AlphabetPool
    AlphabetPool(): void {
        this.CursorArrowRemoveInteractive();
        this.alphabetsArray.forEach((_node: Node, _index: number) => {
            _node.getComponent(LetterDatabase).ResetLetter();
            _node.getComponent(LetterDatabase).SetBackgroundSprite(false);
            _node.setParent(this.letterPoolNode);
        })
        this.alphabetsArray = [];
    }
    //#endregion

    //#region -shuffleArray
    /**
     * @description - For shuffle array of alphabets.
     * @param array - array for shuffle.
     * @returns new shuffled array.
     */
    ShuffleArray(array: Node[]): void {
        for (let p = 0; p < 5; p++) {
            const indexArray: { a: number; b: number }[] = [];
            let isChangedArray = false;

            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));

                if (i !== j) isChangedArray = true;

                [array[i], array[j]] = [array[j], array[i]];
                indexArray.push({ a: i, b: j });
            }

            if (isChangedArray) return;
        }
    }
    //#endregion

    //#region -onDisable
    /**
     * @description - Remove Events while scene off. (Compulsory otherwise will get bugs while playing.);
     */
    protected onDisable(): void {
        input.off(Input.EventType.TOUCH_START, this.OnTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.OnTouchOver, this);
        input.off(Input.EventType.TOUCH_END, this.OnTouchEnd, this);
        input.off(Input.EventType.TOUCH_CANCEL, this.OnTouchEnd, this);
        this.CursorArrowRemoveInteractive();
    }
    //#endregion
}