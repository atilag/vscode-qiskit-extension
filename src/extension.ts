'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as Q from "q";

import {CommandPaletteHelper} from "./commandPaletteHelper";
import {DependencyMgr} from "./dependencyMgr";
import {PackageMgr} from "./packageMgr";
import {configure} from 'vscode/lib/testrunner';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log('Activating Qiskit extension...');
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    registerQiskitCommands(context);

    DependencyMgr.checkDependencies().then((deps) => {
        console.log('All dependencies are met!');
        deps.forEach(dep => {
            console.log("Package: " + dep.Name + " Version: " +
                dep.Version);
        });
        return Q.resolve();
    // Check for pyhton packages!
    }).then(() => {
        console.log('Check for required python packages...');
        return PackageMgr.check();
    // Iterate over the list of packages
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