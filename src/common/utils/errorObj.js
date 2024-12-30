class ErrorObj extends Error {
  constructor(originalError = null, message = "服务器繁忙，稍后再试。") {
    super(message); // 调用父类的构造函数（Error）
    this.originalError = originalError; // 记录原始错误对象（如果有）
  }
}

export default ErrorObj;
