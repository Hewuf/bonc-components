export default {
  "presets": [
    ["@babel/preset-env", { targets: { node: 'current' } }]
  ],
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