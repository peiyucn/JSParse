/**
 * Created by t-peiyu on 2016/1/26.
 */

/***************************************************
 * JS表达式解析
 * 说明：JS版的规则表达式分析与执行器，除常规运算符外，还支持自定义函数扩展。
 *      支持的运算可查看全局变量GlobalObjs。
 *
 * 1. JSParser.build(expression)
 * 说明：根据表达式字符串生成可用于计算的表达式语法树。
 * 输入参数：
 *      String expression 表达式字符串
 * 返回值：
 *      Node calcNode 用于计算的表达式语法树
 *
 * 2. Node.calc(nullMode, inputObj)
 * 说明：通过表达式语法树及变量输入值计算表达式返回结果。
 * 输入参数：
 *      Boolean nullMode 当计算变量为空时的表达式返回值
 *      Object inputObj 用户输入的变量对象
 * 返回值：
 *      Object result 表达式计算结果
 *
 * 3. Node.toString()
 * 说明：如果Node为root节点，则该方法返回原始表达式字符串，否则返回undefined。
 * 输入参数：
 *      无
 * 返回值：
 *      String expression 表达式
 * 调用示例请参考README.md
 ***************************************************/


// 全局变量
var JSParser = {};//JS表达式分析器对象，调用入口
const NULL_AS_FALSE = false;//标记如果计算变量为空，则条件表达式返回假
const NULL_AS_TRUE = true;//标记如果计算变量为空，则条件表达式返回真

// 用于测试的表达式对象
function expTest(expression, expectValue) {
    this.expression = expression;
    this.expectResult = expectValue;
}

// 测试期待值与实际值是否相等（类型、值）
function expTestResult(expect, real) {
    if (typeof expect == typeof real && expect == real) {
        return "通过";
    } else {
        return "未通过";
    }
}

/************************************************************************************/
/*
 * 树结构对象及方法
 */

// node节点对象构造函数
function Node(Obj, expression) {
    this.selfObj = Obj;
    this.rootExpression = expression;
    this.pChildNodes = [];
}

// 创建新节点
function createNode(value, expression) {
    var pNode = new Node(value, expression);
    pNode.selfObj = value;
    pNode.rootExpression = expression;
    return pNode;
}

// 在节点下添加节点
Node.prototype.addNode = function (value) {
    if (this == null) {
        return createNode(value);
    }
    if (value == this.selfObj) {
        return this;
    }
    this.pChildNodes.push(value);
};

Node.prototype.toString = function () {
    var exp = this.rootExpression;
    return exp;
};

function isUndefinedOrNullOrEmpty(ele) {
    return (typeof(ele) == "undefined" || ele == null || ele.length <= 0);
}

/************************************************************************************/

//运算符nop算法
var calcNOP = function (nullMode) {
    return nullMode;
};

// 运算符 “!” 算法
var calcNOT = function (nullMode, varArray) {
    if (isUndefinedOrNullOrEmpty(varArray[0])) {
        return nullMode;
    } else {
        return !varArray[0];
    }

};

// 运算符 “-”（负号） 算法
var calcNG = function (nullMode, varArray) {
    return -varArray;
};

// 运算符 “*” 算法
var calcMUTI = function (nullMode, varArray) {
    return varArray[0] * varArray[1];
};

// 运算符 “/” 算法
var calcDIV = function (nullMode, varArray) {
    return varArray[0] / varArray[1];
};

// 运算符 “+” 算法
var calcPLUS = function (nullMode, varArray) {
    return varArray[0] + varArray[1];
};

// 运算符 “-”（减号） 算法
var calcMINUS = function (nullMode, varArray) {
    return varArray[0] - varArray[1];
};

// 运算符 “<” 算法
var calcLT = function (nullMode, varArray) {
    if (isUndefinedOrNullOrEmpty(varArray[0]) ||
        isUndefinedOrNullOrEmpty(varArray[1])) {
        return nullMode;
    } else {
        return varArray[0] < varArray[1];
    }
};

// 运算符 “<=” 算法
var calcLE = function (nullMode, varArray) {
    if (isUndefinedOrNullOrEmpty(varArray[0]) ||
        isUndefinedOrNullOrEmpty(varArray[1])) {
        return nullMode;
    } else {
        return varArray[0] <= varArray[1];
    }
};

