const jwt = require('jsonwebtoken')
const UserModel = require('@db/models/user')
const config = require('@root/config')

module.exports = {
    addUser: async (ctx, next) => {
        const {username, password} = ctx.request.body
        const data = await UserModel.create({username, password})
        const token = jwt.sign({
            id: data.id
        }, config.jwtSecret, {
            expiresIn: '10d'
        })

        ctx.rest({data: {token}, status: 201})
    },

    // 根据username,password校验用户数是否存在，存在提供token
    validUser: async (ctx) => {
        const { username, password } = ctx.request.body
        const userData = await UserModel.findOne({username})

        if(userData) {
            if(userData.password === password) {
                const token = jwt.sign({
                    id: userData.id
                }, config.jwtSecret, {
                    expiresIn: '10d'
                })
                ctx.rest({data: {token}})
            }else {
                throw new ctx.APIError({code: 'user:passwordError', message:  '密码错误', status: 400})
            }
        }else {
            throw new ctx.APIError({code: 'user:unExist', message:  '用户不存在', status: 400})
        }
    }
}
