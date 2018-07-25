(function(){
    var app=angular.module('app');
    app.controller('RegisterFormCtrl',function($scope,SystemService,$state){
        console.log('RegisterFormCtrl');

        $scope.error_message = '';

        function startRequest() {
            if($scope.baseParams.user_token == ''){
                return;
            }
            //判断是否可以提交登记信息
            var apiParams = $scope.deepCopy($scope.baseParams);
            SystemService.canRegister(apiParams).then(function (res) {
                if(res.data.data.can_register){
                    console.log('可以登记信息');
                }else{
                    $state.go('registerShow');
                }
            });
        }
        startRequest();
        $scope.$on('GetUserMessage',function () {
            startRequest();
        });

        //登记信息
        $scope.registerMessage={
            agent_level:1,
            phone_number:null,
            name:'',
            address:'',
            bank:"",
            bank_card:""
        }
        //提交登记信息
        $scope.submit=function(){
            if($scope.registerMessage.phone_number.toString().length != 11){
                $scope.error_message = '手机号码不正确';
            }else{
                var apiParams = $scope.deepCopy($scope.baseParams);
                apiParams.params = $scope.registerMessage;
                console.log(apiParams);
                SystemService.register(apiParams).then(function (res) {
                    console.log('res',res.data);
                    if(res.data.code == 200){
                        $state.go('registerShow');
                    }
                });
            }
        }
    });
    app.controller('RegisterShowCtrl',function($scope,$state,SystemService){
        console.log('RegisterShowCtrl');
        function startRequest() {
            if($scope.baseParams.user_token == ''){
                return;
            }
            //判断是否可以提交登记信息
            SystemService.canRegister($scope.deepCopy($scope.baseParams)).then(function (res) {
                if(res.data.data.can_register){
                    console.log('可以登记信息');
                    $state.go('registerForm');
                }else{
                    //查询登记信息
                    SystemService.getRegister($scope.deepCopy($scope.baseParams)).then(function (res) {
                        if(res.data.data==null||angular.equals({}, res.data.data)){
                            $state.go('registerForm');
                        }
                        $scope.label = {status_label:'状态',agent_label:'代理类型',phone_number_label:'手机号码',name_label:'姓名',address_label:'地址',bank_label:'银行卡',bank_card_label:'卡号'}
                        $scope.registerMessage = res.data.data;
                        console.log($scope.registerMessage);
                    });
                }
            });
        }
        startRequest();
        $scope.$on('GetUserMessage',function () {
            startRequest();
        });
    });
})()