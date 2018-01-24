import * as Q from "q";
import {CommandExecutor} from "./commandExecutor"

export class PipWrapper {
    private static PIP_COMMAND = "pip3";
    public static search(): Q.Promise<boolean> {
        return Q.Promise((resolve, reject) => {
            (new CommandExecutor).exec(PipWrapper.PIP_COMMAND,["search",
                                       "qiskit"])
            .then((stdout) => {
                let indexInstalled = stdout.indexOf("INSTALLED:");
                let installed = stdout.substring(
                    stdout.indexOf("INSTALLED:") + 10,



            }).catch((stderr)=>{

            });
    }
}