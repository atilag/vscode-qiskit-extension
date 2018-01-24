
import * as vscode from "vscode";
import * as Q from "q";
import { POINT_CONVERSION_COMPRESSED } from "constants";
import { configure } from "vscode/lib/testrunner";

import {IDependency} from "./interfaces";
import {Dependency} from "./dependency";
import {Version} from "./version";

export class DependenciesMgr {
    private static dependencies : [IDependency] = [
        new Dependency('pip3', Version.fromString('8')),
        new Dependency('python', Version.fromString('3.5'))
    ];

    constructor(){
    }

    public static checkDependencies() : Q.Promise{
        // TODO: Read depdencies from external file
        // Check for python > 3.5
        // Check for pip
        let packages: Q.Promise<IDependency>[] = [];
        DependenciesMgr.dependencies.forEach(dep => {
            packages.push(dep.isInstalled());
        });
        
        return Q.all(packages);
    }

    public static checkForNewVersion() : Q.Promise<[]> {
        


    }
}