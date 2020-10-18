const Router = require('koa-router');
const router = new Router();

router.post('/login', async (ctx) => {
  let params = ctx.request.body;
  console.log(params)
  ctx.body = {
    code: 200,
    data: params,
    msg: 'success'
  }
})
module.exports = router;