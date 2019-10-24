// rest-api中间件
// rest全称： Representational State Transfer(代表性状态转换)
// 设计：
// 1.组织URL: /static/开头的URL是静态资源；/api/开头是REST API；其他URL是普通的MVC请求
// 2.统一输出REST：如下，定义ctx的rest函数
// 3.处理错误：1.REST API请求出错时，如何返回错误信息？ 2.客户端收到REST响应，怎么判断成功还是错误？
// REST API请求出错有2类： 1类：类似403，404，500等错误，这些错误实际上是HTTP请求可能发生的错误。
// 另一类错误是业务逻辑的错误，例如，输入了不合法的Email地址，试图删除一个不存在的Product，等等。
// 第二类的错误信息是一个JSON字符串，例如：并构造到APIError构造函数中，通过throw抛出。
// {
//     "code": "10000",
//     "message": "Bad email address"
// }

// 4.如何定义错误码：通过字符串定义code，错误代码命名规范为：大类:子类：如：auth:bad_password，auth:user_not_found


// 非http的403，404，500等状态码，自定义异常的构造函数
function APIError(opts) {
    this.code = opts.code || 'internal:unknown_error'
    this.message = opts.message || ''
    this.status = opts.status || 500
}

module.exports = {

    APIError,
    restify: (app, pathPrefix='/api/') => {
        return async (ctx, next) => {

            if(ctx.request.path.startsWith(pathPrefix)) {
                // 避免每个ctx实例都挂载一遍rest()和APIError()，直接在app.context原型上挂载，让ctx继承
                app.context.rest = function(params = {data: null}) {
                    this.response.type = 'application/json'
                    ctx.response.status = params.status || 200
                    this.response.body = {
                        data: params.data || null,
                    }
                }
                app.context.APIError = APIError

                // 捕获业务代码抛出的异常（自定义api接口code和message）
                try{
                    await next()
                }catch(e) {

                    // e为APIError的实例对象
                    ctx.response.status = e.status
                    ctx.response.type = 'application/json'
                    ctx.response.body = {
                        data: null,
                        meta: {
                            // 自定义错误code用字符串："大类:小类"形式定义
                            code: e.code || 'internal:unknown_error',
                            message: e.message,
                        }
                    }
                }
            }else{
                await next()
            }
        }
    }
}
