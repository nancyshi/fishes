"use strict";
cc._RF.push(module, '52a96BqTkJJRpO9/oYH5FMW', 'networkMgr');
// scripts/networkMgr.js

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

        ipconfig: {
            default: null,
            type: cc.JsonAsset
        },
        requestType: {
            default: null,
            type: cc.JsonAsset
        },
        retryLayerPrefab: {
            default: null,
            type: cc.Prefab
        },
        ws: null
    },

    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        var ip = this.ipconfig.json.ip;
        var port = this.ipconfig.json.port;
        var url = "ws://" + ip + ":" + port;
        this.ws = new WebSocket(url);

        var self = this;
        this.ws.onerror = function (event) {
            self.addRetryLayerToScene();
        };
        this.ws.onopen = function (event) {
            var loginSys = require("loginSys");
            loginSys.login();
        };
        this.ws.onmessage = function (event) {
            var content = event.data;

            var messageObj = JSON.parse(content);

            if (messageObj.type == "login") {
                var data = JSON.parse(messageObj.data);
                var loginSys = require("loginSys");
                var loadingSceneMgr = cc.find("Canvas").getComponent("loadingSceneMgr");
                loginSys.onReceiveMessage(data, loadingSceneMgr.changeToScene, loadingSceneMgr);
            } else if (messageObj.type == "catchFish") {
                var gameMgr = cc.find("Canvas").getComponent("gameMgr");
                var data = messageObj.currentDollor;
                gameMgr.onReceiveMessage(data, messageObj.type);
            } else if (messageObj.type == "changeArea") {
                var gameMgr = cc.find("Canvas").getComponent("gameMgr");
                var data = JSON.parse(messageObj.data);
                gameMgr.onReceiveMessage(data, messageObj.type);
            }
        };
        this.ws.onclose = function (event) {
            self.addRetryLayerToScene();
        };
    },
    start: function start() {},
    update: function update() {},
    sendMessageToServer: function sendMessageToServer(message) {
        if (this.ws.readyState == 1) {
            this.ws.send(message);
        }
    },
    addRetryLayerToScene: function addRetryLayerToScene() {
        var canvas = cc.find("Canvas");
        var retryLayer = cc.instantiate(this.retryLayerPrefab);
        retryLayer.setPosition(0, 0);
        canvas.addChild(retryLayer);
        var button = retryLayer.getChildByName("button");
        button.on("click", this.retryConnect, this);
        cc.director.pause();
    },
    retryConnect: function retryConnect() {
        cc.director.resume();
        var node = cc.find("networkMgrNode");
        cc.game.removePersistRootNode(node);
        cc.director.loadScene("loadingScene");
    }
});

cc._RF.pop();