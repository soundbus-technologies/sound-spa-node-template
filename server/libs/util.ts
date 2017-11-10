import { Request } from "@types/express";
import errConfig from '../config/error.config';

/**
 * 微信授权
 * @param appId
 * @param redirect_url
 * @returns {string}
 */
export function wxAuthUrl(appId: string, redirect_url: string) {
    redirect_url = encodeURIComponent(redirect_url);
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_url}&response_type=code&scope=snsapi_base#wechat_redirect`
}

/**
 * 获取完整url
 * @param req
 * @returns {string}
 */

export function getFullUrl(req: Request) {
    let protocol = req.headers["x-forwarded-proto"];
    return `${ req.protocol }://${ req.get('host') }/${req.headers['x-wechat-application']}${ req.originalUrl }`;
}

/**
 * 渲染页面的方法
 * @param viewPath 页面路径
 * @param data  页面所需首屏数据
 */
export function baseRender(viewPath: string, data?: any) {
 /* const p = 'public';
  console.log(`+++ node/libs/util.js - viewPath +++ ${p}/views/${viewPath}`);
  console.log(`+++ node/libs/util.js - data +++ ${JSON.stringify(data)}`);

  if (Object.keys(errConfig).indexOf(String(this.statusCode)) > -1) {
    this.render(`${p}/views/${viewPath}`, data);
  } else {
    this.render(`${p}/views/${viewPath}`, {state: JSON.stringify(data)});
  }*/
}


/**
 * 首字母大写的方法
 * @param str 需要大写的字符串
 */

export function UpperFirstLetter(str: string) {
    var str = str.toLowerCase();
    str = str.replace(/\b\w+\b/g, function(word){
        return word.substring(0,1).toUpperCase()+word.substring(1);
    });
    return str;
}
