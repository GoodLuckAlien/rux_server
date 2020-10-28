// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDoc from '../../../app/model/doc';
import ExportRouter from '../../../app/model/router';
import ExportTag from '../../../app/model/tag';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Doc: ReturnType<typeof ExportDoc>;
    Router: ReturnType<typeof ExportRouter>;
    Tag: ReturnType<typeof ExportTag>;
    User: ReturnType<typeof ExportUser>;
  }
}