// 运算符 “>” 算法
var calcGT = function (nullMode, varArray) {
    if (isUndefinedOrNullOrEmpty(varArray[0]) ||
        isUndefinedOrNullOrEmpty(varArray[1])) {
        return nullMode;
    } else {
        return varArray[0] > varArray[1];
    }
};

// 运算符 “>=” 算法
var calcGE = function (nullMode, varArray) {
    if (isUndefinedOrNullOrEmpty(varArray[0]) ||
        isUndefinedOrNullOrEmpty(varArray[1])) {
        return nullMode;
    } else {
        return varArray[0] >= varArray[1];
    }
};

// 运算符 “==” 算法
var calcEQ = function (nullMode, varArray) {
    if (isUndefinedOrNullOrEmpty(varArray[0]) ||
        isUndefinedOrNullOrEmpty(varArray[1])) {
        return nullMode;
    } else {
        return varArray[0] == varArray[1];
    }
};

// 运算符 “!=” 算法
var calcNEQ = function (nullMode, varArray) {
    if (isUndefinedOrNullOrEmpty(varArray[0]) ||
        isUndefinedOrNullOrEmpty(varArray[1])) {
        return nullMode;
    } else {
        return varArray[0] != varArray[1];
    }
};

// 运算符 “&&” 算法
var calcAND = function (nullMode, varArray) {
    if (isUndefinedOrNullOrEmpty(varArray[0]) ||
        isUndefinedOrNullOrEmpty(varArray[1])) {
        return nullMode;
    } else {
        return varArray[0] && varArray[1];
    }

};

// 运算符 “||” 算法
var calcOR = function (nullMode, varArray) {
    if (isUndefinedOrNullOrEmpty(varArray[0]) ||
        isUndefinedOrNullOrEmpty(varArray[1])) {
        return nullMode;
    } else {
        return varArray[0] || varArray[1];
    }
};

// 运算符“?:”算法
var calcIFELSE = function (nullMode, varArray) {
    if (isUndefinedOrNullOrEmpty(varArray[0])) {
        varArray[0] = true;
    }
    return varArray[0] ? varArray[1] : varArray[2];
};


// 自定义运算 -begin //////////////////////////////////

var testFunc = function (nullMode, v1, v2) {
    return v1 - v2;
};

var eleInArray = function (nullMode, arr, ele) {
    if (typeof(ele) == "undefined" || ele == null) {
        return nullMode;
    }

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == ele) {
            return true;
        }
    }

    return false;
};

var strLength = function (nullMode, str) {
    if (typeof(str) == "undefined" || str == null) {
        return 0;
    }

    return str.length;
};

var isNotNumber = function (nullMode, val) {
    return isNaN(val);
};

var parseToNumber = function (nullMode, val) {
    return Number(val);
};


// 自定义运算 -end ////////////////////////////////////


