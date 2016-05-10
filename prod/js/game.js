            var BRICKS=0;
            var numBricks;
            var show,cool = false;
            var coolLabel = "Fun Again";
            var boringLabel = "Boss is Back!";
            var moreMsg = "more";
            var lessMsg = "less";
            var texto = new Array($("li").length);
            var lis = new Array($("li").length);
            var textoMat;
            //GAME VARS
            var WIDTH;
            var HEIGHT;        
            var resetX = 10;
            var resetY=400;
            var x = 10;
            var y = resetY;
            var dx = 3;
            var dy = -3;
            var ctx;
            var left;
            var fps = 10;
            var paddlex;
            var paddleh;
            var paddlew;
            var paddleHalfPos;
            var intervalId = 0;
            var borderRadius = 4;
            //CONTROLS
            var rightDown=false;
            var leftDown = false;
            var canvas;
            var canvasMinX;
            var canvasMaxX;
            
            var playedOnce = false;
            
            function supports_canvas() {
               return !!document.createElement('canvas').getContext;
            }
            function setBrickText(){
                var i=0;
                $('.inner li').each(function(){
                       lis[i] = $(this).html();
                       i++;
                });
                texto = makeMatrix(lis);
            }
            function initbricks() {
                //CALCULATE COLUMS
                if (BRICKS%2 === 0){
                    if(BRICKS/5===2){
                        NCOLS=5;
                    }else{
                        NCOLS=6;
                    }
                }else{
                    NCOLS=4;
                }
                //CALCULATE ROWS
                NROWS = Math.ceil(BRICKS/NCOLS)+1;
                numBricks = BRICKS;                                
                setBrickText();
                //generate brick properties
                BRICKWIDTH = (WIDTH/NCOLS) - 10;
                BRICKHEIGHT = 35;
                PADDING = 8;
                left = BRICKS;
                bricks = new Array(NROWS);
                for (i=0; i < NROWS; i++){
                    bricks[i] = new Array(NCOLS);
                    for(j=0; j < NCOLS; j++){
                        if (numBricks>0){
                            bricks[i][j] = 1;
                            numBricks--;
                        }else{
                            bricks[i][j] = 0;
                        }
                    }
                }
                
            }
            function startGame(){
                canvas.removeEventListener('click',startGame,false);
                //$('.hint').hide();
                $('.coolView').hide();
                init();
                initbricks();
                loadPlayer();
                loadMouse();
                playedOnce = true;
                $(document).keydown(onKeyDown);
                $(document).keyup(onKeyUp);
                dy = -dy;
            }
            function init() {
                ctx = $("#canvas")[0].getContext("2d");
                intervalId = setInterval(draw, fps);
                return intervalId;
            }
            function endGame(){
                clearInterval(intervalId);
                isPlaying=false;
		left = 0;
                x = resetX;
                y = resetY;
                //$('.hint').show();
                if (playedOnce){
                    showOptions();
                    playedOnce = false;
                }
                //showOptions();
                $('.coolView').show();
                canvas.addEventListener('click',startGame,false);
            }
            function loadPlayer() {
                paddleh = 10;
                paddlew = 150;
                paddlex = Math.floor(WIDTH / 2);
                paddley = HEIGHT - paddleh;
            }

            function loadMouse() {
                canvasMinX = $("#canvas").offset().left;
                canvasMaxX = canvasMinX + WIDTH;
            }
            
            function onMouseMove(evt) {
                if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
                    if (paddlex > 0 || paddlex < (canvasMaxX -paddlew)) paddlex = (evt.pageX - canvasMinX)-75;
                }
            }
            $(document).mousemove(onMouseMove);
            function makeBall(x,y,r) {
                ctx.fillStyle="rgba(0,0,0,.75)";
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI*2, true);
                ctx.closePath();
                ctx.fill(); 
            }
            function rect(x,y,w,h) {
                ctx.fillStyle="rgba(0,0,0,.75)";
                ctx.beginPath();
                ctx.rect(x,y,w,h);
                ctx.closePath();
                ctx.fill();
            }
            function showOptions(){
                ctx.fillStyle='rgba(0,0,0,.75)';
		ctx.font = ' 80% Cantata One';
		ctx.fillText("Built from scratch... :)", WIDTH/3, HEIGHT-140);
                ctx.fillStyle='rgba(0,0,0,.75)';
		ctx.font = ' 80% Cantata One';
		ctx.fillText("Click to play again", WIDTH/2, (HEIGHT-90));
            }
            function roundRect(x, y, width, height, txt) {
                var radius = 5;
                ctx.beginPath();
                ctx.fillStyle='rgba(0,0,0,.75)';
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
                ctx.fill();
                if (txt){

                        ctx.fillStyle='#FFF';
                        ctx.font = ' 80% Cantata One';
                        ctx.fillText(txt, x+10, y+20);
                }
				
                
            }
            function clear(){
                ctx.clearRect(0,0,WIDTH,HEIGHT);
            }
            function paddleKeyMov(){
                if (rightDown && paddlex < (WIDTH - paddlew)){
                    paddlex += 5;
                    
                }
                else if (leftDown && (paddlex > 0)){
                    paddlex -= 5;
                } 
                    paddleHalfPos = paddlex + 75;
                    rect(paddlex, paddley, paddlew, paddleh);
                }
            
                function makeMatrix(t){
                        var matrix = new Array(NROWS);
                        var k = 0;
                        for (i=0;i < NROWS; i++){
                                matrix[i] = new Array(NCOLS);
                                for (j=0; j < NCOLS;j++){
                                        if (t[k]){
                                                matrix[i][j] = t[k];
                                        }else{
                                                matrix[i][j] = 0;
                                        }
                                        k++;
                                }
                        }
                        return matrix;
                }
            
			function draw() {
                clear();
                makeBall(x,y,10);
                paddleKeyMov();
                //if touch bottom, go up
                if (y + dy < 0)
                    dy = -dy;
                
                for (i=0; i < NROWS; i++) {
                    for (j=0; j < NCOLS; j++) {
                        if (bricks[i][j] === 1) {
                            roundRect(
                                (j * (BRICKWIDTH + PADDING)) + PADDING, 
                                (i * (BRICKHEIGHT + PADDING)) + PADDING,
                                BRICKWIDTH, BRICKHEIGHT,
                                texto[i][j]
                            );
                        }  
                    }
                }
                //have we hit a brick?
                rowheight = BRICKHEIGHT + PADDING;
                colwidth = BRICKWIDTH + PADDING;
                row = Math.floor(y/rowheight);
                col = Math.floor(x/colwidth);
                //if so, reverse the ball and mark the brick as broken
                if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] === 1) {
                    dy = -dy;
                    bricks[row][col] = 0;
                    left--;
                    if (left <= 0){
                            clear();
                            endGame();			
                    }
                }
                //keep ball on X boundaries
                if (x + dx > WIDTH || x + dx < 0)
                        dx = -dx;
                    
                else if (y + 5 > paddley) {//ball reahces paddle position Y
                    //ball hits paddlearea
                    if ( (x > paddlex) && (x < paddlex + 150)){
                            dy = -dy;
                        if ( (x+5 < (paddlex+75) && dx>0)) dx = -dx;
                            
                        if((x+5 > (paddlex+75) && dx<0)) dx = -dx;
                            
//                        if ( (x+dx < (paddlex+37) && dx>0) || ((x+dx > (paddlex+112) ) && dx<0) ) 
//                        { 
//                            dx = -dx;   
//                        }
                        }else{
                        endGame();
                    }     
                }
                //handle movement of the ball
                x += dx;
                y += dy;
                
            }
            //set rightDown or leftDown if the right or left keys are down
            function onKeyDown(evt) {
                if (evt.keyCode === 39) rightDown = true;
                else if (evt.keyCode === 37) leftDown = true;
            }
            //and unset them when the right or left key is released
            function onKeyUp(evt) {
                if (evt.keyCode === 39) rightDown = false;
                else if (evt.keyCode === 37) leftDown = false;
            }
        
        //switch to cool view
            function toggleCoolView(){
                if (!cool){
                    cool=true;
                    $(this).text(boringLabel);
                    $('.inner').hide();
                    $('.outer').show();
                    WIDTH= $('.outer section').width()-100;
                    HEIGHT=$('.outer section').height();
                    x = WIDTH/2;
                    resetX = WIDTH/2;
                    $('#canvas').show();
                    //$('.hint').show();
                    $('.coolView').show();
                    canvas= document.getElementById('canvas');
                    $("#canvas").attr({'width':WIDTH,'height':HEIGHT});
                    canvas.addEventListener('click',startGame,false);
                    //showOptions();
                }else{
                    cool=false;
                    $(this).text(coolLabel);
                    endGame();        
                    $('#canvas').hide();
                    $('.outer').hide();
                    $('.inner').show();
                    //$('.hint').hide();
                }
            }