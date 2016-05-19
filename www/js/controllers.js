angular.module('starter.controllers', [])
.controller('chartCtrl', function($stateParams,$ionicLoading,$scope, Sections, debugMocks, $rootScope) {

})
.controller('modesCtrl', function(myBluetooth, $ionicPopup, lightItemKey, $state, $ionicLoading,$scope, Sections, debugMocks, $rootScope) {
  
  $scope.modes = Sections.getModesData();
  $scope.curMode = Sections.getCurMode();
  $scope.lightList = lightItemKey;
  $scope.btStatus = myBluetooth.btStatus;

  $scope.goState = function(modeName){
    //alert('GG');
    $state.go('tab.modeEdit',{modeName:modeName});
  }
  $scope.find = {
    key: function(n){
      return $scope.modes[Object.keys($scope.modes)[n]];
    },
    index: function(n){
      return Object.keys($scope.modes)[n];
    }

  }
  console.log($scope.find.key(1));

  $scope.changeMode = function(){
    var modePopup = $ionicPopup.show({
      templateUrl: 'templates/changeMode.html',
      title: '更改目前的模式',
      scope: $scope,
      buttons: [
        {
          text: '<b>確定</b>',
          type: 'button-positive',
          onTap: function(e) {
            //alert(debugMocks.dump($ionicHistory.viewHistory()));
            
          }
        }
      ]
    });

    modePopup.then(function(res) {
      console.log('Tapped!', res);
    });

    $timeout(function() {
         modePopup.close();
    }, 5000);
  }
  $scope.saveMode = function(){

    Sections.saveCurMode();
  }
  $scope.sendToLight = function(){
    myBluetooth.sendCmd(Sections.allToCmd());
    console.log(Sections.allToCmd());
    
  }


})
.controller('modeEditCtrl', function($timeout, $ionicPopup, ionicTimePicker, lightItem, $ionicModal, $stateParams,$ionicLoading,$scope, Sections, debugMocks, $rootScope) {
  


  $scope.$on('$ionicView.enter', function(e) {
    $scope.modeName = $stateParams.modeName;
    $scope.mode =  angular.copy(Sections.getModesData()[$scope.modeName]);
  });
  

  //$scope.mode = Sections.getModesData()[modeName] || false;
  console.log('$scope.mode: '+ $scope.mode );

  console.log('mode name: ' + $scope.modeName)

  $scope.delSection = function(rmId){
    Sections.remove($scope.mode.sections,rmId);

    //$scope.data = Sections.saveToStorage();
    console.log('delSection:');
    console.log($scope.mode);
  };
  $scope.addSection = function(){
    Sections.addParam($scope.mode.sections,$scope.mode.modeId);
    console.log('data after add:');
    console.log($scope.mode);
  };
  $scope.saveMode = function(){
    Sections.saveMode($scope.mode.sections,$scope.modeName);
    alert('Saved!')
  }

// Modal
$scope.lightList = lightItem;
  $scope.thisSection ={
    id:0,
    data:{}
  };

  $ionicModal.fromTemplateUrl('templates/sectionEdit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.sectionModal = modal;
  });

  $scope.saveData = function(){
    var id = $scope.thisSection.id;
    $scope.mode.sections[id].ab_section= $scope.thisSection.data.ab_section;
    $scope.mode.sections[id].setHour= $scope.thisSection.data.setHour;
    $scope.mode.sections[id].setMin= $scope.thisSection.data.setMin;
    $scope.mode.sections[id].multiple= $scope.thisSection.data.multiple;
    $scope.mode.sections[id].endHour= $scope.thisSection.data.endHour;
    $scope.mode.sections[id].endMin= $scope.thisSection.data.endMin;
    //
    var savePopup = $ionicPopup.show({
      template: '<p style="text-align: center;font-size:16pt;"><b>已更改</b></p>',
      title: '成功',
      scope: $scope,
      buttons: [
        { text: '繼續編輯' },
        {
          text: '<b>上一頁</b>',
          type: 'button-positive',
          onTap: function(e) {
            //alert(debugMocks.dump($ionicHistory.viewHistory()));
            $scope.closeModal();
          }
        }
      ]
    });

    savePopup.then(function(res) {
      console.log('Tapped!', res);
    });

    $timeout(function() {
         savePopup.close();
    }, 5000);

    
  }
  $scope.openModal = function(id){
    $scope.thisSection.id = id;
    $scope.thisSection.data = angular.copy( $scope.mode.sections[id] );
    $scope.sectionModal.show();
  }
  $scope.closeModal = function() {
    $scope.sectionModal.hide();
  };

  $scope.openStartTimer = function(){
    var min =$scope.thisSection.data['setMin'];
    var hour =$scope.thisSection.data['setHour'];
    if(min>29){
      hour = hour-1;
    }
    var ipStart = {
      callback: function (val) {      //Mandatory
        if (typeof (val) === 'undefined') {

          console.log('Time not selected');
        } else {
          var selectedTime = new Date(val * 1000);
          $scope.thisSection.data['setHour'] = selectedTime.getUTCHours();
          $scope.thisSection.data['setMin'] = selectedTime.getUTCMinutes();
          console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        }
      },
      inputTime:hour*60*60+min*60,   //Optional
      format: 24,         //Optional
      step: 1,           //Optional
    };
    ionicTimePicker.openTimePicker(ipStart);
  };
  $scope.openEndTimer = function(){
    var ipEnd = {
      callback: function (val) {      //Mandatory
        if (typeof (val) === 'undefined') {

          console.log('Time not selected');
        } else {
          var selectedTime = new Date(val * 1000);
          $scope.thisSection.data['endHour'] = selectedTime.getUTCHours();
          $scope.thisSection.data['endMin'] = selectedTime.getUTCMinutes();
          console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        }
      },
      inputTime: $scope.thisSection.data['endHour']*60*60+$scope.thisSection.data['endMin']*60,   //Optional
      //(((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60))
      format: 24,         //Optional
      step: 1,           //Optional
    };
    ionicTimePicker.openTimePicker(ipEnd);
  };



})
.controller('DashCtrl', function($ionicLoading,$scope, Sections, debugMocks, $rootScope) {
/*
  loading = function() {
    $ionicLoading.show({
      duration: 1500,
      template: '<h1>Loading</h1>'
    });
  };
*/
  $scope.$on('$ionicView.enter', function(e) {
      $scope.data = Sections.saveToStorage();
      var cmd ={'cmd':Sections.allToCmdDEBUG()}
      $scope.test = debugMocks.dump(cmd);
      $scope.debug = debugMocks.dump($scope.data);
  });

  $scope.data = Sections.all;
  console.log('data ORIGIN:' + $scope.data);
  console.log($scope.data);


  $scope.addSection = function(){
    Sections.addParam(0,0,0,0);
    
    console.log('data after add:' + $scope.data);
    $scope.data = Sections.saveToStorage();
    console.log($scope.data);
    $scope.debug = debugMocks.dump($scope.data);
  };
  $scope.delSection = function(rmId){
    Sections.remove(rmId);
    console.log('data after remove:' + $scope.data);
    $scope.data = Sections.saveToStorage();
    console.log($scope.data);
    $scope.debug = debugMocks.dump($scope.data);
    //$scope.data
    //$scope.$apply();
  };
  /* DEBUG */
  $rootScope.$on('$stateChangeSuccess', 
    function(event, toState, toParams, fromState, fromParams){ 
      if(toState.name=='tab.dash'){
        $scope.debug = debugMocks.dump(Sections.all);
      }
      console.log('CTRL - $stateChangeSuccess', toState, toParams,fromState,fromParams);
      //console.log(debugMocks.dump(toState));
  });


  //$scope.test = parseInt(cmd['cmd']);
})
.controller('sectionSetCtrl', function(lightItem, $scope, $stateParams, $ionicPopup, $ionicHistory, $timeout, Sections, ionicTimePicker, debugMocks) {
  //$scope.thisSection=Sections.get($stateParams.sectionId);
  //var origin_section = Sections.get($stateParams.sectionId);
  $scope.lightList = lightItem;
  $scope.thisSection =  angular.copy(Sections.get($stateParams.sectionId));

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {

        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        $scope.thisSection['setHour'] = selectedTime.getUTCHours();
        $scope.thisSection['setMin'] = selectedTime.getUTCMinutes();
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
      }
    },
    inputTime: $scope.thisSection['setHour']*60*60+$scope.thisSection['setMin']*60,   //Optional
    //(((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60))

    format: 24,         //Optional
    step: 1,           //Optional
  };

  $scope.timeValue="23:56";


  //Sections.addParam(1,2,3,4,5,6);
  //Sections.modifyParam(0,12,2,3,4,5,6);

  //var a = Sections.all;
  //alert(Sections.allToCmd;
  $scope.data = debugMocks.dump($scope.thisSection);

  $scope.saveData = function(){
    Sections.modifyParam(
      $stateParams.sectionId,
      //$scope.thisSection['smode'],
      //$scope.thisSection['section'],
      $scope.thisSection['setHour'],
      $scope.thisSection['setMin'],
      $scope.thisSection['mode'],
      $scope.thisSection['multiple']
    );
    
    var savePopup = $ionicPopup.show({
      template: '<p style="text-align: center;font-size:16pt;"><b>Saved!</b></p>',
      title: '成功',
      scope: $scope,
      buttons: [
        { text: '繼續編輯' },
        {
          text: '<b>上一頁</b>',
          type: 'button-positive',
          onTap: function(e) {
            //alert(debugMocks.dump($ionicHistory.viewHistory()));
            $ionicHistory.goBack();
          }
        }
      ]
    });

    savePopup.then(function(res) {
      console.log('Tapped!', res);
    });

    $timeout(function() {
         savePopup.close();
    }, 5000);
  };
  $scope.parseTime = function(){

  };
  $scope.openTimer = function(){
    ionicTimePicker.openTimePicker(ipObj1);
  };

    // An elaborate, custom popup

  $scope.savePopup = function(){

 };



    //Sections.saveToStorage();

})

