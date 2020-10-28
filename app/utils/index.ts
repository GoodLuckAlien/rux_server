/**
 *
 * @param msg 过滤文本
 */
export function filterHTMLTag(msg) {
  msg = msg.replace(/<\/?[^>]*>/g, ''); /* 过滤标签 */
  msg = msg.replace(/[|]*\n/, ''); /* 过滤空格 */
  msg = msg.replace(/&npsp;/ig, ''); /* 去掉npsp */
  return msg;
}

