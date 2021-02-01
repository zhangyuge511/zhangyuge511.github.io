var board=new Array();
var score=0;
var hasConflicted=new Array();
$(document).ready(function(){
$("#loading").css("display","none");
newgame();
touch_move();
});

function newgame(){
	//初始化棋盘格
		init();
	//在随机两个格子生成数字;
	generateOneNumber();
	generateOneNumber();


}

function init(){
for(var i=0;i<4;i++)
	for(var j=0;j<4;j++)
{
	 var gridCell=$("#grid-cell-"+i+"-"+j);
	 gridCell.css('top',getPosTop(i, j));
	 gridCell.css('left',getPosLeft(i, j));
}

for(var i=0;i<4;i++){
	board[i]=new Array();
	hasConflicted[i]=new Array();

	for(var j=0;j<4;j++)	
	board[i][j]=0;
		hasConflicted[i][j]=false;
		

}

updateBoardView();
score=0;
}
function updateBoardView(){
	$(".number-cell").remove();//jQuery
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		{
			$("#grid-container").append('<div class="number-cell"  id="number-cell-'+i+'-'+j+'"></div>');
		    var theNumberCell=$('#number-cell-'+i+'-'+j);
		    
		    if(board[i][j]==0)
		    {
		    theNumberCell.css('width','0px');
		    theNumberCell.css('height','0px');
		    theNumberCell.css('top',getPosTop(i,j)+50);
		    theNumberCell.css('left',getPosLeft(i,j)+50);

		    }
		    else{
           theNumberCell.css('width','100px');
           theNumberCell.css('height','100px');
           theNumberCell.css('top',getPosTop(i,j));
           theNumberCell.css('left',getPosLeft(i,j));
           //theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
           //theNumberCell.css('color',getNumberColor(board[i][j]));
           theNumberCell.css('background-image',getBackgroundImage(board[i][j]));
          


		    }
		    hasConflicted[i][j]=false;
		}
}


 function generateOneNumber(){
if(nospace(board))
return false;
//随机一个位置
var randx=parseInt(Math.floor(Math.random()*4));
var randy=parseInt(Math.floor(Math.random()*4));
var times=0;
while(times<50)//先前是while（true），这个死循环是不被提倡的，因为随着游戏数据的增多，遍历越多，游戏运行的速度也就越慢。这对于用户体验来说是致命的缺陷。
{if(board[randx][randy]==0)
	break;
randx=parseInt(Math.floor(Math.random()*4));
randy=parseInt(Math.floor(Math.random()*4));
times++;
}
if(times==50)
{for(var i=0;i<4;i++)
	for(var j=0;j<4;j++){
		if(board[i][j]==0)
		{
			randx=i;
			randy=j;
		}

}
}

//随机一个数字
var randNumber=Math.random()<0.5?2:4;
//在随机位置上随机数字
board[randx][randy]=randNumber;
showNumberWithAnimation(randx,randy,randNumber);

return true;


 }

 function touch_move(){
	// 定义滑动的起点和终点X、Y坐标值
	let startX = 0;
	let startY = 0;
	let endX = 0;
	let endY = 0;
	// 获取棋盘对象
	let table = document.getElementById("grid-container");
	// 给棋盘绑定'touchstart'事件
	table.addEventListener('touchstart',function(e){
			let touch = event.targetTouches[0];
			// 在手指点击屏幕时阻止屏幕拖动事件
			e.preventDefault();
			//获取手指滑动起点坐标
			startX = touch.pageX;
			startY = touch.pageY;
			
	});
	// 给棋盘绑定'touchmove'事件
	table.addEventListener('touchmove',function(e){
			let touch = event.targetTouches[0];
			// 在手指滑动屏幕时阻止屏幕拖动事件
			e.preventDefault();
			//获取手指滑动屏幕的终点坐标
			endX = touch.pageX;
			endY = touch.pageY;
			
	});
	// 给棋盘绑定'touchend'事件
	table.addEventListener('touchend',function(e){
			// 在手指滑动屏幕结束时阻止屏幕拖动事件
			e.preventDefault();
			//滑动结束，计算出手指分别在X、Y轴上滑动距离
			let distanceX = endX - startX;
			let distanceY = endY - startY;
			res = false;
			// console.log("startX " + startX + "  startY" + startY);
			// console.log("endX" + endX + "  endY" + endY);
			// console.log("distanceX" + distanceX + "  distanceY" + distanceY)
			// console.log("------------------------------------------------------------------------------");
			
			// 如果终点坐标X、Y值都不为零则进入下一步判断滑动方向
			if(endX!=0 && endY!=0){
					//向上滑动
					if(Math.abs(distanceY) > Math.abs(distanceX) && distanceY < -10){
						if( moveUp() ){
							setTimeout("generateOneNumber()",210);
							setTimeout("isgameover()",300);
					 }
					 
					}
					//向下滑动
					else if(Math.abs(distanceY) > Math.abs(distanceX) && distanceY > 10){
						if( moveDown() ){
							setTimeout("generateOneNumber()",210);
							setTimeout("isgameover()",300);
					 }
					 
					}
					//向左滑动
					else if(Math.abs(distanceX) > Math.abs(distanceY) && distanceX < -10){
						if( moveLeft() ){

							setTimeout("generateOneNumber()",210);
							setTimeout("isgameover()",300);
					 }
					 
					}
					//向右滑动
					else if(Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 10){
						if( moveRight() ){
							setTimeout("generateOneNumber()",210);
							setTimeout("isgameover()",300);
					 }
					 
					}
					startX = startY = endX = endY = 0;
			}
	});
}

