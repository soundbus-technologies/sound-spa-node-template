import * as http from '../libs/axios';
import { Request } from '@types/express';
/**
 * TestApi模块的api
 * @param req
 * @constructor
 */
class TestApi {
    private req: Request;
    constructor(req: Request) {
        this.req = req;
    }
    async getToken(data:any) {
        const token = await http.post(this.req, '/api/v1/uac/oauth/token', {
            data,
            headers: {
                'Authorization': 'Basic c29wX2FwcF9wbGF0Zm9ybTpZWEJ3Y0d4aGRHWnZjbTFmYzJWamNtVjA=',
            },
        }, 'form');
        return token;
    }

    async getTest(data:any) {
        const test = await http.get(this.req, '/cust/platform/customer?platform=app');
        return test;
    }
}

export default TestApi;
