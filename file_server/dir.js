// 读取文件目录
const fs = require('fs')
  mime = require('./mime')

// 读取文件夹内所有内容
/**
 * 遍历读取目录内容（子目录，文件名）
 * @param  {string} fullPath 请求资源的绝对路径
 * @return {array} 目录内容列表
 */
function getAllContentWidthDir(fullPath) {
  let filesList = fs.readdirSync(fullPath);
  // 遍历当前文件夹
  // 区分文件和文件夹
  let dirList = [], fileList = [];
  for (let fileItem of filesList) {
    let fileArr = fileItem.split('.');
    let fileMime = fileArr.length > 1 ? fileArr[fileArr.length - 1] : 'undefined';
    if( typeof mime[ fileMime ] === "undefined" ) {
      dirList.push( fileItem );
    } else {
      fileList.push( fileItem );
    }
  }
  let result = dirList.concat( fileList );
  return filesList
}
/**
 * 封装目录内容
 * @param  {string} url 当前请求的上下文中的url，即ctx.url
 * @param  {string} reqPath 请求静态资源的完整本地路径
 * @return {string} 返回目录内容，封装成HTML
 */
function getDir(url, reqPath) {
  let dirContentList = getAllContentWidthDir(reqPath)
  console.log(dirContentList);
  let content = '<ul>';
  for (let item of dirContentList) {
    let itemUrl = (url == '/' ? '' : url) + '/' + item
    content += '<li><a href="'+ itemUrl +'">' + item + '</a></li>'
  }
  content += '</ul>'
  return content;
}
module.exports = getDir;