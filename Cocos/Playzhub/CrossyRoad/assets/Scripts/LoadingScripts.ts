import { _decorator, Component, director, Label, Node, ProgressBar, sys } from 'cc';
import { PlayzhubEventHandler } from './PlayzhubEventHandler';
import { Responsive } from './Responsive';
import { Constant } from './Constant';
import { HTML_Bridge } from '../@types/HTML-Bridge';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('LoadingScripts')
export class LoadingScripts extends Component {
    @property(ProgressBar)
    progressBar: ProgressBar = null!;
    @property(Label)
    loadingText: Label = null!;

    firstProgress: number = 2;
    progressValue: number = 0;
    private initialized = false;
    initializeAnalytics(): void {
        if (this.initialized) return;

        const GAME_KEY = '325414a9ea60c1b40a6a509aea881d21';
        const SECRET_KEY = '0aeb4e74f7b052a8267aaa1f16caca3e3af6baf4';

        GA.GameAnalytics.setEnabledManualSessionHandling(false); // Let GA manage sessions
        GA.GameAnalytics.setEnabledEventSubmission(true);        // Ensure events send
        GA.GameAnalytics.configureUserId(GAME_KEY);
        GA.GameAnalytics.configureBuild('1.0.0'); // optional
        GA.GameAnalytics.setEnabledInfoLog(true); // enable debug logs
        // Initialize the SDK
        GA.GameAnalytics.initialize(GAME_KEY, SECRET_KEY);
        this.initialized = true;
        console.log('[GA] Initialized', GA);
    }

    protected async onLoad(): Promise<void> {
        this.initializeAnalytics();
        GA.GameAnalytics.addDesignEvent('game:boot');

        // Emit browser event when Splash scene has started
        window.dispatchEvent(new Event('splash_scene_shown'));
        Constant.isMobile = sys.isMobile;
        Responsive.Resize();
        screen.orientation.addEventListener('change', () => {
            Responsive.Resize();
        })
        await HTML_Bridge.initExternalScript('https://games.playzhub.com/sdk/PlayzhubSDk_E6_IIFE.js', () => {
            // await HTML_Bridge.initExternalScript('https://stg-games.playzhub.com/sdk/PlayzhubSDk_E6_IIFE.js', () => {
            this.preloadSceneWithProgress("GameScene");
            this.UpdateGameStateFunc();
        });
    }
    start() {
        // localStorage.clear();

    }

    UpdateGameStateFunc() {
        PlayzhubEventHandler.ReceivedGameState((data: any) => {
            console.log('PlayzhubEventHandler data: ', data);
            if (data == null) {
                // Constant.mode = "tutorial";
                Constant.highScore = 0;
            } else {
                // Constant.mode = "easy";
                Constant.highScore = data.highScore;
            }
        })
        PlayzhubEventHandler.RequestGameState();
    }


    preloadSceneWithProgress(sceneName: string) {
        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "game_loading"
        );
        PlayzhubEventHandler.GameLoadingStarted();
        director.preloadScene(
            sceneName,
            (completedCount: number, totalCount: number) => {
                this.progressValue = completedCount / 490;
                this.ProgressBarFunc();
            },
            () => {
                // Scene fully loaded
                GA.GameAnalytics.addProgressionEvent(
                    "Complete",
                    "game_loading"
                );
                PlayzhubEventHandler.GameLoadingCompleted();
                director.loadScene(sceneName);
            }
        );
    }

    ProgressBarFunc() {
        this.progressBar.progress = this.progressValue;
        this.loadingText.string = "Loading..." + (Math.min(this.progressValue * 100, 100)).toFixed() + "%";
    }
}


