"use strict";
cc._RF.push(module, 'b644fqrD0lBs6Fl0VjVZvo2', 'loadingSceneMgr');
// scripts/loadingSceneMgr.js

"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        waitingTime: {
            default: 0,
            visible: false
        },
        minumWatingTime: {
            default: 3,
            tooltip: "calculated by seconds"
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        var loginSys = require("loginSys");
        loginSys.loginToServer(this.loginSuccessCallBack, this);
    },
    loginSuccessCallBack: function loginSuccessCallBack(paras) {
        var playerDataSys = require("playerDataSys");
        playerDataSys.initPlayerData(paras.changeToScene, [paras.waitingTime, paras.minumWatingTime]);
    },
    start: function start() {},
    update: function update(dt) {
        this.waitingTime += dt;
    },
    changeToScene: function changeToScene(_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            waitingTime = _ref2[0],
            minumWatingTime = _ref2[1];

        var timeDelta = waitingTime - minumWatingTime;
        if (timeDelta < 0) {
            timeDelta = timeDelta * -1;
            setTimeout(function () {
                cc.director.loadScene("gameScene");
            }, timeDelta * 1000);
        } else {
            cc.director.loadScene("gameScene");
        }
    }
});

cc._RF.pop();