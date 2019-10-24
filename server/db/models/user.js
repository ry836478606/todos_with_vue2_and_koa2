const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, '用户名不能为空'],
        unique: true,
        maxLength: [20, '用户名不能超过20个字符']
    },
    password: {
        type: String,
        required: [true, '密码不能为空'],
        minLength: [6, '密码长度不能低于6个字符'],
        maxlength: [20, '密码长度不能超过20个字符']
    },
    createTime: {
        type: Date,
        default: Date.now // 啥意思？？？
    },
    // 用户类型：1普通用户，2管理员
    userType: {
        type: Number,
        default: 1
    }
})

// 使用'mongoose-unique-validator'插件校验唯一(unique 上面的=> username)字段
userSchema.plugin(uniqueValidator, {
    message: '该用户已存在'
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel

