const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    // 待办事项内容
    content: {
        type: String,
        required: [true, '待办项内容不能为空'],
        maxlength: [1000, '待办项内容不能超过1000字符']
    },

    // 待办事项创建时间
    createTime: {
        type: Date,
        default: Date.now
    },

    // 待办事项最后一次修改时间
    modifyTime: {
        type: Date,
        default: Date.now
    },

    // 待办事项计划完成时间
    expectTime: {
        type: Date,
        required: [true, '计划完成时间不能为空']
    },

    // 待办事项实际完成时间
    finishTime: {
        type: Date
    },

    // 待办事项类型：1日 2周 3月 4年
    type: {
        type: Number,
        default: 1
    },

    // 待办事项状态：1未完成 2已完成 3已放弃
    status: {
        type: Number,
        default: 1
    },

    // 待办事项所属用户的用户id
    ownerId: {
        type: Schema.Types.ObjectId
    }
})

const TodoModel = mongoose.model('Todo', todoSchema)

module.exports = TodoModel
