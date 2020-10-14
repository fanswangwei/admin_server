const Koa = require('koa'),
	Router = require('koa-router'),
  bodyParser = require('koa-bodyparser'),
  staticFiles = require('koa-static'),
  path = require('path'),
  router = new Router(),
  cors = require('koa2-cors'),
  app = new Koa();

// 设置跨域
app.use(cors())
// 使用bodyParser中间件处理请求参数
app.use(bodyParser())
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.set("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method === 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

router.get('/', async (ctx) => {
	ctx.body = 'hello Koa'
})

router.get('/health', async (ctx) => {
	ctx.body = {code: 200}
})

router.get('/1', async (ctx) => {
	ctx.body = 'hello Koa1'
})
router.get('/2', async (ctx) => {
	ctx.body = 'hello Koa1'
})
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
// koa静态资源服务器
app.use(staticFiles(path.join(__dirname, './static/')))

app.listen(9999, () => {
	console.log('starting at port 9999')
})
