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
                $scope.discover = function() {

                    myBluetooth.discover();

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

.factory('Sections', function(debugMocks, uint8,myBluetooth) {


        /*
            'ab_section':0,
            //'smode': 0,
            //'section': 0,
            'setHour': 23,
            'setMin': 21,
            'mode': 0,
            'multiple': 33,
dMin:0

        */
        var curMode = {
            key: 'sun5m'
        };
        var modes = {
            'cus1':{
                modeId: 6,
                name: '自由配對區A',
                inUsing: false,
                alterable: true,
                patterns: [{
                    name: "pattern1",
                    sections: [],
                    groups:{}
                }, {
                    name: "pattern2",
                    sections: [],
                    groups:{}
                }, {
                    name: "pattern3",
                    sections: [],
                    groups:{}
                }, {
                    name: "pattern4",
                    sections: [],
                    groups:{}
                }, {
                    name: "pattern5",
                    sections: [],
                    groups:{}
                }, {
                    name: "pattern6",
                    sections: [],
                    groups:{}
                }]
            },
            'cus2':{
                modeId: 7,
                name: '自由配對區B',
                inUsing: false,
                alterable: true,
                patterns: [{
                    name: "pattern1",
                    sections: [],
                    groups:{}
                }, {
                    name: "pattern2",
                    sections: [],
                    groups:{}
                }, {
                    name: "pattern3",
                    sections: [],
                    groups:{}
                }, {
                    name: "pattern4",
                    sections: [],
                    groups:{}
                }, {
                    name: "pattern5",
                    sections: [],
                    groups:{}
                }, {
                    name: "pattern6",
                    sections: [],
                    groups:{}
                }]
            },
            'sun5m': {
                modeId: 0,
                name: '太陽光5m',
                inUsing: true,
                alterable: false,
                patterns: [{
                    name: '長亮',
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 0, "multiple": 100 }],
                    groups:{}
                }, {
                    name: '仿太陽光',
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 0, "multiple": 0}, { "group": 0, "setHour": 7, "setMin": 0, "mode": 0, "multiple": 17}, { "group": 0, "setHour": 8, "setMin": 0, "mode": 0, "multiple": 34}, { "group": 0, "setHour": 9, "setMin": 0, "mode": 0, "multiple": 51 }, { "group": 0, "setHour": 10, "setMin": 0, "mode": 0, "multiple": 68 }, { "group": 0, "setHour": 11, "setMin": 0, "mode": 0, "multiple": 85 }, { "group": 0, "setHour": 12, "setMin": 0, "mode": 0, "multiple": 100 }, { "group": 0, "setHour": 13, "setMin": 0, "mode": 0, "multiple": 85 }, { "group": 0, "setHour": 14, "setMin": 0, "mode": 0, "multiple": 68 }, { "group": 0, "setHour": 15, "setMin": 0, "mode": 0, "multiple": 51 }, { "group": 0, "setHour": 16, "setMin": 0, "mode": 0, "multiple": 34 }, { "group": 0, "setHour": 17, "setMin": 0, "mode": 0, "multiple": 17 }, { "group": 0, "setHour": 18, "setMin": 0, "mode": 0, "multiple": 0}],
                    groups:{}
                }, {
                    name: "pattern1",
                    sections: [{ "group": 0, "setHour": 8, "setMin": 0, "mode": 0, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern2",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 0, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern3",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 0, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern4",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 0, "multiple": 100 }],
                    groups:{}
                }]
            },
            'sun10m': {
                modeId: 1,
                name: '太陽光10m',
                inUsing: false,
                alterable: false,
                patterns: [{
                    name: '長亮',
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 1, "multiple": 100 }],
                    groups:{}
                }, {
                    name: '仿太陽光',
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 1, "multiple": 0}, { "group": 0, "setHour": 7, "setMin": 0, "mode": 1, "multiple": 17}, { "group": 0, "setHour": 8, "setMin": 0, "mode": 1, "multiple": 34}, { "group": 0, "setHour": 9, "setMin": 0, "mode": 1, "multiple": 51 }, { "group": 0, "setHour": 10, "setMin": 0, "mode": 1, "multiple": 68 }, { "group": 0, "setHour": 11, "setMin": 0, "mode": 1, "multiple": 85 }, { "group": 0, "setHour": 12, "setMin": 0, "mode": 1, "multiple": 100 }, { "group": 0, "setHour": 13, "setMin": 0, "mode": 1, "multiple": 85 }, { "group": 0, "setHour": 14, "setMin": 0, "mode": 1, "multiple": 68 }, { "group": 0, "setHour": 15, "setMin": 0, "mode": 1, "multiple": 51 }, { "group": 0, "setHour": 16, "setMin": 0, "mode": 1, "multiple": 34 }, { "group": 0, "setHour": 17, "setMin": 0, "mode": 1, "multiple": 17 }, { "group": 0, "setHour": 18, "setMin": 0, "mode": 1, "multiple": 0}],
                    groups:{}
                }, {
                    name: "pattern1",
                    sections: [{ "group": 0, "setHour": 8, "setMin": 0, "mode": 1, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern2",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 1, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern3",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 1, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern4",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 1, "multiple": 100 }],
                    groups:{}
                }]
            },
            'sun15m': {
                modeId: 2,
                name: '太陽光15m',
                inUsing: false,
                alterable: false,
                patterns: [{
                    name: '長亮',
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 2, "multiple": 100 }],
                    groups:{}
                }, {
                    name: '仿太陽光',
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 2, "multiple": 0}, { "group": 0, "setHour": 7, "setMin": 0, "mode": 2, "multiple": 17}, { "group": 0, "setHour": 8, "setMin": 0, "mode": 2, "multiple": 34}, { "group": 0, "setHour": 9, "setMin": 0, "mode": 2, "multiple": 51 }, { "group": 0, "setHour": 10, "setMin": 0, "mode": 0, "multiple": 68 }, { "group": 0, "setHour": 11, "setMin": 0, "mode": 0, "multiple": 85 }, { "group": 0, "setHour": 12, "setMin": 0, "mode": 0, "multiple": 100 }, { "group": 0, "setHour": 13, "setMin": 0, "mode": 0, "multiple": 85 }, { "group": 0, "setHour": 14, "setMin": 0, "mode": 0, "multiple": 68 }, { "group": 0, "setHour": 15, "setMin": 0, "mode": 0, "multiple": 51 }, { "group": 0, "setHour": 16, "setMin": 0, "mode": 0, "multiple": 34 }, { "group": 0, "setHour": 17, "setMin": 0, "mode": 0, "multiple": 17 }, { "group": 0, "setHour": 18, "setMin": 0, "mode": 0, "multiple": 0}],
                    groups:{}
                }, {
                    name: "pattern1",
                    sections: [{ "group": 0, "setHour": 8, "setMin": 0, "mode": 2, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern2",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 2, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern3",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 2, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern4",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 2, "multiple": 100 }],
                    groups:{}
                }]
            },
            'sun20m': {
                modeId: 3,
                name: '太陽光20m',
                inUsing: false,
                alterable: false,
                patterns: [{
                    name: '長亮',
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 3, "multiple": 100 }],
                    groups:{}
                }, {
                    name: '仿太陽光',
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 3, "multiple": 0}, { "group": 0, "setHour": 7, "setMin": 0, "mode": 3, "multiple": 17}, { "group": 0, "setHour": 8, "setMin": 0, "mode": 3, "multiple": 34}, { "group": 0, "setHour": 9, "setMin": 0, "mode": 3, "multiple": 51 }, { "group": 0, "setHour": 10, "setMin": 0, "mode": 3, "multiple": 68 }, { "group": 0, "setHour": 11, "setMin": 0, "mode": 3, "multiple": 85 }, { "group": 0, "setHour": 12, "setMin": 0, "mode": 3, "multiple": 100 }, { "group": 0, "setHour": 13, "setMin": 0, "mode": 3, "multiple": 85 }, { "group": 0, "setHour": 14, "setMin": 0, "mode": 3, "multiple": 68 }, { "group": 0, "setHour": 15, "setMin": 0, "mode": 3, "multiple": 51 }, { "group": 0, "setHour": 16, "setMin": 0, "mode": 3, "multiple": 34 }, { "group": 0, "setHour": 17, "setMin": 0, "mode": 3, "multiple": 17 }, { "group": 0, "setHour": 18, "setMin": 0, "mode": 3, "multiple": 0}],
                    groups:{}
                }, {
                    name: "pattern1",
                    sections: [{ "group": 0, "setHour": 8, "setMin": 0, "mode": 3, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern2",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 3, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern3",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 3, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern4",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 3, "multiple": 100 }],
                    groups:{}
                }]
            },
            'cri': {
                modeId: 4,
                name: '高演色性太陽光',
                inUsing: false,
                alterable: false,
                patterns: [{
                    name: '長亮',
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 4, "multiple": 100 }],
                    groups:{}
                }, {
                    name: '仿太陽光',
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 4, "multiple": 0}, { "group": 0, "setHour": 7, "setMin": 0, "mode": 4, "multiple": 17}, { "group": 0, "setHour": 8, "setMin": 0, "mode": 4, "multiple": 34}, { "group": 0, "setHour": 9, "setMin": 0, "mode": 4, "multiple": 51 }, { "group": 0, "setHour": 10, "setMin": 0, "mode": 4, "multiple": 68 }, { "group": 0, "setHour": 11, "setMin": 0, "mode": 4, "multiple": 85 }, { "group": 0, "setHour": 12, "setMin": 0, "mode": 4, "multiple": 100 }, { "group": 0, "setHour": 13, "setMin": 0, "mode": 4, "multiple": 85 }, { "group": 0, "setHour": 14, "setMin": 0, "mode": 4, "multiple": 68 }, { "group": 0, "setHour": 15, "setMin": 0, "mode": 4, "multiple": 51 }, { "group": 0, "setHour": 16, "setMin": 0, "mode": 4, "multiple": 34 }, { "group": 0, "setHour": 17, "setMin": 0, "mode": 4, "multiple": 17 }, { "group": 0, "setHour": 18, "setMin": 0, "mode": 4, "multiple": 0}],
                    groups:{}
                }, {
                    name: "pattern1",
                    sections: [{ "group": 0, "setHour": 8, "setMin": 0, "mode": 4, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern2",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 4, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern3",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 4, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern4",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 4, "multiple": 100 }],
                    groups:{}
                }]
            },
            'blue': {
                modeId: 5,
                name: '藍色冷光',
                inUsing: false,
                alterable: false,
                patterns: [{
                    name: '長亮',
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 5, "multiple": 100 }],
                    groups:{}
                }, {
                    name: '仿太陽光',
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 5, "multiple": 0}, { "group": 0, "setHour": 7, "setMin": 0, "mode": 5, "multiple": 17}, { "group": 0, "setHour": 8, "setMin": 0, "mode": 5, "multiple": 34}, { "group": 0, "setHour": 9, "setMin": 0, "mode": 5, "multiple": 51 }, { "group": 0, "setHour": 10, "setMin": 0, "mode": 5, "multiple": 68 }, { "group": 0, "setHour": 11, "setMin": 0, "mode": 5, "multiple": 85 }, { "group": 0, "setHour": 12, "setMin": 0, "mode": 5, "multiple": 100 }, { "group": 0, "setHour": 13, "setMin": 0, "mode": 5, "multiple": 85 }, { "group": 0, "setHour": 14, "setMin": 0, "mode": 5, "multiple": 68 }, { "group": 0, "setHour": 15, "setMin": 0, "mode": 5, "multiple": 51 }, { "group": 0, "setHour": 16, "setMin": 0, "mode": 5, "multiple": 34 }, { "group": 0, "setHour": 17, "setMin": 0, "mode": 5, "multiple": 17 }, { "group": 0, "setHour": 18, "setMin": 0, "mode": 5, "multiple": 0}],
                    groups:{}
                }, {
                    name: "pattern1",
                    sections: [{ "group": 0, "setHour": 8, "setMin": 0, "mode": 5, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern2",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 5, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern3",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 5, "multiple": 100 }],
                    groups:{}
                }, {
                    name: "pattern4",
                    sections: [{ "group": 0, "setHour": 6, "setMin": 0, "mode": 5, "multiple": 100 }],
                    groups:{}
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
if (window.localStorage['cus1']) { modes.cus1 = angular.fromJson(window.localStorage['cus1']) };
if (window.localStorage['cus2']) { modes.cus2 = angular.fromJson(window.localStorage['cus2']) };


        return {
            getModeId: function(modeName) {
                return modes[modeName].modeId;
            },
            getPattern: function(modeName, index) {
                
                return (index>=00)?modes[modeName].patterns[index] : false;
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
            saveMode: function(sections, modeName, patternKey,gid=0) {
                var newData = [];
                var tmpSec = {};
                var data = sections;
                modes[modeName].patterns[patternKey].sections.splice(0, modes[modeName].patterns[patternKey].sections.length);

                var index = 0;

                var tmpgrps = modes[modeName].patterns[patternKey].groups[gid] = [];
                for (var i = 0; i < data.length; i++) {
                    if (typeof(data[i].mode) == 'undefined') {

                    } else {
                        tmpSec = {
                            'ab_section': index,
                            'setHour': data[i].setHour,
                            'setMin': data[i].setMin,
                            'mode': data[i].mode,
                            'multiple': data[i].multiple,
                                'group': data[i].group,
                        }
                        tmpgrps.push(tmpSec);
                        //[modeName].patterns[patternKey].sections.push(tmpSec);
                        //newData.push(tmpSec);
                        index++;
                    }
                };
                //console.log('save:');
                //console.log(newData);
                //modes[modeName].patterns[patternKey].sections = newData;
                //console.log('modes[modeName]:');
                //console.log(modes[modeName]);
                window.localStorage[modeName] = angular.toJson(modes[modeName], false);
                console.log('Modes: ');
                console.log(modes);
            },


            remove: function(sections, rmId) {

                delete sections[rmId];
                sections = sections.filter(function(element) {
                    return element !== undefined;
                });

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
            addParam: function(sections, mode, gid=0) {
                var obj = {
                    //'ab_section': sections.length,
                    //'smode': smode,
                    //'section': section,
                    'setHour': 0,
                    'setMin': 0,
                    'mode': mode,
                    'multiple': 0,
                    'group': gid
                }
                sections.push(obj);

                return true;
            },
            sectionsToCmd: function(sections) {
                var curSections = sections;
                var cmdArray = [];
                // var sta = String.fromCharCode(250) + String.fromCharCode(171);
                //var end = String.fromCharCode(255);

                
                /* */
                var isConflict = false;
                var smode = 0;
                var section = 0;

                var sectionsLength = curSections.length;
                /* Clear Sections*/
                
                

                for (var i = sectionsLength-1; i >=0; i--) {
                    if (i > 100) {
                        break;
                    } else {
                        //start Time
                        cmdArray.push(
                            new Uint8Array([250, 171,
                                curSections[i].multiple,
                                curSections[i].mode+1,
                                curSections[i].group,
                                curSections[i].setHour,
                                curSections[i].setMin,
                                i,
                                255]
                            )
                        );
                    };
                }
                //alert(debugMocks.dump(curSections));
                //alert(cmdArray);

                cmdArray.push(
                    new Uint8Array([250, 171, 0, 0, 0, 0, 0, 170, 255])// 清空LED燈排程
                );
                var date = new Date();
                var dateCmd = new Uint8Array([250,160,date.getHours(),date.getMinutes(),(date.getSeconds()+3)%60,255]);
                cmdArray.push(dateCmd);
                /*
                var b = temp.split('').map(function(item) {
                    if (item.charCodeAt(0) == 255) {
                        return '\n';
                    }
                    return item.charCodeAt(0);
                });
                console.log(b);*/
                return cmdArray;
            }
        };
    })
    .factory('myBluetooth', function($q,$cordovaBluetoothLE, currentMode, $cordovaBluetoothSerial, $timeout, debugMocks) {

        btStatus = {
            discover:'1',
            btSettingIsEnabled: false,
            currentDeviceName: 'None!',
            currentDeviceStatus: false,
            isSearch: false,
            isNotice: false,
            isLoading: false,
            stat: 'None Stat',
            myDevices: [],
            currentConnectedDeviceId: null
        };
        var ledUUID = {
            service: '0000fff0-0000-1000-8000-00805f9b34fb',
            characteristic: '0000fff3-0000-1000-8000-00805f9b34fb'
           // service: '19b10010-e8f2-537e-4f6c-d104768a1214',
            //characteristic: '19b10011-e8f2-537e-4f6c-d104768a1214'
                      
            //service: 'fff0',
            //characteristic: 'fff3'
        }


        //var myDevices = [{'name':'null','address':null}];


        setStatus = function(cnt) {
            btStatus.stat = cnt;
            btStatus.isNotice = true;
            console.log('isNotice:' + btStatus.isNotice);
            $timeout(function() {
                btStatus.isNotice = false;
            }, 3800);
        };
        function writeBle (cmdArray,i=0,c_deferred=null){ 
            var deferred = $q.defer();
            
            if(!Array.isArray(cmdArray)){
                cmdArray = [cmdArray];
                i=0;
            }else{}
            let sendValue =$cordovaBluetoothLE.bytesToEncodedString(cmdArray[i]);
            //alert('Send DATA: ' + sendValue);
            $cordovaBluetoothLE.write({
                'address': btStatus.currentConnectedDeviceId,
                'service': ledUUID.service,
                'characteristic': ledUUID.characteristic,
                'value': sendValue,
                'type': 'noResponse',
            }).then(function (succ) {
                if(i>0){
                    writeBle(cmdArray,i-1,deferred);
                    
                }else{
                    if(c_deferred!=null){
                        c_deferred.resolve(i-1);
                    }else{
                        deferred.resolve(i-1);
                    }
                    
                }
                
            }, function (err) {
                btStatus.isLoading = false;
                alert(debugMocks.dump(err));
                alert('Send CMD ERROR! plz check bluetoothLE status');
                deferred.reject(false);
            });

            return deferred.promise;
        }

        function reConnect(){
            let deferred = $q.defer();
            $cordovaBluetoothLE.reconnect({'address':btStatus.currentConnectedDeviceId}).then(null, function (err) {
                deferred.reject(false);
                alert(debugMocks.dump(err));
            }, function(succ){
                alert('reconnect successed!');
                deferred.resolve(true);
            });
            
            return deferred.promise;
        }
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
            discover: function () {
                
              $cordovaBluetoothLE.discover({
                "address": btStatus.currentConnectedDeviceId,
                "clearCache": true
              }).then(function (feedback) {
                  alert(btStatus.currentConnectedDeviceId);
                btStatus.discover = debugMocks.dump(feedback);
                
              }, function (err) {
                alert(debugMocks.dump(err));
              });
            },

            isEnabled: function() {
                var t = this;
                $cordovaBluetoothLE.isEnabled().then(function(feedback) {
                    if (feedback['isEnabled']) {
                        btStatus.btSettingIsEnabled = true;
                        setStatus('Bluetooth is enabled');
                    } else {
                        btStatus.btSettingIsEnabled = false;
                        setStatus('Bluetooth is enabled');
                    }
                    t.refreshList();
                });
                /*
                $cordovaBluetoothSerial.isEnabled().then(
                    function(err) {
                        btStatus.btSettingIsEnabled = true;
                        
                        refreshList();
                    },
                    function(err) {
                        btStatus.btSettingIsEnabled = false;
                        setStatus('Bluetooth is *not* enabled');
                    }
                );*/
            },
            initToSend: function() {
                var deferred = $q.defer();
                $cordovaBluetoothLE.initialize({
                  request: true
                }).then(null,
                  function (err) {
                    alert('err: ' + debugMocks.dump(err));
                    btStatus.btSettingIsEnabled = false;
                    setStatus('enable() is *not* enabled');
                    deferred.resolve(false);
                  },
                  function (scc) {
                    //alert('scc: ' + debugMocks.dump(scc));
                    if (scc.status && btStatus.currentConnectedDeviceId) {
                      let params = {
                        'address': btStatus.currentConnectedDeviceId
                      };
                      btStatus.btSettingIsEnabled = true;
                      setStatus('Bluetooth status checking....');
                      deferred.resolve(true);

                      $cordovaBluetoothLE.isConnected(params).then(function(succ){
                        if(succ.isConnected){
                            setStatus('Bluetooth status OK!');
                             deferred.resolve(true);
                        }else{
                            setStatus('Reconnecting....');
                            $cordovaBluetoothLE.connect({
                                'address': btStatus.currentConnectedDeviceId
                            }).then(null, function (err) {
                                alert('$cordovaBluetoothLE.connect ERROR!');
                            }, function (succ) {
                                if (succ.status == 'connected') {
                                    setStatus('connected!!');
                                     deferred.resolve(true);
                                } else {
                                    btStatus.currentDeviceName = 'None!';
                                    btStatus.isLoading = false;
                                    btStatus.currentDeviceStatus = false;
                                    setStatus('Disconnected!!');
                                    deferred.resolve(false);
                                }
                            });
                        }
                      }, function(err){setStatus('$cordovaBluetoothLE.isConnected ERROR');});
                    } else {
                      btStatus.btSettingIsEnabled = false;
                      setStatus('initToSend ERROR!');
                      deferred.resolve(false);
                    }
                  }

                );

                return deferred.promise;
            },
            enableBluetooth: function() {
                var deferred = $q.defer();
                if (btStatus.btSettingIsEnabled) {
                    //alert(window.bluetoothle);
                    $cordovaBluetoothLE.initialize({ request: true }).then(null,
                        function(err) {
                            //alert('err: ' + debugMocks.dump(err));
                            btStatus.btSettingIsEnabled = false;
                            setStatus(err.message);
                            deferred.resolve(false);
                        },
                        function(scc) {
                            alert('Android 用戶請點擊允許藍芽裝置，否則此APP無法順利運作唷>_<');

                            if (scc.status) {
                                btStatus.btSettingIsEnabled = true;
                                setStatus('Bluetooth is enable!');
                                deferred.resolve(true);
                            } else {
                                btStatus.btSettingIsEnabled = false;
                                setStatus('Bluetooth is enable!');
                                deferred.resolve(false);
                            }
                        }
                    );
                    /*
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
                    */
                } else {
                    $cordovaBluetoothLE.initialize({ request: false }).then(null,

                        function(err) {
                            setStatus(err.message);
                            btStatus.btSettingIsEnabled = true;
                        },
                        function(scc) {
                            //alert('scc: ' + scc.status);
                            btStatus.btSettingIsEnabled = false;
                            setStatus('Bluetooth is disabled!');
                            deferred.reject(false);
                        }
                    );
                    //alert('Please using \'Andoird settings\' to disable Bluetooth.');
                    //this.isEnabled();
                }
                return deferred.promise;
            },

            refreshList: function() {
                btStatus.isSearch = true;
                btStatus.myDevices.length = 0;
                let deviceCnt = 0;

                $cordovaBluetoothLE.startScan({ services: [] }).then(null,
                    function(err) {
                        btStatus.isSearch = false;
                        setStatus('$cordovaBluetoothLE.startScan Failure!');
                        alert(debugMocks.dump(err));
                        return [];
                    },
                    function(obj) {
                        if (obj.status == "scanResult") {
                            //Device found
                            //alert(debugMocks.dump(obj));
                            if(btStatus.myDevices.length>2){
                                $cordovaBluetoothLE.stopScan();
                            }else{
                                btStatus.myDevices.push(obj);
                                btStatus.isSearch = false;
                                return obj;
                            }
                            
                        } else if (obj.status == "scanStarted") {
                            //Scan started
                            setStatus('Looking for Bluetooth Devices...');
                            
                        }
                    }
                );
                /*
                                ble.startScan([], function(devices) {
                                    
                                    if (devices.length === 0) {
                                        if (ionic.Platform.is('ios')) { // BLE
                                            setStatus("No Bluetooth Peripherals Discovered.");
                                        } else { 
                                            setStatus("Please Connect a Bluetooth Device.");
                                        }

                                    } else {
                                        setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
                                    }
                                    btStatus.myDevices.push(devices);
                                    
                                    btStatus.isSearch = false;
                                    return devices;
                                }, );*/
                $timeout(function() {
                    $cordovaBluetoothLE.stopScan().then(function() {
                        setStatus('BLE scan done!');
                    }, function(error) {
                        //setStatus('$cordovaBLE.scan stopScan ERROR!');
                        //alert(debugMocks.dump(error));
                    });
                }, 3 * 1000);
            }, // refreshList()

            connectDevice: function(index) {
                if (btStatus.myDevices[index]) {
                    btStatus.isLoading = true;
                    setStatus('Connecting...');
                    var address = btStatus.myDevices[index].address;
                    $cordovaBluetoothLE.connect({
                      'address': address
                    }).then(null, function (err) {
                      alert('$cordovaBluetoothLE.connect ERROR!');
                      alert(debugMocks.dump(err));
                      reConnect().then(function(back){
                        btStatus.currentDeviceName = btStatus.myDevices[index].name;
                        btStatus.currentConnectedDeviceId = btStatus.myDevices[index].address;
                        btStatus.isLoading = false;
                        btStatus.currentDeviceStatus = true;
                        setStatus('Connect Success!!');
                      });
                      
                    }, function (succ) {
                      if (succ.status == 'connected') {
                        btStatus.currentDeviceName = btStatus.myDevices[index].name;
                        btStatus.currentConnectedDeviceId = btStatus.myDevices[index].address;
                        btStatus.isLoading = false;
                        btStatus.currentDeviceStatus = true;
                        setStatus('Connect Success!!');
                        btStatus.info = debugMocks.dump(succ);
                        $cordovaBluetoothLE.discover({
                            "address": btStatus.currentConnectedDeviceId,
                            "clearCache": true
                        }).then(function (feedback) {
                            btStatus.discover = debugMocks.dump(feedback);
                            //alert('discovered!');
                        }, function (err) {
                            alert('discovering ble device failed!');
                            alert(debugMocks.dump(err));
                        });
                        
                      } else {/*
                        btStatus.currentDeviceName = 'None!';
                        btStatus.isLoading = false;
                        btStatus.currentDeviceStatus = false;*/
                        $cordovaBluetoothLE.close({'address':btStatus.currentConnectedDeviceId}).then(function (succ) {
                            btStatus.isLoading = false;
                            btStatus.currentDeviceName = 'None!';
                            btStatus.currentConnectedDeviceId = 'None!'
                            btStatus.currentDeviceStatus = false;
                            setStatus('auto closed!!');
                        }, function (err) {
                            btStatus.currentDeviceName = 'ERROR!';
                            btStatus.currentConnectedDeviceId = 'ERROR!'
                            btStatus.isLoading = false;
                            btStatus.currentDeviceStatus = false;
                            //setStatus('(auto)ERROR close ble!!');
                            //alert(debugMocks.dump(err));
                        });
                        //setStatus('Disconnected!!');
                      }
                    });
                } else {}
            },
            disconnectDevice: function() {
                btStatus.isLoading = true;
                setStatus('Disconnecting...');
                let params ={'address':btStatus.currentConnectedDeviceId};
                $cordovaBluetoothLE.disconnect(params).then(function(succ) {
                    $cordovaBluetoothLE.close(params).then(function (succ) {
                      btStatus.isLoading = false;
                      btStatus.currentDeviceName = 'None!';
                      btStatus.currentConnectedDeviceId = 'None!'
                      btStatus.currentDeviceStatus = false;
                      setStatus('Disconnected and closed!!');
                    }, function (err) {
                      btStatus.currentDeviceName = 'ERROR!';
                      btStatus.currentConnectedDeviceId = 'ERROR!'
                      btStatus.isLoading = false;
                      btStatus.currentDeviceStatus = false;
                      setStatus('ERROR close ble!!');
                      alert(debugMocks.dump(err));
                    });
                }, function(err) {
                    btStatus.currentDeviceName = 'ERROR!';
                    btStatus.currentConnectedDeviceId = 'ERROR!'
                    btStatus.isLoading = false;
                    btStatus.currentDeviceStatus = false;
                    setStatus('ERROR Disconnect!!');
                    alert(debugMocks.dump(err));
                });
                
            },
            sendCmd: function (cmd, type = -1, mode = -1, pattern = -1) {
              if (btStatus.currentDeviceStatus && btStatus.btSettingIsEnabled) {
                
                this.initToSend().then(function (succ) {
                
                  if (succ) {
                      //alert('debugMocks.dump(cmd)');
                      //alert(debugMocks.dump(cmd));
                      //alert(cmd.length-1);
                        writeBle(cmd,cmd.length-1).then(function (succ) {
                            btStatus.isLoading = false;
                            currentMode.setInfo(type, mode, pattern);
                            if(succ==0){
                                alert('Send Successed!! ');
                            }else{

                            }
                            
                            //alert(encodedString); //DEBUG
                        }, function (err) {
                            btStatus.isLoading = false;
                            alert(debugMocks.dump(err));
                            alert('Send CMD ERROR! plz check bluetoothLE status');
                        });
                      /*
                    let sendValue =$cordovaBluetoothLE.bytesToEncodedString(cmd);
                    //alert('Send DATA: ' + sendValue);
                    $cordovaBluetoothLE.writeQ({
                      'address': btStatus.currentConnectedDeviceId,
                      'service': ledUUID.service,
                      'characteristic': ledUUID.characteristic,
                      'value': sendValue,
                      'type': 'noResponse',
                    }).then(function (succ) {
                      btStatus.isLoading = false;
                      currentMode.setInfo(type, mode, pattern);
                      alert('Sended!!');
                      alert(encodedString); //DEBUG
                    }, function (err) {
                      btStatus.isLoading = false;
                      alert(debugMocks.dump(err));
                      alert('Send CMD ERROR! plz check bluetoothLE status');
                    });*/
                  } else {}
                }, function (err) {alert('Send Cmd ERROR!');});

              } else {
                currentMode.setInfo(type, mode, pattern);
                alert('未與裝置連線！請到"Connect"設定！');
              };
            },
            
            sendCmdOri: function(cmd) {
                alert('DISABLE! DEBUG!');
                /*
                if (btStatus.currentDeviceStatus && btStatus.btSettingIsEnabled) {
                    btStatus.isLoading = true;
                    setStatus('Sending...');
                    ble.write(btStatus.currentConnectedDeviceId, ledUUID.service, ledUUID.characteristic, cmd, function(succ) {
                        btStatus.isLoading = false;
                        alert('Sended!!');
                    }, function(err) {
                        btStatus.isLoading = false;
                        setStatus('Send CMD ERROR!\nplz check bluetooth status');
                    });

                } else {
                    alert('未與裝置連線！請到"Connect"設定！');
                };*/
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
            //console.log('modeName:' + modeName);
            //console.log('index_ a:' + a);
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
    .factory('uint8', function() {
        return {
            concat: function(a, b) { // a, b TypedArray of same type
                var c = new(a.constructor)(a.length + b.length);
                c.set(a, 0);
                c.set(b, a.length);
                return c;
            }
        }
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
    ])
    .filter('range', function() {
        return function(input, min, max) {
            min = parseInt(min); //Make string input int
            max = parseInt(max);
            for (var i = min; i < max; i++)
                input.push(i);
            return input;
        };
    });