/// <reference types="vite/client" />

// some global object injected by platform
declare global {
    interface Window {
        aiSdk?: Record<string, any>;
        ywConfig?: Record<string, any>;
        ywSdk?: Record<string, any>;
    }
}

export { };