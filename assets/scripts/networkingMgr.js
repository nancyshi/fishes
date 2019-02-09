// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var networkingMgr = {
    ipAddr:"127.0.0.1",
    port:8000,
    requestType: {
        getInitData: "GID",
        updatePlayerData: "UPD"
    },

    sendMessageToServer(message,successCallBack,responseType = "text",errCallBack = function(){

    }){
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                //success
                successCallBack(xhr);
            }
            else {
                errCallBack(xhr);
            }
        }
        var url = "http://" + this.ipAddr + ":" + String(this.port);
        xhr.open("POST",url,true);
        xhr.responseType = responseType;
        xhr.send(message);
    },
    updatePlayerDataToServer(){
        var dataCenter = require("dataCenter");
        var playerData = dataCenter.playerData;
        var requestInfo = this.requestType.updatePlayerData + "\r\n" + dataCenter.playerData.id;
        var sendMessage = requestInfo + "\r\n\r\n" + JSON.stringify(playerData)
        this.sendMessageToServer(sendMessage,function(xhr){
            cc.log(xhr.responseText);
        });
    },

    getInitDataFromServer(callBack, parameters = []){
        var dataCenter = require("dataCenter");
        var requestInfo = this.requestType.getInitData + "\r\n" + "10001";
        var sendMessage = requestInfo + "\r\n\r\n"
        this.sendMessageToServer(sendMessage,function(xhr){
            //setup datacenter
            var jsonObj = JSON.parse(xhr.responseText);
            dataCenter.playerData = jsonObj.playerData;
            dataCenter.neededFishesData = jsonObj.neededFishesData;
            callBack(parameters);
        })
    }
    
}

module.exports = networkingMgr;