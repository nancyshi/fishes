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
    port:9999,
    protocalConfig: {
        actions: {
            getInitData: "GID",
            updatePlayerData: "UPD"
        }
    },

    sendMessageToServer(message,successCallBack,responseType = "text",errCallBack = function(){

    }){
        var xhr = new XMLHttpRequest();
        xhr.responseType = responseType;
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                //success
                successCallBack(xhr);
            }
            else {
                errCallBack(xhr);
            }
        }
        var url = this.ipAddr + ":" + String(this.port);
        xhr.open("POST",url,true);
        xhr.send(message);
    },
    updatePlayerDataToServer(){
        var dataCenter = require("dataCenter");
        var playerData = dataCenter.playerData;
        
    },
    
}

module.exports = networkingMgr;