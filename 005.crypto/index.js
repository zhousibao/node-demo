// crypto模块 的目的是为了提供通用的加密和哈希算法。
// 用纯js代码实现比较复杂且速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。
const crypto = require('crypto')

// createHash
const md5hash = crypto.createHash('md5') // 支持md5、sha1、sha256、sha512
md5hash.update('holle world!')
md5hash.update('holle nodejs!')
console.log(md5hash.digest('hex')); // 7a5ce990db207ed7b02bae1e36a9d81f

const sha1hash = crypto.createHash('sha1')
sha1hash.update('holle world!')
sha1hash.update('holle nodejs!')
console.log(sha1hash.digest('hex')); // 4a7330a793b2b0436619deedaea2a289a4ad82ae


// createHmac // Hmac算法也是一种哈希算法 // 需要一个密钥
const secret = 'secret-key'
const hmac = crypto.createHmac('sha256',secret)
hmac.update('holle world!')
hmac.update('holle nodejs!')
console.log(hmac.digest('hex'))


// AES加密
// AES是一种常用的对称加密算法，加解密都用同一个密钥
// 加密
function aesEncrypt(data,key){
  const cipher = crypto.createCipher('aes192', key);
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
// 解密
function aesDecrypt(encrypted,key){
  const decipher = crypto.createDecipher('aes192', key);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

var key = 'password';
var data = 'Hello, this is a secret message!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);
// console.log('Encrypted text: ' + encrypted);
// console.log('Decrypted text: ' + decrypted);