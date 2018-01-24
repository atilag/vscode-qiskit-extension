'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as Q from "q";

import {CommandPaletteHelper} from "./commandPaletteHelper";
import {DependenciesMgr} from "./dependenciesMgr";
import {configure} from 'vscode/lib/testrunner';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log('Activating Qiskit extension...');
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    registerQiskitCommands(context);

    DependenciesMgr.checkDependencies().then((deps) => {
        console.log('All depdencies are met!');
        deps.forEach(dep => {
            console.log("Package: " + dep.Name + " Version: " +
                dep.Version);
        });
        return Q.resolve();
    // Check for newer versions
    }).then(()=>{
        return DependenciesMgr.checkForNewVersions();
    // Update packages
    }).then(newPackages => {
        // TODO Update managment (ask user, install, etc...)
        if (newPackages.length > 0){
            console.log('Updates found for: ');
            newPackages.forEach(_package => {
                console.log(_package.name + " " + _package.version);
            });
        }
    }).catch(error => {
        console.log('Seems like some dependencies are not met: ' + error);
    });
}

function registerQiskitCommands(context: vscode.ExtensionContext): void {
    context.subscriptions.push(vscode.commands.registerCommand(`qiskitRun`, () => {
        return CommandPaletteHelper.run()
    }));
}


// this method is called when your extension is deactivated
export function deactivate() {
}