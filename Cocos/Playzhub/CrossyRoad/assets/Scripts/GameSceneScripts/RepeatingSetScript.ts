import { _decorator, Asset, Component, instantiate, Prefab, resources, Vec3 } from 'cc';
import { Constant } from '../Constant';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('RepeatingSetScript')
export class RepeatingSetScript extends Component {
    @property([Prefab]) fiveUnitSubsetPrefab: Prefab[] = [];
    @property([Prefab]) tenUnitSubsetPrefab: Prefab[] = [];
    @property([Prefab]) fiftenUnitSubsetPrefab: Prefab[] = [];
    @property([Prefab]) thirtyUnitSubsetPrefab: Prefab[] = [];
    public isRender: boolean = false;
    public pos: Vec3;

    // public patternSet: string[] = [];
    patternSet: (string | { [unit: string]: number })[] = [];

    protected async onEnable(): Promise<void> {
        await this.ChoosePattern();
        // await this.GenerateEndlessSet();
    }

    //#region  Load Patterns for Sets
    async ChoosePattern(): Promise<void> {
        try {
            const asset = await new Promise<Asset>((resolve, reject) => {
                resources.load('RepeatSetPattern', Asset, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });

            // asset contains raw JSON data as string or object, parse if needed
            let jsonData;
            // asset.json is usually undefined if Asset is generic, so parse:
            if ((asset as any).json) {
                jsonData = (asset as any).json;  // if it exists
            } else {
                // If asset contains raw data string, parse it
                // This is sometimes needed if JSON is loaded as text
                jsonData = JSON.parse(asset['_native'] || '{}');
            }

            const randomIndex = Math.floor(Math.random() * 2);
            if (Constant.mode === 'tutorial') {
                if (Constant.isMobile) {
                    this.patternSet = jsonData.pattern.tutorial['mobile'];
                    // console.log(this.patternSet);
                    await this.TutorialSet();
                }
                else {
                    this.patternSet = jsonData.pattern.tutorial['pc'];
                    await this.TutorialSet();
                }
            }
            else {
                this.patternSet = jsonData.pattern[Constant.mode][randomIndex];
                await this.GenerateEndlessSet();
            }
        } catch (err) {
            console.error('Failed to load RepeatSetPattern:', err);
        }
    }
    //#endregion

    //#region  Chhose Pattern for Set
    async GenerateEndlessSet(): Promise<void> {
        if (!this.patternSet || this.patternSet.length === 0) {
            console.warn("Pattern set is empty or undefined");
            return;
        }

        let currentZ = -25;   // Starting Z position
        let previousUnit = 0;
        let lastFiveIndex = -1;
        let lastThirtyIndex = -1;

        this.patternSet.forEach((entry, i) => {
            let unit = "";
            let prefabIndex = -1;

            if (typeof entry === "string") {
                unit = entry;
                // pick random prefab
            } else if (typeof entry === "object" && entry !== null) {
                const keys = Object.keys(entry);
                if (keys.length !== 1) {
                    console.warn("Invalid pattern object:", entry);
                    return;
                }
                unit = keys[0];
                prefabIndex = entry[unit]; // specific index
                if (Constant.mode !== 'tutorial') {
                    if (prefabIndex === 0 && unit === '5') {
                        let newIndex = 3 + Math.floor(Math.random() * 6);
                        let attempts = 5;
                        while (newIndex === lastFiveIndex && attempts-- > 0) {
                            newIndex = 4 + Math.floor(Math.random() * 6);
                        }
                        prefabIndex = newIndex;
                        lastFiveIndex = prefabIndex;
                    }
                    if (prefabIndex === 0 && unit === '30') {
                        let newIndex = 1 + Math.floor(Math.random() * 8);
                        let attempts = 6;
                        while (newIndex === lastThirtyIndex && attempts-- > 0) {
                            newIndex = Math.floor(Math.random() * 4);
                        }
                        prefabIndex = newIndex;
                        lastThirtyIndex = prefabIndex;
                    }
                }
            }

            let prefabArr: Prefab[] = [];

            if (unit === "5") prefabArr = this.fiveUnitSubsetPrefab;
            else if (unit === "10") prefabArr = this.tenUnitSubsetPrefab;
            else if (unit === "15") prefabArr = this.fiftenUnitSubsetPrefab;
            else if (unit === "30") prefabArr = this.thirtyUnitSubsetPrefab;
            else {
                console.warn(`Unknown unit size in pattern: ${unit}`);
                return;
            }

            if (prefabArr.length === 0) {
                console.warn(`Prefab array for unit ${unit} is empty`);
                return;
            }

            // Use specific index or fallback to random
            if (prefabIndex < 0 || prefabIndex >= prefabArr.length) {
                prefabIndex = Math.floor(Math.random() * prefabArr.length);
            }

            const prefab = prefabArr[prefabIndex];

            // Position logic
            const unitValue = Number(unit);
            if (isNaN(unitValue)) {
                console.warn(`Invalid unit: ${unit}`);
                return;
            }

            if (i === 0) {
                currentZ += unitValue / 2;
            } else {
                currentZ += previousUnit / 2 + unitValue / 2;
            }

            const instance = instantiate(prefab);
            instance.setParent(this.node);

            const pos = instance.getPosition();
            pos.z = currentZ;
            instance.setPosition(pos);

            previousUnit = unitValue;
        });

        if (GameManager.instance) {
            GameManager.instance.StartGameFunctionality();
        }

    }
    //#endregion

    //#region  Tutorial Pattern set
    async TutorialSet(): Promise<void> {
        if (!this.patternSet || this.patternSet.length === 0) {
            console.warn("Pattern set is empty or undefined");
            return;
        }

        let currentZ = -25;   // Starting Z position
        let previousUnit = 0;
        // let lastFiveIndex = -1;
        let lastThirtyIndex = -1;
        this.patternSet.forEach((entry, i) => {
            let unit = "";
            let prefabIndex = -1;

            if (typeof entry === "string") {
                unit = entry;
                // pick random prefab
            } else if (typeof entry === "object" && entry !== null) {
                const keys = Object.keys(entry);
                if (keys.length !== 1) {
                    console.warn("Invalid pattern object:", entry);
                    return;
                }
                unit = keys[0];
                prefabIndex = entry[unit]; // specific index
                if (GameManager.instance.countRepeatSet === 1) {
                    if ((prefabIndex === 9 || prefabIndex === 10) && unit === '30') {
                        let newIndex = 11;
                        prefabIndex = newIndex;
                        lastThirtyIndex = prefabIndex;
                    }
                }
            }

            let prefabArr: Prefab[] = [];

            if (unit === "5") prefabArr = this.fiveUnitSubsetPrefab;
            else if (unit === "10") prefabArr = this.tenUnitSubsetPrefab;
            else if (unit === "15") prefabArr = this.fiftenUnitSubsetPrefab;
            else if (unit === "30") prefabArr = this.thirtyUnitSubsetPrefab;
            else {
                console.warn(`Unknown unit size in pattern: ${unit}`);
                return;
            }

            if (prefabArr.length === 0) {
                console.warn(`Prefab array for unit ${unit} is empty`);
                return;
            }

            // Use specific index or fallback to random
            if (prefabIndex < 0 || prefabIndex >= prefabArr.length) {
                prefabIndex = Math.floor(Math.random() * prefabArr.length);
            }

            const prefab = prefabArr[prefabIndex];

            // Position logic
            const unitValue = Number(unit);
            if (isNaN(unitValue)) {
                console.warn(`Invalid unit: ${unit}`);
                return;
            }

            if (i === 0) {
                currentZ += unitValue / 2;
            } else {
                currentZ += previousUnit / 2 + unitValue / 2;
            }

            const instance = instantiate(prefab);
            instance.setParent(this.node);

            const pos = instance.getPosition();
            pos.z = currentZ;
            instance.setPosition(pos);

            previousUnit = unitValue;
        });

        if (GameManager.instance) {
            GameManager.instance.StartGameFunctionality();
        }

    }
    //#endregion

    //#region Pos Set Of Set
    SetPosition(x: number, y: number, z: number) {
        this.pos = new Vec3(x, y, z);
    }
    //#endregion

    //#region Check a certain distance to movement all property of game
    update(deltaTime: number) {
        if (!GameManager.instance) return;
        this.isRender =
            this.pos.z - 100 < GameManager.instance.GetPlayerPos().z &&
            this.pos.z + 25 > GameManager.instance.GetCamPos().z;
        // console.log(this.isRender, (this.pos.z - 70), GameManager.instance.GetCamPos().z, (this.pos.z + 25));
    }
    CheckRender() {
        return this.isRender;
    }
    //#endregion
}


