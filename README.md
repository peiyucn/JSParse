# JsParse
  **项目文件：**
  
    JSParse.js (JSParse分析器js库)
    JSParse.html (调用示例)
    test.html (单元测试)
  
  **说明**
  **JS版的规则表达式分析与执行器，除常规运算符外，还支持自定义函数扩展。**
  **可调用的方法列表如下**
  
##### 1. JSParse.build(expression);
  说明：根据表达式字符串生成可用于计算的表达式语法树。
  
  输入参数：
  
    String expression 表达式字符串（JS语法）

  返回值：
  
    Node calcNode 用于计算的表达式语法树

##### 2. Node.calc(nullMode, inputObj);
  说明：通过表达式语法树及变量输入值计算表达式返回结果。
  
  输入参数：
  
    Boolean nullMode 当计算变量为空时的表达式返回值
    Object inputObj 用户输入的变量对象

  返回值：
  
    Object result 表达式计算结果

##### 3. Node.toString()
  说明：如果Node为root节点，则该方法返回原始表达式字符串，否则返回undefined。
  
  输入参数：
  
    无

  返回值：
  
    String expression 表达式


  **调用示例**
  
    //页面引用JSParse.js
    var exp = "testFunc(testFunc(a+b,b),b) + 3 > test";
    var testInput = new Object();
    testInput["a"] = 1;
    testInput["b"] = 2;
    testInput["test"] = 2;

    var calcNode = JSParser.build(exp); //生成语法树
    var result = calcNode.calc(NULL_AS_TRUE, testInput); //计算表达式

    console.log("表达式："+ calcNode.toString());
    console.log(result);

#### 可扩展的自定义函数

已经支持的自定义函数：

    in(arr,ele) //检查ele是否在数组arr中存在，返回boolean。
    length(str) //检查字符串str长度，返回int。
    isNaN(val)  //实现js的isNaN方法。
    Number(val) //实现js的Number方法。
    parseInt(str,radix) //实现js的parseInt方法。
    parseFloat(str) //实现js的parseFloat方法。