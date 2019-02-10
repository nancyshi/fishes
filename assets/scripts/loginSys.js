// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var loginSys = {

    loginToServer(successCallBack,paras = null){
        var networkMgrNode = cc.find("networkMgrNode");
        var networkMgr = networkMgrNode.getComponent("networkMgr");
        var ipconfig = networkMgr.ipconfig.json;
        var ip = ipconfig.ip;
        var port = ipconfig.ports.playerLoginService;

        var requestType = networkMgr.requestType.json.login;

        var url = "http://" + ip + ":" + port;
        
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.login({
                success(res){
                    var code = res.code;
                    if (code) {
                        var message = requestType + "\r\n" + code + "\r\n\r\n"
                        networkMgr.sendMessageToServer(port,url,message,this.loginSucess,function(){},[successCallBack,paras]);
                    }
                    else {
                        console.log("wechat get login code failed");
                    }
                }
            })
        }
        else {
            var message = requestType + "\r\n" + "houwan&12313" + "\r\n\r\n"
            networkMgr.sendMessageToServer(port,url,message,this.loginSucess,function(){},[successCallBack,paras]);
        }
        
    },
    loginSucess(xhr,others) {
        var playerId = xhr.responseText;
        playerId = Number(playerId);
        var dataCenter = require("dataCenter");
        //dataCenter.playerData.id = playerId;
        dataCenter.playerData = {
            id: playerId
        }
        var successCallBack = others[0];
        var paras = others[1];
        successCallBack(paras);
    }
    
}

module.exports = loginSys;