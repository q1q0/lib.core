import { AppUtils } from "./app-utils";

export class Logger {
    static warn(e: any) {
        if (AppUtils.enableLogging === true) {
            console.warn(e);
        }
    }

    static log(e: any) {
        if (AppUtils.enableLogging === true) {
            console.log(e);
        }
    }

    static info(e: any) {
        if (AppUtils.enableLogging === true) {
            console.info(e);
        }
    }

    static error(e: any) {
        if (AppUtils.enableLogging === true) {
            console.error(e);
        }
    }

    static debug(e: any) {
        if (AppUtils.enableLogging === true) {
            console.log(e);
        }
    }
}