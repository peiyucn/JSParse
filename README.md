# JSParse.js [![build status][travis-image]][travis-url] [![GitHub release][release-image]][release-url] [![GitHub license][license-image]][license-url]
A JS Logical expressions calculator components.

一个JS实现的逻辑运算表达式计算器组件。

[See the demo.](http://peiyucn.github.io/JSParse/src/JSParse.html)

[Expressions test.](http://peiyucn.github.io/JSParse/test/test.html)

## Downloads
[![JSParse.js][download-image]][download-url]

[![JSParse.min.js][download-min-image]][download-min-url]

## Usage 调用示例
  
    <script src="JSParse.min.js"></script>
    var exp = "a + 2 > b";
    var testInput = new Object();
    testInput["a"] = 1;
    testInput["b"] = 2;

    var JSParser = new JSParse();//创建表达式计算对象
    var calcNode = JSParser.build(exp); //生成语法树
    var result = calcNode.calc(NULL_AS_TRUE, testInput); //计算表达式

    console.log("表达式："+ calcNode.toString());
    console.log(result);

## Methods 方法

### 1. JSParse.build(expression);
  说明：根据表达式字符串生成可用于计算的表达式语法树。
  
  输入参数：
  
    String expression 表达式字符串（JS语法）

  返回值：
  
    CalcNode calcNode 用于计算的表达式语法树

### 2. CalcNode.calc(nullMode, inputObj);
  说明：通过表达式语法树及变量输入值计算表达式返回结果。
  
  输入参数：
  
    Boolean nullMode 当计算变量为空时的表达式返回值
    Object inputObj 用户输入的变量对象

  返回值：
  
    Object result 表达式计算结果

### 3. CalcNode.toString()
  说明：如果Node为root节点，则该方法返回原始表达式字符串，否则返回undefined。
  
  输入参数：
  
    无

  返回值：
  
    String expression 表达式

## Supported Operators 已支持的运算符

| 优先级<br>（precedence） | 运算符<br>（operator） | 说明<br>（description） |
| :----------------: | :---------------: | ------------------ |
|   1                |  !                | 非 |
|   1                |  -                | 负 |
|   2                |  *                | 乘 |
|   2                |  /                | 除 |
|   3                |  +                | 加 |
|   3                |  -                | 减 |
|   4                |  <                | 小于 |
|   4                |  <=               | 小于等于 |
|   4                |  >                | 大于 |
|   4                |  >=               | 大于等于 |
|   5                |  ==               | 等于 |
|   5                |  !=               | 不等于 |
|   6                |  ? :              | 条件表达式 |


## Custom Operators 可扩展的自定义运算符

已经支持的自定义函数：

    in(arr,ele) //检查ele是否在数组arr中存在，返回boolean。
    length(str) //检查字符串str长度，返回int。
    isNaN(val)  //实现js的isNaN方法。
    Number(val) //实现js的Number方法。
    parseInt(str,radix) //实现js的parseInt方法。
    parseFloat(str) //实现js的parseFloat方法。


[travis-image]: https://travis-ci.org/peiyucn/JSParse.svg?branch=master
[travis-url]: https://travis-ci.org/peiyucn/JSParse
[release-image]: https://img.shields.io/github/release/peiyucn/JSParse.svg
[release-url]: https://github.com/peiyucn/JSParse/releases/
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://raw.githubusercontent.com/peiyucn/JSParse/master/LICENSE
[download-image]: https://img.shields.io/badge/Code-JSParse.js-brightgreen.svg
[download-url]: https://peiyucn.github.io/JSParse/src/JSParse.js
[download-min-image]: https://img.shields.io/badge/Code-JSParse.min.js-brightgreen.svg
[download-min-url]: https://peiyucn.github.io/JSParse/src/JSParse.min.js