const { get } = require('http')

// 静态资源服务器
const koa = require('koa'),
	path = require('path'),
	mime = require('./mime'),
	content = require('./content'),
	app = new koa()

// 定义资源文件相对于当前资源服务器入口文件的路径
const staticPath = './../static'

// 读取请求文件的类型
function getFileMime(url) {
	let mimeName = path.extname(url)
  mimeName = mimeName ? mimeName : 'unknow'
  console.log(mimeName);
	return mime[mimeName]
}

// 返回请求文件
app.use(async (ctx) => {
	let filePath = path.join(__dirname, staticPath)
	let _content = await content(ctx, filePath)
	let fileMime = getFileMime(ctx.url)
  ctx.res.writeHead(200, {'Content-Type': fileMime});
  ctx.res.write(_content, "binary");
  ctx.res.end();
})
// 启动文件服务器
app.listen(9090, () => {
	console.log('starting at port 9090')
})
