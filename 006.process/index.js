// 进程对象：process。 // process === global.process

// process.cwd() // Node进程的当前工作目录。
console.log('cwd:', process.cwd())

const {stdin,stdout} = process 
// stdin 标准输入流（终端键盘输入）
// stdout 标准输出流 

// process.argv // 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数。
// process.argv[0]: Node.js进程的可执行文件所在的绝对路径
// process.argv[1]: 正在执行的 JavaScript 文件的路径
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

// 启动 Node.js 进程：
// $ node index.js one two=three four
    
// 输出如下：
// 0: /usr/local/bin/node
// 1: /Users/mjr/work/node/process-args.js
// 2: one
// 3: two=three
// 4: four