var GlobalObjs = {

    // 运算符
    "operators": [

        // 空运算符
        {"name": "NOP", "symbol": "nop", "rank": "0", "optype": "0", "func": calcNOP},

        // 常规运算符
        {"name": "NOT", "symbol": "!", "rank": "80", "optype": "1", "func": calcNOT},
        {"name": "NG", "symbol": "-", "rank": "80", "optype": "1", "func": calcNG},
        {"name": "MUTI", "symbol": "*", "rank": "70", "optype": "2", "func": calcMUTI},
        {"name": "DIV", "symbol": "/", "rank": "70", "optype": "2", "func": calcDIV},
        {"name": "PLUS", "symbol": "+", "rank": "60", "optype": "2", "func": calcPLUS},
        {"name": "MINUS", "symbol": "-", "rank": "60", "optype": "2", "func": calcMINUS},
        {"name": "LT", "symbol": "<", "rank": "50", "optype": "2", "func": calcLT},
        {"name": "LE", "symbol": "<=", "rank": "50", "optype": "2", "func": calcLE},
        {"name": "GT", "symbol": ">", "rank": "50", "optype": "2", "func": calcGT},
        {"name": "GE", "symbol": ">=", "rank": "50", "optype": "2", "func": calcGE},
        {"name": "EQ", "symbol": "==", "rank": "40", "optype": "2", "func": calcEQ},
        {"name": "NEQ", "symbol": "!=", "rank": "40", "optype": "2", "func": calcNEQ},
        {"name": "AND", "symbol": "&&", "rank": "30", "optype": "2", "func": calcAND},
        {"name": "OR", "symbol": "||", "rank": "20", "optype": "2", "func": calcOR},
        {"name": "IFELSE-1", "symbol": "?", "rank": "10", "optype": "3", "func": calcIFELSE},
        {"name": "IFELSE-2", "symbol": ":", "rank": "10", "optype": "3", "func": calcIFELSE},
        {"name": "IFELSE", "symbol": "?:", "rank": "10", "optype": "3", "func": calcIFELSE},

        // 自定义运算符
        {"name": "testFunc", "symbol": "testFunc", "rank": "100", "optype": "N", "func": testFunc},
        {"name": "in", "symbol": "in", "rank": "100", "optype": "N", "func": eleInArray},
        {"name": "length", "symbol": "length", "rank": "100", "optype": "N", "func": strLength},
        {"name": "isNaN", "symbol": "isNaN", "rank": "100", "optype": "N", "func": isNotNumber},
        {"name": "Number", "symbol": "Number", "rank": "100", "optype": "N", "func": parseToNumber},
    ],

    // 左括号
    "leftBracket": "(",

    // 右括号
    "rightBracket": ")",

    // 双引号
    "quote": "\"",

    // 单引号
    "singleQuote": "\'",

    // 空格
    "space": " ",

    // 逗号（自定义函数参数分隔符）
    "comma": ",",

    // 问号
    "questionMark": "?",

    // 冒号
    "colon": ":"

};


//根据操作符符号获取操作符json对象
function getOperatorBySymbol(symbol) {
    for (var i = 0; i < GlobalObjs.operators.length; i++) {
        var op = GlobalObjs.operators[i];
        if (op.symbol == symbol) {
            return op;
        }
    }
    return null;
}

//根据操作符名称获取操作符json对象
function getOperatorByName(name) {
    for (var i = 0; i < GlobalObjs.operators.length; i++) {
        var op = GlobalObjs.operators[i];
        if (op.name == name) {
            return op;
        }
    }
    return null;
}

// 判断字符是否与运算符的第index个字符相等
function isLikeOperator(c, index) {
    for (var i = 0; i < GlobalObjs.operators.length; i++) {
        var op = GlobalObjs.operators[i];
        if (op.symbol.substr(index, 1) == c && op.optype != "N") {
            return true;
        }
    }
    return false;
}

// 判断字符是否与函数的第index个字符相等
function isLikeFunc(c, index) {
    for (var i = 0; i < GlobalObjs.operators.length; i++) {
        var op = GlobalObjs.operators[i];
        if (op.symbol.substr(index, 1) == c && op.optype == "N") {
            return true;
        }
    }
    return false;
}

// 根据自定义函数名称获取函数预算对象
function getFuncByName(funcName) {
    for (var i = 0; i < GlobalObjs.operators.length; i++) {
        var op = GlobalObjs.operators[i];
        if (op.name == funcName && op.optype == "N") {
            return op;
        }
    }
    return null;
}


/************************************************************************************/
/*
 * 表达式分析与计算
 */

// 改变引号状态
function changeQuoteStat(qtStep) {
    // 1表示引号开始 0表示引号结束
    if (qtStep == 1) {
        return 0;
    }
    else {
        return 1;
    }
}

// 从数组中截取数组
function genArrayFromArray(expArray, startIdx, len) {
    var tmpArray = [];
    for (var i = 0; i < len; i++) {
        tmpArray.push(expArray[startIdx]);
        startIdx++;
    }
    return tmpArray;
}

// 尝试从输入对象中获取输入值（属性值）
function tryGetEleValue(inputObj, propName) {
    var keyFirstChar = propName.substr(0, 1);

    // 如果是字符串，直接返回本身
    if (keyFirstChar == GlobalObjs.quote ||
        keyFirstChar == GlobalObjs.singleQuote) {
        return propName.replace(/^"*|"*$/g, "").replace(/^'*|'*$/g, "");
    }

    // 如果是数字，直接返回本身
    var num = parseFloat(propName);
    if (!isNaN(num)) {
        return num;
    }

    // 如果是true、false，则返回boolean值
    if (propName == "true") {
        return true;
    }
    if (propName == "false") {
        return false;
    }

    // 尝试获取变量的值
    if (typeof inputObj[propName] == "undefined") {
        throw new Error("JSParse Exception: Undefined Variable!");
    }

    // 如果是空值或空字符串，依然返回。
    var paramValue = inputObj[propName];
    return paramValue;
}

