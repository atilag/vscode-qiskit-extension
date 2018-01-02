import * as Q from "q";
import {CommandExecutor} from "./commandExecutor"

export class PipWrapper {
    private static PIP_COMMAND = "pip3";
    public search(packageName: string): Q.Promise<boolean> {
        return Q.Promise((resolve, reject) => {
            reject("Not implemented");
        });
    }
}