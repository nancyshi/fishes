"use strict";
cc._RF.push(module, '7aaaba56whPQbMw7RcAleSm', 'playerDataSys');
// scripts/playerDataSys.js

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

var playerDataSys = {
    initPlayerData: function initPlayerData(successCallBack, paras) {
        var networkMgrNode = cc.find("networkMgrNode");
        var networkMgr = networkMgrNode.getComponent("networkMgr");
        var ipconfig = networkMgr.ipconfig.json;
        var ip = ipconfig.ip;
        var port = ipconfig.port;

        var url = "http://" + ip + ":" + port + "/getinitdata";
        var dataCenter = require("dataCenter");
        var playerId1 = dataCenter.playerData.id;
        if (!playerId1) {
            console.log("init player data erro: there isn't a playerID");
            return;
        }

        var message = {
            playerId: dataCenter.playerData.id
        };
        message = JSON.stringify(message);
        // networkMgr.sendMessageToServer(port,url,message,this.initPlayerDataGetResponseCallBack,others = [successCallBack]);
        networkMgr.sendMessageToServer(port, url, message, this.initPlayerDataGetResponseCallBack, function () {}, [successCallBack, paras]);
    },
    initPlayerDataGetResponseCallBack: function initPlayerDataGetResponseCallBack(xhr, others) {
        var playerData = xhr.responseText;
        playerData = JSON.parse(playerData);
        var dataCenter = require("dataCenter");
        //dataCenter.playerData = null;
        dataCenter.playerData = playerData.playerData;
        dataCenter.neededFishesData = playerData.neededFishesData;

        var callBack = others[0];
        var paras = others[1];
        callBack(paras);
    },
    updatePlayerData: function updatePlayerData() {
        var networkMgrNode = cc.find("networkMgrNode");
        var networkMgr = networkMgrNode.getComponent("networkMgr");
        var ipconfig = networkMgr.ipconfig.json;
        var ip = ipconfig.ip;
        var port = ipconfig.port;

        var url = "http://" + ip + ":" + port + "/updateplayerdata";
        var dataCenter = require("dataCenter");
        var playerId = dataCenter.playerData.id;
        if (!playerId) {
            console.log("update player data erro: there isn't a playerID");
            return;
        }

        var message = {
            datasForChange: dataCenter.playerData
        };
        message = JSON.stringify(message);
        networkMgr.sendMessageToServer(port, url, message, this.updatePlayerDataSuccessCallBack);
    },
    updatePlayerDataSuccessCallBack: function updatePlayerDataSuccessCallBack(xhr, others) {}
};

module.exports = playerDataSys;

cc._RF.pop();