// 生成表达式元素数组
function genExpElementArray(expTmp) {
    var analyzeStartIdx = 0;
    var nextAnalyzeIdx = analyzeStartIdx;

    var expElementsArray = [];
    expAnalyze(expTmp, expElementsArray, nextAnalyzeIdx);
    if (expElementsArray == null || expElementsArray.length == 0) {
        return null;
    }

    return expElementsArray;
}

// 查找元素数组中的冒号
function findIFELSEColon(expArray) {

    for (var i = 0; i < expArray.length; i++) {
        if (expArray[i] == ":") {
            return i;
        }
    }
    return -1;
}

// 找到字符串中第一个左括号
function findBKStart(expTmp) {
    var bkStart = -1;
    var qtStep = 0;
    var sqtStep = 0;
    var cIdx = 0;

    while (cIdx < expTmp.length) {
        var c = expTmp.substr(cIdx, 1);
        if (c == GlobalObjs.quote) {
            qtStep = changeQuoteStat(qtStep);
        }

        if (c == GlobalObjs.singleQuote) {
            sqtStep = changeQuoteStat(sqtStep);
        }

        if (c == GlobalObjs.leftBracket && qtStep == 0 && sqtStep == 0) {
            bkStart = cIdx;
            return bkStart;
        }
        cIdx++;
    }

    return bkStart;
}

// 找到当前左括号对应的右括号
function findBKEnd(expTmp, bkStartIdx) {
    var bkEnd = bkStartIdx;
    var qtStep = 0;
    var sqtStep = 0;
    var bkStep = 0;

    bkStep++;
    var runBKAnalyze = true;
    do {
        bkEnd++;
        if (bkEnd >= expTmp.length) {
            break;
        }

        var nc = expTmp.substr(bkEnd, 1);

        if (nc == GlobalObjs.quote) {
            qtStep = changeQuoteStat(qtStep);
        }
        if (nc == GlobalObjs.singleQuote) {
            sqtStep = changeQuoteStat(sqtStep);
        }

        if (nc == GlobalObjs.leftBracket && qtStep == 0 && sqtStep == 0) {
            bkStep++;
        }
        if (nc == GlobalObjs.rightBracket && qtStep == 0 && sqtStep == 0) {
            bkStep--;
        }

        if (bkStep == 0) {
            runBKAnalyze = false;
        }
        else if (bkStep > 0) {
            runBKAnalyze = true;
        }
        else {
            break;
        }
    } while (runBKAnalyze);

    if (bkStep != 0) {
        throw new Error("JSParse Exception: Wrong bracket numbers!");
    }

    return bkEnd;
}

// 自定义函数参数分析
function funcParamsAnalyze(params) {
    var arParam = [];
    var paramNextCharIdx = 0;
    var paramNextSubStart = 0;
    var bkStep = 0;
    var qtStep = 0;
    var sqtStep = 0;

    // 如果参数是常量、变量则放入数组；
    // 如果是表达式或者仍为自定义函数，则不在此继续分析，整体放入数组。
    while (paramNextCharIdx < params.length) {
        var paramChar = params.substr(paramNextCharIdx, 1);
        if (paramChar == GlobalObjs.quote) {
            qtStep = changeQuoteStat(qtStep);
        }
        if (paramChar == GlobalObjs.singleQuote) {
            sqtStep = changeQuoteStat(sqtStep);
        }

        if (paramChar == GlobalObjs.leftBracket && qtStep == 0 && sqtStep == 0) {
            bkStep++;
        }
        if (paramChar == GlobalObjs.rightBracket && qtStep == 0 && sqtStep == 0) {
            bkStep--;
        }

        if (paramChar == GlobalObjs.comma &&
            qtStep == 0 && sqtStep == 0 && bkStep == 0) {
            // 将逗号之前的部分取出
            var paramPart = params.substr(paramNextSubStart, paramNextCharIdx - paramNextSubStart);
            paramPart = paramPart.replace(/^\s+|\s+$/g, ""); // 去除首尾空格
            arParam.push(paramPart);
            paramNextSubStart = paramNextCharIdx + 1;
        }

        if (paramNextCharIdx == params.length - 1) {
            // 分析到最后一位时，没有逗号，直接截取到之前的逗号为最后一个参数
            var paramPart = params.substr(paramNextSubStart, params.length - paramNextSubStart);
            paramPart = paramPart.replace(/^\s+|\s+$/g, ""); // 去除首尾空格
            arParam.push(paramPart);
        }

        paramNextCharIdx++;
    }

    return arParam;
}

