! function(i, e) {
    var t = i.createElement("style");
    if (i.getElementsByTagName("head")[0].appendChild(t), t.styleSheet) t.styleSheet.disabled || (t.styleSheet.cssText = e);
    else try {
        t.innerHTML = e
    } catch (n) {
        t.innerText = e
    }
}(document, "/*\nTo customize the look and feel of Ionic, you can override the variables\nin ionic's _variables.scss file.\nFor example, you might change some of the default colors:\n*/\n.ionic_timepicker_popup .font_28px {\n  font-size: 28px;\n}\n.ionic_timepicker_popup .margin_zero {\n  margin: 0;\n}\n.ionic_timepicker_popup .padding_zero {\n  padding: 0;\n}\n.ionic_timepicker_popup .popup {\n  background-color: #ffffff;\n}\n.ionic_timepicker_popup .popup-head {\n  display: none;\n}\n.ionic_timepicker_popup .popup-body {\n  padding: 0;\n}\n.ionic_timepicker_popup .popup-buttons {\n  padding: 0;\n  min-height: 44px;\n  height: 44px;\n}\n.ionic_timepicker_popup .popup-buttons .button:not(:last-child) {\n  margin-right: 1px;\n}\n.ionic_timepicker_popup .padding_left_15px {\n  padding-left: 15px;\n}\n.ionic_timepicker_popup .heading {\n  height: 44px;\n  background-color: #009688;\n  color: #ffffff;\n  text-align: center;\n  line-height: 44px;\n  font-size: 18px;\n  font-weight: bold;\n}\n.ionic_timepicker_popup .time_picker_colon {\n  padding-top: 45px;\n  text-align: center;\n  font-weight: bold;\n}\n.ionic_timepicker_popup .time_picker_arrows {\n  width: 100%;\n}\n.ionic_timepicker_popup .time_picker_box_text {\n  height: 40px;\n  text-align: center;\n  border: 1px solid #dddddd;\n  font-size: 16px;\n  line-height: 38px;\n}\n.ionic_timepicker_popup .overflowShow {\n  white-space: normal !important;\n}\n.ionic_timepicker_popup .button_set, .ionic_timepicker_popup .button_close {\n  background-color: #009688;\n  color: #ffffff;\n}"),
function(i) {
    try {
        i = angular.module("ionic-timepicker.templates")
    } catch (e) {
        i = angular.module("ionic-timepicker.templates", [])
    }
    i.run(["$templateCache", function(i) {
        i.put("ionic-timepicker.html", '<div><div class=heading>{{time.hours}} : {{time.minutes}} <span ng-show="time.format == 12">{{time.meridian}}</span></div><div class=row ng-class="{\'padding_left_15px\':time.format == 12}"><div class="col col-25" ng-class="{\'col-offset-20 col-25\':time.format == 24}"><button type=button class="button button-clear button-small button-dark time_picker_arrows" ng-click=increaseHours()><i class="icon ion-chevron-up"></i></button><input min="0" max="23" ng-model=time.hours class=time_picker_box_text></input><button type=button class="button button-clear button-small button-dark time_picker_arrows" ng-click=decreaseHours()><i class="icon ion-chevron-down"></i></button></div><label class="col col-10 time_picker_colon">:</label><div class="col col-25" ng-class="{\'col-25\':time.format == 24}"><button type=button class="button button-clear button-small button-dark time_picker_arrows" ng-click=increaseMinutes()><i class="icon ion-chevron-up"></i></button><input min="0" max="59" ng-model=time.minutes class=time_picker_box_text></input><button type=button class="button button-clear button-small button-dark time_picker_arrows" ng-click=decreaseMinutes()><i class="icon ion-chevron-down"></i></button></div><label class="col col-10 time_picker_colon" ng-if="time.format == 12">:</label><div class="col col-25" ng-if="time.format == 12"><button type=button class="button button-clear button-small button-dark time_picker_arrows" ng-click=changeMeridian()><i class="icon ion-chevron-up"></i></button><div ng-bind=time.meridian class=time_picker_box_text></div><button type=button class="button button-clear button-small button-dark time_picker_arrows" ng-click=changeMeridian()><i class="icon ion-chevron-down"></i></button></div></div></div>')
    }])
}(), angular.module("ionic-timepicker", ["ionic-timepicker.provider", "ionic-timepicker.templates"]), angular.module("ionic-timepicker.provider", []).provider("ionicTimePicker", function() {
    var i = {
        setLabel: "Set",
        closeLabel: "Close",
        inputTime: 60 * (new Date).getHours() * 60 + 60 * (new Date).getMinutes(),
        format: 12,
        step: 15
    };
    this.configTimePicker = function(e) {
        angular.extend(i, e)
    }, this.$get = ["$rootScope", "$ionicPopup", function(e, t) {
        function n(i) {
            return i.setHours(0), i.setMinutes(0), i.setSeconds(0), i.setMilliseconds(0), i
        }

        function o(i, e) {
            r.time.hours = i / 3600;
            var t = i % 3600;
            12 == e && (r.time.hours > 12 ? (r.time.hours -= 12, r.time.meridian = "PM") : r.time.meridian = "AM"), r.time.minutes = t / 60, r.time.hours = r.time.hours.toFixed(0), r.time.minutes = r.time.minutes.toFixed(0), 1 == r.time.hours.toString().length && (r.time.hours = "0" + r.time.hours), 1 == r.time.minutes.toString().length && (r.time.minutes = "0" + r.time.minutes), r.time.format = r.mainObj.format
        }
        var m = {},
            r = e.$new();
        return r.today = n(new Date).getTime(), r.time = {}, r.increaseHours = function() {
            r.time.hours = Number(r.time.hours), 12 == r.mainObj.format && (12 != r.time.hours ? r.time.hours += 1 : r.time.hours = 1), 24 == r.mainObj.format && (r.time.hours = (r.time.hours + 1) % 24), r.time.hours = r.time.hours < 10 ? "0" + r.time.hours : r.time.hours
        }, r.decreaseHours = function() {
            r.time.hours = Number(r.time.hours), 12 == r.mainObj.format && (r.time.hours > 1 ? r.time.hours -= 1 : r.time.hours = 12), 24 == r.mainObj.format && (r.time.hours = (r.time.hours + 23) % 24), r.time.hours = r.time.hours < 10 ? "0" + r.time.hours : r.time.hours
        }, r.increaseMinutes = function() {
            r.time.minutes = Number(r.time.minutes), r.time.minutes = (r.time.minutes + r.mainObj.step) % 60, r.time.minutes = r.time.minutes < 10 ? "0" + r.time.minutes : r.time.minutes
        }, r.decreaseMinutes = function() {
            r.time.minutes = Number(r.time.minutes), r.time.minutes = (r.time.minutes + (60 - r.mainObj.step)) % 60, r.time.minutes = r.time.minutes < 10 ? "0" + r.time.minutes : r.time.minutes
        }, r.changeMeridian = function() {
            r.time.meridian = "AM" === r.time.meridian ? "PM" : "AM"
        }, m.openTimePicker = function(e) {
            var n = [];
            r.mainObj = angular.extend({}, i, e), o(r.mainObj.inputTime, r.mainObj.format), n.push({
                text: r.mainObj.setLabel,
                type: "button_set",
                onTap: function(i) {
                    var e = 0;
                    12 == r.time.format ? (r.time.hours = Number(r.time.hours), "PM" == r.time.meridian && 12 != r.time.hours ? r.time.hours += 12 : "AM" == r.time.meridian && 12 == r.time.hours && (r.time.hours -= 12), e = 60 * r.time.hours * 60 + 60 * r.time.minutes) : e = 60 * r.time.hours * 60 + 60 * r.time.minutes, r.mainObj.callback(e)
                }
            }), n.push({
                text: r.mainObj.closeLabel,
                type: "button_close"
            }), r.popup = t.show({
                templateUrl: "ionic-timepicker.html",
                scope: r,
                cssClass: "ionic_timepicker_popup",
                buttons: n
            })
        }, m
    }]
});