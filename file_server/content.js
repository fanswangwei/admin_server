// 读取文件内容
const path = require('path'),
  fs = require('fs'),
  dir = require('./dir'),
  file = require('./file');

// 获取文件内容

/**
  * 获取静态资源内容
 * @param  {object} ctx koa上下文
 * @param  {string} 静态资源目录在本地的绝对路径
 * @return  {string} 请求获取到的本地内容
 */
async function getFileContent(ctx, fullPath) {
  // 请求文件的详细路径
  let reqPath = path.join(fullPath, ctx.url);
  // 判断请求路径是否存在 文件夹或者文件
  let exitReq = fs.existsSync(reqPath);
  // 请求的文件内容, 默认为空
  let content = '';
  if(!exitReq){
    // 如果请求地址不存在
    content = '404 Not Found! o(╯□╰)o！'
  }else {
    //判断请求路径是文件还是文件夹
    let isDir = fs.statSync(reqPath);
    if(isDir.isDirectory()){
      //如果为目录，则渲读取目录内容
      content = dir( ctx.url, reqPath )
    }else {
      // 如果为文件，则读取文件内容
      content = file(reqPath)
    }
  }
  return content;
}
module.exports = getFileContent;