import * as Q from "q";
import {IPackage} from "./interfaces"
import {PipWrapper} from "./pipWrapper"
import {Version} from "./version"
import { resolve } from "dns";

export class Qiskit implements IPackage {
    public Info;
    update() : Q.Promise<string> {
        return Q.reject("Not implemented!");
    }

    check() : Q.Promise<void> {
        return Q.reject("Not implemented!");
    }
}