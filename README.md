# node-nginx
前端日志构建
接口1 查询
http://127.0.0.1:2017/getlog?level='+l+"&keyword="+k+"&startTime="+s+"&endTime="+e+"&skip="+skip+"&count="+count

接口2 导出
http://127.0.0.1:2017/getlog/export?level='+l+"&keyword="+k+"&startTime="+s+"&endTime="+e
导出列表没有skip count 
导出excel出现乱码  
导出文件mysql数据库要配权限
