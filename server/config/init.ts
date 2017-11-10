const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const favicon = require('serve-favicon');
const path = require('path');
const log4js = require('log4js');
import { baseRender } from '../libs/util';

module.exports = function (app, express) {
  app.set('view engine', 'html');
  nunjucks.configure(path.join(__dirname, '../../'), {
    autoescape: false,
    express: app,
    tags: {
      variableStart: '{$',
      variableEnd: '}',
    }
  });
  app.use(log4js.connectLogger(
    log4js.getLogger("http"),
    {
      level: 'auto',
      format: ':method :status :url '
    }
  ));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../../public')));
  app.response.baseRender = baseRender;
};