// 读取文件
const fs = require('fs');

/**
 * 读取文件方法
 * @param  {string} 文件本地的绝对路径
 * @return {string|binary} 
 */
function fileContent(fullPath) {
  let content = fs.readFileSync(fullPath, 'utf-8')
  return content;
}
module.exports = fileContent;