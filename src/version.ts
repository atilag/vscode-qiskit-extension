import {IVersion} from "./interfaces"
import { NaptrRecord } from "dns";

export class Version implements IVersion {
    Major: Number = -1;
    Minor: Number = -1;
    Maintenance: Number = -1;

    constructor(major: Number, minor: Number, maintenance: Number){
        this.Major = major;
        this.Minor = minor;
        this.Maintenance = maintenance;
    }

    public static fromString(versionString: string) : IVersion {
        let versionStrings = versionString.split('.');
        let major: Number = -1;
        let minor: Number = -1;
        let maintenance: Number = -1;
        if(versionStrings[0] != null) {
            major = Number(versionStrings[0]);
        }
        if(versionStrings[1] != null) {
            minor = Number(versionStrings[1]);
        }
        if(versionStrings[2] != null) {
            maintenance = Number(versionStrings[2]);
        }
        return new Version(major, minor, maintenance);
    }

    toString() : string {
        let version = "Invalid version";
        if(this.Major > -1)
            version = this.Major.toString();
        if(this.Minor > -1)
            version = version.concat('.' + this.Minor.toString());
        if(this.Maintenance > -1)
            version = version.concat('.' + this.Maintenance.toString());

        return version;
    }

    isEqual(version: IVersion) : boolean {
        if(version.Major == this.Major ||
           version.Minor == this.Minor ||
           version.Maintenance == this.Maintenance){
                return true;
        }else{
                return false;
        }
    }

    isGreater(version: IVersion) : boolean {
        if(version.Major < this.Major){
            return true;
        }else if(version.Major == this.Major){
            if(version.Minor < this.Minor){
                return true;
            }else if(version.Minor == this.Minor){
                if(version.Maintenance < this.Maintenance){
                    return true;
                }
            }
        }
        return false;
    }

    isLesser(version: IVersion) : boolean {
        if(version.Major > this.Major){
            return true;
        }else if(version.Major == this.Major){
            if(version.Minor > this.Minor){
                return true;
            }else if(version.Minor == this.Minor){
                if(version.Maintenance > this.Maintenance){
                    return true;
                }
            }
        }
        return false;
    }
}
