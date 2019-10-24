require('module-alias/register')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const cors = require('koa2-cors')
const path = require('path')

const config = require('@root/config')
const initDB = require('@db')
const router = require('@middlewares/router')
const rest = require('@middlewares/rest')

const app = new Koa()

// 接受跨域请求
app.use(cors())

// form表单，post提交的body数据处理
app.use(bodyParser())

// bind .rest() for ctx（为ctx绑定rest接口风格处理）
app.use(rest.restify(app))

app.use(router.routes()).use(router.allowedMethods())

// 支持静态文件的访问
app.use(koaStatic(path.resolve(__dirname, '../dist')))

// 初始化DB
initDB(config.DB_URL)

app.listen(config.PORT, () => {
    console.log('------Server is running on: http://localhost:%s------', config.PORT)
})


