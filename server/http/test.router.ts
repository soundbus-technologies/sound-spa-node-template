import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
import checkToken from '../middleware/check.token';
import TestApi from '../apis/test';

// 浏览器发过来的post请求  /api/newauth
router.post('/newauth', checkToken, async function (req: Request, res: Response, next: NextFunction) {
    try {
        res.send({
            msg: 'ok, to homepage',
        });
    } catch (err) {
        next(err);
    }
});

// 浏览器发过来的get请求  /api/newtest
router.get('/newtest', checkToken, async function (req: Request, res: Response, next: NextFunction) {
    try {
        const result = await new TestApi(req).getTest(req.body);
        console.log(result.data);
        res.send(result.data);
    } catch (err) {
        next(err);
    }
});

module.exports = function (app) {
  app.use('/api', router);
};

