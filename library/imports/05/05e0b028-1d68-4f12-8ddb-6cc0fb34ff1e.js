"use strict";
cc._RF.push(module, '05e0bAoHWhPEo3bbMD7NP8e', 'uiMgr');
// scripts/uiMgr.js

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
        areaSelectPrefab: cc.Prefab,
        areaSelectButton: cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {},


    // update (dt) {},

    onClickAreaSelectButton: function onClickAreaSelectButton() {
        var areaSelectUI = cc.instantiate(this.areaSelectPrefab);
        areaSelectUI.setPosition(-1264, 0);
        this.node.addChild(areaSelectUI);

        var moveAction = cc.moveTo(0.2, cc.v2(61, 0));
        areaSelectUI.runAction(moveAction);
    }
});

cc._RF.pop();