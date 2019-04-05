# JSParse

[![build status][travis-image]][travis-url]
[![GitHub release][release-image]][release-url]
[![GitHub license][license-image]][license-url]
[![996.icu][996.icu-image]][996.icu-url]

A JS Logical expressions calculator components.

一个JS实现的逻辑运算表达式计算器组件。

## Downloads 下载

[![JSParse-bom.js][download-bom-image]][download-bom-url]

[![JSParse-bom.min.js][download-bom-min-image]][download-bom-min-url]

## Usage 调用示例

[Performance Demo](https://peiyucn.github.io/JSParse/src/bom/JSParse-bom.html)

```javascript
var exp = "prd.prd568.amount + prd.prd569.amount + b > 20000";
var prd = {
    "prd568":{
        "amount":10000
    },
    "prd569":{
        "amount":10000
    }
};
var calcVars = {};
calcVars["prd"] = prd;
calcVars["b"] = 1000;

var JSParser = new JSParse();//创建表达式计算对象
var calcNode = JSParser.build(exp); //生成语法树
var result = calcNode.calc(false, calcVars); //计算表达式

console.log("表达式："+ calcNode.toString());
console.log(result);
```

## API 方法

### JSParse.build(expression);

  说明：根据表达式字符串生成可用于计算的表达式语法树。
  
  params 输入参数：
  
    String expression 表达式字符串（JS语法）

  return 返回值：
  
    CalcNode calcNode 用于计算的表达式语法树

### CalcNode.calc(nullMode, calcVars)

  说明：通过表达式语法树及变量输入值计算表达式返回结果。
  
  params 输入参数：
  
    Boolean nullMode 当计算变量为空时的表达式返回值
    Object calcVars 参与计算的变量集

  return 返回值：
  
    Object result 表达式计算结果

### CalcNode.toString()

  说明：如果Node为root节点，则该方法返回原始表达式字符串，否则返回undefined。
  
  params 输入参数：
  
    无

  return 返回值：
  
    String expression 表达式

## Supported Operators 已支持的运算符

|运算符<br>（operator）|说明<br>（description）|
|:---------------:|:---------------|
|  !              | 非 |
|  -              | 负 |
|  *              | 乘 |
|  /              | 除 |
|  %              | 取模 |
|  +              | 加 |
|  -              | 减 |
|  <              | 小于 |
|  <=             | 小于等于 |
|  >              | 大于 |
|  >=             | 大于等于 |
|  ==             | 等于 |
|  !=             | 不等于 |
|  ? :            | 条件表达式 |

## Custom Operators 可扩展的自定义运算符

Already supported 已经支持的自定义函数：

|函数<br>（function）|说明<br>（description）|
|:-----|:-----|
|in(arr,ele)|检查ele是否在数组arr中存在，返回boolean。|
|length(str)|检查字符串str长度，返回int。|
|isNaN(val)|实现js的isNaN方法。|
|number(val)|实现js的Number方法。|
|parseInt(str,radix)|实现js的parseInt方法。|
|parseFloat(str)|实现js的parseFloat方法。|
|split(str, splitChar, returnIndex)|实现字符串分隔方法，指定返回分隔后的某个字符。|
|min(number1, number2)|实现数值比较，返回最小者。|
|max(number1, number2)|实现数值比较，返回最大者。|
|getYear()|获取当前年份，返回number。|
|getMonth()|获取当前月份，返回number。|
|getDay()|获取当前日期，返回number。|
|getHours()|获取当前小时，返回number。|
|getMinutes()|获取当前分钟，返回number。|
|getSeconds()|获取当前秒，返回number。|

[travis-image]: https://travis-ci.org/peiyucn/JSParse.svg?branch=master
[travis-url]: https://travis-ci.org/peiyucn/JSParse
[release-image]: https://img.shields.io/github/release/peiyucn/JSParse.svg
[release-url]: https://github.com/peiyucn/JSParse/releases/
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://raw.githubusercontent.com/peiyucn/JSParse/master/LICENSE
[996.icu-image]: https://img.shields.io/badge/link-996.icu-red.svg
[996.icu-url]: https://996.icu
[download-image]: https://img.shields.io/badge/Code-JSParse.js-brightgreen.svg
[download-url]: https://peiyucn.github.io/JSParse/src/nobom/JSParse.js
[download-min-image]: https://img.shields.io/badge/Code-JSParse.min.js-brightgreen.svg
[download-min-url]: https://peiyucn.github.io/JSParse/src/nobom/JSParse.min.js
[download-bom-image]: https://img.shields.io/badge/Code-JSParse--bom.js-brightgreen.svg
[download-bom-url]: https://peiyucn.github.io/JSParse/src/bom/JSParse-bom.js
[download-bom-min-image]: https://img.shields.io/badge/Code-JSParse--bom.min.js-brightgreen.svg
[download-bom-min-url]: https://peiyucn.github.io/JSParse/src/bom/JSParse-bom.min.js