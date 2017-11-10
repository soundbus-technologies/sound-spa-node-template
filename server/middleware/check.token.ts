import { Request, Response, NextFunction } from "@types/express";
const expiresTime:number = 3 * 24 * 60 * 60 * 1000; // cookies 过期时间 3d
import * as util from '../libs/util';
import TestApi from '../apis/test';

export default async function (req:Request, res:Response, next:NextFunction) {
  if (req.cookies['authorization']) {
      console.log('------ cookies里的token尚未过期 ----');
      console.log(req.cookies['Authorization']);
      req.headers['Authorization'] = req.cookies['authorization'];
      next();
  } else {
      try {
          const ret = await new TestApi(req).getToken(req.body);
          // res设置cookie.authorization
          const token = util.UpperFirstLetter(ret.data.token_type) + ' ' + ret.data.access_token;
          console.log('------ 获取token成功 ---- data ----');
          console.log(token);
          res.cookie('authorization', token, {
              // domain: cookieDomain,
              maxAge: expiresTime,
          });
          req['Authorization'] = token;
          next();
      } catch (error) {
          next(error);
      }
  }
};