// 表达式分析方法
function expAnalyze(expTmp, expElementsArray, nextAnalyzeIdx) {

    if (nextAnalyzeIdx >= expTmp.length) {
        return;
    }

    var qtStep = 0;
    var expChar = expTmp.substr(nextAnalyzeIdx, 1);

    if (expChar == GlobalObjs.quote) {
        qtStep = changeQuoteStat(qtStep);

        // 如果遇到双引号
        var qtStartIdx = expTmp.indexOf(GlobalObjs.quote, nextAnalyzeIdx);
        var qtEndIdx = -1;

        qtEndIdx = expTmp.indexOf(GlobalObjs.quote, qtStartIdx + 1);
        if (qtEndIdx <= -1) {
            throw new Error("JSParse Exception: Wrong quote numbers!");
        }
        else {
            qtStep = changeQuoteStat(qtStep);
        }

        var qtPart = expTmp.substring(qtStartIdx, qtEndIdx + 1);
        expElementsArray.push(qtPart);

        nextAnalyzeIdx = qtEndIdx + 1;

    }
    else if (expChar == GlobalObjs.singleQuote) {
        qtStep = changeQuoteStat(qtStep);

        // 如果遇到单引号
        var qtStartIdx = expTmp.indexOf(GlobalObjs.singleQuote, nextAnalyzeIdx);
        var qtEndIdx = -1;

        qtEndIdx = expTmp.indexOf(GlobalObjs.singleQuote, qtStartIdx + 1);
        if (qtEndIdx <= -1) {
            throw new Error("JSParse Exception: Wrong quote numbers!");
        }
        else {
            qtStep = changeQuoteStat(qtStep);
        }

        var qtPart = expTmp.substring(qtStartIdx, qtEndIdx + 1);
        expElementsArray.push(qtPart);

        nextAnalyzeIdx = qtEndIdx + 1;
    }
    else if (expChar == GlobalObjs.leftBracket) {

        var bkStartIdx = expTmp.indexOf(GlobalObjs.leftBracket, nextAnalyzeIdx);

        var bkEndIdx = findBKEnd(expTmp, bkStartIdx);
        nextAnalyzeIdx = bkEndIdx;

        var bkPart = expTmp.substring(bkStartIdx + 1, bkEndIdx);// 去除最外层括号
        expElementsArray.push(bkPart);
        nextAnalyzeIdx++;
    }
    else if (isLikeOperator(expChar, 0)) {

        var opStartIdx = nextAnalyzeIdx;
        var runOPAnalyze = true;
        var opIdx = 1;
        var opPart = null;

        if (expChar == GlobalObjs.questionMark || expChar == GlobalObjs.colon) {
            opPart = expTmp.substring(opStartIdx, nextAnalyzeIdx + 1);
            expElementsArray.push(opPart);
            nextAnalyzeIdx++;
        } else {
            while (runOPAnalyze) {
                nextAnalyzeIdx++;
                if (nextAnalyzeIdx >= expTmp.length) {
                    break;
                }

                var nc = expTmp.substr(nextAnalyzeIdx, 1);
                if (isLikeOperator(nc, opIdx)) {
                    runOPAnalyze = true;
                    opIdx++;
                } else {
                    runOPAnalyze = false;
                }
            }

            opPart = expTmp.substring(opStartIdx, nextAnalyzeIdx);
            expElementsArray.push(opPart);
        }

    }
    else if (expChar == GlobalObjs.space) {
        nextAnalyzeIdx++;
    }
    else {
        // 如果以上都不是，则为可能为变量元素或boolean值或自定义函数名。
        // 先确定是否为自定义函数名
        var startIdx = nextAnalyzeIdx;
        var likeFunc = true;
        var funcIdx = 0;

        while (nextAnalyzeIdx < expTmp.length) {
            var nc = expTmp.substr(nextAnalyzeIdx, 1);
            if (isLikeFunc(nc, funcIdx)) {
                likeFunc = true;
                funcIdx++;
            } else if (isLikeOperator(nc, 0)) {
                likeFunc = false;
                break;
            } else {
                if (nc == GlobalObjs.leftBracket) {
                    likeFunc = true;
                    break;
                }
            }
            nextAnalyzeIdx++;
        }

        var fvPart = null;
        if (likeFunc && nc == GlobalObjs.leftBracket) {
            // 找到当前左括号对应的右括号
            var bkEnd = findBKEnd(expTmp, nextAnalyzeIdx);
            fvPart = expTmp.substring(startIdx, bkEnd + 1);
            nextAnalyzeIdx = bkEnd + 1;
        } else {
            fvPart = expTmp.substring(startIdx, nextAnalyzeIdx);
        }

        fvPart = fvPart.replace(/^\s+|\s+$/g, "");// 去除首尾空格
        expElementsArray.push(fvPart);
    }

    expAnalyze(expTmp, expElementsArray, nextAnalyzeIdx);

}

