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
        },
        heartCheckTimeGap: 1,
        _heartCheckFailTime: 0,
        maxHeartCheckFailTime: 3,
        retryLayerPrefab: {
            default: null,
            type: cc.Prefab
        }
    },


    onLoad () {
        cc.game.addPersistRootNode(this.node);
        this.startHeartCheck()
    },

    start () {

    },
    update(){
        if (this._heartCheckFailTime == this.maxHeartCheckFailTime) {
            this._heartCheckFailTime = 0;
            this.unschedule(this.checkHeart,this);
            this.addRetryLayerToScene();
            
        }
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
    },
    checkHeart() {
        var ip = this.ipconfig.json.ip;
        var port = this.ipconfig.json.port;

        var url = "http://" + ip + ":" + port + "/heartcheck";

        var xhr = new XMLHttpRequest();
        var self = this
        xhr.onload = function() {
            if (self._heartCheckFailTime !=  0) {
                self._heartCheckFailTime = 0;
            }
        }
        xhr.onerror = function() {
            self._heartCheckFailTime += 1
            
        }
        xhr.ontimeout = function() {
            self._heartCheckFailTime += 1
        }
        xhr.open("POST",url,true);
        xhr.send("heartcheck");
    },
    startHeartCheck() {
        this.schedule(this.checkHeart,this.heartCheckTimeGap);
    },
    addRetryLayerToScene(){
        var canvas = cc.find("Canvas");
        var retryLayer = cc.instantiate(this.retryLayerPrefab);
        retryLayer.setPosition(0,0);
        canvas.addChild(retryLayer);
        var button = retryLayer.getChildByName("button")
        button.on("click",this.retryConnect,this);
        cc.director.pause();
        
    },
    retryConnect() {
        cc.director.loadScene("loadingScene");

    }
});

