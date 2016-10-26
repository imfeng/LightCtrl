angular.module('starter.services', [])

.service('connectBtModal', function(myBluetooth, $ionicModal, $rootScope, $ionicPlatform) {


    var init = function(tpl, $scope) {

        var promise;
        $scope = $scope || $rootScope.$new();

        /**/


        $scope.showDelBtn = function() {
            $scope.ctrl.showDelete = true;
        }

        $scope.$on('$ionicView.enter', function(e) {
            $scope.reset();
        });


        $scope.btStatus = myBluetooth.btStatus;


        //$scope.devices = myBluetooth.myDevices;

        console.log($scope.btStatus);

        /* Init */
        $scope.refreshList = function() {
            myBluetooth.setStatus('ERROR!');
            console.log('isNotice:' + $scope.btStatus.isNotice);
        };
        $scope.connectDevice = function() { myBluetooth.setStatus('ERROR!') };
        $scope.sendCmd = function() {};
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

                    myBluetooth.sendCmd();

                };
            });
        } else {}

        /**/
        promise = $ionicModal.fromTemplateUrl('templates/modal-connect.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            return modal;
        });

        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        return promise;
    }

    return {
        init: init,
        btStatus: myBluetooth.btStatus
    }

})

.factory('connectBt', function($ionicModal, myBluetooth, $cordovaBluetoothSerial, $ionicPlatform, $timeout, Sections) {


    var scope = {

        reset: function() {},
        showDelBtn: function() {},
        btStatus: myBluetooth.btStatus,
        refreshList: function() {
            myBluetooth.setStatus('ERROR!');
        },
        connectDevice: function() { myBluetooth.setStatus('ERROR!') },
        sendCmd: function() { alert('Send ERROR'); },
    }

    $ionicModal.fromTemplateUrl('templates/modal-connect.html', {
        scope: scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        var sectionModal = modal;
    });

    return {
        openModal: function() {
            sectionModal.show();
        },
        closeModal: function() {
            sectionModal.hide();
        }
    }
    /*

      if (ionic.Platform.is('android') || ionic.Platform.is('ios') ) {
        $ionicPlatform.ready(function() {

          myBluetooth.isEnabled();
          var enableBluetooth = function(){
              myBluetooth.enableBluetooth();
              myBluetooth.refreshList();
          };

          var refreshList = function(){
            myBluetooth.refreshList();

          };
          var connectDevice = function(index){
            myBluetooth.connectDevice(index);
          };
          var disconnectDevice = function(){
            myBluetooth.disconnectDevice();
          };
          var sendCmd = function(){

            myBluetooth.sendCmd($scope.data);

          };
        }); 
      }else{}
    */

})