// 表达式语法树构建方法
function genExpSynTaxTree(expArray, pNode, expression) {

    var expTempArray = [];
    var minRankOp = null;
    var minRankOpIdx = 0;
    var qMarkOpIdx = 0;
    var colonOpIdx = 0;
    var cNodeArray = [];

    if (expArray.length == 1) {
        // 如果数组中只有一个元素，那么则可能是叶子节点或未分析完成的表达式,或是自定义函数
        // 尝试继续分析该“叶子节点”
        expTempArray = genExpElementArray(expArray[0]);// 如果是表达式，通过递归分析可以将所有括号去除并找到叶子节点
        if (expTempArray.length == 1) {
            // 如果分析后数组中真的只有一个元素，则为叶子节点或自定义函数
            // 先判断是否为自定义函数（判断是否存在引号外的括号）
            var funcBKStart = findBKStart(expArray[0]);// 如果此时仍存在真括号，则一定只有是自定义函数的可能
            if (funcBKStart > 0) {
                var funcName = expArray[0].substr(0, funcBKStart);
                var funcObj = getFuncByName(funcName);
                if (funcObj == null) {
                    throw new Error("JSParse Exception: Wrong function name!");
                }

                // 截取倒数第二位到左括号之后一位的部分
                var params = expArray[0].substr(funcBKStart + 1, expArray[0].length - (funcBKStart + 2));

                expTempArray = funcParamsAnalyze(params);
                minRankOp = funcObj;
            } else {
                var tmpNode = createNode(expArray[0]);
                if (pNode == null || pNode.selfObj == null) {
                    pNode = tmpNode;
                    pNode.rootExpression = expression;
                } else {
                    pNode.addNode(tmpNode);
                }
                return pNode;
            }
        }
        expArray = expTempArray;
    }

    // 找出当前表达式元素数组中优先级最低的操作符
    var judgeNGorMINUS = function (expArray, i) {
        // 判断在该表达式元素中“-”为负号还是减号
        if (i == -1 ||
            expArray[i] == GlobalObjs.leftBracket ||
            isLikeOperator(expArray[i], 0)) {
            return getOperatorByName("NG");
        } else if (expArray[i] == GlobalObjs.space) {
            judgeNGorMINUS(expArray, i - 1);
        } else {
            return getOperatorByName("MINUS");
        }
    };

    for (var i = 0; i < expArray.length; i++) {
        var op = getOperatorBySymbol(expArray[i]);
        if (op == null) {
            continue; //如果不是操作符则继续寻找
        }

        if (op.symbol == "-") {
            // 如果运算符为“-”，那么要确定此时为负号还是减号以计算确定优先级
            op = judgeNGorMINUS(expArray, i - 1);
        }


        if (op.symbol == "?") {
            // 如果运算符为“?”，数组中必须含有“:”，否则表达式语法错误

            colonOpIdx = findIFELSEColon(expArray);
            if (colonOpIdx == -1) {
                throw new Error("JSParse Exception: Wrong expression!")
            }

            minRankOp = getOperatorBySymbol("?:");
            qMarkOpIdx = i;
            break;
        }


        if (minRankOp == null) {
            minRankOp = op;
            minRankOpIdx = i;
        } else {
            if (op.rank <= minRankOp.rank) {//比较操作符优先级，找出最低者
                minRankOp = op;
                minRankOpIdx = i;
            }
        }
    }

    if (minRankOp == null) {
        throw new Error("JSParse Exception: Wrong expressions!");
    }

    var cNode = createNode(minRankOp);
    if (pNode == null || pNode.selfObj == null) {
        pNode = cNode;
        pNode.rootExpression = expression;
    } else {
        pNode.addNode(cNode);
    }

    if (cNode.selfObj.optype == 1) {
        // 1目运算符只生成一个子节点
        var array = genArrayFromArray(expArray, minRankOpIdx + 1, expArray.length - (minRankOpIdx + 1));
        cNodeArray.push(array);
    } else if (cNode.selfObj.optype == 2) {
        // 2目运算符生成两个子节点，左右节点不必区分大小
        var leftArray = genArrayFromArray(expArray, 0, minRankOpIdx);
        var rightArray = genArrayFromArray(expArray, minRankOpIdx + 1, expArray.length - (minRankOpIdx + 1));
        cNodeArray.push(leftArray);
        cNodeArray.push(rightArray);
    } else if (cNode.selfObj.optype == 3) {
        var leftArray = genArrayFromArray(expArray, 0, qMarkOpIdx);
        var middleArray = genArrayFromArray(expArray, qMarkOpIdx + 1, colonOpIdx - (qMarkOpIdx + 1));
        var rightArray = genArrayFromArray(expArray, colonOpIdx + 1, expArray.length - (colonOpIdx + 1));
        cNodeArray.push(leftArray);
        cNodeArray.push(middleArray);
        cNodeArray.push(rightArray);
    } else if (cNode.selfObj.optype == "N") {
        for (var i = 0; i < expArray.length; i++) {
            var arParam = [expArray[i]]; // 同运算符逻辑保持一致，即使自定义函数参数都作为一个元素整体处理，仍然放到数组中。
            cNodeArray.push(arParam);
        }
    }

    for (var j = 0; j < cNodeArray.length; j++) {
        genExpSynTaxTree(cNodeArray[j], cNode, expression);
    }
    return pNode;
}

