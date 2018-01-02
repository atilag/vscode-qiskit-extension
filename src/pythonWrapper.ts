import * as Q from "q";
import {CommandExecutor} from "./commandExecutor"
import {IPackage} from "./interfaces"


export class PythonWrapper implements ICommandWrapper {
    private static PYTHON_COMMAND = "python";

    public isInstalled(): Q.Promise {
        // We can check if Python is installed by invoking it with the
        // --version option.
        return Q.Promise((resolve, reject) => {
            return this.getVersion().then(version =>{
                resolve({name: PythonWrapper.PYTHON_COMMAND, version: version});
            }).catch((error)=>{
                reject(error);
            });
        });
    }

    public getVersion(): Q.Promise<string> {
        return Q.Promise<string>((resolve, reject) => {
            return (new CommandExecutor).exec(PythonWrapper.PYTHON_COMMAND,
                ["--version"])
            .then((stdout) => {
                resolve(stdout.split(" ")[1]);
            })
            .catch((stderr)=>{
                reject(stderr);
            });
        });
    }

    public getName(): Q.Promise<string> {
        return Q.resolve(PythonWrapper.PYTHON_COMMAND);
    }
}