(function(){
    var app=angular.module('app');
    //分享页面控制器
    app.controller('ShareCtrl',function($scope,SystemService){
        console.log('ShareCtrl');
        function startRequest() {
            if($scope.baseParams.user_token == ''){
                return;
            }
            var apiParams = $scope.deepCopy($scope.baseParams);
            SystemService.getShareUrl(apiParams).then(function (res) {
                $scope.share_message = res.data.data;
                console.log($scope.share_message);
            });
        }
        startRequest();
        $scope.$on('GetUserMessage',function () {
            startRequest();
        });
    });
})()