// allow tsc to not throw errors for tests when referencing window.module
interface Window {
    module?: any
}

declare var require: any;

