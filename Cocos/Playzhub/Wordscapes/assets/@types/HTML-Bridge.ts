
export class HTML_Bridge {

    public static initDivID(_id: string): void {
        const divID = document.createElement('div');
        divID.id = _id;
        document.body.appendChild(divID);
    }

    public static async initExternalScript(path: string, onLoadCompleted: () => void) {
        return new Promise<void>((resolve, reject) => {
            try {
                const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${path}"]`);
                if (existingScript) {
                    if (existingScript.getAttribute("data-loaded") === "true") {
                        console.info("👇 Remote SDK is already loaded!");
                        onLoadCompleted();
                        resolve();
                    } else {
                        existingScript.addEventListener("load", () => {
                            onLoadCompleted();
                            resolve();
                        });
                        existingScript.addEventListener("error", () => {
                            reject(new Error("❗SDK Loading failed!"));
                        });
                    }
                    return;
                }

                const script = document.createElement("script");
                script.src = path;
                // script.async = true;

                script.onload = () => {
                    console.info("✅ Remote SDK is ready!");
                    script.setAttribute("data-loaded", "true");
                    onLoadCompleted();
                    resolve();
                };

                script.onerror = () => {
                    console.error("❗ SDK Loading failed!");
                    reject(new Error("SDK loading failed"));
                };

                document.head.appendChild(script);
            } catch (e) {
                reject(e);
            }
        });
    }


    public static async GameModel(path: string, header: string): Promise<void> {
        try {
            const response = await fetch(path, {
                headers: {
                    Authorization: header
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseAPI: { html: string } = await response.json();
            let modalContainer = document.getElementById('game-modal');

            // If the modal doesn't exist, create it
            if (!modalContainer) {
                HTML_Bridge.initDivID('game-modal');
                modalContainer = document.getElementById('game-modal');
            }

            modalContainer.innerHTML = responseAPI.html;
            modalContainer.style.display = 'flex';
            (window as any).closeModal = () => {
                const modal = document.getElementById('game-modal');
                if (modal) modal.style.display = 'none';
            };

        } catch (err) {
            console.error('Modal load failed:', err);
        }
    }
    public static async GameModelTest(): Promise<void> {
        try {
            const responseAPI: { html: string } = await new Promise<{ html: string }>((resolve) => {
                setTimeout(() => {
                    resolve({
                        html: `
                div class="modal-overlay">
                <div class="modal">
                    <h2>🎁 You Got a Bonus!</h2>
                    <p>Claim your 100 coins now!</p>
                    <button onclick="closeModal()">Claim</button>
                </div>
            </div>

            <style>
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }

                .modal {
                    background: white;
                    padding: 20px 30px;
                    border-radius: 12px;
                    text-align: center;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    font-family: sans-serif;
                }

                .modal button {
                    margin-top: 10px;
                    padding: 10px 20px;
                    border: none;
                    background: #28a745;
                    color: white;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                }

                .modal button:hover {
                    background: #218838;
                }
            </style>
              `
                    });
                }, 500);
            });
            let modalContainer = document.getElementById('game-modal');

            // If the modal doesn't exist, create it
            if (!modalContainer) {
                HTML_Bridge.initDivID('game-modal');
                modalContainer = document.getElementById('game-modal');
            }

            modalContainer.innerHTML = responseAPI.html;
            modalContainer.style.display = 'flex';
            (window as any).closeModal = () => {
                const modal = document.getElementById('game-modal');
                if (modal) modal.style.display = 'none';
            };

        } catch (err) {
            console.error('Modal load failed:', err);
        }
    }
}
