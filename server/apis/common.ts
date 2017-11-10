import * as http from '../libs/axios';
import { Request } from '@types/express';

/**
 * 通用模块的Api类
 * @param req
 * @constructor
 */
class CommonApi {
  private req: Request;

  constructor(req: Request) {
    this.req = req;
  }

  async wxConfig() {
    const app = this.req.headers['x-wechat-application'];
    const {protocol, originalUrl} = this.req;
    let fullUrl = `${ protocol }://${ this.req.get('host') }/${app}${ originalUrl }`;
    // console.log(fullUrl, '-------fullurl');
    let url = encodeURIComponent(fullUrl.split('#')[0]);
    let wx = await http.post(this.req, '/wx/js/signature', {
      data: `url=${url}`
    });
    return wx.data;
  }
}

export default CommonApi;
