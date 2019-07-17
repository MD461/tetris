var array = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 0, 0],
    [7, 0, 0, 0, 0, 0, 0, 0, 0],
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 2, 0, 0, 0, 0, 0, 0, 0],
    [6, 5, 4, 0, 0, 0, 0, 0, 0],
    [9, 8, 7, 6, 5, 4, 3, 2, 0]
];

var move = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var moveFlag = 0;

var blocks = [1]
for(var i=0;i<10;i++){
    blocks.push(getRandomInt(9)+1);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function draw(num) {
    $('#game').find('tr').each(function(i, elemTr) { // trタグそれぞれに対する処理
        $(elemTr).children().each(function(j, elemTd) { // tdタグそれぞれに対する処理
            $(elemTd).removeClass(); // まずはクラスをすべてなしにする

            if(1 <= array[i][j] && array[i][j] <=9){
                $(elemTd).addClass("number");
                $(elemTd).text(array[i][j]);
            }
            else if(array[i][j] == "+" || array[i][j]=="-" || array[i][j]=="*" || array[i][j]=="/" || array[i][j]=="%"){
                $(elemTd).addClass("symbol");
            }
            else{
                $(elemTd).addClass("default");
                $(elemTd).text("");
            }
        })
    });
    $("#nextblocks").text("１番目: " + blocks[0]+"   　"+"２番目: " + blocks[1]);
    $("#nextblocks").css('font-size', '3.0rem');
    $("#nextblocks").css('color', 'red');
}

function fall() {
    var under = [1, 1, 1, 1, 1, 1, 1, 1, 1]; // 下の行にブロックがあるかどうかを保持する配列
    for (var i = 9; i >= 0; i--) {
        for (var j = 0; j < 9; j++) {
            if (under[j] == 0) {
                if (array[i][j] == 0) {
                    // 下に何もなくそのマスがブロックでもないとき
                    under[j] = 0;
                } else {
                    // 下に何もなくそのマスがブロックであるとき
                    array[i + 1][j] = array[i][j];
                    array[i][j] = 0;
                    // moveも一緒に動かす
                    if (move[i][j] == 1) {
                        move[i][j] = 0;
                        move[i + 1][j] = 1;
                    }
                    under[j] = 0;
                }
            } else {
                if (array[i][j] == 0) {
                    // 下がブロックでそのマスがブロックでないとき
                    under[j] = 0;
                } else {
                    // 下がブロックでそのマスがブロックのとき
                    if (move[i][j] == 1){
                      resetMove();
                    }
                    under[j] = 1;
                }
            }
        }
    }
}

function resetMove() {
    moveFlag = 0;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 9; j++) {
            move[i][j] = 0;
        }
    }
}


function genBlock(blockNum) {
  if (moveFlag == 0){
    if (blockNum >= 1 && blockNum <= 9){
        array[0][4] = blockNum;
        move[0][4] = 1;
    }
    moveFlag = 1;
  }
}

document.onkeydown = function(e) { // キーボードの処理はこのように書きます
    switch (e.code) {
        case "Space":
            genBlock(1);
            break;
            // ここから下を追加する
            case "ArrowRight":

                moveBlockRight();
                break;
            case "ArrowLeft":
                moveBlockLeft();
                break;

            case "ArrowUp":
                var temp = blocks[0];
                blocks[0] = blocks[1];
                blocks[1] = temp
    }
    draw();
}


function moveBlockRight() {
    for (var i = 9; i >= 0; i--) {
        var newMove = move[i];
        for (var j = 7; j >= 0; j--) {
            if (array[i][j + 1] == 0){
                if (move[i][j] == 1) {
                    array[i][j + 1] = array[i][j];
                    array[i][j] = 0;
                    newMove[j + 1] = 1;
                    newMove[j] = 0;
                }
            }
        }
        move[i] = newMove;
    }
}

function moveBlockLeft() {
    for (var i = 9; i >= 0; i--) {
        var newMove = move[i].concat();
        for (var j = 1; j < 9; j++) {
            if (array[i][j - 1] == 0){
                if (move[i][j] == 1) {
                    array[i][j - 1] = array[i][j];
                    array[i][j] = 0;
                    newMove[j - 1] = 1;
                    newMove[j] = 0;
                }
            }
        }
        move[i] = newMove;
    }
}

// 横1列全てにブロックがあればその行を消す
function checkDelete() {
    deleteFlag = 0
    for (var i = 9; i >= 0; i--) {
        if (!array[i].includes(0)) {
            for (var j = 0; j < 9; j++) {
                array[i][j] = 0;
            deleteFlag = 1
            }
        }
    }
}

// 横の数独判定
function rowCheck() {
  for (var i = 0; i < 10; i++){
      deleteFlag = 0
      for (var j = 0; j < 9; j++){
          for (var k = j+1; k < 10; k++){
              if (array[i][j] == array[i][k] || array[i][j] == 0){
                  deleteFlag = 1;
              }
          }
      }
      if(deleteFlag == 0){
          for (var j = 0; j < 9; j++) {
              array[i][j] = 0;
          }
      }
  }
}

// 縦の数独判定
function colCheck() {
    for (var i = 0; i < 9; i++){
        deleteFlag = 0
        for (var j = 1; j < 10; j++){
            for (var k = j+1; k < 10; k++){
                if (array[j][i] == array[k][i] || array[j][i] == 0){
                    deleteFlag = 1;
                }
            }
        }
        if(deleteFlag == 0){
            for (var j = 1; j < 10; j++) {
                array[j][i] = 0;
            }
        }
    }
}

function cellCheck() {
    for(var y=1; y<9; y+=3){
        for(var x=0; x<9;x+=3){
            deleteFlag = 0;
            for(var i = 0; i<9; i++){
                for(var j = i+1; j < 9; j++)
                    if(array[Math.floor(i/3)+y][i%3+x] == array[Math.floor(j/3)+y][j%3+x] || array[Math.floor(i/3)+y][i%3+x] == 0){
                        deleteFlag = 1;
                    }
                }
            if(deleteFlag == 0){
                for(var i = 0; i<9; i++){
                    array[Math.floor(i/3)+y][i%3+x] = 0;
                    console.log("TEST");
                }
            }
        }
    }
}

function checkGameover(){
    for(var i=0;i<9;i++){
        if (array[0][i] != 0){
            window.alert('GAMEOVER');
            for(var j=0;j<90;j++){
                array[Math.floor(j/9)][j%9] = 0;
            }
        }
    }
}


draw(); // 読込が完了したらまず表示
setInterval(function() {
    fall();
    if(moveFlag == 0){
        rowCheck();
        colCheck();
        cellCheck();
        if(deleteFlag == 1){
            checkGameover();
            blocks.push(getRandomInt(9)+1);
            genBlock(blocks[0]);
            blocks.shift();
        }
    }
    draw();
}, 500); // 0.5秒ごとに表示を更新していきます
