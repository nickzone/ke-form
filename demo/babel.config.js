/*
 * Created Date: 2019-11-05
 * Author: 王晓康
 * ------
 * Last Modified: Tuesday 2019-12-10 19:40:12 pm
 * Modified By: the developer formerly known as 王晓康 at <wangxiaokang003@ke.com>
 * ------
 * HISTORY:
 * ------
 * Javascript will save your soul!
 */
module.exports = {
  "presets": [
    ["@babel/env", {
      "modules": "commonjs"
    }],
    ["@babel/preset-react"]
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    ["import", {
      "libraryName": "antd",
      "style": "css"
    }]
  ]
}
