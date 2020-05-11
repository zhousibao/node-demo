const fs = require('fs')
const { stdin , stdout } = process

fs.readdir(process.cwd(),(err, files) => {
  // process.cwd() Node进程的当前工作目录。
  // console.log(files)
  if(!files.length){
    return console.log('no files')
  }
  console.log('select which file or directory you want to see')

  var stats = []
  file(0)

  // 串行处理
  function file(i){
    var filename = files[i]

    fs.stat(__dirname + '/' + filename, function(err,stat){
      stats[i] = stat
      if(stat.isDirectory()){
        console.log(i + ' ' + filename+'/')
      }else{
        console.log(i + ' ' + filename)
      }
  
      i++ 
      if( i === files.length){
        read()
      }else{
        file(i)
      }
    })
  }

  function read(){
    stdout.write('\nenter you choice: ')
    stdin.resume()
    stdin.setEncoding('utf8')
    stdin.on('data',option)
  }

  function option(data){
    var filename = files[Number(data)]
    if(!filename){
      stdout.write('enter you choice: ')
    }else{
      stdin.pause();

      if(stats[Number(data)].isDirectory()){
        fs.readdir(__dirname + '/' + filename, function(err, files){
          console.log(' ')
          console.log('('+ files.length + ' files)')
          files.forEach(function(file){
            console.log(' - ' + file)
          })
          console.log(' ')
        })
      }else{
        fs.readFile(__dirname + '/' + filename, 'utf8',function(err,data){
          console.log(' ')
          console.log(data.replace(/(.*)/g, ' $1'))
        })
      }
      
    }
  }
})