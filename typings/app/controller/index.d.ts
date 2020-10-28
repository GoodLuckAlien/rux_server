// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDoc from '../../../app/controller/doc';
import ExportMenu from '../../../app/controller/menu';
import ExportTag from '../../../app/controller/tag';
import ExportUpload from '../../../app/controller/upload';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    doc: ExportDoc;
    menu: ExportMenu;
    tag: ExportTag;
    upload: ExportUpload;
    user: ExportUser;
  }
}
