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
        xhr.onerror = function() {
            erroCallBack();
        }
        xhr.onload = function(){
            if (xhr.status == 200) {
                successCallBack(xhr,others);
            }
        }
        xhr.open("POST",url,true);
        xhr.send(message);
    }

});

