// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var helper = {
    pointInNode(pointInWindow,node){

        var canvasNode = cc.find("Canvas");
        var parentNodes = [];
        var x = 0
        var nodeForFunc = node;

        while (nodeForFunc.parent != null) {
            parentNodes[x] = nodeForFunc.parent;
            x ++;
            if (nodeForFunc.parent == canvasNode) {
                break;
            }
            else {
                nodeForFunc = nodeForFunc.parent;
            }
        }
        if (parentNodes.length == 0){
            return 
        }

        var xTransed = null;
        var yTransed = null;
        var pointInWindowTemp = pointInWindow;
        for(var i in parentNodes){
            xTransed = pointInWindowTemp.x - parentNodes[i].position.x;
            yTransed = pointInWindowTemp.y - parentNodes[i].position.y;
            pointInWindowTemp.x = xTransed;
            pointInWindowTemp.y = yTransed;
        }
        var point = new cc.Vec2(xTransed,yTransed);
        return point;
    },
    pointInWindow(pointInNode,node){

    },
    isOneNodeInAnotherNode(oneNode,anotherNode){
        //there should be a function to conver the two nodes to a same coodinate;
        //now I'm sure about it , so ignore it~
        this.addForeBoundPointToOneNode(oneNode);
        this.addForeBoundPointToOneNode(anotherNode);
        
        if (oneNode.left.x >= anotherNode.left.x && oneNode.right.x <= anotherNode.right.x && oneNode.top.y <= anotherNode.top.y && oneNode.bottom.y >= anotherNode.bottom.y) {
            return true;
        }
        else {
            return false;
        }
        
    },
    addForeBoundPointToOneNode(oneNode){
        oneNode.left = cc.v2(oneNode.x - oneNode.width/2 , oneNode.y);
        oneNode.right = cc.v2(oneNode.x + oneNode.width/2 , oneNode.y);
        oneNode.top = cc.v2(oneNode.x, oneNode.y + oneNode.height/2);
        oneNode.bottom = cc.v2(oneNode.x, oneNode.y - oneNode.height/2);
    },
    turnOneNodeToOnePosition(oneNode,targetPosition){
        var nodePosition = oneNode.getPosition();
        var yMinus = targetPosition.y - nodePosition.y;
        var xMinus = targetPosition.x - nodePosition.x;
        var degree = Math.atan2(yMinus,xMinus) * 180 / Math.PI;
        oneNode.rotation = -1 *degree;

    },
    formatNumberShowStyle(givenNumber) {
        //rules: 
        //0 - 1million , show the real number which seperated by , each 3 number 
        var tempNumber = givenNumber / 1000;
        var stringForReturn = "";

        while(tempNumber >= 1) {
            var lastThreeNumber = tempNumber.toFixed(3).slice(-3);
            var lastString = "," + lastThreeNumber;
            stringForReturn = lastString + stringForReturn;

            tempNumber = Math.floor(tempNumber) / 1000;
        }
        tempNumber = tempNumber * 1000;
        stringForReturn = tempNumber.toString() + stringForReturn;
        return stringForReturn;

    },
    isHittedByProbability(givenProbability, basicNum) {
        var num = Math.random() * basicNum;
        if ( num < givenProbability) {
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = helper;
