const Router = require('koa-router')
const checkAuth = require('@middlewares/check-auth')
const userController  =require('@controller/user')
const todoController  =require('@controller/todo')

const router = new Router()

router
    .post('/api/users', userController.addUser)
    .post('/api/sessions', userController.validUser)
    .get('/api/todos', checkAuth, todoController.getTodos)
    .post('/api/todos', checkAuth, todoController.addTodo)
    .patch('/api/todos/:_id', checkAuth, todoController.updateTodo)
    .delete('/api/todos/:_id', checkAuth, todoController.deleteTodo)

module.exports = router
