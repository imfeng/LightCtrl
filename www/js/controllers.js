angular.module('starter.controllers', [])
    .controller('managementCtrl',function($scope, $state){
        
    })
    .controller('devicesListCtrl',function($scope, $state){
        $scope.devicesData = [
            {
                'nameId':'',
                'name':'',
                'address':'',
                'group':''
            }
        ]
    })
    .controller('groupsListCtrl',function($scope, $state, $ionicPopup, $ionicModal){
        $scope.currentGrp = {
            //gid:null,
            data:{}
        }
        $ionicModal.fromTemplateUrl('templates/management/modifyGroupPopup.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.modal = modal;
          });
          $scope.modifyGroup = function(index) {
            //$scope.currentGrp.gip = $scope.groupsData[index].gid;
            $scope.currentGrp.data = $scope.groupsData[index];
            console.log($scope.groupsData[index]);
            console.log($scope.currentGrp);
            $scope.modal.show();
          };
          $scope.closeModal = function() {
            $scope.modal.hide();
          };
        $scope.groupsData = [
            {
                'gid':1,
                'gname':'自訂群組1',
                'members':[
                    {'text':'did1'},
                    {'text':'did2'},
                    {'text':'did3'}
                ],
            },
            {
                'gid':2,
                'gname':'自訂群組2',
                'members':[
                    {'text':'did4'},
                    {'text':'did5'},
                    {'text':'did6'}
                ],
            }
        ]
        $scope.addGroup = function(){
            $scope.groupsData.push({
                'gid':$scope.groupsData.length+1,
                'gname':'自訂群組',
                'members':[],
            });
        }
    })
    .controller('scheduleCtrl',function(connectBtModal,$scope, $state){
        $scope.connectBtModal = {
            btStatus: connectBtModal.btStatus,
            openModal: function() {
                connectBtModal
                    .init()
                    .then(function(modal) {
                        modal.show();
                    });
            }
        }
        $scope.groupsList = [
            {
                'gid':1,
                'name':'自訂名稱1',
                'members':[
                    'did1',
                    'did2',
                    'did3'
                ]
            },
            {
                'gid':2,
                'name':'自訂名稱2',
                'members':[
			'did4',
                    'did5',
                    'did6'
                
]
            },
            {
                'gid':3,
                'name':'自訂名稱3',
                'members':[
			'did7',
                    'did8',
                    'did9'
                
]
            }
        ]
        $scope.goModes = function(groupId){
            console.log('goModes: ' + groupId);
            $state.go('tab.modes', {
                'gid': groupId
            })
        }   
        
    })
    .controller('patternEditCtrl', function($timeout, currentMode, connectBtModal, $ionicPopup, $ionicModal, $stateParams, ionicTimePicker, lightItem, myBluetooth, $state, $ionicLoading, $scope, Sections) {

        $scope.currentMode = currentMode.info;
        /* Bluetooth Status Icon @header-bar*/
        // <button class="button button-icon button-clear ion-bluetooth" ng-class="{isBtConnected: connectBt.currentDeviceStatus}" ng-click="connectBt.openmodal()">
        $scope.connectBtModal = {
                btStatus: connectBtModal.btStatus,
                openModal: function() {
                    connectBtModal
                        .init()
                        .then(function(modal) {
                            modal.show();
                        });
                }
            }
            /**/
        $scope.$on('$ionicView.enter', function(e) {
            $scope.gid = $stateParams.gid;
            $scope.modeName = $stateParams.modeName;
            $scope.patternKey = $stateParams.patternKey;
            $scope.thisMode = Sections.getModesDataById($scope.modeName);
            console.log($scope.thisMode.patterns[$scope.patternKey]);
            if(angular.isUndefined($scope.thisMode.patterns[$scope.patternKey].groups[$scope.gid-1])){
                $scope.sections = angular.copy($scope.thisMode.patterns[$scope.patternKey].sections);
                console.log('undefine!!!!');
            }else{
                //console.log($scope.thisMode.patterns[$scope.patternKey].groups[$scope.gid-1]);
                $scope.sections = angular.copy($scope.thisMode.patterns[$scope.patternKey].groups[$scope.gid-1]);
            }
            if ($scope.patternKey == 0 || $scope.patternKey == 1) {
                if($scope.thisMode['alterable']){
                    $scope.isCustom = true;
                }else{
                    $scope.isCustom = false;
                }
            } else {
                $scope.isCustom = true;
            };
        });

        $scope.delSection = function(rmId) {
            if ($scope.isCustom) {

                //$scope.sections[rmId] = {};
                //Sections.remove($scope.sections, rmId);

                //$scope.data = Sections.saveToStorage();
                console.log('delSection:');
                console.log($scope.sections);
            } else {
                alert('預設值無法刪除！')
            }
        };
        $scope.addSection = function() {
            Sections.addParam($scope.sections, $scope.thisMode.modeId, $scope.gid);
            //console.log('data after add:');
            //console.log($scope.sections);
        };
        $scope.saveMode = function() {
            Sections.saveMode($scope.sections, $scope.modeName, $scope.patternKey);
            alert('Saved!')
        }

        // Modal
        $scope.lightList = lightItem;
        $scope.thisSection = {
            id: 0,
            data: {}
        };

        $ionicModal.fromTemplateUrl('templates/sectionEdit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.sectionModal = modal;
        });

        $scope.saveData = function() {
            var id = $scope.thisSection.id;
            //$scope.sections[id].ab_section = $scope.thisSection.data.ab_section;
            $scope.sections[id].setHour = $scope.thisSection.data.setHour;
            $scope.sections[id].setMin = $scope.thisSection.data.setMin;
            $scope.sections[id].multiple = $scope.thisSection.data.multiple;
            $scope.sections[id].group = $scope.thisSection.data.group;

            //
            var savePopup = $ionicPopup.show({
                template: '<p style="text-align: center;font-size:16pt;"><b>已更改</b></p>',
                title: '成功',
                scope: $scope,
                buttons: [{
                    text: '繼續編輯'
                }, {
                    text: '<b>上一頁</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        //alert(debugMocks.dump($ionicHistory.viewHistory()));
                        $scope.closeModal();
                    }
                }]
            });

            savePopup.then(function(res) {
                //console.log('Tapped!', res);
            });

            $timeout(function() {
                savePopup.close();
            }, 5000);


        }
        $scope.openModal = function(id) {
            if ($scope.isCustom) {
                $scope.thisSection.id = id;
                $scope.thisSection.data = angular.copy($scope.sections[id]);
                $scope.sectionModal.show();

            } else {
                alert('預設值無法更改！')
            }

        }
        $scope.closeModal = function() {
            $scope.sectionModal.hide();
        };

        $scope.openStartTimer = function() {
            var min = $scope.thisSection.data['setMin'];
            var hour = $scope.thisSection.data['setHour'];
            if (min > 29) {
                hour = hour - 1;
            }
            var ipStart = {
                callback: function(val) { //Mandatory
                    if (typeof(val) === 'undefined') {

                        console.log('Time not selected');
                    } else {
                        var selectedTime = new Date(val * 1000);
                        $scope.thisSection.data['setHour'] = selectedTime.getUTCHours();
                        $scope.thisSection.data['setMin'] = selectedTime.getUTCMinutes();
                      //  console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                    }
                },
                inputTime: hour * 60 * 60 + min * 60, //Optional
                format: 24, //Optional
                step: 1, //Optional
            };
            ionicTimePicker.openTimePicker(ipStart);
        };
        $scope.openEndTimer = function() {
            var min = $scope.thisSection.data['setMin'];
            var hour = $scope.thisSection.data['setHour'];
            if (min > 29) {
                hour = hour - 1;
            }
            var ipEnd = {
                callback: function(val) { //Mandatory
                    if (typeof(val) === 'undefined') {

                        console.log('Time not selected');
                    } else {
                        var selectedTime = new Date(val * 1000);
                        $scope.thisSection.data['endHour'] = selectedTime.getUTCHours();
                        $scope.thisSection.data['endMin'] = selectedTime.getUTCMinutes();
                        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                    }
                },
                inputTime: hour * 60 * 60 + min * 60,
                //(((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60))
                format: 24, //Optional
                step: 1, //Optional
            };
            ionicTimePicker.openTimePicker(ipEnd);
        };

        /**/

        $scope.sendToLight = function() {

            //$scope.DEBUG = debugMocks.dump(Sections.allToCmdDEBUG());
            myBluetooth.sendCmd(Sections.sectionsToCmd($scope.sections), 0, $scope.modeName, $scope.patternKey);
            // myBluetooth.sendCmd(Sections.sectionsToCmdDEBUG($scope.sections),0,$scope.modeName,$scope.patternKey);
            //currentMode.setInfo(0, $scope.modeName, $scope.patternKey);
            //console.log(Sections.allToCmd());

        }


    })
    .controller('patternsCtrl', function(currentMode, connectBtModal, $stateParams, $state, $ionicLoading, $scope, Sections) {
        $scope.currentMode = currentMode.info;
        /* Bluetooth Status Icon @header-bar*/
        // <button class="button button-icon button-clear ion-bluetooth" ng-class="{isBtConnected: connectBt.currentDeviceStatus}" ng-click="connectBt.openmodal()">
        $scope.connectBtModal = {
                btStatus: connectBtModal.btStatus,
                openModal: function() {
                    connectBtModal
                        .init()
                        .then(function(modal) {
                            modal.show();
                        });
                }
            }
            /**/
        $scope.modeName = $stateParams.modeName;
        $scope.gid = $stateParams.gid;
        $scope.mode = Sections.getModesDataById($scope.modeName);
        $scope.goState = function(index) {
            $state.go('tab.patternEdit', {
                modeName: $scope.modeName,
                patternKey: index,
                gid: $scope.gid
            })
        }


    })
    .controller('chartCtrl', function($compile, currentMode, $stateParams, $ionicLoading, $scope, Sections, debugMocks, $rootScope) {


        var sort_by = function(field, reverse, primer) {

            var key = primer ?
                function(x) {
                    return primer(x[field])
                } :
                function(x) {
                    return x[field]
                };

            reverse = !reverse ? 1 : -1;

            return function(a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        }
        $scope.series = ['時間'];
        $scope.chartData = {
            timeDatas: [],
            timeData: [],
            timeLabels: [],
            chartBoxWidth: 300,
            chartBoxHeight: 300
        }
        $scope.chartData.timeDatas[0] = $scope.chartData.timeData;
        $scope.testChartData = {
                datas: []
            }
            //
        $scope.$on('$ionicView.enter', function(e) {

        });
        $scope.renderChart = function() {

            $scope.chartData.timeData.splice(0, $scope.chartData.timeData.length);
            $scope.chartData.timeLabels.splice(0, $scope.chartData.timeLabels.length);

            $scope.testChartData.datas.splice(0, $scope.testChartData.datas.length);
            $scope.currentMode = currentMode.info;

            var pattern = Sections.getPattern($scope.currentMode.mode, $scope.currentMode.pattern);
            $scope.sections = angular.copy(pattern.sections);
            var chartBox = angular.element(document.querySelector('#line'));
            if ($scope.sections.length > 6) {
                //angular.element('#line').css('min-width', $scope.sections.length*60);

                chartBox[0].style.width = $scope.sections.length * 90 + "px";
                //var chartBox = document.getElementById("chartBox").getContext("2d");
                //chartBox.canvas.width = $scope.sections.length*300;
            } else {
                chartBox[0].style.width = "100%";

            }

            var time = [];
            var data = [];

            for (var i = 0; i < $scope.sections.length; i++) {
                var tmp = {};

                tmp.setTime = (1e4 + "" + ($scope.sections[i].setHour * 100 + $scope.sections[i].setMin).toString()).slice(-4);
                tmp.endTime = (1e4 + "" + ($scope.sections[i].endHour * 100 + $scope.sections[i].endMin).toString()).slice(-4);
                tmp.multiple = $scope.sections[i].multiple;

                data.push(tmp);
            }
            console.log('data');
            console.log(data);
            console.log('data sort');
            data.sort(sort_by('setTime', false, parseInt));
            console.log(data);
            /****************************************************/
            for (var i = 0; i < data.length; i++) {
                var tmpConflict = false;
                var labelConflict = false;

                for (var j = 0; j < $scope.testChartData.datas.length; j++) {
                    if (data[i].setTime == $scope.testChartData.datas[j].label) {
                        labelConflict = true;
                    } else {}
                }
                if (!labelConflict) {
                    var tmpD = {};
                    tmpD.label = data[i].setTime;
                    tmpD.multiple = parseInt(data[i].multiple);
                    $scope.testChartData.datas.push(tmpD);
                } else {}
                for (var k = 0; k < data.length; k++) {
                    if (data[i].endTime == data[k].setTime) {
                        tmpConflict = true;
                    } else {}
                }
                if (!tmpConflict) {
                    var tmpE = {};
                    tmpE.label = data[i].endTime;
                    tmpE.multiple = parseInt(0);
                    $scope.testChartData.datas.push(tmpE);
                }
                /**/
                /*
for(var j=0;j<$scope.chartData.timeLabels.length;j++){
  if(data[i].setTime == $scope.chartData.timeLabels[j]){
    labelConflict =true;
  }else{}
}
if(!labelConflict){
  $scope.chartData.timeLabels.push(data[i].setTime);
  $scope.chartData.timeData.push(parseInt(data[i].multiple));
}else{}

for(var k=0;k<data.length;k++){
  if(data[i].endTime == data[k].setTime){
    tmpConflict = true;
  }else{}
}
if(!tmpConflict){
  $scope.chartData.timeLabels.push(data[i].endTime);
  $scope.chartData.timeData.push(0);
}*/
            }
            $scope.testChartData.datas.sort(sort_by('label', false, parseInt));
            for (var r = 0; r < $scope.testChartData.datas.length; r++) {
                $scope.chartData.timeLabels.push($scope.testChartData.datas[r].label);
                $scope.chartData.timeData.push($scope.testChartData.datas[r].multiple);
            }
            console.log('=========');
            console.log($scope.chartData.timeLabels);
            console.log($scope.chartData.timeDatas);
            //$scope.$apply();
            //$scope.$digest();

        };

        $scope.reChart = function() {
            $scope.renderChart();

            //chartBox.innerHTML = '';
            //var element = angular.element("<canvas id=\"line\" class=\"chart chart-line\" data=\"chartData.timeDatas\" labels=\"chartData.timeLabels\" legend=\"true\" series=\"series\" options=\"{showTooltips: false}\"></canvas>");
            //var compile = $compile(element)($scope);
            //chartBox.append('Hi<br/>');  
            //chartBox.replaceWith(element);
            //$scope.$digest();
            //$scope.chartData.timeLabels.pop();
            //$scope.chartData.timeData.pop();
        };


    })
    .controller('modesCtrl', function($stateParams, currentMode, connectBtModal, $ionicPopup, lightItemKey, $state, $ionicLoading, $scope, Sections, debugMocks, $rootScope) {
        $scope.gid = $stateParams.gid;

        /* Bluetooth Status Icon @header-bar*/
        // <button class="button button-icon button-clear ion-bluetooth" ng-class="{isBtConnected: connectBt.currentDeviceStatus}" ng-click="connectBt.openmodal()">
        $scope.connectBtModal = {
                btStatus: connectBtModal.btStatus,
                openModal: function() {
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

        $scope.goState = function(modeName) {
            //alert('GG');
            $state.go('tab.patterns', {
                modeName: modeName,
                gid: $scope.gid 
            });
        }
        $scope.find = {
            key: function(n) {
                return $scope.modes[Object.keys($scope.modes)[n]];
            },
            index: function(n) {
                return Object.keys($scope.modes)[n];
            }

        }
        //console.log($scope.find.key(1));

        $scope.changeMode = function() {
            var modePopup = $ionicPopup.show({
                templateUrl: 'templates/changeMode.html',
                title: '更改目前的模式',
                scope: $scope,
                buttons: [{
                    text: '<b>確定</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        //alert(debugMocks.dump($ionicHistory.viewHistory()));

                    }
                }]
            });

            modePopup.then(function(res) {
                console.log('Tapped!', res);
            });

            $timeout(function() {
                modePopup.close();
            }, 5000);
        }
        $scope.saveMode = function() {

            Sections.saveCurMode();
        }


        $scope.currentMode = currentMode.info;


    })
    
    .controller('connectCtrl', function(myBluetooth, $scope, $cordovaBluetoothSerial, $ionicPlatform, $timeout, Sections, debugMocks) {




        $scope.reset = function() {
            $scope.data = Sections.allToCmd();
            var cmd = {
                'cmd': Sections.allToCmdDEBUG()
            }
            $scope.cmdDEBUG = debugMocks.dump(cmd);
            $scope.cmd = debugMocks.dump($scope.data);
        }

        $scope.showDelBtn = function() {
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
        $scope.refreshList = function() {
            myBluetooth.setStatus('ERROR!');
            console.log('isNotice:' + $scope.btStatus.isNotice);
            $scope.cmdDEBUG = Sections.allToCmdDEBUG();
        };
        $scope.connectDevice = function() {
            myBluetooth.setStatus('ERROR!')
        };
        $scope.sendCmd = function() {
            alert($scope.cmd['data']);
        };
        //$scope.test = function(test){alert($scope.devices[test].address)};



        if (ionic.Platform.is('android') || ionic.Platform.is('ios')) {
            $ionicPlatform.ready(function() {

                myBluetooth.isEnabled();
                $scope.enableBluetooth = function() {
                    myBluetooth.enableBluetooth();
                    myBluetooth.refreshList();
                };

                $scope.refreshList = function() {
                    myBluetooth.refreshList();

                };
                $scope.connectDevice = function(index) {
                    myBluetooth.connectDevice(index);
                };
                $scope.disconnectDevice = function() {
                    myBluetooth.disconnectDevice();
                };
                $scope.sendCmd = function() {

                    myBluetooth.sendCmd($scope.data);

                };
                $scope.discover = function() {

                    myBluetooth.discover();

                };
            });
        } else {}


    })

.controller('manualCtrl', function($timeout, $ionicPopup, currentMode, connectBtModal, myBluetooth, lightItem, $scope, ionicTimePicker, debugMocks) {

        /* Bluetooth Status Icon @header-bar*/
        // <button class="button button-icon button-clear ion-bluetooth" ng-class="{isBtConnected: connectBt.currentDeviceStatus}" ng-click="connectBt.openmodal()">
        $scope.connectBtModal = {
                btStatus: connectBtModal.btStatus,
                openModal: function() {
                    connectBtModal
                        .init()
                        .then(function(modal) {
                            modal.show();
                        });
                }
            }
            /**/


        $scope.btStatus = myBluetooth.btStatus;

        $scope.lightList = lightItem;

        $scope.thisSection = {
            'mode': 0,
            'multiple': 0,
            'group': 0
        };
        console.log('$scope.thisSection');
        console.log($scope.thisSection.groupid);
        $scope.thisGroup = {
            'value': 0
        }
        
            /* 取消關閉手動 201705 */
            //var disableManualCmd = String.fromCharCode(240) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(255);

        $scope.isConnectedFunc = function() {}
        $scope.sendCmd = function() {
            if (!btStatus.currentDeviceStatus) {
                alert('cordova ERROR')
            };
        }
        $scope.sendDisableManualCmd = function() {
            if (!btStatus.currentDeviceStatus) {
                alert('cordova ERROR')
            };
        }
        $scope.currentMode = currentMode.info;
        
        $scope.showDefineGroupPopup = function() {
            var defineGroupPopup = $ionicPopup.show({
                templateUrl: 'templates/popup-defineGroup.html',
                title: '設置群組',
                scope: $scope,
                buttons: [{
                    text: '取消'
                }, {
                    text: '<b>傳送設置</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        //alert(debugMocks.dump($ionicHistory.viewHistory()));
                        $scope.sendDefineGroup();
                    }
                }]
            });

            defineGroupPopup.then(function(res) {
                console.log('Tapped!', res);
            });

            $timeout(function() {
                defineGroupPopup.close();
            }, 5000);
        }
        $scope.sendDefineGroup = function() {
                console.log('thisGroup.value' + thisGroup.value);
            }
            /* Cordova */

        if (ionic.Platform.is('android') || ionic.Platform.is('ios')) {
            $scope.sendDisableManualCmd = function() {
                if (btStatus.currentDeviceStatus) {
                    myBluetooth.sendCmd(disableManualCmd, 0);
                    //myBluetooth.sendCmd(Sections.sectionsToCmd($scope.sections),'手動模式','','');
                } else {
                    alert('No Device Connected!');
                }
            }
            $scope.sendDefineGroup = function() {
                if (btStatus.currentDeviceStatus) {
                    var cmd = new Uint8Array(
                        [250, 161,
                            $scope.thisGroup.value,
                            255
                        ]
                    );
                    myBluetooth.sendCmd(cmd, 1);
                } else {
                    alert('No Device Connected!');
                }

            };
            

            $scope.sendCmd = function() {
                if (btStatus.currentDeviceStatus) {
                    /*var cmd = String.fromCharCode(250) +
                        String.fromCharCode(170) +
                        String.fromCharCode($scope.thisSection.multiple) +
                        String.fromCharCode($scope.thisSection.mode) +
                        String.fromCharCode($scope.thisSection.group) +
                        String.fromCharCode(255);*/
                    var cmd = new Uint8Array(
                        [250, 170,
                            $scope.thisSection.multiple,
                            $scope.thisSection.mode+1,
                            $scope.thisSection.group,
                            255
                        ]
                    );
                    //alert(cmd.split('').map(function(char) {return char.charCodeAt(0);}));
                    myBluetooth.sendCmd(cmd, 1);
                } else {
                    alert('No Device Connected!');
                }
            }
            $scope.CorrectionTime = function(){
                if (btStatus.currentDeviceStatus) {
                    var date = new Date();
                    var cmd = new Uint8Array(
                        [250, 160,
                            date.getHours(),
                            date.getMinutes(),
                            (date.getSeconds()+1)%60,
                            255
                        ]
                    );
                    myBluetooth.sendCmd(cmd, 1);
                } else {
                    alert('No Device Connected!');
                }
            }
        } else {}

    })
    .controller('devModeCtrl', function($timeout,$ionicPopup,currentMode, connectBtModal, myBluetooth, $scope, ionicTimePicker, debugMocks) {

        $scope.linesNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
$scope.thisFanSpeed = {
            'value': 0
        }
        $scope.showFanSpeedPopup = function() {
            var defineGroupPopup = $ionicPopup.show({
                templateUrl: 'templates/popup-fanSpeed.html',
                title: '設置群組',
                scope: $scope,
                buttons: [{
                    text: '取消'
                }, {
                    text: '<b>傳送設置</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        //alert(debugMocks.dump($ionicHistory.viewHistory()));
                        $scope.sendFanSpeed();
                    }
                }]
            });

            defineGroupPopup.then(function(res) {
                console.log('Tapped!', res);
            });

        }
        $scope.sendFanSpeed = function() {
                if (btStatus.currentDeviceStatus) {
                    var cmd = new Uint8Array(
                        [250, 173,
                            $scope.thisFanSpeed.value,
                            255
                        ]
                    );
                    myBluetooth.sendCmd(cmd, 1);
                } else {
                    alert('No Device Connected!');
                }

            };
        /* Bluetooth Status Icon @header-bar*/
        // <button class="button button-icon button-clear ion-bluetooth" ng-class="{isBtConnected: connectBt.currentDeviceStatus}" ng-click="connectBt.openmodal()">
        $scope.connectBtModal = {
            btStatus: connectBtModal.btStatus,
            openModal: function() {
                connectBtModal
                    .init()
                    .then(function(modal) {
                        modal.show();
                    });
            }
        }
        $scope.btStatus = myBluetooth.btStatus;

        $scope.thisSection = {
            'mode': 0,
            'multiple': 0,
            'lines': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'group': 0
        };

        var disableManualCmd = String.fromCharCode(240) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(255);
        $scope.isConnectedFunc = function() {}
        $scope.sendCmd = function() {
            if (!btStatus.currentDeviceStatus) {
                alert('cordova ERROR')
            };
        }
        $scope.sendDisableManualCmd = function() {
            if (!btStatus.currentDeviceStatus) {
                alert('cordova ERROR')
            };
        }
        $scope.currentMode = currentMode.info;

        /* Cordova */

        if (ionic.Platform.is('android') || ionic.Platform.is('ios')) {
            $scope.sendDisableManualCmd = function() {
                if (btStatus.currentDeviceStatus) {
                    myBluetooth.sendCmd(disableManualCmd, 0);
                    //myBluetooth.sendCmd(Sections.sectionsToCmd($scope.sections),'手動模式','','');
                } else {
                    alert('No Device Connected!');
                }
            }

            $scope.sendCmd = function() {
                if (btStatus.currentDeviceStatus) {
                    /*let tempLines = "";
                    let sta = String.fromCharCode(250) + String.fromCharCode(172);
                    let end = String.fromCharCode(255);
                    tempLines += sta +
                        String.fromCharCode($scope.thisSection['multiple']) +
                        String.fromCharCode($scope.thisSection['group']);
                    for (let i = 0; i < $scope.thisSection['lines'].length; i++) {
                        tempLines += String.fromCharCode($scope.thisSection['lines'][i]);
                    }
                    tempLines += end;*/
                    let data = new Uint8Array(
                        [250, 172,
                            $scope.thisSection['multiple'],
                            $scope.thisSection['group'],
                            $scope.thisSection['lines'][0],
                            $scope.thisSection['lines'][1],
                            $scope.thisSection['lines'][2],
                            $scope.thisSection['lines'][3],
                            $scope.thisSection['lines'][4],
                            $scope.thisSection['lines'][5],
                            $scope.thisSection['lines'][6],
                            $scope.thisSection['lines'][7],
                            $scope.thisSection['lines'][8],
                            $scope.thisSection['lines'][9],
                            $scope.thisSection['lines'][10],
                            $scope.thisSection['lines'][11],
                            255
                        ]
                    );
                    myBluetooth.sendCmd(data, 2); //工程模式

                } else {
                    alert('No Device Connected!');
                }
            }

        } else {
            $scope.sendCmd = function() {
                var tempLines = "";
                for (var i = 0; i < $scope.thisSection['lines'].length; i++) {
                    tempLines += $scope.thisSection['lines'][i].toString() + ",";
                }
                var cmd = (65).toString() + ',' + tempLines + (11).toString() + ',' + (22).toString() + ',90';
                console.log("CMD:\n");
                alert(debugMocks.dump(cmd));
            }

        }

    });

/*
.controller('modeEditCtrl', function($timeout, $ionicPopup, ionicTimePicker, lightItem, $ionicModal, $stateParams, $ionicLoading, $scope, Sections, debugMocks, $rootScope) {



        $scope.$on('$ionicView.enter', function(e) {
            $scope.modeName = $stateParams.modeName;
            $scope.mode = angular.copy(Sections.getModesData()[$scope.modeName]);
        });


        //$scope.mode = Sections.getModesData()[modeName] || false;
        console.log('$scope.mode: ' + $scope.mode);

        console.log('mode name: ' + $scope.modeName)

        $scope.delSection = function(rmId) {
            //console.log('delSection:');
            //console.log('rmId:' + rmId);
            //delete $scope.mode.sections[rmId];
            Sections.remove($scope.mode.sections, rmId);

            //$scope.data = Sections.saveToStorage();

            console.log($scope.mode);
        };
        $scope.addSection = function() {
            Sections.addParam($scope.mode.sections, $scope.mode.modeId);
            console.log('data after add:');
            console.log($scope.mode);
        };
        $scope.saveMode = function() {
            Sections.saveMode($scope.mode.sections, $scope.modeName);
            alert('Saved!')
        }

        // Modal
        $scope.lightList = lightItem;
        $scope.thisSection = {
            id: 0,
            data: {}
        };

        $scope.saveData = function() {
            var id = $scope.thisSection.id;
            //$scope.mode.sections[id].ab_section = $scope.thisSection.data.ab_section;
            $scope.mode.sections[id].setHour = $scope.thisSection.data.setHour;
            $scope.mode.sections[id].setMin = $scope.thisSection.data.setMin;
            $scope.mode.sections[id].multiple = $scope.thisSection.data.multiple;
            $scope.mode.sections[id].group = $scope.thisSection.data.group;
            //$scope.mode.sections[id].endHour = $scope.thisSection.data.endHour;
            //$scope.mode.sections[id].endMin = $scope.thisSection.data.endMin;
            //
            var savePopup = $ionicPopup.show({
                template: '<p style="text-align: center;font-size:16pt;"><b>已更改</b></p>',
                title: '成功',
                scope: $scope,
                buttons: [{
                    text: '繼續編輯'
                }, {
                    text: '<b>上一頁</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        //alert(debugMocks.dump($ionicHistory.viewHistory()));
                        $scope.closeModal();
                    }
                }]
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

        $scope.openModal = function(id) {
            $scope.thisSection.id = id;
            $scope.thisSection.data = angular.copy($scope.mode.sections[id]);
            $scope.sectionModal.show();
        }
        $scope.closeModal = function() {
            $scope.sectionModal.hide();
        };

        $scope.openStartTimer = function() {
            var min = $scope.thisSection.data['setMin'];
            var hour = $scope.thisSection.data['setHour'];
            if (min > 29) {
                hour = hour - 1;
            }
            var ipStart = {
                callback: function(val) { //Mandatory
                    if (typeof(val) === 'undefined') {

                        console.log('Time not selected');
                    } else {
                        var selectedTime = new Date(val * 1000);
                        $scope.thisSection.data['setHour'] = selectedTime.getUTCHours();
                        $scope.thisSection.data['setMin'] = selectedTime.getUTCMinutes();
                        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                    }
                },
                inputTime: hour * 60 * 60 + min * 60, //Optional
                format: 24, //Optional
                step: 1, //Optional
            };
            ionicTimePicker.openTimePicker(ipStart);
        };
        $scope.openEndTimer = function() {
            var min = $scope.thisSection.data['setMin'];
            var hour = $scope.thisSection.data['setHour'];
            if (min > 29) {
                hour = hour - 1;
            }
            var ipEnd = {
                callback: function(val) { //Mandatory
                    if (typeof(val) === 'undefined') {

                        console.log('Time not selected');
                    } else {
                        var selectedTime = new Date(val * 1000);
                        $scope.thisSection.data['endHour'] = selectedTime.getUTCHours();
                        $scope.thisSection.data['endMin'] = selectedTime.getUTCMinutes();
                        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                    }
                },
                inputTime: hour * 60 * 60 + min * 60,
                //(((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60))
                format: 24, //Optional
                step: 1, //Optional
            };
            ionicTimePicker.openTimePicker(ipEnd);
        };


        $scope.defValue = {
            d: 0
        };

        $scope.changeDef = function() {
            var modePopup = $ionicPopup.show({
                templateUrl: 'templates/changeDef.html',
                title: '預設設定',
                scope: $scope,
                buttons: [{
                    text: '<b>確定</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        switch ($scope.defValue.d) {
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
                }]
            });

            modePopup.then(function(res) {
                console.log('Tapped!', res);
            });

            $timeout(function() {
                modePopup.close();
            }, 5000);
        }

        $scope.defModeCus = function(n) {
            $scope.mode.sections = [];

        }
        $scope.defModeNature = function() {
            $scope.mode.sections = $scope.mode.def_nature;

        }
        $scope.defModeLong = function() {
            $scope.mode.sections = $scope.mode.def_long;
        }


    })
*/
