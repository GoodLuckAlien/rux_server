// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHanderToken from '../../../app/middleware/handerToken';

declare module 'egg' {
  interface IMiddleware {
    handerToken: typeof ExportHanderToken;
  }
}
