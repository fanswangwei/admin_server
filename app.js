const Koa = require('koa'),
	Router = require('koa-router'),
  bodyParser = require('koa-bodyparser'),
  staticFiles = require('koa-static'),
  path = require('path'),
	router = new Router(),
  app = new Koa();

// 使用bodyParser中间件处理请求参数
app.use(bodyParser())
router.get('/', async (ctx) => {
	ctx.body = 'hello Koa'
})

router.get('/1', async (ctx) => {
	ctx.body = 'hello Koa1'
})
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

console.log(path.join(__dirname, './static/'));
app.use(staticFiles(path.join(__dirname, './static/')))

app.listen(9999, () => {
	console.log('starting at port 9999')
})
