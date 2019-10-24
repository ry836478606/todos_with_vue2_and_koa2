<template>
  <div class="wrapper">
    <el-form
    ref="form"
    :model="todo"
    :rules="validateRules"
    label-width="110px"
    class="content"
  >
    <el-form-item
      label="待办内容"
      prop="content"
    >
      <el-input
        type="textarea"
        v-model="todo.content"
        maxlength="1000"
        :autosize="{ minRows: 2, maxRows: 4}"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-form-item
      label="计划完成时间"
      prop="expectTime"
    >
      <el-date-picker
          type="datetime"
          v-model="todo.expectTime"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择时间"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit">完成</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: {
        content: "",
        type: 1,
        expectTime: ""
      },
      typeOptions: [
        {
          label: 1,
          value: "日"
        },
        {
          label: 2,
          value: "周"
        },
        {
          label: 3,
          value: "月"
        },
        {
          label: 4,
          value: "年"
        }
      ],
      validateRules: {
        content: [
          { required: true, message: "请输入待办内容", trigger: "blur" }
        ],
        expectTime: [
          { required: true, message: "请选择完成日期", trigger: "change" }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return (time.getTime() + 24 * 3600 * 1000) <= Date.now()
        },
      },
    }
  },
  created() {
    this.todo = this.$route.params.todo
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$http
            .patch(`/todos/${this.todo._id}`, {
              content: this.todo.content,
              expectTime: this.todo.expectTime
            })
            .then(() => {
              this.$message.success("修改成功")
              this.$router.go(-1)
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  .content {
    width: 100%;
    min-width: 350px;
    max-width: 600px;
    ::v-deep .el-textarea .el-input__count {
      line-height: normal;
    }
  }
}
</style>