$(document).keydown( function( event ){
    switch( event.keyCode ){
        case 37: //left
            if( moveLeft() ){

               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
            }
            break;
        case 38: //up
            if( moveUp() ){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
            }
            break;
        case 39: //right
            if( moveRight() ){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
            }
            break;
        case 40: //down
            if( moveDown() ){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
            }
            break;
        default: //default
            break;
    }
});

function isgameover(){
	if(nospace( board )&&nomove(board))
	{  gameover();

	}
}

function  gameover(){
	let isBoss = confirm("Replay?");
	if (isBoss) {
		newgame();
		return;
	} else {
		location.href = "https://weibo.com/u/3050783091";
	}
}

 function  moveLeft()
 {
 	if(!canMoveLeft( board ))
 	return false;
//moveLeft   
for(var i=0;i<4;i++)
	for(var j=1;j<4;j++){
		if(board[i][j]!=0)
	{


	for(var k=0;k<j;k++)
	{
		if(board[i][k]==0&&noBlockHorizontal(i,k,j,board))
{//move
	showMoveAnimation(i,j,i,k);//(i,j)到(i,k)
	board[i][k]=board[i][j];
	board[i][j]=0;
	continue;

}	
else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k])
{
	//move
	//add
	showMoveAnimation(i,j,i,k);
	board[i][k]+=board[i][j];
	board[i][j]=0;
	score+=board[i][k];
	updateScore(score);
	hasConflicted[i][k]=true;
	continue;
}

}
}

}
setTimeout("updateBoardView()",200);
return true;
 	

 }

 function  moveRight()
 {
 	if(!canMoveRight( board ))
 	return false;
//moveLeft   
for(var i=0;i<4;i++)
	for(var j=2;j>=0;j--){
		if(board[i][j]!=0)
	{


	for(var k=3;k>j;k--)
	{
		if(board[i][k]==0&&noBlockHorizontal(i,j,k,board))
{//move
	showMoveAnimation(i,j,i,k);
	board[i][k]=board[i][j];
	board[i][j]=0;

	continue;

}	
else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k])
{
	//move
	//add
	showMoveAnimation(i,j,i,k);
	board[i][k]+=board[i][j];
	board[i][j]=0;
	score+=board[i][k];
	updateScore(score);
	hasConflicted[i][k]=true;
	continue;
}

}
}

}
setTimeout("updateBoardView()",200);
return true;
 	

 }
  function  moveUp()
 {
 	if(!canMoveUp( board ))
 	return false;
//moveLeft   
for(var j=0;j<4;j++)
	for(var i=1;i<4;i++){
		if(board[i][j]!=0)
	{


	for(var k=0;k<i;k++)
	{
		if(board[k][j]==0&&noBlockVertical(j,k,i,board))
{//move
	showMoveAnimation(i,j,k,j);
	board[k][j]=board[i][j];
	board[i][j]=0;
	
	continue;

}	
else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)&&!hasConflicted[k][j])
{
	//move
	//add
	showMoveAnimation(i,j,k,j);
	board[k][j] +=board[i][j];
	board[i][j]=0;
	score+=board[k][j];
	updateScore(score);
	hasConflicted[k][j]=true;
	continue;
}

}
}

}
setTimeout("updateBoardView()",200);
return true;
 	

 }

 function  moveDown()
 {
 	if(!canMoveDown( board ))
 	return false;
//moveLeft   
for(var j=0;j<4;j++)
	for(var i=2;i>=0;i--){
		if(board[i][j]!=0)
	{


	for(var k=3;k>i;k--)
	{
		if(board[k][j]==0&&noBlockVertical(j,i,k,board))
{//move
	showMoveAnimation(i,j,k,j);
	board[k][j]=board[i][j];
	board[i][j]=0;
	continue;

}	
else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&!hasConflicted[k][j])
{
	//move
	//add
	showMoveAnimation(i,j,k,j);
	board[k][j] +=board[i][j];
	board[i][j]=0;
	score+=board[k][j];
	updateScore(score);
	hasConflicted[k][j]=true;
	continue;
}

}
}

}
setTimeout("updateBoardView()",200);
return true;
 	

 }