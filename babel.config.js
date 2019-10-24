module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  // 添加element-ui自动生成
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
