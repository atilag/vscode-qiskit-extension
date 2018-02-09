import * as vscode from 'vscode';
import * as Q from "q";
import {CommandExecutor} from "./commandExecutor";
import {Version} from "./version";
import {IPackageInfo, IPackage, IVersion, IVersionInfo} from "./interfaces";
import {PipWrapper} from "./pipWrapper";
import {PyPiWrapper} from "./pypiWrapper";

export class PipPackage implements IPackage {
    public Info: IPackageInfo;
    private pip : PipWrapper;
    private pypi: PyPiWrapper;
    
    constructor(name: string, version: IVersionInfo){
        this.Info.Name = name
        this.Info.Version = new Version(version.Major, version.Minor,
            version.Maintenance);
    }

    private isInstalled(): Q.Promise {
        this.pip.show(this.Info.Name).then((stdout: string) => {
            return Q.resolve();
        }).catch(error => {
            return Q.reject(error);
        });
    }

    public check(): Q.Promise<void> {
        this.isInstalled().then(() => {
            // Let's check for new versions
            return this.pypi.packageInfo(this.Info.Name);
        }).then((pkgInfo: IPackageInfo) => {
            if(pkgInfo.Version.isGreater(this.Info.Version)){
                // TODO: Show a user dialog and asks for permission to update
                return vscode.window.showInputBox({
                    ignoreFocusOut: true,
                    prompt: "There's a new QISKit release. Do you want to update?",
                    value: 'Yes',
                });
            }
        // There's a new version...
        }).then((selection: string|undefined) => {
            if(selection == 'Yes'){
                this.pip.update('qiskit').then(() => {
                    return Q.resolve();
                }).catch(error => {
                    // TODO: sure? 
                    // If we couldn't upgrade, there's no critical error.
                    console.log("ERROR Upgrading QISKit package: " + error);
                    return Q.resolve();
                });
            }
        });
    }

    public update(): Q.Promise<string> {

    }
}