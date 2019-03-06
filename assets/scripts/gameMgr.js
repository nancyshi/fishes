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

        fishesNode: cc.Node,
        catchFishNode: cc.Node,
        gotFishesNode: cc.Node,
        dollorLabel: cc.Label,
        background: cc.Node,

        catchFishNodeOriginPosition: {
            default: null,
            visible: false
        },
        backgroundColors: [cc.Color],
        gradients: [cc.SpriteFrame],
        moveDuration: 5,
        catchedFishAnimTime:0.5,
        addDollorLabelAnimTime: 0.5,
        addDollorLabelAnimMoveUpDistance: 50,

        _intervalProcesses: []
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.dataCenter = require("dataCenter");
        var dataCenter = require("dataCenter");
        this.catchFishNodeOriginPosition = this.catchFishNode.getPosition();
        this.background.color = this.backgroundColors[dataCenter.playerData.currentAreaLevel - 1];
        this.openTouchEvent();
        this.startRefreshFishes();
        this.updateDollorLabelStr();
    },

    start () {

    },

    update (dt) {
        //check whether the catchfish node is in one fish node
        var fishesOnScreen = this.fishesNode.children;
        var helper = require("helper");
        for (var index in fishesOnScreen) {
            var oneFishOnScreen = fishesOnScreen[index];
            if (helper.isOneNodeInAnotherNode(this.catchFishNode,oneFishOnScreen) == true) {
                var fishMgr = oneFishOnScreen.getComponent("fishMgr");
                var fishData = fishMgr.fishData;
                var fishPosition = oneFishOnScreen.getPosition();

                //add dollor
                var networkMgr = cc.find("networkMgrNode").getComponent("networkMgr");
                var message = {
                    type: "catchFish",
                    fishId: fishData.fishId
                }
                message = JSON.stringify(message);
                networkMgr.sendMessageToServer(message);

                //remove the fish
                oneFishOnScreen.removeFromParent();
                //one new fish for animation of catched fish
                var self = this;
                cc.loader.loadRes(fishData.fishModelName,function(err,catchedFishPrefab){
                    if(err){
                        return
                    }
                    var catchedFish = cc.instantiate(catchedFishPrefab); 
                    catchedFish.position = fishPosition;
                    
                    var catchedFishTargetPosition = cc.v2(0,-151);
                    var jumpAction = cc.jumpTo(self.catchedFishAnimTime,catchedFishTargetPosition,50,1);
                    var scalUpAction = cc.scaleTo(0.3 * self.catchedFishAnimTime,1.5,1.5);
                    var scalDownAction = cc.scaleTo(0.7 * self.catchedFishAnimTime,0.5,0.5);
                    var scalAction = cc.sequence(scalUpAction,scalDownAction,cc.removeSelf());
                    var catchedFishAction = cc.spawn(jumpAction,scalAction);
                    

                    helper.turnOneNodeToOnePosition(catchedFish,catchedFishTargetPosition);
                    self.gotFishesNode.addChild(catchedFish);
                    catchedFish.runAction(catchedFishAction);

                    cc.loader.loadRes("addDollorLabel",function(err,addDollorLabelPrefab){
                        var addDollorLabelNode = cc.instantiate(addDollorLabelPrefab);
                        var addDollorLabel = addDollorLabelNode.getComponent(cc.Label);
                        addDollorLabel.string = "+ $ " + fishData.currentDollor.toString();
                        addDollorLabelNode.position = catchedFish.position;
                        self.gotFishesNode.addChild(addDollorLabelNode);

                        var fadeAction = cc.fadeOut(self.addDollorLabelAnimTime);
                        var labelAction = cc.sequence(fadeAction,cc.removeSelf());
                        var upAction = cc.moveBy(self.addDollorLabelAnimTime,cc.v2(0,self.addDollorLabelAnimMoveUpDistance));
                        var finalAction = cc.spawn(labelAction,upAction)
                        addDollorLabelNode.runAction(finalAction);
                    });
                    
                })
            }
        }
    },
    onDestroy(){
        this.closeTouchEvent();
    },

    openTouchEvent() {
        this.node.on("touchstart",this.touchBegan,this);
        this.node.on("touchmove",this.touchMoved,this);
        this.node.on("touchend",this.touchEnd,this);
        this.node.on("touchcancel",this.touchCancel,this);
    },
    closeTouchEvent(){
        this.node.off("touchstart",this.touchBegan,this);
        this.node.off("touchmove",this.touchMoved,this);
        this.node.off("touchend",this.touchEnd,this);
        this.node.off("touchcancel",this.touchCancel,this); 
    },  
    touchBegan(event){
        var x = event.getLocationX();
        var y = event.getLocationY();
        var location = this.node.convertToNodeSpaceAR(cc.v2(x,y));

        this.catchFishNode.setPosition(location.x,location.y);
        var motionComponent = this.catchFishNode.getComponent(cc.MotionStreak);
        motionComponent.enabled = true;

    },
    touchMoved(event){
        var x = event.getLocationX();
        var y = event.getLocationY();
        var location = this.node.convertToNodeSpaceAR(cc.v2(x,y));
        this.catchFishNode.setPosition(location.x,location.y);
    },
    touchEnd(event){
        var motion = this.catchFishNode.getComponent(cc.MotionStreak);
        motion.enabled = false;
        this.catchFishNode.setPosition(this.catchFishNodeOriginPosition);

    },
    touchCancel(event){
        this.touchEnd();
    }, 

    startRefreshFishes(){

        var self = this;
        var dataCenter = require("dataCenter");
        for(var element in dataCenter.neededFishesData) {
            var fishData = dataCenter.neededFishesData[element];

            var tempFunc = function(para){
                var process = setInterval(function(){
                    self.refreshOneFishByFishData(para);
                },(para.timeDelta * 1000 ));
                self._intervalProcesses.push(process);
            };
            tempFunc(fishData);    
        }
    },

    stopRefreshFishes(){
        for (var index in this._intervalProcesses) {
            clearInterval(this._intervalProcesses[index]);
        }
    },

    refreshOneFishByFishData(fishData) {
        var probability = fishData.probability;
        var helper = require("helper");
        if(helper.isHittedByProbability(probability,10000) == false) {
            return
        }
        var self = this;
        cc.loader.loadRes(fishData.fishModelName,function(err,fishPrefab){
            var newFish = cc.instantiate(fishPrefab);
            var spawnAreaNum = Math.random() * 4;
            spawnAreaNum = Math.floor(spawnAreaNum);
            var targetAreaNum = self.getTargetAreaNumBySpawnAreaNum(spawnAreaNum);

            var spawnPosition = self.getOneRandomPositionBySpawnArea(spawnAreaNum,newFish,self.node);
            newFish.setPosition(spawnPosition);
            self.fishesNode.addChild(newFish);
            var fishMgr = newFish.getComponent("fishMgr");
            fishMgr.fishData = fishData;

            var targetPosition = self.getOneRandomPositionBySpawnArea(targetAreaNum,newFish,self.node);
            helper.turnOneNodeToOnePosition(newFish,targetPosition);

            var swimLeft = cc.rotateBy(0.5,30);
            var leftBack = cc.rotateBy(0.5, -30);
            var swimRight = cc.rotateBy(0.5, -30);
            var rightBack = cc.rotateBy(0.5, 30);
            var swimAction = cc.sequence(swimLeft, leftBack, swimRight, rightBack);
            var swimAnimation = cc.repeatForever(swimAction);
            newFish.runAction(swimAnimation);

            var moveAction = cc.moveTo(self.moveDuration,targetPosition);
            var fishAction = cc.sequence(moveAction,cc.removeSelf());
            newFish.runAction(fishAction);
        });
    },
    getTargetAreaNumBySpawnAreaNum(givenNum) {
        var target = null;
        switch(givenNum) {
            case 0:
                target = 1;
                break;
            case 1:
                target = 0;
                break;
            case 2:
                target = 3;
                break;
            case 3:
                target = 2;
                break;
        }
        return target;
    },
    getOneRandomPositionBySpawnArea(spawnAreaNum,newFish,givenNode){
        var spawnX = null;
        var spawnY = null;

        if(spawnAreaNum == 0) {
             spawnX = -1 * givenNode.width/2 - newFish.width/2;
             spawnY = Math.random() * givenNode.height - givenNode.height/2;
        }
        else if(spawnAreaNum == 1){
            spawnX = givenNode.width/2 + newFish.width/2;
            spawnY = Math.random() * givenNode.height - givenNode.height/2;
        }
        else if(spawnAreaNum == 2) {
            spawnY = givenNode.height/2 + newFish.height/2;
            spawnX = Math.random() * givenNode.width - givenNode.width/2;
        }
        else if(spawnAreaNum == 3) {
            spawnY = -givenNode.height/2 - newFish.height/2;
            spawnX = Math.random() * givenNode.width - givenNode.width/2;
        }
        return cc.v2(spawnX,spawnY);
    },
    updateDollorLabelStr(){
        var helper = require("helper");
        var dataCenter = require("dataCenter");
        var currentDollor = dataCenter.playerData.currentDollor;
        var strForLabel = helper.formatNumberShowStyle(currentDollor);
        strForLabel = "$ " + strForLabel;
        this.dollorLabel.string = strForLabel;
    },
    changeArea(areaIdForChange) {
        var message = {
            type: "changeArea",
            areaId: areaIdForChange
        }
        message = JSON.stringify(message);
        var networkMgr = cc.find("networkMgrNode").getComponent("networkMgr");
        networkMgr.sendMessageToServer(message);
    },
    onReceiveMessage(data,type) {
        if (type == "catchFish") {
            var dataCenter = require("dataCenter");
            dataCenter.playerData.currentDollor = data;
    
            this.updateDollorLabelStr();
        }
        else if (type == "changeArea") {
            this.stopRefreshFishes();
            this.fishesNode.removeAllChildren();

            var dataCenter = require("dataCenter");
            dataCenter.playerData = data.playerData;
            dataCenter.neededFishesData = data.neededFishesData;
            dataCenter.othersData = data.othersData

            //performance of change area
            this.updateDollorLabelStr();
            var nextBackground = cc.instantiate(this.background);
            nextBackground.color = this.backgroundColors[dataCenter.playerData.currentAreaLevel - 1];
            
            nextBackground.setPosition(0,this.background.getContentSize().height);
            
            var nodes = this.node.children
            for (var index in nodes) {
                var a = nodes[index];
                a.zIndex = index;
            }
            nextBackground.zIndex = 1;
            this.node.addChild(nextBackground);

            var moveAction = cc.moveBy(2,cc.v2(0,-1 * this.background.getContentSize().height));
            this.background.runAction(cc.sequence(moveAction,cc.removeSelf()));
            var self = this
            var finished = cc.callFunc(function(){
                self.background = nextBackground
                self.startRefreshFishes();
            },self)

            nextBackground.runAction(cc.sequence(moveAction,finished));
        }
    }
});
