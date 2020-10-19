const Router = require('koa-router');
const router = new Router();

router.post('/login', async (ctx) => {
  let params = ctx.request.body;
  // console.log(params)
  if(params.name == 'admin' && params.password == 'admin'){
    ctx.body = {
      code: 200,
      data: '登录成功',
      msg: 'success'
    }
  }else {
    ctx.body = {
      code: 500,
      data: '登录失败',
      msg: 'error'
    }
  }
})
router.post('/logout', async (ctx) => {
  // console.log(ctx.URL);
	ctx.body = {
    code: 200,
    data: '退出登录',
    msg: 'success',
  }
})
module.exports = router;