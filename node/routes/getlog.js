var express = require('express');
const router = express.Router();
const pool = require('../dbpool');
router.get('/',function(req,res,next){
    var level = req.param('level') || '';
    var startTime = req.param('startTime') || '';
    var endTime = req.param('endTime') || '';
    var keyword = req.param('keyword').replace(/(^\s*)|(\s*$)/g, '') || '';
    var order=' ORDER BY time desc';//降序
    var str,ll,st,et,kw;
    var strArray=[];

    var skip = req.param('skip') || '0';
    var count = req.param('count') || '0';

    //多条件查询拼接
   if(level){
    ll=' AND level=?';
    strArray.push(level);
   }else{
       ll='';
   }
   if(keyword){
    kw=' AND msgs LIKE ?';
    strArray.push('%'+keyword+'%');
   }else{
       kw='';
   }
   if(startTime){
    st=' AND time>=?';
    strArray.push(startTime);
   }else{
       st='';
   }
   if(endTime){
    et=' AND time<=?';
    strArray.push(endTime);
   }else{
       et='';
   }
   str=ll+kw+st+et;
// console.log(str);
// console.log(strArray.toString());


// 分页
var fenye=" limit "+skip+","+count;  
 //var fenye= " PID > =(select pid from test_log_total limit "+skip+", 1) limit "+count; 

//转为时间戳
    var starttime=new Date(startTime).getTime();
    var endtime=new Date(endTime).getTime();
    //if(!level & !startTime & !endTime & !keyword){
    if(false){
      return res.send({
        status:0,
        info:'提交的字段不全'
      });
    }else{
        if(endtime && starttime && endtime<starttime){
            res.send({
                status:0,
                total:0,
                data:'时间节点错误'
            })
        }else{
            pool.getConnection((err, conn)=> {
                if(err){
                    console.log('err',err);
                    return ;
                }
                conn.query(
                 "SELECT pid FROM test_log_total", //查总数
                  (err, result)=> {
                      if(err){
                          console.log('err',err);
                          return ; 
                      }
                    if(result.length>0){ //条件查询 ，找到数据
                        var totalCount=result.length;
                        conn.query(
                            "SELECT * FROM test_log_total WHERE 1=1"+str+order+fenye, 
                            strArray,
                            (err, result)=> {
                                if(err){
                                    console.log('err',err);
                                    return ;
                                }
                                res.send({
                                    status:1,
                                    total:totalCount,
                                    curcount:result.length,
                                    data:result
                            }
                        )
                     
                    })
                    }else {  
                        var obj = '未查询到数据';
                        res.send({
                            status:0,
                            total:0,
                            data:obj
                           
                        })
                    }
                    conn.release();
                  })
              })
        }
    }
});

// 导出日志列表
router.get('/export',function(req,res,next){
    var level = req.param('level') || '';
    var startTime = req.param('startTime') || '';
    var endTime = req.param('endTime') || '';
    var keyword = req.param('keyword').replace(/(^\s*)|(\s*$)/g, '') || '';
    var order=' ORDER BY time desc';//降序
    var str,ll,st,et,kw;
    var strArray=[];

    var skip = req.param('skip') || '0';
    var count = req.param('count') || '0';

    //多条件查询拼接
   if(level){
    ll=' AND level=?';
    strArray.push(level);
   }else{
       ll='';
   }
   if(keyword){
    kw=' AND msgs LIKE ?';
    strArray.push('%'+keyword+'%');
   }else{
       kw='';
   }
   if(startTime){
    st=' AND time>=?';
    strArray.push(startTime);
   }else{
       st='';
   }
   if(endTime){
    et=' AND time<=?';
    strArray.push(endTime);
   }else{
       et='';
   }
   str=ll+kw+st+et;

//转为时间戳
    var starttime=new Date(startTime).getTime();
    var endtime=new Date(endTime).getTime();
    //if(!level & !startTime & !endTime & !keyword){
    if(false){
      return res.send({
        status:0,
        info:'提交的字段不全'
      });
    }else{
        if(endtime && starttime && endtime<starttime){
            res.send({
                status:0,
                total:0,
                data:'时间节点错误'
            })
        }else{
            pool.getConnection((err, conn)=> {
                if(err){
                    console.log('err',err);
                    return ;
                }
                conn.query(
                 "SELECT pid FROM test_log_total", //查总数
                  (err, result)=> {
                      if(err){
                          console.log('err',err);
                          return ;
                      }
                    if(result.length>0){ //条件查询 ，找到数据
                        var totalCount=result.length;
                        var excel=(new Date().getTime()+".xls").toString();
                        conn.query(
                            "select * FROM test_log_total WHERE 1=1"+str+order+ " into outfile "+"'/"+excel+"'", 
                            strArray,
                            (err, result)=> {
                                if(err){
                                    console.log('err',err);
                                    return ;
                                }
                                console.log("select * FROM test_log_total WHERE 1=1"+str+order+ " into outfile "+"'d:/"+excel+"'");
                                res.send({
                                    status:1,
                                    excel:'d:/web'+excel
                            }
                        )
                     
                    })
                    }else {  
                        var obj = '未查询到数据';
                        res.send({
                            status:0,
                            total:0,
                            data:obj
                           
                        })
                    }
                    conn.release();
                  })
              })
        }
    }
});


module.exports = router;