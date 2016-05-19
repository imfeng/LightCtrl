angular.module('starter.services', [])

.factory('Sections', function(debugMocks) {
    

    var modes = {
        'sun5m':{
            name:'太陽光5m',
            inUsing:false,
            sections:[{
                'ab_section':0,
                //'smode': 0,
                //'section': 0,
                'setHour': 23,
                'setMin': 21,
                'mode': 0,
                'multiple': 33,
            }]
        },
        'sun10m':{
            name:'太陽光10m',
            inUsing:false,
            sections:[]
        },
        'sun15m':{
            name:'太陽光15m',
            inUsing:false,
            sections:[]
        },
        'sun20m':{
            name:'太陽光20m',
            inUsing:false,
            sections:[]
        },
        'cri':{
            name:'高演色性太陽光',
            inUsing:false,
            sections:[]
        },
        'blue':{
            name:'藍色冷光',
            inUsing:false,
            sections:[]
        }
    }

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
        getModesData: function(){
            return modes;
        },
        this: function() {
            return this;
        },
        saveToStorage: function() {

            var newData = [];
            var tmpSec = {};
            var index = 0;

            for (var i = 0; i < data.length; i++) {
                if (typeof(data[i].mode)=='undefined') {

                }else{
                    tmpSec = {
                        'ab_section':index,
                        'setHour': data[i].setHour,
                        'setMin': data[i].setMin,
                        'mode': data[i].mode,
                        'multiple': data[i].multiple,
                    }
                    newData.push(tmpSec);
                    index++;
                }
            };
            console.log('save:');
            console.log(newData);
            data = newData;
            console.log('data = newDat:' + data);
            console.log(data);
            window.localStorage['sections'] = angular.toJson(data, false);
            return newData;
        },
        all: data,
        
        remove: function(rmId) {
            console.log('remove:'+ data[rmId]);
            //console.log('data[-1]:'+ data[rmId-1]);
            //console.log(data[rmId-1]);
            console.log( data);
            //console.log( debugMocks.dump(data));
            //console.log( data[rmId].multiple);
            //console.log('dataLength:'+ data.length);
           //data.splice(rmId, 1);
            delete data[rmId];
            data[rmId] = {};
            /*
                .splice has BUG
                    @modify allToCmd
                    @modify saveTostorage
                    @add data |filter:{mode:'!!'}
            */
            //this.saveToStorage();
        },
        set: function(Id, key, num) {
            data[Id].indexOf(key) = num;
            this.saveToStorage();
        },
        getByKey: function(Id, key) {
            return data[Id].index(key);
        },
        get: function(Id) {
            return data[Id];

        },
        addParam: function(setHour, setMin, mode, multiple) {
            var obj = {
                'ab_section':data.length,
                //'smode': smode,
                //'section': section,
                'setHour': setHour,
                'setMin': setMin,
                'mode': mode,
                'multiple': multiple,
            }
            data.push(obj);
            //this.saveToStorage();
            return true;
        },
        modifyParam: function(id, setHour, setMin, mode, multiple) {
            data[id].setHour = setHour;
            data[id].setMin = setMin;
            data[id].mode = mode;
            data[id].multiple = multiple;
            /*data[id] = {
                //'smode': smode,
                //'section': section,
                'ab_section':id,
                'setHour': setHour,
                'setMin': setMin,
                'mode': mode,
                'multiple': multiple,
            }*/
            this.saveToStorage();
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


            for (var i = 0; i < data.length; i++) {
                smode = Math.floor(data[i].ab_section / 24);
                section = data[i].ab_section - smode * 24;
                if (data[i].ab_section > 71) {
                    break;
                }else{};
                temp = temp.concat(
                    sta +
                    String.fromCharCode(smode) +
                    String.fromCharCode(section) +
                    String.fromCharCode(data[i].setHour) +
                    String.fromCharCode(data[i].setMin) +
                    String.fromCharCode(data[i].mode) +
                    String.fromCharCode(data[i].multiple) +
                    String.fromCharCode(phone_hour) +
                    String.fromCharCode(phone_min) +
                    end
                );

            }

            return temp;

        },
        allToCmdDEBUG: function() {
            var temp = '';
            var sta = String.fromCharCode(65);
            var end = String.fromCharCode(90);
            //var ab_section = 0;
            var smode = 0;
            var section = 0;
            var date = new Date();
            var phone_hour = date.getUTCHours() + 8;
            if(phone_hour>23){
              phone_hour = phone_hour-24;
            }
            var phone_min = date.getUTCMinutes();

            for (var i = 0; i < data.length; i++) {
                if (data[i].ab_section > 71) {
                    break;
                };
                smode = Math.floor(data[i].ab_section / 24);
                section = data[i].ab_section - smode * 24;
                temp = temp.concat(
                    sta + '_' +
                    smode + '_' +
                    section + '_' +
                    data[i].setHour + '_' +
                    data[i].setMin + '_' +
                    data[i].mode + '_' +
                    data[i].multiple + '_' +
                    phone_hour + '_' +
                    phone_min + '_' +
                    end + '\n'
                );
                //ab_section++;
            }
            return temp;

        }

    };
})
    .factory('allToCmd', function(obj) {

        return {
            function() {
                var temp = '';
                var sta = String.fromCharCode(65);
                var end = String.fromCharCode(90);
                var ab_section = 0;
                var smode = 0;
                var section = 0;
                var date = new Date();
                var phone_hour = date.getUTCHours() + 8;
                if(phone_hour>23){
                  phone_hour = phone_hour-24;
                }
                var phone_min = date.getUTCMinutes();


                for (var i = 0; i < data.length; i++) {
                    if (ab_section > 71) {
                        break;
                    };
                    smode = Math.floor(ab_section / 24);
                    section = ab_section - smode * 24;
                    temp = temp.concat(
                        sta +
                        String.fromCharCode(smode) +
                        String.fromCharCode(section) +
                        String.fromCharCode(data[i].setHour) +
                        String.fromCharCode(data[i].setMin) +
                        String.fromCharCode(data[i].mode) +
                        String.fromCharCode(data[i].multiple) +
                        String.fromCharCode(phone_hour) +
                        String.fromCharCode(phone_min) +
                        end
                    );
                    ab_section++;
                }

                return temp;
            }

        }

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