.controller('ChatsCtrl', function(myBluetooth, lightItem, $scope, ionicTimePicker, debugMocks ) {

  $scope.btStatus = myBluetooth.btStatus

  $scope.lightList = lightItem;

  $scope.thisSection = {
      'mode': 0,
      'multiple': 0,
    };

  var disableManualCmd = String.fromCharCode(240)+String.fromCharCode(0)+String.fromCharCode(0)+String.fromCharCode(255);
  $scope.isConnectedFunc = function(){}
  $scope.sendCmd = function(){if (!btStatus.currentDeviceStatus) {alert('cordova ERROR')};}
  $scope.sendDisableManualCmd = function(){if (!btStatus.currentDeviceStatus) {alert('cordova ERROR')};}


  /* Cordova */
  
  if (ionic.Platform.is('android') || ionic.Platform.is('ios') ) {
    $scope.sendDisableManualCmd = function(){
      if(btStatus.currentDeviceStatus){
        myBluetooth.sendCmd(disableManualCmd);
      }else{
        alert('No Device Connected!');
      }
    }

    $scope.sendCmd = function(){
      if(btStatus.currentDeviceStatus){
        var cmd = String.fromCharCode(250)+String.fromCharCode($scope.thisSection.mode)+String.fromCharCode($scope.thisSection.multiple)+String.fromCharCode(255);
        myBluetooth.sendCmd(cmd);
      }else{
        alert('No Device Connected!');
      }
    }
  }else{}

})

