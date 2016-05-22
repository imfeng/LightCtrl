angular.module('starter.controllers', [])
.controller('patternEditCtrl', function(connectBtModal, $ionicPopup, $ionicModal, $stateParams, ionicTimePicker, lightItem, myBluetooth, $state, $ionicLoading,$scope, Sections) {

 /* Bluetooth Status Icon @header-bar*/
  // <button class="button button-icon button-clear ion-bluetooth" ng-class="{isBtConnected: connectBt.currentDeviceStatus}" ng-click="connectBt.openmodal()">
  $scope.connectBtModal ={
    btStatus:connectBtModal.btStatus,
    openModal: function(){
      connectBtModal
        .init()
        .then(function(modal) {
          modal.show();
      });
    }
  }
  /**/


  $scope.$on('$ionicView.enter', function(e) {
    $scope.modeName = $stateParams.modeName;
    $scope.patternKey = $stateParams.patternKey;
    $scope.thisMode = Sections.getModesDataById($scope.modeName);
    $scope.sections = angular.copy($scope.thisMode.patterns[$scope.patternKey].sections);
    if ($scope.patternKey==0 || $scope.patternKey == 1) {
      $scope.isCustom = false;
    }else{
      $scope.isCustom = true;
    };
  });
  
  $scope.delSection = function(rmId){
    Sections.remove($scope.sections,rmId);

    //$scope.data = Sections.saveToStorage();
    console.log('delSection:');
    console.log($scope.sections);
  };
  $scope.addSection = function(){
    Sections.addParam($scope.sections,$scope.thisMode.modeId);
    console.log('data after add:');
    console.log($scope.sections);
  };
  $scope.saveMode = function(){
    Sections.saveMode($scope.sections,$scope.modeName,$scope.patternKey);
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
    $scope.sections[id].ab_section= $scope.thisSection.data.ab_section;
    $scope.sections[id].setHour= $scope.thisSection.data.setHour;
    $scope.sections[id].setMin= $scope.thisSection.data.setMin;
    $scope.sections[id].multiple= $scope.thisSection.data.multiple;
    $scope.sections[id].endHour= $scope.thisSection.data.endHour;
    $scope.sections[id].endMin= $scope.thisSection.data.endMin;
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
    $scope.thisSection.data = angular.copy( $scope.sections[id] );
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
    var min =$scope.thisSection.data['setMin'];
    var hour =$scope.thisSection.data['setHour'];
    if(min>29){
      hour = hour-1;
    }
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
      inputTime: hour*60*60+min*60,
      //(((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60))
      format: 24,         //Optional
      step: 1,           //Optional
    };
    ionicTimePicker.openTimePicker(ipEnd);
  };


  $scope.defValue = {d:0};

  $scope.changeDef = function(){
    var modePopup = $ionicPopup.show({
      templateUrl: 'templates/changeDef.html',
      title: '預設設定',
      scope: $scope,
      buttons: [
        {
          text: '<b>確定</b>',
          type: 'button-positive',
          onTap: function(e) {
                switch($scope.defValue.d) {
                  case '0':
                   $scope.defModeCus();
                   break;
                  case '1':
                    $scope.defModeNature();
                    break;
                  case '2':
                      $scope.defModeLong();
                      break;
                }
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
 

})
.controller('patternsCtrl', function(connectBtModal, $stateParams, $state, $ionicLoading,$scope, Sections) {
/* Bluetooth Status Icon @header-bar*/
  // <button class="button button-icon button-clear ion-bluetooth" ng-class="{isBtConnected: connectBt.currentDeviceStatus}" ng-click="connectBt.openmodal()">
  $scope.connectBtModal ={
    btStatus:connectBtModal.btStatus,
    openModal: function(){
      connectBtModal
        .init()
        .then(function(modal) {
          modal.show();
      });
    }
  }
  /**/
  $scope.modeName = $stateParams.modeName;
  $scope.mode = Sections.getModesDataById($scope.modeName);
  $scope.goState = function(index){
    $state.go('tab.patternEdit',{modeName:$scope.modeName,patternKey:index})
  }


})
.controller('chartCtrl', function($stateParams,$ionicLoading,$scope, Sections, debugMocks, $rootScope) {

    $scope.series = ['亮度'];



var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}
//
  $scope.$on('$ionicView.enter', function(e) {
    $scope.modeName = Sections.getCurMode();
    $scope.mode =  angular.copy(Sections.getModesDataById($scope.modeName.key));

  });
  $scope.modeName = Sections.getCurMode();
$scope.mode =  angular.copy(Sections.getModesDataById($scope.modeName.key));
  var time = [];
  var data = [];

  for(var i=0;i<$scope.mode['sections'].length;i++){
    var tmp = {};
    tmp.setTime = $scope.mode.sections[i].setHour*100 + $scope.mode.sections[i].setMin;
    tmp.endTime = $scope.mode.sections[i].endHour*100 + $scope.mode.sections[i].endMin;
    tmp.multiple = $scope.mode.sections[i].multiple;
    data.push(tmp);
  }
  console.log('data');
  console.log(data);
  console.log('data sort');
  data.sort(sort_by('setTime', false, parseInt));
  console.log(data);

  $scope.timeLabels =[];
  $scope.timeData =[];
  for(var i=0;i<data.length;i++){
    var tmpConflict =false;
    $scope.timeLabels.push(data[i].setTime);
    $scope.timeData.push(data[i].multiple);
    for(var j=0;j<data.length;j++){
      if(data[i].endTime == data[j].setTime){
        tmpConflict = true;
      }
    }
    if(!tmpConflict){
      $scope.timeLabels.push(data[i].endTime);
      $scope.timeData.push(0);
    }
  }
console.log('=========');
console.log($scope.timeLabels);
console.log($scope.timeData);
$scope.timeDatas= [$scope.timeData];



})
.controller('modesCtrl', function(connectBtModal, $ionicPopup, lightItemKey, $state, $ionicLoading,$scope, Sections, debugMocks, $rootScope) {
  
  /* Bluetooth Status Icon @header-bar*/
  // <button class="button button-icon button-clear ion-bluetooth" ng-class="{isBtConnected: connectBt.currentDeviceStatus}" ng-click="connectBt.openmodal()">
  $scope.connectBtModal ={
    btStatus:connectBtModal.btStatus,
    openModal: function(){
      connectBtModal
        .init()
        .then(function(modal) {
          modal.show();
      });
    }
  }
  /**/


  $scope.modes = Sections.getModesData();
  $scope.curMode = Sections.getCurMode();
  $scope.lightList = lightItemKey;

  $scope.goState = function(modeName){
    //alert('GG');
    $state.go('tab.patterns',{modeName:modeName});
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

  $ionicModal.fromTemplateUrl('templates/sectionEdit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.sectionModal = modal;
  });

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
    var min =$scope.thisSection.data['setMin'];
    var hour =$scope.thisSection.data['setHour'];
    if(min>29){
      hour = hour-1;
    }
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
      inputTime: hour*60*60+min*60,
      //(((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60))
      format: 24,         //Optional
      step: 1,           //Optional
    };
    ionicTimePicker.openTimePicker(ipEnd);
  };


  $scope.defValue = {d:0};

  $scope.changeDef = function(){
    var modePopup = $ionicPopup.show({
      templateUrl: 'templates/changeDef.html',
      title: '預設設定',
      scope: $scope,
      buttons: [
        {
          text: '<b>確定</b>',
          type: 'button-positive',
          onTap: function(e) {
                switch($scope.defValue.d) {
                  case '0':
                   $scope.defModeCus();
                   break;
                  case '1':
                    $scope.defModeNature();
                    break;
                  case '2':
                      $scope.defModeLong();
                      break;
                }
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

  $scope.defModeCus = function(n){
    $scope.mode.sections = [];

  }
  $scope.defModeNature = function(){
    $scope.mode.sections = $scope.mode.def_nature;

  }
  $scope.defModeLong = function(){
    $scope.mode.sections = $scope.mode.def_long;
  }


})
.controller('connectCtrl', function(myBluetooth, $scope, $cordovaBluetoothSerial, $ionicPlatform, $timeout, Sections, debugMocks) {




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


})

.controller('manualCtrl', function(connectBtModal, myBluetooth, lightItem, $scope, ionicTimePicker, debugMocks ) {

 /* Bluetooth Status Icon @header-bar*/
  // <button class="button button-icon button-clear ion-bluetooth" ng-class="{isBtConnected: connectBt.currentDeviceStatus}" ng-click="connectBt.openmodal()">
  $scope.connectBtModal ={
    btStatus:connectBtModal.btStatus,
    openModal: function(){
      connectBtModal
        .init()
        .then(function(modal) {
          modal.show();
      });
    }
  }
  /**/


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
;
