/***
 * 数据库连接池模块
 * 向外提供 pool 对象
 */
const mysql = require('mysql2');

var pool = mysql.createPool({
  host: '172.17.0.1',    //数据库服务器地址
  user: 'root',         //数据库服务器登录用户名
  password: '123456',
  database: 'log',
  port: 3306,
  connectionLimit: 5,    //连接池最大容量
  dateStrings: true  //将时间转换为字符串
});

module.exports = pool;