.controller('AccountCtrl', function(myBluetooth, $scope, $cordovaBluetoothSerial, $ionicPlatform, $timeout, Sections, debugMocks) {

  $scope.reset = function(){
      $scope.data = Sections.allToCmd();
      var cmd ={'cmd':Sections.allToCmdDEBUG()}
      $scope.cmdDEBUG = debugMocks.dump(cmd);
      $scope.cmd = debugMocks.dump($scope.data);
  }

  $scope.showDelBtn = function(){
    $scope.ctrl.showDelete = true;
  }

  $scope.$on('$ionicView.enter', function(e) {
      $scope.reset();
  });

  $scope.sectionDatas = Sections.data;


  $scope.btStatus = myBluetooth.btStatus;


  //$scope.devices = myBluetooth.myDevices;

  console.log($scope.btStatus);

  /* Init */
  $scope.refreshList = function(){myBluetooth.setStatus('ERROR!');
    console.log('isNotice:' + $scope.btStatus.isNotice);  $scope.cmdDEBUG = Sections.allToCmdDEBUG();};
  $scope.connectDevice = function(){myBluetooth.setStatus('ERROR!')};
  $scope.sendCmd = function(){alert($scope.cmd['data']);};
  //$scope.test = function(test){alert($scope.devices[test].address)};

  

  if (ionic.Platform.is('android') || ionic.Platform.is('ios') ) {
    $ionicPlatform.ready(function() {

      myBluetooth.isEnabled();
      $scope.enableBluetooth = function(){
          myBluetooth.enableBluetooth();
          myBluetooth.refreshList();
      };

      $scope.refreshList = function(){
        myBluetooth.refreshList();

      };
      $scope.connectDevice = function(index){
        myBluetooth.connectDevice(index);
      };
      $scope.disconnectDevice = function(){
        myBluetooth.disconnectDevice();
      };
      $scope.sendCmd = function(){

        myBluetooth.sendCmd($scope.data);

      };
    }); 
  }else{}


});
