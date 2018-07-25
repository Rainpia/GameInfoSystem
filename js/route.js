/**
 * Created by ryp on 4/23/17.
 */
//路由配置
var app=angular.module('app');
app.config(function($stateProvider,$urlRouterProvider) {
    var download = {
        name: 'download',
        url: '/download',
        params:{code:null},
        templateUrl: 'partial/download.html',
        controller: 'DownloadCtrl'
    }

    var registerForm = {
        name: 'registerForm',
        url: '/registerForm',
        params:{code:null},
        templateUrl: 'partial/register/registerForm.html',
    }

    var registerShow = {
        name: 'registerShow',
        url: '/registerShow',
        params:{code:null},
        templateUrl: 'partial/register/registerShow.html',
    }

    var income = {
        name: 'income',
        url: '/income',
        params:{code:null,tab_id:null},
        templateUrl: 'partial/income/income.html',
    }

    var incomeDetail = {
        name: 'incomeDetail',
        url: '/incomeDetail',
        params:{code:null,id:null,stat_date:null},
        templateUrl: 'partial/income/incomeDetail.html',
    }

    var agentRelateUser = {
        name: 'agentRelateUser',
        url: '/agentRelateUser',
        params:{code:null,tab_id:null},
        templateUrl: 'partial/relateUser/agentRelateUser.html',
    }

    var relateUser = {
        name: 'relateUser',
        url: '/relateUser',
        params:{code:null},
        templateUrl: 'partial/relateUser/relateUser.html',
    }

    var relateMember = {
        name: 'relateMember',
        url: '/relateMember',
        params:{code:null},
        templateUrl: 'partial/relateUser/relateMember.html',
    }

    var memberMessage = {
        name: 'memberMessage',
        url: '/memberMessage',
        params:{code:null},
        templateUrl: 'partial/relateUser/memberMessage.html',
    }

    var carry = {
        name: 'carry',
        url: '/carry',
        params:{code:null},
        templateUrl: 'partial/income/carry.html',
    }

    var bankForm = {
        name: 'bankForm',
        url: '/bankForm',
        params:{code:null},
        templateUrl: 'partial/income/bankForm.html',
    }

    var groupMaster = {
        name: 'groupMaster',
        url: '/groupMaster',
        params:{code:null},
        templateUrl: 'partial/profile/groupMaster.html',
    }

    var groupMember = {
        name: 'groupMember',
        url: '/groupMember',
        params:{code:null},
        templateUrl: 'partial/profile/groupMember.html',
    }

    var share = {
        name: 'share',
        url: '/share.html',
        params:{code:null},
        templateUrl: 'partial/share.html',
    }

    $stateProvider.state(download);
    $stateProvider.state(registerForm);
    $stateProvider.state(registerShow);
    $stateProvider.state(income);
    $stateProvider.state(incomeDetail);
    $stateProvider.state(agentRelateUser);
    $stateProvider.state(relateUser);
    $stateProvider.state(relateMember);
    $stateProvider.state(memberMessage);
    $stateProvider.state(carry);
    $stateProvider.state(bankForm);
    $stateProvider.state(groupMaster);
    $stateProvider.state(groupMember);
    $stateProvider.state(share);
    $urlRouterProvider.otherwise('/download');
});