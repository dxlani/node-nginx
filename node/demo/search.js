var app=angular.module('myapp',['ng']);
app.controller('myCtrl',['$scope','$http',function ($scope,$http) {
    $scope.submit=function () {
      var s = $scope.startTime || '';
      var e = $scope.endTime || '';
     var l = $scope.level || '';
     var k =$scope.keyword || '';
     var skip =$scope.skip || '';
     var count =$scope.count || '';
      $http
        .get('http://127.0.0.1:2017/getlog?level='+l+"&keyword="+k+"&startTime="+s+"&endTime="+e+"&skip="+skip+"&count="+count)
        .success(function (data) {
          //解析服务端返回的结果
          console.log(data);
          $scope.total=data.total;
          $scope.list=data.data;
          $scope.show=data.status;
          $scope.curcount=data.curcount;
        })
    };
    $scope.export=function () {
      var s = $scope.startTime || '';
      var e = $scope.endTime || '';
     var l = $scope.level || '';
     var k =$scope.keyword || '';
      $http
        .get('http://127.0.0.1:2017/getlog/export?level='+l+"&keyword="+k+"&startTime="+s+"&endTime="+e)
        .success(function (data) {
          //解析服务端返回的结果
          console.log(data);
         
        })
    };
  }]);