var ball,database,position;

function setup(){
    database=firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballposition=database.ref('ball/position');
    ballposition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-8,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(8,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-8);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,8);
        }
    }
  
    drawSprites();
}

function changePosition(x,y){
   database.ref("ball/position").set({
       x:position.x+x,
       y:position.y+y
   })
}
function readPosition(data){
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;

}
function showError(){
    console.log("database unable to conect");
}