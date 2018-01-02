import * as Q from "q";
import {CommandExecutor} from "./commandExecutor";
import {Version} from "./version";
import {IDependency, IVersion} from "./interfaces";

export class Dependency implements IDependency {
    Name: string;
    Version: IVersion;
    constructor(name: string, version: IVersion){
        this.Name = name;
        this.Version = version;
    }

    public isInstalled(): Q.Promise<IDependency> {
        // We can check if Python is installed by invoking it with the
        // --version option.
        return Q.Promise((resolve, reject) => {
            return this.getInstalledVersion().then(installedVersion =>{
                if(installedVersion.isGreater(this.Version) ||
                   installedVersion.isEqual(this.Version)){
                     resolve(this);
                }else{
                    reject("Version >= " + this.Version.toString() + "of " +
                        "package " + this.Name + " is required");
                }
            }).catch((error)=>{
                reject(error);
            });
        });
    }

    private getInstalledVersion(): Q.Promise<IVersion> {
        return Q.Promise((resolve, reject) => {
            return (new CommandExecutor).exec(this.Name,["--version"])
            .then((stdout) => {
                resolve(Version.fromString(stdout.split(" ")[1]));
            })
            .catch((stderr)=>{
                reject(stderr);
            });
        });
    }

}