// 根据表达式生成可计算的语法树
function buildSyntaxTree(expression) {
    if (isUndefinedOrNullOrEmpty(expression)) {
        return createNode(getOperatorByName("NOP"), expression);
    }
    var expArray = genExpElementArray(expression);
    return genExpSynTaxTree(expArray, null, expression);
}

// 表达式计算方法
function calcExp(nullMode, inputObj) {
    var pNode = this;// 该方法必须通过Node对象调用
    // 如果节点没有子节点，那么获取节点值准备计算
    if (pNode.pChildNodes == null || pNode.pChildNodes.length <= 0) {
        // 如果该节点是对象，则一定是运算符NOP，直接放回NOP计算结果
        var a = typeof pNode.selfObj;
        if (typeof pNode.selfObj == "object") {
            return pNode.selfObj.func(nullMode);
        }
        // 将叶子节点的变量替换为参数输入值以准备计算
        var paramValue = tryGetEleValue(inputObj, pNode.selfObj);
        return paramValue;
    }

    // 如果有子节点说明该节点为操作符
    var pOP = getOperatorByName(pNode.selfObj.name);
    if (pOP == null) {
        throw new Error("JSParse Exception: Wrong operator!");
    }

    var varArray = [];

    if (pOP.optype == "N") {
        varArray.push(nullMode);
    }

    for (var i = 0; i < pNode.pChildNodes.length; i++) {
        var cNode = pNode.pChildNodes[i];
        var result = cNode.calc(nullMode, inputObj);//递归计算子节点
        varArray.push(result);
    }

    var rs = null;
    if (pOP.optype == "N") {
        rs = pOP.func.apply(this, varArray);
    } else {
        rs = pOP.func(nullMode, varArray);
    }

    return rs;
}

/************************************************************************************/

// 表达式分析接口
JSParser.build = buildSyntaxTree;

// 表达式计算接口
Node.prototype.calc = calcExp;