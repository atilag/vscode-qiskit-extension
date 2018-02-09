import * as Q from "q";
import {IPackage} from "./interfaces"
import {PipWrapper} from "./pipWrapper"
import {Version} from "./version"
import { resolve } from "dns";

export class Qiskit implements IPackage {
    checkForNewVersion() : Q.Promise<string> {
        return Q.Promise((resolve,reject) => {
            PipWrapper.search('qiskit').then((installed, latest) => {
                let verInstalled = Version.fromString(installed);
                let verLatest = Version.fromString(latest);
                if(verInstalled.isLesser(verLatest)){
                    resolve(latest);
                }else{
                    resolve('');
                }
            }).catch(error => {
                reject(error);
            });
        });
    }

    update() : Q.Promise<string> {
        return Q.Promise((resolve, reject) => {

        });
    }
}