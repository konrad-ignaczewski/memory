function shuffleArray()
{
    var list = new Array();
    for (i=0; i<8; i++) {
        list.push(i);
        list.push(i);
        }

    var currentIndex = list.length, temporaryValue, randomIndex;

    while (0 != currentIndex) {
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex -= 1;

        temporaryValue = list[currentIndex];
        list[currentIndex] =list[randomIndex];
        list[randomIndex] = temporaryValue;
    }
    return list;

}
array = shuffleArray();

function init_table()
{
    counter=0;
    board = document.getElementById("board");
    for (i=0; i<16; i++) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "tile");
        board.appendChild(newDiv);
        var image = document.createElement("IMG");
        image.setAttribute("src", "./assets/iceberg.jpg");
        image.setAttribute("onclick", "game(this.id)");
        image.setAttribute("id", counter);
        newDiv.appendChild(image);
        counter++;
    }
    document.getElementById("start").style.display = 'none';
    oldfunc = document.getElementById("0").onclick;
    document.getElementById("restart").style.display = 'inline-block';
}

function turn(id)
{
    var image = document.getElementById(id);
    file_name = "./assets/nosacz_" + array[id] +".jpg";
    image.src = file_name;
}

var clicked_tiles = [];

function game(id)
{
        clicked_tiles.push(id);
    if (clicked_tiles.length < 3) {
        if (clicked_tiles[0] == clicked_tiles[1]){
            clicked_tiles.splice(1, 1);
        }
        else{
        turn(id);
        compare();
        if (winq == 8) {
            var boardbg = document.getElementsByClassName('board_background');
            boardbg[0].style.backgroundImage = "url('./assets/board.jpg')";
            document.getElementById("winpop").style.display = "block";
            setTimeout(function() {hidepopup("winpop");}, 2000);


        }
    }
        }
    else {
        for (i in clicked_tiles)
         {
            id = clicked_tiles[i];
            var restart_image = document.getElementById(id);
            file_name = "./assets/iceberg.jpg";
            restart_image.src = file_name;
        }
        clicked_tiles = [];
    }
}

winq = 0
function compare()
{
    if (array[clicked_tiles[0]] == array[clicked_tiles [1]]) {
        document.getElementById("matchpop").style.display = "block";
        setTimeout(function() {hidepopup("matchpop");}, 1000);
        document.getElementById(clicked_tiles[0]).onclick = null;
        document.getElementById(clicked_tiles[1]).onclick = null;
        document.getElementById(clicked_tiles[0]).style.visibility = 'hidden';
        document.getElementById(clicked_tiles[1]).style.visibility = 'hidden';
        clicked_tiles = [];
        winq++;
    }
}

function restart()
{
    array = shuffleArray()
    for (id=0; id<16; id++){
        var restart_image = document.getElementById(id);
        file_name = "./assets/iceberg.jpg";
        restart_image.src = file_name;
        restart_image.style.visibility='visible';
        restart_image.onclick = oldfunc;
        winq = 0;
        var boardbg = document.getElementsByClassName('board_background');
        boardbg[0].style.backgroundImage = "url('./assets/board0.jpg')";
    }
}

function hidepopup(id)
{
    document.getElementById(id).style.display = 'none';
}

function makevisible()
{
    document.getElementById("hide").style.display = "block";
}
function hide(){
    document.getElementById("hide").style.display = "none";
}

function close_window() {
  if (confirm("Close Window?")) {
    close();
  }
}
