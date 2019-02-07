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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        dataCenter: {
            default: null,
            visible: false
        },
        waitingTime: {
            default: 0,
            visible: false
        },
        minumWatingTime: {
            default: 3,
            tooltip: "calculated by seconds"
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.dataCenter = require("dataCenter");
        //setup dataCenter
        this.setupDataCenterFromServer(this.dataCenter,this.changeToScene,this.waitingTime,this.minumWatingTime);
    },

    start () {

    },

    update (dt) {
        this.waitingTime += dt;
    },

    setupDataCenterFromServer(dataCenter,callBack,waitingTime,minumWatingTime){
        var xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.response;
                dataCenter.playerData = response.playerData;
                dataCenter.neededFishesData = response.neededFishesData;
                callBack(waitingTime,minumWatingTime);
            }
        }
        xhr.open("POST","http://127.0.0.1:8000",true);
        xhr.send("request init data")
    },
    changeToScene(waitingTime,minumWatingTime){
        var timeDelta = waitingTime - minumWatingTime;
        if (timeDelta < 0) {
            timeDelta = timeDelta * -1;
            setTimeout(function () {
                cc.director.loadScene("gameScene");
            },(timeDelta * 1000));
        }
        else {
            cc.director.loadScene("gameScene");
        }
    }
});
