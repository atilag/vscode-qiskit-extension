import * as Q from "q";
import {CommandExecutor} from "./commandExecutor"

type ParserFunction = (out: string) => string;

export class PipWrapper {
    private static PIP_COMMAND = "pip3";

    public show(pkg: string): Q.Promise<string> {
        let parserFunc : ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.exec("show", [pkg], parserFunc);
    }

    public search(pkg: string): Q.Promise<boolean> {
        let parserFunc : ParserFunction = (stdout: string) => {
            return "Need to implement this method!";
        };
        return this.exec("search", [pkg], parserFunc);
    }

    public install(pkg: string): Q.Promise<string>{
        let parserFunc : ParserFunction = (stdout: string) => {
            return "Need to implement this method!";
        };
        return this.exec("install", [pkg], parserFunc);
    }

    public update(pkg: string): Q.Promise<string>{
        let parserFunc : ParserFunction = (stdout: string) => {
            return "Need to implement this method!";
        };
        return this.exec("install", ["-U", "--no-cache-dir", pkg], parserFunc);
    }



    private exec(command: string, args:string [], parser: ParserFunction): 
        Q.Promise<string> {
            (new CommandExecutor).exec(PipWrapper.PIP_COMMAND,[command].concat(args))
            .then((stdout) => {
                return Q.resolve(parser(stdout));
            }).catch((stderr) => {
                return Q.reject(stderr);
            });
    }
}