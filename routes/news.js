const Router = require('koa-router'),
	ctc_news_Schma = require('../dbs/models/ctc_news')
const router = new Router()

router.post('/news/add', async (ctx) => {
	let params = ctx.request.body
	// 新建数据、保存数据
	let saveData = {
		...params,
		createdTime: new Date().getTime(),
	}
	let newData = new ctc_news_Schma(saveData)
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
	ctx.body = {
		code: 200,
		data: params,
		msg: 'success',
	}
})

router.post('/news/edit', async (ctx) => {
	let params = ctx.request.body
	// 新建数据、保存数据
	ctc_news_Schma.update({_id: params._id}, {$set: params}, function (err) {
    if (err) {
      console.log('mongo error: ', err)
      ctx.body = {
        code: 500,
        data: err
      }
      return;
    }
  });
	ctx.body = {
		code: 200,
		data: params,
		msg: 'success',
	}
})

router.post('/news/delete', async (ctx) => {
  let params = ctx.request.body
  // console.log(params);
	await ctc_news_Schma.deleteOne(params, function (err, doc) {
		if (err) {
      ctx.body = {
        code: 500,
        data: [],
        msg: '删除失败',
      }
			return
		}
	})
  ctx.body = {
    code: 200,
    data: [],
    msg: 'success',
  }
})

router.get('/news/get', async (ctx) => {
	let params = ctx.request.query
	let pageNum = parseInt(params.pageNum) || 1,
		pageSize = parseInt(params.pageSize) || 999

	params.pageNum = ''
	params.pageSize = ''

	let condition = {}
	for (let item in params) {
		if (params[item]) {
			if(item == 'id' || item == '_id' || item == "createdTime"){
				condition[item] = params[item]
			}else {
				condition[item] = new RegExp(params[item])
			}
		}
	}
	let total = await ctc_news_Schma.countDocuments(condition)
	let results = await ctc_news_Schma
		.find(condition, async (err, res) => {
			if (err) {
				console.log('mongo get error:', err)
				ctx.body = {
					code: 500,
					data: err,
				}
			}
		})
		.skip((pageNum - 1) * pageSize)
		.limit(pageSize)
		.sort({ createdTime: -1 })

	ctx.body = {
		code: 200,
		total: total,
		data: results
	}
})

module.exports = router
