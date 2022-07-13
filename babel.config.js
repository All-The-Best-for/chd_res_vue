module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // MintUi按需打包
  // plugins: ["transform-runtime",["component", [
  //   {
  //   "libraryName": "mint-ui",
  //   "style": true
  //   }
  // ]]]
  "plugins": [["component",
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]
}
