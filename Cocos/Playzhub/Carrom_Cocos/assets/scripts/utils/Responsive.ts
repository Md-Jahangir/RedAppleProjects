import { ResolutionPolicy, view } from "cc";

export class Responsive {

    public static Resize(): void {
        // const isLandscape = screen.orientation.type === 'landscape-primary';
        const isLandscape = screen.orientation.type.startsWith('landscape');
        console.log('órientation', screen.orientation, isLandscape);

        const W = 1080;
        const H = 1920;

        if (!isLandscape) {
            view.setDesignResolutionSize(W, H, ResolutionPolicy.FIXED_WIDTH);
            console.log('Portrait → FIXED_WIDTH');
        } else {
            view.setDesignResolutionSize(W, H, ResolutionPolicy.SHOW_ALL);
            console.log('Landscape → EXACT_FIT');
        }

        view.resizeWithBrowserSize(true);
    }
}


