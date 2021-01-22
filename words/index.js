let a = require("./a")
let b = require("./b")
let c = require("./c")
let h = require("./h")
let i = require("./i")
let n = require("./n")
let o = require("./o")
let v = require("./v")


let vue = require('./vue');

let wordDict = {
  A:Object.values(a),
  B:Object.values(b),
  C:Object.values(c),
  H:Object.values(h),
  I:Object.values(i),
  N:Object.values(n),
  O:Object.values(o),
  V:Object.values(v),
  Vue:Object.values(vue)
}

module.exports=wordDict