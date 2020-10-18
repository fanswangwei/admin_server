const Router = require('koa-router'),
	config = require('../config'),
	ctc_news_Schma = require('../dbs/models/ctc_news')
const router = new Router()

router.post('/news/add', async (ctx) => {
	let params = ctx.request.body

	// 新建数据、保存数据
	let newData = new ctc_news_Schma(params)
	newData.save(function (err) {
		if (err) {
			console.log('mongo error: ', err)
			ctx.body = {
				code: 500,
				data: err,
			}
			return
		}
	})
	// 获取保存的路径
	ctx.body = {
		code: 200,
		data: config.filePath + params.url, // 返回访问路径
	}
	ctx.body = {
		code: 200,
		data: params,
		msg: 'success',
	}
})

module.exports = router
