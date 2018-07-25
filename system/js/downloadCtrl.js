(function(){
    var app=angular.module('app');
    //下载页面控制器
    app.controller('DownloadCtrl',function($scope,$location,SystemService,$state,$stateParams){
        console.log('DownloadCtrl state params',$location,$stateParams);

        // 判断downreport调用次数
        var countApiDown = localStorage.countApiDown;

        //得到 url 参数
        var router_url = $scope.getQueryString('router_url');
        var tab_id = $scope.getQueryString('tab_id');
        var code = $scope.getQueryString('code') || $stateParams.code;
        var channel_key = $scope.getQueryString('channel_key');

        try
        {
            // 下载地址要带的参数
            $scope.downloadParams = '?union_id=' + localStorage.union_id;
        }
        catch (e) {}

        $scope.isHaveIdentity = false ;
        $scope.groupMasterInfo = {
            avatar:'',
            gameUserId:'',
            name:''
        };


        // 为了得到code重定向的地址
        var redirectUrl = $scope.baseUrl +'?router_url=download&channel_key=' + channel_key;

        //初始化 api 地址 和 参数
        var apiParams = $scope.deepCopy($scope.baseParams);

        if(router_url && router_url!='download'){
            $state.go(router_url,{code:code,tab_id:tab_id});
        }else{
            if(code){
                apiParams.params.code = code;
                apiParams.params.channel_key = channel_key;
                console.log(apiParams);
                SystemService.downReport(apiParams).then(function (res) {
                    if(res.data.code == 800){
                        if(countApiDown == 1){
                            localStorage.countApiDown = 0;
                            return;
                        }
                        localStorage.countApiDown = 1 ;
                        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+$scope.appid+'&redirect_uri='+encodeURIComponent(redirectUrl)+'&response_type=code&scope=snsapi_base&wechat_redirect';
                    }
                    if(res.data.data.group && res.data.data.group!=null){
                        $scope.isHaveIdentity = true;
                        $scope.groupMasterInfo.avatar = res.data.data.group.avatar;
                        $scope.groupMasterInfo.name = res.data.data.group.name;
                        $scope.groupMasterInfo.gameUserId = res.data.data.group.game_user_id;
                    }
                    try
                    {
                        localStorage.union_id = res.data.data.union_id;
                        localStorage.open_id = res.data.data.union_id;
                    }
                    catch (e) {}

                    $scope.baseParams.union_id = res.data.data.union_id;
                    $scope.baseParams.open_id = res.data.data.open_id;
                    $scope.downloadParams = '?union_id=' + res.data.data.union_id;
                    $scope.$emit('runJsSDK');
                });
            }else if(!code && channel_key){
                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+$scope.appid+'&redirect_uri='+encodeURIComponent(redirectUrl)+'&response_type=code&scope=snsapi_base&wechat_redirect';
            }
        }
    });
})()