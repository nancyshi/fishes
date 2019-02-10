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
    
    initPlayerData(successCallBack,paras) {
        var networkMgrNode = cc.find("networkMgrNode");
        var networkMgr = networkMgrNode.getComponent("networkMgr");
        var ipconfig = networkMgr.ipconfig.json;
        var ip = ipconfig.ip;
        var ports = ipconfig.ports;
        var port = ports.playerDataService;

        var url = "http://" + ip + ":" + port;
        var requestType = networkMgr.requestType.json.initPlayerData;
        var dataCenter = require("dataCenter");
        var playerId = dataCenter.playerData.id;
        if (!playerId) {
            console.log("init player data erro: there isn't a playerID");
            return
        }

        var message = requestType + "\r\n" + String(playerId) + "\r\n\r\n";
        // networkMgr.sendMessageToServer(port,url,message,this.initPlayerDataGetResponseCallBack,others = [successCallBack]);
        networkMgr.sendMessageToServer(port,url,message,this.initPlayerDataGetResponseCallBack,function(){},[successCallBack,paras]);
    },
    initPlayerDataGetResponseCallBack(xhr,others){
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
    updatePlayerData(){
        var networkMgrNode = cc.find("networkMgrNode");
        var networkMgr = networkMgrNode.getComponent("networkMgr");
        var ipconfig = networkMgr.ipconfig.json;
        var ip = ipconfig.ip;
        var ports = ipconfig.ports;
        var port = ports.playerDataService;

        var url = "http://" + ip + ":" + port;
        var requestType = networkMgr.requestType.json.updatePlayerData;
        var dataCenter = require("dataCenter");
        var playerId = dataCenter.playerData.id;
        if (!playerId) {
            console.log("update player data erro: there isn't a playerID");
            return
        }
        var requestBody = JSON.stringify(dataCenter.playerData);
        var message = requestType + "\r\n" + String(playerId) + "\r\n\r\n" + requestBody;
        networkMgr.sendMessageToServer(port,url,message,this.updatePlayerDataSuccessCallBack);
    },
    updatePlayerDataSuccessCallBack(xhr,others) {

    }
}

module.exports = playerDataSys