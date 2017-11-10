import '@types/node';

import { Response } from 'express';

declare module 'express' {
  interface Response {
    project: string,
    baseRender: (viewPath: string, data?: any) => void
  }
}
