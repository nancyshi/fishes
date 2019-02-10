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
        }
    },


    onLoad () {
        cc.game.addPersistRootNode(this.node);
    },

    start () {

    },
    sendMessageToServer(port,url,message,successCallBack,erroCallBack = function(){},others = []) {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {

            if (xhr.status == 0) {
                // connection failed
            }
            
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                //response success , due to cooperation problems of wechat game and cocos creator , response type will
                //just be set to "text"
                successCallBack(xhr,others)
            }
            else if (xhr.readyState == 4 && (xhr.status < 200 || xhr.status >= 400)){
                erroCallBack(xhr)
                cc.log("connection erro");
            }
            
        }
        xhr.open("POST",url,true);
        xhr.send(message);
    }

});

