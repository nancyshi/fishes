(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/loginSys.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2926a3MeE9FF4PxvKu9p5tO', 'loginSys', __filename);
// scripts/loginSys.js

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

var loginSys = {
    login: function login() {
        var networkMgrNode = cc.find("networkMgrNode");
        var networkMgr = networkMgrNode.getComponent("networkMgr");

        var ws = networkMgr.ws;
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.login({
                success: function success(res) {
                    var code = res.code;
                    var message = {
                        type: "login",
                        token: {
                            origin: "weChat",
                            token: code
                        }
                    };
                    message = JSON.stringify(message);
                    ws.send(message);
                }
            });
        } else {
            var message = {
                type: "login",
                token: {
                    origin: "localUser",
                    token: "houwan&1231"
                }
            };
            message = JSON.stringify(message);
            ws.send(message);
        }
    },
    onReceiveMessage: function onReceiveMessage(data, callBack, target) {
        var dataCenter = require("dataCenter");
        dataCenter.playerData = data.playerData;
        dataCenter.neededFishesData = data.neededFishesData;
        callBack.call(target);
    }
};

module.exports = loginSys;

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
        //# sourceMappingURL=loginSys.js.map
        