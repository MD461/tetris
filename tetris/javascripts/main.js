var array = [
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function draw(num) {
    $('#game').find('tr').each(function(i, elemTr) { // trタグそれぞれに対する処理
        $(elemTr).children().each(function(j, elemTd) { // tdタグそれぞれに対する処理
            $(elemTd).removeClass(); // まずはクラスをすべてなしにする

            if(1 <= array[i][j] && array[i][j] <=9){
                $(elemTd).addClass("number");
                $(elemTd).text(num);
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


draw(); // 読込が完了したらまず表示
setInterval(function() {
    checkDelete();
    fall();
    draw(num);
}, 500); // 0.5秒ごとに表示を更新していきます


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
            num = getRandomInt(9)+1
            genBlock(num);
            break;
            // ここから下を追加する
            case "ArrowRight":
                moveBlockRight();
                break;
            case "ArrowLeft":
                moveBlockLeft();
                break;
    }
    draw();
}


function moveBlockRight() {
    for (var i = 9; i >= 0; i--) {
        var newMove = move[i].concat();
        for (var j = 7; j >= 0; j--) {
            if (move[i][j] == 1) {
                array[i][j + 1] = array[i][j];
                array[i][j] = 0;
                newMove[j + 1] = 1;
                newMove[j] = 0;
            }
        }
        move[i] = newMove;
    }
}

function moveBlockLeft() {
    for (var i = 9; i >= 0; i--) {
        var newMove = move[i].concat();
        for (var j = 1; j < 9; j++) {
            if (move[i][j] == 1) {
                array[i][j - 1] = array[i][j];
                array[i][j] = 0;
                newMove[j - 1] = 1;
                newMove[j] = 0;
            }
        }
        move[i] = newMove;
    }
}

function checkDelete() {
    for (var i = 9; i >= 0; i--) {
        if (!array[i].includes(0)) {
            for (var j = 0; j < 9; j++) {
                array[i][j] = 0;
            }
        }
    }
}

function checkRow() {
  for (var i = 0; i < 10; i++){
    for (var j = 0; j < 9; j++){
      for (var k = j; k < 9; k++){

      }
    }
  }
}

function checkColm() {

}

function checkCell() {

}
