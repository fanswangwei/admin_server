const Koa = require('koa'),
	Router = require('koa-router'),
	bodyParser = require('koa-bodyparser'),
	static = require('koa-static'),
	path = require('path'),
	router = new Router(),
	config = require('./config'),
	cors = require('koa2-cors'),
	app = new Koa()

//操作数据库,引入模块
const mongoose = require('mongoose')

//mongoose,连接数据库
mongoose.connect(
	config.DB_CONN_STR,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	function (err, db) {
		if (err) {
			console.log('mongo error:', err)
			return
		}
		console.log('mongo success!')
	}
)

// 设置跨域
app.use(cors())
// 使用bodyParser中间件处理请求参数
app.use(bodyParser())
app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', '*')
	ctx.set('Access-Control-Allow-Credentials', 'true')
	ctx.set('Access-Control-Allow-Headers', 'X-Requested-With,Origin,Content-Type,Accept')
	ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
	if (ctx.method === 'OPTIONS') {
		ctx.body = 200
	} else {
		await next()
	}
})

router.get('/health', async (ctx) => {
	ctx.body = { code: 200 }
})

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

const upload = require('./routes/upload')
app.use(upload.routes()).use(upload.allowedMethods())
const login = require('./routes/login')
app.use(login.routes()).use(login.allowedMethods())
const news = require('./routes/news')
app.use(news.routes()).use(news.allowedMethods())
// koa静态资源服务器
app.use(static(path.join(__dirname, './static')))

app.listen(9999, () => {
	console.log('starting at port 9999')
})