.factory('Sections', function(debugMocks) {


        /*
            'ab_section':0,
            //'smode': 0,
            //'section': 0,
            'setHour': 23,
            'setMin': 21,
            'mode': 0,
            'multiple': 33,
            endHour:0,
            endMin:0

        */
        var curMode = {
            key: 'sun5m'
        };
        var modes = {
            'sun5m': {
                modeId: 0,
                name: '太陽光5m',
                inUsing: true,
                patternChoice: '',
                patterns: [{
                    name: '長亮',
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 0, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: '仿太陽光',
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 0, "multiple": 0, "endHour": 7, "endMin": 0 }, { "ab_section": 1, "setHour": 7, "setMin": 0, "mode": 0, "multiple": 17, "endHour": 8, "endMin": 0 }, { "ab_section": 2, "setHour": 8, "setMin": 0, "mode": 0, "multiple": 34, "endHour": 9, "endMin": 0 }, { "ab_section": 3, "setHour": 9, "setMin": 0, "mode": 0, "multiple": 51, "endHour": 10, "endMin": 0 }, { "ab_section": 4, "setHour": 10, "setMin": 0, "mode": 0, "multiple": 68, "endHour": 11, "endMin": 0 }, { "ab_section": 5, "setHour": 11, "setMin": 0, "mode": 0, "multiple": 85, "endHour": 12, "endMin": 0 }, { "ab_section": 6, "setHour": 12, "setMin": 0, "mode": 0, "multiple": 100, "endHour": 13, "endMin": 0 }, { "ab_section": 7, "setHour": 13, "setMin": 0, "mode": 0, "multiple": 85, "endHour": 14, "endMin": 0 }, { "ab_section": 8, "setHour": 14, "setMin": 0, "mode": 0, "multiple": 68, "endHour": 15, "endMin": 0 }, { "ab_section": 9, "setHour": 15, "setMin": 0, "mode": 0, "multiple": 51, "endHour": 16, "endMin": 0 }, { "ab_section": 10, "setHour": 16, "setMin": 0, "mode": 0, "multiple": 34, "endHour": 17, "endMin": 0 }, { "ab_section": 11, "setHour": 17, "setMin": 0, "mode": 0, "multiple": 17, "endHour": 18, "endMin": 0 }, { "ab_section": 12, "setHour": 18, "setMin": 0, "mode": 0, "multiple": 0, "endHour": 0, "endMin": 0 }]
                }, {
                    name: "pattern1",
                    sections: [{ "ab_section": 0, "setHour": 8, "setMin": 0, "mode": 0, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern2",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 0, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern3",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 0, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern4",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 0, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }]
            },
            'sun10m': {
                modeId: 1,
                name: '太陽光10m',
                inUsing: false,
                patternChoice: '',
                patterns: [{
                    name: '長亮',
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 1, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: '仿太陽光',
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 1, "multiple": 0, "endHour": 7, "endMin": 0 }, { "ab_section": 1, "setHour": 7, "setMin": 0, "mode": 1, "multiple": 17, "endHour": 8, "endMin": 0 }, { "ab_section": 2, "setHour": 8, "setMin": 0, "mode": 1, "multiple": 34, "endHour": 9, "endMin": 0 }, { "ab_section": 3, "setHour": 9, "setMin": 0, "mode": 1, "multiple": 51, "endHour": 10, "endMin": 0 }, { "ab_section": 4, "setHour": 10, "setMin": 0, "mode": 1, "multiple": 68, "endHour": 11, "endMin": 0 }, { "ab_section": 5, "setHour": 11, "setMin": 0, "mode": 1, "multiple": 85, "endHour": 12, "endMin": 0 }, { "ab_section": 6, "setHour": 12, "setMin": 0, "mode": 1, "multiple": 100, "endHour": 13, "endMin": 0 }, { "ab_section": 7, "setHour": 13, "setMin": 0, "mode": 1, "multiple": 85, "endHour": 14, "endMin": 0 }, { "ab_section": 8, "setHour": 14, "setMin": 0, "mode": 1, "multiple": 68, "endHour": 15, "endMin": 0 }, { "ab_section": 9, "setHour": 15, "setMin": 0, "mode": 1, "multiple": 51, "endHour": 16, "endMin": 0 }, { "ab_section": 10, "setHour": 16, "setMin": 0, "mode": 1, "multiple": 34, "endHour": 17, "endMin": 0 }, { "ab_section": 11, "setHour": 17, "setMin": 0, "mode": 1, "multiple": 17, "endHour": 18, "endMin": 0 }, { "ab_section": 12, "setHour": 18, "setMin": 0, "mode": 1, "multiple": 0, "endHour": 0, "endMin": 0 }]
                }, {
                    name: "pattern1",
                    sections: [{ "ab_section": 0, "setHour": 8, "setMin": 0, "mode": 1, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern2",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 1, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern3",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 1, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern4",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 1, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }]
            },
            'sun15m': {
                modeId: 2,
                name: '太陽光15m',
                inUsing: false,
                patternChoice: '',
                patterns: [{
                    name: '長亮',
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 2, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: '仿太陽光',
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 2, "multiple": 0, "endHour": 7, "endMin": 0 }, { "ab_section": 1, "setHour": 7, "setMin": 0, "mode": 2, "multiple": 17, "endHour": 8, "endMin": 0 }, { "ab_section": 2, "setHour": 8, "setMin": 0, "mode": 2, "multiple": 34, "endHour": 9, "endMin": 0 }, { "ab_section": 3, "setHour": 9, "setMin": 0, "mode": 2, "multiple": 51, "endHour": 10, "endMin": 0 }, { "ab_section": 4, "setHour": 10, "setMin": 0, "mode": 0, "multiple": 68, "endHour": 11, "endMin": 0 }, { "ab_section": 5, "setHour": 11, "setMin": 0, "mode": 0, "multiple": 85, "endHour": 12, "endMin": 0 }, { "ab_section": 6, "setHour": 12, "setMin": 0, "mode": 0, "multiple": 100, "endHour": 13, "endMin": 0 }, { "ab_section": 7, "setHour": 13, "setMin": 0, "mode": 0, "multiple": 85, "endHour": 14, "endMin": 0 }, { "ab_section": 8, "setHour": 14, "setMin": 0, "mode": 0, "multiple": 68, "endHour": 15, "endMin": 0 }, { "ab_section": 9, "setHour": 15, "setMin": 0, "mode": 0, "multiple": 51, "endHour": 16, "endMin": 0 }, { "ab_section": 10, "setHour": 16, "setMin": 0, "mode": 0, "multiple": 34, "endHour": 17, "endMin": 0 }, { "ab_section": 11, "setHour": 17, "setMin": 0, "mode": 0, "multiple": 17, "endHour": 18, "endMin": 0 }, { "ab_section": 12, "setHour": 18, "setMin": 0, "mode": 0, "multiple": 0, "endHour": 0, "endMin": 0 }]
                }, {
                    name: "pattern1",
                    sections: [{ "ab_section": 0, "setHour": 8, "setMin": 0, "mode": 2, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern2",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 2, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern3",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 2, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern4",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 2, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }]
            },
            'sun20m': {
                modeId: 3,
                name: '太陽光20m',
                inUsing: false,
                patternChoice: '',
                patterns: [{
                    name: '長亮',
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 3, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: '仿太陽光',
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 3, "multiple": 0, "endHour": 7, "endMin": 0 }, { "ab_section": 1, "setHour": 7, "setMin": 0, "mode": 3, "multiple": 17, "endHour": 8, "endMin": 0 }, { "ab_section": 2, "setHour": 8, "setMin": 0, "mode": 3, "multiple": 34, "endHour": 9, "endMin": 0 }, { "ab_section": 3, "setHour": 9, "setMin": 0, "mode": 3, "multiple": 51, "endHour": 10, "endMin": 0 }, { "ab_section": 4, "setHour": 10, "setMin": 0, "mode": 3, "multiple": 68, "endHour": 11, "endMin": 0 }, { "ab_section": 5, "setHour": 11, "setMin": 0, "mode": 3, "multiple": 85, "endHour": 12, "endMin": 0 }, { "ab_section": 6, "setHour": 12, "setMin": 0, "mode": 3, "multiple": 100, "endHour": 13, "endMin": 0 }, { "ab_section": 7, "setHour": 13, "setMin": 0, "mode": 3, "multiple": 85, "endHour": 14, "endMin": 0 }, { "ab_section": 8, "setHour": 14, "setMin": 0, "mode": 3, "multiple": 68, "endHour": 15, "endMin": 0 }, { "ab_section": 9, "setHour": 15, "setMin": 0, "mode": 3, "multiple": 51, "endHour": 16, "endMin": 0 }, { "ab_section": 10, "setHour": 16, "setMin": 0, "mode": 3, "multiple": 34, "endHour": 17, "endMin": 0 }, { "ab_section": 11, "setHour": 17, "setMin": 0, "mode": 3, "multiple": 17, "endHour": 18, "endMin": 0 }, { "ab_section": 12, "setHour": 18, "setMin": 0, "mode": 3, "multiple": 0, "endHour": 0, "endMin": 0 }]
                }, {
                    name: "pattern1",
                    sections: [{ "ab_section": 0, "setHour": 8, "setMin": 0, "mode": 3, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern2",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 3, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern3",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 3, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern4",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 3, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }]
            },
            'cri': {
                modeId: 4,
                name: '高演色性太陽光',
                inUsing: false,
                patternChoice: '',
                patterns: [{
                    name: '長亮',
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 4, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: '仿太陽光',
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 4, "multiple": 0, "endHour": 7, "endMin": 0 }, { "ab_section": 1, "setHour": 7, "setMin": 0, "mode": 4, "multiple": 17, "endHour": 8, "endMin": 0 }, { "ab_section": 2, "setHour": 8, "setMin": 0, "mode": 4, "multiple": 34, "endHour": 9, "endMin": 0 }, { "ab_section": 3, "setHour": 9, "setMin": 0, "mode": 4, "multiple": 51, "endHour": 10, "endMin": 0 }, { "ab_section": 4, "setHour": 10, "setMin": 0, "mode": 4, "multiple": 68, "endHour": 11, "endMin": 0 }, { "ab_section": 5, "setHour": 11, "setMin": 0, "mode": 4, "multiple": 85, "endHour": 12, "endMin": 0 }, { "ab_section": 6, "setHour": 12, "setMin": 0, "mode": 4, "multiple": 100, "endHour": 13, "endMin": 0 }, { "ab_section": 7, "setHour": 13, "setMin": 0, "mode": 4, "multiple": 85, "endHour": 14, "endMin": 0 }, { "ab_section": 8, "setHour": 14, "setMin": 0, "mode": 4, "multiple": 68, "endHour": 15, "endMin": 0 }, { "ab_section": 9, "setHour": 15, "setMin": 0, "mode": 4, "multiple": 51, "endHour": 16, "endMin": 0 }, { "ab_section": 10, "setHour": 16, "setMin": 0, "mode": 4, "multiple": 34, "endHour": 17, "endMin": 0 }, { "ab_section": 11, "setHour": 17, "setMin": 0, "mode": 4, "multiple": 17, "endHour": 18, "endMin": 0 }, { "ab_section": 12, "setHour": 18, "setMin": 0, "mode": 4, "multiple": 0, "endHour": 0, "endMin": 0 }]
                }, {
                    name: "pattern1",
                    sections: [{ "ab_section": 0, "setHour": 8, "setMin": 0, "mode": 4, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern2",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 4, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern3",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 4, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern4",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 4, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }]
            },
            'blue': {
                modeId: 5,
                name: '藍色冷光',
                inUsing: false,
                patternChoice: '',
                patterns: [{
                    name: '長亮',
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 5, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: '仿太陽光',
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 5, "multiple": 0, "endHour": 7, "endMin": 0 }, { "ab_section": 1, "setHour": 7, "setMin": 0, "mode": 5, "multiple": 17, "endHour": 8, "endMin": 0 }, { "ab_section": 2, "setHour": 8, "setMin": 0, "mode": 5, "multiple": 34, "endHour": 9, "endMin": 0 }, { "ab_section": 3, "setHour": 9, "setMin": 0, "mode": 5, "multiple": 51, "endHour": 10, "endMin": 0 }, { "ab_section": 4, "setHour": 10, "setMin": 0, "mode": 5, "multiple": 68, "endHour": 11, "endMin": 0 }, { "ab_section": 5, "setHour": 11, "setMin": 0, "mode": 5, "multiple": 85, "endHour": 12, "endMin": 0 }, { "ab_section": 6, "setHour": 12, "setMin": 0, "mode": 5, "multiple": 100, "endHour": 13, "endMin": 0 }, { "ab_section": 7, "setHour": 13, "setMin": 0, "mode": 5, "multiple": 85, "endHour": 14, "endMin": 0 }, { "ab_section": 8, "setHour": 14, "setMin": 0, "mode": 5, "multiple": 68, "endHour": 15, "endMin": 0 }, { "ab_section": 9, "setHour": 15, "setMin": 0, "mode": 5, "multiple": 51, "endHour": 16, "endMin": 0 }, { "ab_section": 10, "setHour": 16, "setMin": 0, "mode": 5, "multiple": 34, "endHour": 17, "endMin": 0 }, { "ab_section": 11, "setHour": 17, "setMin": 0, "mode": 5, "multiple": 17, "endHour": 18, "endMin": 0 }, { "ab_section": 12, "setHour": 18, "setMin": 0, "mode": 5, "multiple": 0, "endHour": 0, "endMin": 0 }]
                }, {
                    name: "pattern1",
                    sections: [{ "ab_section": 0, "setHour": 8, "setMin": 0, "mode": 5, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern2",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 5, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern3",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 5, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }, {
                    name: "pattern4",
                    sections: [{ "ab_section": 0, "setHour": 6, "setMin": 0, "mode": 5, "multiple": 100, "endHour": 18, "endMin": 0 }]
                }]
            },
        }

        /*
            key: function(n) {
                
            },
            index: function(n){
                return Object.keys(this)[n];
            }
        */
        if (window.localStorage['curMode']) { curMode = angular.fromJson(window.localStorage['curMode']) };
        if (window.localStorage['sun5m']) { modes.sun5m = angular.fromJson(window.localStorage['sun5m']) };
        if (window.localStorage['sun10m']) { modes.sun10m = angular.fromJson(window.localStorage['sun10m']) };
        if (window.localStorage['sun15m']) { modes.sun15m = angular.fromJson(window.localStorage['sun15m']) };
        if (window.localStorage['sun20m']) { modes.sun20m = angular.fromJson(window.localStorage['sun20m']) };
        if (window.localStorage['cri']) { modes.cri = angular.fromJson(window.localStorage['cri']) };
        if (window.localStorage['blue']) { modes.blue = angular.fromJson(window.localStorage['blue']) };

        return {
            getModeId: function(modeName) {
                return modes[modeName].modeId;
            },
            getPattern: function(modeName, index) {
                return modes[modeName].patterns[index] || false;
            },
            getCurMode: function() {
                return curMode;
            },
            getModesData: function() {
                return modes;
            },
            getModesDataById: function(name) {
                return modes[name];
            },
            this: function() {
                return this;
            },
            saveCurMode: function() {
                window.localStorage['curMode'] = angular.toJson(curMode, false);
            },
            saveMode: function(sections, modeName, patternKey) {
                var newData = [];
                var tmpSec = {};
                var data = sections;
                modes[modeName].patterns[patternKey].sections.splice(0, modes[modeName].patterns[patternKey].sections.length);

                var index = 0;
                for (var i = 0; i < data.length; i++) {
                    if (typeof(data[i].mode) == 'undefined') {

                    } else {
                        tmpSec = {
                            'ab_section': index,
                            'setHour': data[i].setHour,
                            'setMin': data[i].setMin,
                            'mode': data[i].mode,
                            'multiple': data[i].multiple,
                            'endHour': data[i].endHour,
                            'endMin': data[i].endMin,
                        }
                        modes[modeName].patterns[patternKey].sections.push(tmpSec);
                        //newData.push(tmpSec);
                        index++;
                    }
                };
                //console.log('save:');
                //console.log(newData);
                //modes[modeName].patterns[patternKey].sections = newData;
                console.log('modes[modeName]:');
                console.log(modes[modeName]);
                window.localStorage[modeName] = angular.toJson(modes[modeName], false);
            },


            remove: function(sections, rmId) {
                delete sections[rmId];
                sections[rmId] = {};
                /*
                    .splice has BUG
                        @modify allToCmd
                        @modify saveTostorage
                        @add data |filter:{mode:'!!'}
                */
                //this.saveToStorage();
            },

            getByKey: function(Id, key) {
                return data[Id].index(key);
            },
            get: function(Id) {
                return data[Id];

            },
            addParam: function(sections, mode) {
                var obj = {
                    'ab_section': sections.length,
                    //'smode': smode,
                    //'section': section,
                    'setHour': 0,
                    'setMin': 0,
                    'mode': mode,
                    'multiple': 0,
                    'endHour': 0,
                    'endMin': 0
                }
                sections.push(obj);

                return true;
            },
            sectionsToCmd: function(sections) {
                var temp = '';
                var sta = String.fromCharCode(65);
                var end = String.fromCharCode(90);
                var smode = 0;
                var section = 0;
                var date = new Date();
                var phone_hour = date.getUTCHours() + 8;
                if (phone_hour > 23) {
                    phone_hour = phone_hour - 24;
                }
                var phone_min = date.getUTCMinutes();

                var curSections = sections;
                var sectionsNum = 0;

                var sectionsLength = curSections.length;
                var isConflict = false;


                for (var i = 0; i < sectionsLength; i++) {
                    isConflict = false;

                    smode = Math.floor(sectionsNum / 24);
                    section = sectionsNum - smode * 24;
                    if (sectionsNum > 71) {
                        break;
                    } else {
                        //start Time
                        temp = temp.concat(
                            sta +
                            String.fromCharCode(smode) +
                            String.fromCharCode(section) +
                            String.fromCharCode(curSections[i].setHour) +
                            String.fromCharCode(curSections[i].setMin) +
                            String.fromCharCode(curSections[i].mode) +
                            String.fromCharCode(curSections[i].multiple) +
                            String.fromCharCode(phone_hour) +
                            String.fromCharCode(phone_min) +
                            end
                        );
                        sectionsNum++;
                        for (var j = 0; j < sectionsLength; j++) {
                            if (curSections[i].endHour == curSections[j].setHour && curSections[i].endMin == curSections[j].setMin) {
                                isConflict = true;
                            } else {}
                        }
                        if (!isConflict) {
                            smode = Math.floor(sectionsNum / 24);
                            section = sectionsNum - smode * 24;
                            //End Time

                            temp = temp.concat(
                                sta +
                                String.fromCharCode(smode) +
                                String.fromCharCode(section) +
                                String.fromCharCode(curSections[i].endHour) +
                                String.fromCharCode(curSections[i].endMin) +
                                String.fromCharCode(0) +
                                String.fromCharCode(0) +
                                String.fromCharCode(phone_hour) +
                                String.fromCharCode(phone_min) +
                                end
                            );
                            sectionsNum++;
                        };

                    };
                }
                for (var i = sectionsNum; i < 72; i++) {
                    smode = Math.floor(sectionsNum / 24);
                    section = sectionsNum - smode * 24;
                    if (i + 1 == 72) {
                        phone_hour = date.getUTCHours() + 8;
                        if (phone_hour > 23) {
                            phone_hour = phone_hour - 24;
                        }
                        phone_min = date.getUTCMinutes();
                    };
                    temp = temp.concat(
                        sta +
                        String.fromCharCode(smode) +
                        String.fromCharCode(section) +
                        String.fromCharCode(0) +
                        String.fromCharCode(0) +
                        String.fromCharCode(0) +
                        String.fromCharCode(0) +
                        String.fromCharCode(phone_hour) +
                        String.fromCharCode(phone_min) +
                        end
                    );
                    sectionsNum++;
                }

                console.log('allToCmd:');
                console.log(temp);
                return temp;

            },
            sectionsToCmdDEBUG: function(sections) {
                var temp = '';
                var sta = String.fromCharCode(65);
                var end = String.fromCharCode(90);
                var smode = 0;
                var section = 0;
                var date = new Date();
                var phone_hour = date.getUTCHours() + 8;
                if (phone_hour > 23) {
                    phone_hour = phone_hour - 24;
                }
                var phone_min = date.getUTCMinutes();

                var curSections = sections;
                var sectionsNum = 0;

                var sectionsLength = curSections.length;
                var isConflict = false;


                for (var i = 0; i < sectionsLength; i++) {
                    isConflict = false;

                    smode = Math.floor(sectionsNum / 24);
                    section = sectionsNum - smode * 24;
                    if (sectionsNum > 71) {
                        break;
                    } else {
                        //start Time
                        temp = temp.concat(
                            sta +
                            smode + '_' +
                            section + '_' +
                            curSections[i].setHour + '_' +
                            curSections[i].setMin + '_' +
                            curSections[i].mode + '_' +
                            curSections[i].multiple + '_' +
                            phone_hour + '_' +
                            phone_min + '_' +
                            end
                        );
                        sectionsNum++;
                        for (var j = 0; j < sectionsLength; j++) {
                            if (curSections[i].endHour == curSections[j].setHour && curSections[i].endMin == curSections[j].setMin) {
                                isConflict = true;
                            } else {}
                        }
                        if (!isConflict) {
                            smode = Math.floor(sectionsNum / 24);
                            section = sectionsNum - smode * 24;
                            //End Time

                            temp = temp.concat(
                                sta +
                                smode + '_' +
                                section + '_' +
                                curSections[i].endHour + '_' +
                                curSections[i].endMin + '_' +
                                0 + '_' +
                                0 + '_' +
                                phone_hour + '_' +
                                phone_min + '_' +
                                end
                            );
                            sectionsNum++;
                        };

                    };
                }
                for (var i = sectionsNum; i < 72; i++) {
                    smode = Math.floor(sectionsNum / 24);
                    section = sectionsNum - smode * 24;
                    if (i + 1 == 72) {
                        phone_hour = date.getUTCHours() + 8;
                        if (phone_hour > 23) {
                            phone_hour = phone_hour - 24;
                        }
                        phone_min = date.getUTCMinutes();
                    };
                    temp = temp.concat(
                        sta +
                        smode + '_' +
                        section + '_' +
                        0 + '_' +
                        0 + '_' +
                        0 + '_' +
                        0 + '_' +
                        phone_hour + '_' +
                        phone_min + '_' +
                        end
                    );
                    sectionsNum++;
                }
                //alert(sectionsNum);
                console.log('allToCmd:');
                console.log(temp);
                return temp;


            }

        };
    })
    .factory('myBluetooth', function(currentMode, $cordovaBluetoothSerial, $timeout, debugMocks) {

        btStatus = {
            btSettingIsEnabled: false,
            currentDeviceName: 'None!',
            currentDeviceStatus: false,
            isSearch: false,
            isNotice: false,
            isLoading: false,
            stat: 'None Stat',
            myDevices: []
        };



        //var myDevices = [{'name':'null','address':null}];


        setStatus = function(cnt) {
            btStatus.stat = cnt;
            btStatus.isNotice = true;
            console.log('isNotice:' + btStatus.isNotice);
            $timeout(function() {
                btStatus.isNotice = false;
            }, 3800);
        };


        /* Init */

        /*
  refreshList = function(){};
  connectDevice = function(){setStatus('ERROR!')};
  sendCmd = function(){alert(cmd['data']);};
  isEnabled = function(){}
  enableBluetooth = function(){}
  disconnectDevice = function(){}
*/
        //test = function(test){alert(devices[test].address)};

        /*
if (ionic.Platform.is('android') || ionic.Platform.is('ios') ) {
  $ionicPlatform.ready(function() {*/

        return {
            btStatus: btStatus,
            //myDevices: myDevices,
            setStatus: setStatus,
            isEnabled: function() {
                $cordovaBluetoothSerial.isEnabled().then(
                    function(err) {
                        btStatus.btSettingIsEnabled = true;
                        setStatus('Bluetooth is enabled');
                        refreshList();
                    },
                    function(err) {
                        btStatus.btSettingIsEnabled = false;
                        setStatus('Bluetooth is *not* enabled');
                    }
                );
            },
            enableBluetooth: function() {
                if (btStatus.btSettingIsEnabled) {
                    if (ionic.Platform.is('android')) {
                        $cordovaBluetoothSerial.enable().then(
                            function(err) {
                                btStatus.btSettingIsEnabled = true;
                                setStatus('Bluetooth is enable!');
                            },
                            function(err) {
                                btStatus.btSettingIsEnabled = false;
                                setStatus('enable() is *not* enabled');
                            }
                        );
                    } else {
                        btStatus.btSettingIsEnabled = false;
                        alert('Only Support for Andoird!');
                    };
                } else {
                    alert('Please using \'Andoird settings\' to disable Bluetooth.');
                    this.isEnabled();
                }
            },

            refreshList: function() {

                btStatus.isSearch = true;
                setStatus('Looking for Bluetooth Devices...');

                $cordovaBluetoothSerial.list().then(
                    function(devices) {

                        if (ionic.Platform.is('ios')) { // BLE
                            for (var i = 0; i < devices.length; i++) {
                                btStatus.myDevices[i].address = devices[i].uuid;
                            }
                        } else {}

                        if (devices.length === 0) {
                            if (ionic.Platform.is('ios')) { // BLE
                                setStatus("No Bluetooth Peripherals Discovered.");
                            } else { // Android
                                setStatus("Please Pair a Bluetooth Device.");
                            }

                        } else {
                            setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
                        }
                        btStatus.myDevices = devices;
                        //alert(debugMocks.dump(btStatus.myDevices));
                        btStatus.isSearch = false;
                        return devices;
                    },
                    function(err) {
                        btStatus.isSearch = false;
                        setStatus('$cordovaBluetoothSerial.list Failure!');
                        return [];
                    }
                );
            }, // refreshList()

            connectDevice: function(index) {
                if (btStatus.myDevices[index]) {

                    btStatus.isLoading = true;
                    setStatus('Connecting...');
                    var address = btStatus.myDevices[index].address;
                    $cordovaBluetoothSerial.connect(address).then(
                        function(succ) {
                            btStatus.currentDeviceName = btStatus.myDevices[index].name;
                            btStatus.isLoading = false;
                            btStatus.currentDeviceStatus = true;
                            setStatus('Connect Success!!');
                        },
                        function(err) {
                            btStatus.currentDeviceName = 'None!';
                            btStatus.isLoading = false;
                            btStatus.currentDeviceStatus = false;
                            setStatus('Disconnected!!');
                        }
                    );
                } else {}
            },
            disconnectDevice: function() {
                btStatus.isLoading = true;
                setStatus('Disconnecting...');
                $cordovaBluetoothSerial.disconnect().then(
                    function(succ) {
                        btStatus.isLoading = false;
                        btStatus.currentDeviceName = 'None!';
                        btStatus.currentDeviceStatus = false;
                        setStatus('Disconnected!!');
                    },
                    function(err) {
                        btStatus.currentDeviceName = 'ERROR!';
                        btStatus.isLoading = false;
                        btStatus.currentDeviceStatus = false;
                        setStatus('ERROR Disconnect!!');
                    }
                );
            },
            sendCmd: function(cmd, type, mode, pattern) {
                if (btStatus.currentDeviceStatus && btStatus.btSettingIsEnabled) {
                    btStatus.isLoading = true;
                    setStatus('Sending...');
                    $cordovaBluetoothSerial.write(cmd).then(
                        function(succ) {
                            btStatus.isLoading = false;
                            currentMode.setInfo(type, mode, pattern);
                            alert('Sended!!');

                        },
                        function(err) {
                            btStatus.isLoading = false;
                            setStatus('Send CMD ERROR!\nplz check bluetooth status');
                        }
                    );

                } else {
                    alert('未與裝置連線！請到"Connect"設定！');
                };
            },
            sendCmdOri: function(cmd) {
                if (btStatus.currentDeviceStatus && btStatus.btSettingIsEnabled) {
                    btStatus.isLoading = true;
                    setStatus('Sending...');
                    $cordovaBluetoothSerial.write(cmd).then(
                        function(succ) {
                            btStatus.isLoading = false;
                            alert('Sended!!');
                        },
                        function(err) {
                            btStatus.isLoading = false;
                            setStatus('Send CMD ERROR!\nplz check bluetooth status');
                        }
                    );

                } else {
                    alert('未與裝置連線！請到"Connect"設定！');
                };
            },
        };
        /*
  return{

    btStatus: btStatus,
    myDevices: btStatus.myDevices,

    setStatus: setStatus,

    isEnabled: isEnabled,
    enableBluetooth: enableBluetooth,
    refreshList: refreshList,
    connectDevice: connectDevice,
    disconnectDevice: disconnectDevice,
    sendCmd: sendCmd,
  };
*/

    })
    .factory('currentMode', function() {

        var info = {
            type: -1,
            mode: -1,
            pattern: -1
        }
        if (window.localStorage['deviceInfo']) { info = angular.fromJson(window.localStorage['deviceInfo']) };
        return {
            info: info,
            setInfo: function(type, mode, pattern) {
                info.type = type;
                info.mode = mode || info.mode;
                info.pattern = pattern || info.pattern;
                window.localStorage['deviceInfo'] = angular.toJson(info);
            }
        }

    })
    .filter('numberFixedLen', function() {
        return function(a, b) {
            return (1e4 + "" + a).slice(-b);
        };
    })
    .filter('lightType', function() {
        return function(a) {
            switch (a) {
                case 0:
                    return '自動模式';
                case 1:
                    return '手動模式';
                case 2:
                    return '工程模式';
                default:
                    return '尚未初始化';
            }
        };
    })
    .filter('lightName', function() {
        return function(a) {
            switch (a) {
                case 0:
                    return '太陽光5m';
                case 1:
                    return '太陽光10m';
                case 2:
                    return '太陽光15m';
                case 3:
                    return '太陽光20m';
                case 4:
                    return '高演色性太陽光';
                case 5:
                    return '藍光';
                default:
                    return '無';
            }
        };
    })
    .filter('lightKeyToName', function() {
        return function(a) {
            switch (a) {
                case 'sun5m':
                    return '太陽光5m';
                case 'sun10m':
                    return '太陽光10m';
                case 'sun15m':
                    return '太陽光15m';
                case 'sun20m':
                    return '太陽光20m';
                case 'cri':
                    return '高演色性太陽光';
                case 'blue':
                    return '藍光';
                default:
                    return '無';
            }
        };
    })
    .filter('patternKeyToName', function(Sections) {
        return function(a, modeName) {
            console.log('modeName:' + modeName);
            console.log('index_ a:' + a);
            if (typeof(a) == 'undefined' || typeof(modeName) == 'undefined') {
                return 'ERROR';
            } else {
                return Sections.getPattern(modeName, a).name;
            }

        };
    })
    .filter('DeviceStatusIsConnected', function() {
        return function(a) {

            switch (a) {
                case true:
                    return 'Connected';
                case false:
                    return 'Disconnected';
                default:
                    return 'ERROR';
            }
        };
    })

.constant('lightItem', [
        { ID: 0, Title: '太陽光5m' },
        { ID: 1, Title: '太陽光10m' },
        { ID: 2, Title: '太陽光15m' },
        { ID: 3, Title: '太陽光20m' },
        { ID: 4, Title: '高演色性太陽光' },
        { ID: 5, Title: '藍光' },
    ])
    .constant('lightItemKey', [
        { ID: 'sun5m', Title: '太陽光5m' },
        { ID: 'sun10m', Title: '太陽光10m' },
        { ID: 'sun15m', Title: '太陽光15m' },
        { ID: 'sun20m', Title: '太陽光20m' },
        { ID: 'cri', Title: '高演色性太陽光' },
        { ID: 'blue', Title: '藍光' },
    ])
    .constant('currentModes', [
        { ID: -1, Title: '尚未初始化' },
        { ID: 0, Title: '自動模式' },
        { ID: 1, Title: '手動模式' },
        { ID: 2, Title: '工程模式' }
    ]);
