// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportComment from '../../../app/model/comment';
import ExportDoc from '../../../app/model/doc';
import ExportRouter from '../../../app/model/router';
import ExportStar from '../../../app/model/star';
import ExportTag from '../../../app/model/tag';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Comment: ReturnType<typeof ExportComment>;
    Doc: ReturnType<typeof ExportDoc>;
    Router: ReturnType<typeof ExportRouter>;
    Star: ReturnType<typeof ExportStar>;
    Tag: ReturnType<typeof ExportTag>;
    User: ReturnType<typeof ExportUser>;
  }
}
