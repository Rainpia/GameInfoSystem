(function(){
    var app=angular.module('app');
    app.controller('IncomeCtrl',function($scope,$state,SystemService,$stateParams){
        console.log('IncomeCtrl');
        var tab_id = $stateParams.tab_id;
        var busy = false;
        var apiParams = $scope.deepCopy($scope.baseParams);
        $scope.selectedTab = {};
        $scope.dateIncomeTableHead = ['日期','收益','群员','群主','代理商'];
        $scope.monthIncomeTableHead = ['月份','收益','群员','群主','代理商'];
        $scope.agentUserIncomeTableHead = ['充值','收益','来源','关系'];
        $scope.withdrawTableHead = ['提现金额','提现时间','提现状态'];
        $scope.dateIncomeData = [];
        $scope.incomeRecordData = [];
        $scope.agentCashRecordData = [];
        //tab 选择 start
        $scope.tabTitle=[{id:0,text:'日收益',active:true},{id:1,text:'月收益',active:false},{id:2,text:'收益流水',active:false},{id:3,text:'提现记录',active:false}];
        $scope.selectTab=function(item){
            $scope.selectedTab = item;
            angular.forEach($scope.tabTitle,function(ite){
                ite.active = false;
                if(ite.id == item.id){
                    ite.active = true;
                }
            });
            switch(item.id){
                case 0:
                    // 获取日收益list
                    var params= {last_date:''};
                    apiParams.params = params;
                    SystemService.getAgentDayIncome(apiParams).then(function (res) {
                        console.log(res.data.data);
                        $scope.dateIncomeData = res.data.data;
                    });
                    break;
                case 1:
                    // 获取月收益list
                    var params= {last_date:''};
                    apiParams.params = params;
                    SystemService.getAgentMonthIncome(apiParams).then(function (res) {
                        console.log(res.data.data);
                        $scope.monthIncomeData = res.data.data;
                    });
                    break;
                case 2:
                    // 获取收益流水list
                    var params= {last_deal_number:'',last_create_time:0};
                    apiParams.params = params;
                    SystemService.getAgentUserIncomeRecord(apiParams).then(function (res) {
                        console.log(res.data.data);
                        $scope.incomeRecordData = res.data.data;
                    });
                    break;
                case 3:
                    // 获取提现记录list
                    var params= {last_id:0,last_create_time:0};
                    apiParams.params = params;
                    SystemService.getAgentCashRecord(apiParams).then(function (res) {
                        console.log(res.data.data);
                        $scope.agentCashRecordData = res.data.data;
                    });
                    break;
            }

        };

        function startRequest() {
            if($scope.baseParams.user_token == ''){
                return;
            }
            //获得可用余额
            SystemService.getUsableCash($scope.deepCopy($scope.baseParams)).then(function (res) {
                console.log('usable_cash',res.data);
                $scope.usable_cash = res.data.data.usable_cash;
            });
            if(tab_id){
                $scope.selectTab($scope.tabTitle[tab_id]);
            }else{
                $scope.selectTab($scope.tabTitle[0]);
            }
        }
        startRequest();
        $scope.$on('GetUserMessage',function () {
            startRequest();
        });

        $scope.loadMoreDate = function () {
            if (busy) {
                return false;
            }
            busy = true;
            var params= {last_date:$scope.dateIncomeData[$scope.dateIncomeData.length-1].stat_date};
            apiParams.params = params;
            SystemService.getAgentDayIncome(apiParams).then(function (res) {
                console.log(res.data.data);
                $scope.dateIncomeData = $scope.dateIncomeData.concat(res.data.data);
                busy = false;
            });
        }

        $scope.loadMoreAgent = function () {
            if (busy) {
                return false;
            }
            busy = true;
            var params= {last_deal_number:$scope.incomeRecordData[$scope.incomeRecordData.length-1].deal_number,last_create_time:$scope.incomeRecordData[$scope.incomeRecordData.length-1].create_time};
            apiParams.params = params;
            SystemService.getAgentUserIncomeRecord(apiParams).then(function (res) {
                console.log(res.data.data);
                $scope.incomeRecordData = $scope.incomeRecordData.concat(res.data.data);
                busy = false;
            });
        }

        $scope.loadMoreCash = function () {
            if (busy) {
                return false;
            }
            busy = true;
            var params= {last_id:$scope.agentCashRecordData[$scope.agentCashRecordData.length-1].id,last_create_time:$scope.agentCashRecordData[$scope.agentCashRecordData.length-1].create_time};
            apiParams.params = params;
            SystemService.getAgentCashRecord(apiParams).then(function (res) {
                console.log(res.data.data);
                $scope.agentCashRecordData = $scope.agentCashRecordData.concat(res.data.data);
                busy = false;
            });
        }

        //tab 选择 end
        $scope.goToDetail=function(item){
            $state.go('incomeDetail', { last_from_game_user_id: 1,stat_date:item.stat_date});
        }

        // 提现
        $scope.carry=function(){
            $state.go('carry');
        }

    });
    app.controller('IncomeDetailCtrl',function($scope,$http,SystemService,$stateParams){
        console.log('IncomeDetailCtrl',$stateParams);
        $scope.stat_date = $stateParams.stat_date;
        $scope.label = ['id','昵称','收益','来源'];
        function startRequest() {
            if($scope.baseParams.user_token == ''){
                return;
            }
            //得到日收益详情信息
            var apiParams = $scope.deepCopy($scope.baseParams);
            var params = {last_from_game_user_id:0,stat_date:$stateParams.stat_date};
            apiParams.params = params;
            SystemService.getAgentDayIncomeDetail(apiParams).then(function (res) {
                $scope.incomeDetail = res.data.data;
            });
        }
        startRequest();
        $scope.$on('GetUserMessage',function () {
            startRequest();
        });
    });
    app.controller('CarryCtrl',function($scope,SystemService,$state){
        console.log('CarryCtrl');
        $scope.carryMessage={};
        function startRequest() {
            if($scope.baseParams.user_token == ''){
                return;
            }
            //得到可用余额
            SystemService.getUsableCash($scope.deepCopy($scope.baseParams)).then(function (res) {
                $scope.usable_cash = res.data.data.usable_cash;
                $scope.usable_cash_message = '可提现金额 ¥' + res.data.data.usable_cash;
            });
            //得到银行卡号
            SystemService.getRegister($scope.deepCopy($scope.baseParams)).then(function (res) {
                $scope.carryMessage.bank_card = res.data.data.bank_card;
            });
        }
        startRequest();
        $scope.$on('GetUserMessage',function () {
            startRequest();
        });
        var apiParams = $scope.deepCopy($scope.baseParams);
        $scope.submit=function(){
            if($scope.carryMessage.cash_money > $scope.usable_cash){
                $scope.error_message = '可提现金额为' + $scope.usable_cash;
                return
            }else if($scope.carryMessage.cash_money == 'undefined' || $scope.carryMessage.cash_money == undefined || $scope.carryMessage.cash_money<=0){
                $scope.error_message = '请输入金额';
                return
            }
            apiParams.params = $scope.carryMessage;
            SystemService.agentCash(apiParams).then(function (res) {
                if(res.data.code == 200){
                    alert('提现处理中，请稍后查看');
                }else if(res.data.code == 810){
                    alert(res.data.message);
                    $state.go('bankForm');
                }
            });
        }
    });
    app.controller('BankFormCtrl',function($scope,SystemService,$state){
        console.log('BankFormCtrl');
        //银行卡类型选择
        $scope.selectedBank = {};
        $scope.error_message = '';

        function startRequest() {
            if($scope.baseParams.user_token == ''){
                return;
            }
            //判断是否可以提交登记信息
            var apiParams = $scope.deepCopy($scope.baseParams);
            SystemService.getBankList(apiParams).then(function (res) {
                $scope.bankType = res.data.data;
                $scope.selectedBank = $scope.bankType[0];
                console.log(res.data);
            });
        }
        startRequest();
        $scope.$on('GetUserMessage',function () {
            startRequest();
        });

        //登记信息
        $scope.bankFormMessage={
            name:'',
            bank:null,
            bank_card:null
        }
        //提交登记信息
        $scope.submit=function(){
            if($scope.bankFormMessage.bank_card.toString().length > 19){
                $scope.error_message = '银行卡号不正确';
            }else{
                $scope.bankFormMessage.bank = $scope.selectedBank.id;
                var apiParams = $scope.deepCopy($scope.baseParams);
                apiParams.params = $scope.bankFormMessage;
                console.log(apiParams);
                SystemService.setBankMessage(apiParams).then(function (res) {
                    console.log('res',res.data);
                    if(res.data.code == 200){
                        $state.go('carry');
                    }
                });
            }
        }
    });
})()