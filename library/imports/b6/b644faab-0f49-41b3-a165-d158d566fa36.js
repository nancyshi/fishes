"use strict";
cc._RF.push(module, 'b644fqrD0lBs6Fl0VjVZvo2', 'loadingSceneMgr');
// scripts/loadingSceneMgr.js

"use strict";

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

    onLoad: function onLoad() {},
    start: function start() {},
    update: function update(dt) {
        this.waitingTime += dt;
    },
    changeToScene: function changeToScene() {
        var timeDelta = this.waitingTime - this.minumWatingTime;
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