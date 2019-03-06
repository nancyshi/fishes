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

    login() {
        var networkMgrNode = cc.find("networkMgrNode");
        var networkMgr = networkMgrNode.getComponent("networkMgr");

        var ws = networkMgr.ws;
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.login({
                success(res) {
                    var code = res.code;
                    var message = {
                        type: "login",
                        token: {
                            origin: "weChat",
                            token: code
                        }
                    }
                    message = JSON.stringify(message);
                    ws.send(message);
                }
            })
        }
        else {
            var message = {
                type: "login",
                token: {
                    origin: "localUser",
                    token: "houwan&1231"
                }
            }
            message = JSON.stringify(message);
            ws.send(message);
        }
    },

    onReceiveMessage(data, callBack,target) {
        var dataCenter = require("dataCenter");
        dataCenter.playerData = data.playerData;
        dataCenter.neededFishesData = data.neededFishesData;
        dataCenter.othersData = data.othersData;
        callBack.call(target);
    }
}

module.exports = loginSys;
