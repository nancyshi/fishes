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
        areaSelectPrefab: cc.Prefab,
        areaSelectButton: cc.Node,



    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },

    // update (dt) {},

    onClickAreaSelectButton() {
        var areaSelectUI = cc.instantiate(this.areaSelectPrefab);
        var background = areaSelectUI.getChildByName("background");
        var backArea = areaSelectUI.getChildByName("backArea");
        var xOffset = (background.getContentSize().width + backArea.getContentSize().width) / 2;
        areaSelectUI.setPosition(-xOffset,0);
        this.node.addChild(areaSelectUI);

        var moveAction = cc.moveTo(0.2,cc.v2(0,0));
        areaSelectUI.runAction(moveAction);
    }
});
