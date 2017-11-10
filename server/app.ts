import * as express from 'express';
import { Response, Request, NextFunction } from 'express';
import * as fs from 'fs';
import { getRedirectUrl, getFullUrl } from './libs/util';
import errorTip from './config/error.config';

const app = express();
app.set('trust proxy', true);
require('./config/init')(app, express);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.project = req.baseUrl || ' ';
  next();
});

let httpFiles = fs.readdirSync(`./dist/http/`);
httpFiles.forEach((file) => {
    if (file.indexOf('.js') < 0) return;
    require(`./http/${file}`)(app);
});

app.use(async(err, req: Request, res: Response, next: NextFunction) => {
  if (!err.response) { // node 挂了
    err = new Error(err);
    console.log(err,'-------这里是node挂了');
    res.status(500);
    return res.send('');
  }

  if (err.response.status === 401) {
    console.log('--------- 401全局授权 --------');
      return res.send('');
  }
  console.error(err, '----------error 全局');
  next(err);
});

app.use((err, req: Request, res: Response, next: NextFunction) => {
  res.status(err.response.status || 500);
  next(err);
});

app.use(function (req: Request, res: Response) {
  const err: any = new Error('这个页面不存在');
  err.status = 404;
  res.status(404);
  return res.send('');
});

export default app;
