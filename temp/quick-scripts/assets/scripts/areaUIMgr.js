(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/areaUIMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a7d90KLcSpGR7zYlBXwyL60', 'areaUIMgr', __filename);
// scripts/areaUIMgr.js

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
        areaConfig: cc.JsonAsset,
        contentBackground: cc.Node,
        areaItemPrefab: cc.Prefab,
        goItemPrefab: cc.Prefab,
        spriteFrames: [cc.SpriteFrame]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.setupContent();
    },
    start: function start() {},


    // update (dt) {},

    setupContent: function setupContent() {
        var areaConfigObj = this.areaConfig.json;
        var areaConfigNum = areaConfigObj.length;

        var oneItem = cc.instantiate(this.areaItemPrefab);
        var itemHeight = oneItem.getChildByName("item_bg").getContentSize().height;
        var originBackgroundHeight = this.contentBackground.getContentSize().height;
        var backgroundHeight = areaConfigNum * itemHeight;
        if (backgroundHeight < originBackgroundHeight) {
            backgroundHeight = originBackgroundHeight;
        }

        this.contentBackground.setContentSize(this.contentBackground.getContentSize().width, backgroundHeight);
        var dataCenter = require("dataCenter");
        var currentAreaLevel = dataCenter.playerData.currentAreaLevel;
        for (var index = 0; index < areaConfigObj.length; index++) {
            var areaLevel = areaConfigObj[index].areaId;
            var item = cc.instantiate(this.areaItemPrefab);
            var icon = item.getChildByName("icon");
            var icon_bg = icon.getChildByName("icon_bg");
            var icon_res = icon.getChildByName("icon_res");
            if (areaLevel <= currentAreaLevel) {
                //icon_res set to real resource

                var sprite = icon_res.getComponent(cc.Sprite);
                // cc.loader.loadRes(areaConfigObj[index].iconName,cc.SpriteFrame,function(err,res){
                //     // cc.log("iconName is " + areaConfigObj[index].iconName);
                //     sprite.spriteFrame = res;
                // })
                var frame = this.spriteFrames[index];
                sprite.spriteFrame = frame;
            }

            var xPosition = 0;
            var yPosition = index * itemHeight;
            item.setPosition(xPosition, yPosition);
            this.contentBackground.addChild(item);

            if (areaLevel == currentAreaLevel + 1) {
                //add a button to change area
                icon_bg.setScale(1.2, 1.2);
                icon_res.setScale(1.2, 1.2);

                var goItem = cc.instantiate(this.goItemPrefab);
                var goButton = goItem.getChildByName("goButton");
                var dollorLabel = goButton.getChildByName("dollorLabel");

                var enterDollor = dataCenter.othersData.nextAreaEnterDollor;
                var helper = require("helper");
                var str = "$ " + helper.formatNumberShowStyle(enterDollor);
                dollorLabel.getComponent(cc.Label).string = str;
                goItem.zIndex = 100;
                goItem.setPosition(440, 410 + index * itemHeight);
                this.contentBackground.addChild(goItem);
                goButton.on("click", this.onClickGoButton, this);
            }
        }
    },
    onClickGoButton: function onClickGoButton() {
        var backArea = this.node.getChildByName("backArea");
        var backAreaMgr = backArea.getComponent("backAreaMgr");
        backAreaMgr.onTouched(null);

        var gameMgr = cc.find("Canvas").getComponent("gameMgr");
        var dataCenter = require("dataCenter");
        gameMgr.changeArea(dataCenter.playerData.currentAreaLevel + 1);
    }
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
        //# sourceMappingURL=areaUIMgr.js.map
        