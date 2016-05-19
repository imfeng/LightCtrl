angular.module('starter.services', [])

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
        key:'sun5m'
    };
    var modes = {
        'sun5m':{
            modeId:0,
            name:'太陽光5m',
            inUsing:true,
            sections:[{
                'ab_section':0,
                'setHour': 23,
                'setMin': 21,
                'mode': 0,
                'multiple': 33,
                'endHour':0,
                'endMin':0
            }]
        },
        'sun10m':{
            modeId:1,
            name:'太陽光10m',
            inUsing:false,
            sections:[]
        },
        'sun15m':{
            modeId:2,
            name:'太陽光15m',
            inUsing:false,
            sections:[]
        },
        'sun20m':{
            modeId:3,
            name:'太陽光20m',
            inUsing:false,
            sections:[]
        },
        'cri':{
            modeId:4,
            name:'高演色性太陽光',
            inUsing:false,
            sections:[]
        },
        'blue':{
            modeId:5,
            name:'藍色冷光',
            inUsing:false,
            sections:[]
        },
    }

    /*
        key: function(n) {
            
        },
        index: function(n){
            return Object.keys(this)[n];
        }
    */
    if (window.localStorage['curMode']) {curMode = angular.fromJson(window.localStorage['curMode'])};
    if (window.localStorage['sun5m']) {modes.sun5m = angular.fromJson(window.localStorage['sun5m'])};
    if (window.localStorage['sun10m']) {modes.sun10m = angular.fromJson(window.localStorage['sun10m'])};
    if (window.localStorage['sun15m']) {modes.sun15m = angular.fromJson(window.localStorage['sun15m'])};
    if (window.localStorage['sun20m']) {modes.sun20m = angular.fromJson(window.localStorage['sun20m'])};
    if (window.localStorage['cri']) {modes.cri = angular.fromJson(window.localStorage['cri'])};
    if (window.localStorage['blue']) {modes.blue = angular.fromJson(window.localStorage['blue'])};

    var data = [];
    if (window.localStorage['sections']) {
        data = angular.fromJson(window.localStorage['sections']);
    } else {
        data = [{
            'ab_section':0,
            //'smode': 0,
            //'section': 0,
            'setHour': 23,
            'setMin': 21,
            'mode': 0,
            'multiple': 33,
        }];
    }

    return {
        getCurMode: function(){
            return curMode;
        },
        getModesData: function(){
            return modes;
        },
        this: function() {
            return this;
        },
        saveCurMode:function(){
            window.localStorage['curMode'] = angular.toJson(curMode, false);
        },
        saveMode: function(sections,modeName){
            var newData = [];
            var tmpSec = {};
            var index = 0;
            var data = sections;

            for (var i = 0; i < data.length; i++) {
                if (typeof(data[i].mode)=='undefined') {

                }else{
                    tmpSec = {
                        'ab_section':index,
                        'setHour': data[i].setHour,
                        'setMin': data[i].setMin,
                        'mode': data[i].mode,
                        'multiple': data[i].multiple,
                        'endHour': data[i].endHour,
                        'endMin': data[i].endMin,
                    }
                    newData.push(tmpSec);
                    index++;
                }
            };
            console.log('save:');
            console.log(newData);
            modes[modeName].sections = newData;
            console.log('modes[modeName].sections:' + modes[modeName].sections);
            console.log(modes[modeName].sections);
            window.localStorage[modeName] = angular.toJson(modes[modeName], false);
            return newData;
        },

        all: data,
        
        remove: function(sections,rmId) {
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
                'ab_section':sections.length,
                //'smode': smode,
                //'section': section,
                'setHour': 0,
                'setMin': 0,
                'mode': mode,
                'multiple': 0,
                'endHour':0,
                'endMin':0
            }
            sections.push(obj);
            
            return true;
        },

        allToCmd: function() {
            var temp = '';
            var sta = String.fromCharCode(65);
            var end = String.fromCharCode(90);
            var smode = 0;
            var section = 0;
            var date = new Date();
            var phone_hour = date.getUTCHours() + 8;
            if(phone_hour>23){
              phone_hour = phone_hour-24;
            }
            var phone_min = date.getUTCMinutes();

            var curSections = modes[curMode.key].sections;
            var sectionsNum = 0;


            for (var i = 0; i < curSections.length; i++) {
                smode = Math.floor(sectionsNum / 24);
                section = sectionsNum - smode * 24;
                if (sectionsNum > 71) {
                    break;
                }else{
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
                    smode = Math.floor(sectionsNum / 24);
                    section = sectionsNum - smode * 24;
                    //End Time
                    if (i+1 == curSections.length) {
                        phone_hour = date.getUTCHours() + 8;
                        if(phone_hour>23){
                          phone_hour = phone_hour-24;
                        }
                        phone_min = date.getUTCMinutes();
                    };
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
            }
            console.log('allToCmd:');
            console.log(temp);
            return temp;

        },
        allToCmdDEBUG: function() {
            var temp = '';
            var sta = String.fromCharCode(65);
            var end = String.fromCharCode(90);
            var smode = 0;
            var section = 0;
            var date = new Date();
            var phone_hour = date.getUTCHours() + 8;
            if(phone_hour>23){
              phone_hour = phone_hour-24;
            }
            var phone_min = date.getUTCMinutes();

            var curSections = modes[curMode.key].sections;
            var sectionsNum = 0;


            for (var i = 0; i < curSections.length; i++) {
                smode = Math.floor(sectionsNum / 24);
                section = sectionsNum - smode * 24;
                if (sectionsNum > 71) {
                    break;
                }else{
                    //start Time
                    temp = temp.concat(
                        sta +'_'+
                        smode +'_'+
                        section +'_'+
                        curSections[i].setHour +'_'+
                        curSections[i].setMin +'_'+
                        curSections[i].mode +'_'+
                        curSections[i].multiple +'_'+
                        phone_hour +'_'+
                        phone_min +'_'+
                        end+'!!'
                    );
                    sectionsNum++;
                    smode = Math.floor(sectionsNum / 24);
                    section = sectionsNum - smode * 24;
                    //End Time
                    if (i+1 == curSections.length) {
                        phone_hour = date.getUTCHours() + 8;
                        if(phone_hour>23){
                          phone_hour = phone_hour-24;
                        }
                        phone_min = date.getUTCMinutes();
                    };
                    temp = temp.concat(
                        sta +'_'+
                        smode+'_'+
                        section+'_'+
                        curSections[i].endHour+'_'+
                        curSections[i].endMin+'_'+
                        0+'_'+
                        0+'_'+
                        phone_hour+'_'+
                        phone_min+'_'+
                        end
                    );
                    sectionsNum++;
                };
            }
            console.log('allToCmd:');
            console.log(temp);
            return temp;

        }

    };
})
.factory('myBluetooth', function($cordovaBluetoothSerial, $timeout, debugMocks) {

    btStatus = {
        btSettingIsEnabled: false,
        currentDeviceName: 'None!',
        currentDeviceStatus: false,
        isSearch: false,
        isNotice: false,
        isLoading: false,
        stat: 'None Stat',
        myDevices : []
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
                }, function(err) {
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
        sendCmd: function(cmd) {
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

        }else{
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

.filter('numberFixedLen', function() {
    return function(a, b) {
        return (1e4 + "" + a).slice(-b);
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
                return '高衍色性太陽光';
            case 5:
                return '藍光';
            default:
                return 'Unknown';
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
    });