import * as Q from "q";
import * as httpm from 'typed-rest-client/HttpClient';

const PYPI_BASE_URL = 'http://pypi.python.org/pypi/';

export class PyPiWrapper {
    public packageInfo(pkg: string) : Q.Promise<string> {
        let url: string = PYPI_BASE_URL + pkg + '/json';
        let httpc: httpm.HttpClient = new httpm.HttpClient('vsts-node-api');
        return httpc.get(url).then((res: httpm.HttpClientResponse) => {
            res.readBody().then((body: string) => {
                console.log("response: " + body);
                return Q.resolve(body);
            }).catch(error => {
                console.log("error: " + error);
                return Q.reject(error);
            })
        });
    }
}