
export class Utils {
    //#region - Get the different types shapes's co-ordinate
    public static GetShapeLayout(type: string): number[][] {
        const shapes: Record<string, number[][]> = {
            L: [
                [1, 0],
                [1, 0],
                [1, 1]
            ],
            Lflip: [
                [0, 1],
                [0, 1],
                [1, 1]
            ],
            T: [
                [1, 1, 1],
                [0, 1, 0]
            ],
            FlipT: [
                [0, 1],
                [1, 1],
                [0, 1]
            ],
            Square: [
                [1, 1],
                [1, 1]
            ],
            VLine: [
                [1],
                [1],
                [1],
                [1]
            ],
            HLine: [
                [1, 1, 1, 1],
            ],
            Z: [
                [1, 1, 0],
                [0, 1, 1]
            ],
            S: [
                [0, 1, 1],
                [1, 1, 0]
            ],
            Single: [
                [1]
            ]
        };
        return shapes[type] || shapes.Square;
    };
    //#endregion

    //#region - Get random shapes
    public static GetRandomShape(): string {
        const shapes = ["L", "T", "Square", "Line", "Z", "S"];
        return shapes[Math.floor(Math.random() * shapes.length)];
    };
    //#endregion

    //#region - Get random color code
    public static GetRandomColor(): number[] {
        const colors: number[][] = [
            [255, 0, 0],    // red
            [0, 255, 0],    // green
            [0, 0, 255],    // blue
            [128, 0, 128],  // purple
            [255, 255, 0],  // yellow
            [165, 42, 42]   // brown
        ];

        return colors[Math.floor(Math.random() * colors.length)];
    };
    //#endregion

}


