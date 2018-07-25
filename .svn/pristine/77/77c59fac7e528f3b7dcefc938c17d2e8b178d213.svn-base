(function(){
    var app=angular.module('app',['ui.router']);
    //整个项目最上层的控制器
    app.controller('appCtrl',function($scope,$state,SystemService){
        $scope.appid = 'wx55930513a77ca74f';
        //todo 需要替换成relBaseUrl
        $scope.devBaseUrl = 'http://127.0.0.1:8000/index.html';
        $scope.relBaseUrl = 'http://market.gfgood.com/weixin/index.html';

        $scope.baseUrl = $scope.relBaseUrl ;

        //todo 测试数据,发布时要删
        if($scope.baseUrl == $scope.devBaseUrl){

            try
            {
                localStorage.user_id = 0;
                localStorage.user_token = '';
                localStorage.union_id = '';
                localStorage.agent_level = 1;
                localStorage.open_id = '';
            }
            catch (e)
            {}
        }

        try
        {
            // 得到localStorage信息
            $scope.user_id = localStorage.user_id;
            $scope.user_token = localStorage.user_token;
            $scope.union_id = localStorage.union_id;
            $scope.agent_level = localStorage.agent_level;
            $scope.open_id = localStorage.open_id;
        }
        catch (e)
        {}
        if($scope.agent_level == 'undefined' || $scope.agent_level == undefined){
            $scope.agent_level = 0;
        }

        if($scope.union_id == 'undefined' || $scope.union_id == undefined){
            $scope.union_id = '';
        }
        if($scope.user_token == 'undefined' || $scope.user_token == undefined){
            $scope.user_token = '';
        }
        if($scope.user_id == 'undefined' || $scope.user_id == undefined){
            $scope.user_id = 0;
        }
        if($scope.open_id == 'undefined' || $scope.open_id == undefined){
            $scope.open_id = '';
        }

        // api公共参数
        $scope.baseParams={
            api:'',
            api_version:'v1',
            union_id: $scope.union_id,
            user_id: $scope.user_id,
            user_token: $scope.user_token,
            open_id: $scope.open_id,
            game:'',
            time:'',
            channel_key:'',
            params:{
                //todo 发布要改成0
                debug:0
            }
        }
        $scope.deepCopy = function(obj) {
            if(typeof obj != 'object'){
                return obj;
            }
            var newObj = {};
            for ( var attr in obj) {
                newObj[attr] = $scope.deepCopy(obj[attr]);
            }
            return newObj;
        }

        $scope.getQueryString=function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }

        $scope.$on('runJsSDK',function () {
            // 获取分享内容
           share();
        });
        share();
        function share() {
            SystemService.getShareUrl($scope.deepCopy($scope.baseParams)).then(function (res) {
                $scope.share_message = res.data.data;
                $scope.qrCodeUrl =  encodeURIComponent($scope.share_message.share_url);
                // console.log($scope.share_message);
                // 获取微信参数
                SystemService.getWeinxinConfig($scope.deepCopy($scope.baseParams)).then(function (res) {
                    // console.log('weixin',res.data);
                    wx.config({
                        //todo 发布时要变成false
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.data.data.appId, // 必填，公众号的唯一标识
                        timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                        signature: res.data.data.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                    wx.ready(function(){
                        wx.checkJsApi({
                            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                            success: function(res) {
                                // console.log('checkJsApi',res);
                                // 以键值对的形式返回，可用的api值true，不可用为false
                                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                            }
                        });

                        //微信分享朋友圈
                        wx.onMenuShareTimeline({
                            title: $scope.share_message.share_content, // 分享标题
                            link: $scope.share_message.share_url, // 分享链接
                            imgUrl: $scope.share_message.share_icon, // 分享图标
                            success: function (res) {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        //微信分享给朋友
                        wx.onMenuShareAppMessage({
                            title: $scope.share_message.share_content, // 分享标题
                            desc: '点击下载', // 分享描述
                            link: $scope.share_message.share_url, // 分享链接
                            imgUrl: $scope.share_message.share_icon, // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });

                    });
                    wx.error(function(res){
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

                    });

                });
            });
        }
    });
    //登录控制
    app.controller('LoginCtrl',function($scope,SystemService,$location,$stateParams,$state){
        console.log('LoginCtrl',$location,$stateParams);

        var countApiLogin = localStorage.countApiLogin;

        var redirectUrl = $scope.baseUrl +'?router_url='+$location.$$path.substring(1);

        // //得到 url 参数
        var stateParams = $stateParams;
        var apiParams = $scope.deepCopy($scope.baseParams);

        // 判断localStorage是否有值
        if(!$scope.baseParams.user_id || !$scope.baseParams.user_token){
            console.log('没有登录');
            if(stateParams.code){
                apiParams.params.code = stateParams.code;
                console.log(apiParams);
                SystemService.login(apiParams).then(function (res) {
                    console.log('login',res.data);
                    if(res.data.code == 800){
                        if(countApiLogin == 1){
                            localStorage.countApiLogin = 0;
                            return;
                        }
                        localStorage.countApiLogin = 1 ;
                        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+$scope.appid+'&redirect_uri='+encodeURIComponent(redirectUrl)+'&response_type=code&scope=snsapi_base&wechat_redirect';
                    }else if(res.data.code == 701){
                        $state.go('download');
                    }else {
                        try
                        {
                            localStorage.union_id = res.data.data.union_id;
                            localStorage.user_id = res.data.data.user_id;
                            localStorage.user_token = res.data.data.user_token;
                            localStorage.agent_level = res.data.data.agent_level;
                            localStorage.open_id = res.data.data.open_id;
                        }
                        catch (e)
                        {}
                        $scope.baseParams.union_id = res.data.data.union_id;
                        $scope.baseParams.user_id = res.data.data.user_id;
                        $scope.baseParams.user_token = res.data.data.user_token;
                        $scope.baseParams.open_id = res.data.data.open_id;

                        $scope.agent_level = res.data.data.agent_level;


                        //清楚缓存
                        setTimeout(function () {
                            try
                            {
                                localStorage.union_id = undefined;
                                localStorage.user_id = undefined;
                                localStorage.user_token = undefined;
                                localStorage.agent_level = undefined;
                                localStorage.open_id = undefined;
                            }
                            catch (e)
                            {}
                        },1*60*1000)
                        $scope.$broadcast('GetUserMessage');
                        $scope.$emit('runJsSDK');
                    }
                });
            }else{
                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+$scope.appid+'&redirect_uri='+encodeURIComponent(redirectUrl)+'&response_type=code&scope=snsapi_base&wechat_redirect';
            }
        } else {
            $scope.$emit('runJsSDK');
        }


    });

    app.directive('whenScrolled', function() {
        return function(scope, elm, attr) {
            // 内层DIV的滚动加载
            var raw = elm[0];
            elm.bind('scroll', function() {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.$apply(attr.whenScrolled);
                }
            });
        };
    });
})()