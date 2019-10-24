const TodoModel = require('@db/models/todo')
const mongoose = require('mongoose')

module.exports = {
    // 根据用户id和待办事项类型查找todoList
    getTodos: async (ctx, next) => {

        const ownerId = ctx.state.user.id
        const todosArr = await TodoModel.aggregate([
            {
                $match: {ownerId, type: parseInt(ctx.query.type)}
            },
            {
                $group: {
                    _id: {status: '$status'},
                    todos: {$push: '$$ROOT'}
                }
            }
        ])

        // 将查找到的待办事项按待办事项的状态分组
        const data = {
            undone: [],
            done: [],
            forgone: []
        }
        todosArr.forEach(item => {
            switch (item._id.status) {
                case 1:
                    data.undone = [...item.todos]
                    break
                case 2:
                    data.done = [...item.todos]
                    break
                case 3:
                    data.forgone = [...item.todos]
                    break
            }
        })

        // throw new ctx.APIError({code: 'todos:not_found', message:  '获取todos出错', status: 402})
        ctx.rest({data})
    },

    // 新增待办项
    addTodo: async (ctx, next) => {
        const ownerId = ctx.state.user.id
        const todos = ctx.request.body.todoItems.map(todo => {
            return {...todo, ownerId}
        })
        const data = await TodoModel.create(todos)
        ctx.rest({data, status: 201})
    },

    // 更新待办项状态
    updateTodo: async (ctx, next) => {
        const idArr = ctx.params._id.split(';')
        const objectIdArr = idArr.map((id) => {
            return mongoose.Types.ObjectId(id)
        })

        const data = await TodoModel.update(
            {_id: {$in: objectIdArr}},
            {$set: ctx.request.body},
            {multi: true}
        )
        ctx.rest({data})
    },

    // 刪除待办项
    deleteTodo: async (ctx, next) => {
        const id = ctx.params._id
        const data = await TodoModel.findByIdAndDelete(id)
        ctx.rest({data, status: 204})
    },
}
