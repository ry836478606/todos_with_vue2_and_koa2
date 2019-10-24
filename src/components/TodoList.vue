<template>
    <div>
        <div class="top">
            <el-button
                    @click="$emit('add-todo')"
            >新增待办项</el-button>
        </div>
        <el-collapse v-model="collapseNames">
            <el-collapse-item
                    title="待处理"
                    name="1"
            >
                <TodoListUndone />
            </el-collapse-item>
            <el-collapse-item
                    title="已完成"
                    name="2"
            >
                <el-row
                        type="flex"
                        v-for="(item, index) in todosData.done"
                        :key="item._id"
                        class="finished-todo"
                >
                    <el-col :sm="4">
                        {{index+1}}、
                        {{moment(item.expectTime).format('YYYY-MM-DD HH:mm')}}
                    </el-col>
                    <el-col :sm="19" class="cont-txt">
                        {{item.content}}
                    </el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item
                    title="已放弃"
                    name="3"
            >
                <el-row
                        type="flex"
                        v-for="(item, index) in todosData.forgone"
                        :key="item._id"
                        class="finished-todo"
                >
                    <el-col :sm="4">
                        {{index+1}}、
                        {{moment(item.expectTime).format('YYYY-MM-DD HH:mm')}}
                    </el-col>
                    <el-col :sm="19" class="cont-txt">
                        {{item.content}}
                    </el-col>
                    <el-col :sm="1">
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                circle
                                @click="deleteTodo(item)"
                        ></el-button>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import moment from 'moment'
    import {mapState, mapActions} from  'vuex'
    import TodoListUndone from '../components/TodoListUndone'

    export default {
        name: "TodoList",
        components: {
            TodoListUndone
        },
        data() {
            return {
                collapseNames: ['1'],
            }
        },
        methods: {
            ...mapActions(['getTodosData']),
            moment,
            async deleteTodo(todo) {
                await this.$http.delete(`/todos/${todo._id}`)
                await this.getTodosData()
                this.$message.success('刪除成功')
            },
        },
        computed: {
            ...mapState(['todosData'])
        },
    }
</script>

<style lang="less" scoped>
    .top{
        margin-bottom: 10px;
        text-align: center;
    }
    .finished-todo{
        margin-bottom: 20px;
    }
    .cont-txt{
        margin-right: 20px;
        word-break: break-all;
        white-space: normal;
    }
</style>
