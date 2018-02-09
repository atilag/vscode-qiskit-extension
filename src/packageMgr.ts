import * as vscode from "vscode";
import * as Q from "q";
import { configure } from "vscode/lib/testrunner";

import {IPackage} from "./interfaces";
import {PipPackage} from "./pipPackage";
import {Version} from "./version";

export class PackageMgr {
    private static packages : [IPackage] = [
        new PipPackage('qiskit'),
    ];

    constructor() {
    }

    public static check() : Q.Promise {
        let packages: Q.Promise<IPackage>[] = [];
        this.packages.forEach(pkg => {
            packages.push(pkg.check());
        });
        return Q.all(packages);
    }

}