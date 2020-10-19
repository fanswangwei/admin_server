const fs = require('fs'),
	path = require('path'),
  Router = require('koa-router'),
  Busboy = require('busboy')
  inspect = require('util').inspect;
const router = new Router()

// 创建文件夹
function mkdirsSync(dirPath) {
	if (fs.existsSync(dirPath)) {
		return true
	} else {
		fs.mkdirSync(dirPath)
		return true
	}
}
// 获取上传文件的后缀名
function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

async function uploadFile(ctx, options) {
	let req = ctx.req,
		res = ctx.res;
  const busboy = new Busboy({ headers: req.headers });
  let fileType = options.fileType || 'common'
  let filePath = path.join( options.path,  fileType)

	// 判断文件夹是否存在，不存在就创建
  mkdirsSync(filePath)
  return new Promise((resolve, reject) => {
    let result = { 
      success: false,
      message: '',
      data: null,
      errno: 0
    }
    // 解析请求文件事件
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join( filePath, fileName )
      let saveTo = path.join(_uploadFilePath)
 
      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))
 
      // 文件写入事件结束
      file.on('end', function() {
        result.success = true
        result.message = '文件上传成功'
        result.data = [`http://${ctx.host}/${fileType}/${fileName}`]
        console.log('文件上传成功！')
        resolve(result)
      })
    })
 
    // 解析结束事件
    busboy.on('finish', function( ) {
      console.log('文件上结束')
      resolve(result)
    })
 
    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(result)
    })
 
    req.pipe(busboy)
  })
}
router.post('/upload', async (ctx) => {
	console.log(ctx.req.file)
	data = await uploadFile(ctx, {
		path: path.join(__dirname, '../static'),
	})
	ctx.body = data
})
module.exports = router
