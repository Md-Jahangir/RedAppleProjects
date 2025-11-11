import { _decorator, Asset, Component, Node, resources } from 'cc';

export class AssetLoader {
    private static assetsCache: Record<string, Asset> = {};

    public static async LoadAsset<T extends Asset>(_folder: string, _assetName: string, _type: typeof Asset): Promise<T> {
        const assetPath = `${_folder}/${_assetName}`;

        if (this.assetsCache[assetPath]) {
            return this.assetsCache[assetPath] as T;
        }

        return new Promise<T>((resolve, reject) => {
            resources.load(assetPath, _type, (err: Error | null, data: T) => {
                if (err) {
                    console.error(`Failed to load asset: ${assetPath}`, err);
                    reject(err);
                    return;
                }

                this.assetsCache[assetPath] = data;
                resolve(data);
            });
        });
    }

    public static clearCache(): void {
        this.assetsCache = {};
    }
}

