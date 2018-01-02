import * as Q from "q";

export interface IVersion  {
    Major: Number;
    Minor: Number;
    Maintenance: Number;
    toString() : string;
    isEqual(version: IVersion): boolean;
    isGreater(version: IVersion): boolean;
    isLesser(version: IVersion): boolean;
}

export interface IDependency {
    Name: string,
    Version: IVersion,
    isInstalled(): Q.Promise<void>;
}

