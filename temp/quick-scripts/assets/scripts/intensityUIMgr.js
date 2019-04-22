(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/intensityUIMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f2030+ZwMdJGYCpXwdRB9Cf', 'intensityUIMgr', __filename);
// scripts/intensityUIMgr.js

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
        tabs: [cc.Node],
        content: cc.Node,
        boatIntensifyItemPrefab: cc.Prefab,
        boatTab: cc.Node,
        oterTab1: cc.Node,
        otherTab2: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.setupBoatIntensityUI();
    },
    start: function start() {},
    setupBoatIntensityUI: function setupBoatIntensityUI() {
        var dataCenter = require("dataCenter");

        var infos = dataCenter.othersData.clientBoatIntensifyInfo;

        for (var index in infos) {
            var oneInfo = infos[index];
            var oneItem = cc.instantiate(this.boatIntensifyItemPrefab);
            var intensifyTypeLabel = oneItem.getChildByName("intensifyTypeLabel").getComponent(cc.Label);
            intensifyTypeLabel.string = oneInfo.intensifyType;

            var desLabel = oneItem.getChildByName("intensifyDesLabel").getComponent(cc.Label);
            desLabel.string = oneInfo.description;
            var lvLabel = oneItem.getChildByName("icon").getChildByName("lvLabel").getComponent(cc.Label);
            var levelUpButton = oneItem.getChildByName("levelUpButton").getComponent(cc.Button);
            var buttonLabel = oneItem.getChildByName("levelUpButton").getChildByName("Label").getComponent(cc.Label);

            lvLabel.string = oneInfo.currentLevel;
            buttonLabel.string = oneInfo.nextLevelNeededDollor;

            if (oneInfo.currentLevel == oneInfo.maxLevel) {
                levelUpButton.interactable = false;
            }

            levelUpButton.temp = oneInfo.intensifyType;
            levelUpButton.node.on("click", this.onClickLevelUpButton, this);

            var originPosition = cc.v2(-409, -42);
            var xPosition = originPosition.x;
            var yPosition = originPosition.y - 130 * index;

            oneItem.setPosition(xPosition, yPosition);
            this.content.addChild(oneItem);
        }
    },
    onClickLevelUpButton: function onClickLevelUpButton(givenButton) {
        var intensifyType = givenButton.temp;
        var networkMgr = cc.find("networkMgrNode").getComponent("networkMgr");
        var message = {
            "type": "intensifyBoat",
            "intensifyType": intensifyType
        };
        message = JSON.stringify(message);
        networkMgr.sendMessageToServer(message);
    }

    // update (dt) {},

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=intensityUIMgr.js.map
        