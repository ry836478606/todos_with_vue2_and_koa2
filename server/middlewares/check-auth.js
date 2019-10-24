const jwt = require('jsonwebtoken')
const APIError = require('@middlewares/rest').APIError
const config = require('@root/config')
const mongoose = require('mongoose')

// 自定义的权限验证中间件，使用jwt
module.exports = async (ctx, next) => {
    const token = ctx.header.authorization

    try{
        const decoded = await jwt.verify(token, config.jwtSecret)
        // 通过ctx.state共享user给其他中间件
        ctx.state.user = {
            id: mongoose.Types.ObjectId(decoded.id)
        }
        return next()
    } catch(err) {
        throw new APIError({code: 'user:authErrorValidated', message:  'token失效', status: 401})
    }
}
