
// 用于测试的表达式对象
var ExpTest = function (expression, expectValue) {
    this.expression = expression;
    this.expectResult = expectValue;
    return this;
};

// 测试期待值与实际值是否相等（类型、值）
var expTestResult = function (expect, real) {
    return expect === real ? "通过" : "未通过";
};