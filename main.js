window.onload = main;
var gameBoard;
var aboveGameBoard;
var cells = [];
var hiddenCells = [];
var currentPlayer = 1;
var r = document.querySelector(':root');

document.addEventListener("click", (e)=>{
    for(var arr of cells){
        for(var j = 0; j < arr.length; j++){
            let item = arr[j];
            if(item.isEqualNode(e.target)){
                // item.innerText = j;
                let row = findLowestAvailable(cells, j);
                let lowest = cells[row][j]
                lowest.classList.add("taken");
                lowest.classList.add(currentPlayer==1 ? "player1" : "player2");

                if(checkForConnect4(cells, currentPlayer, row, j)){
                    selfDestruct()
                }

                currentPlayer = currentPlayer == 1 ? 2 : 1;
                r.style.setProperty('--currentPlayerColor', currentPlayer == 1 ? 'rgb(60, 138, 118)' : 'rgb(231, 42, 32)');
            }
        }
    }
    console.log(cells)
})

// return true if someone has won
function checkForConnect4(cells, currentPlayer,  row, col){
    // Left Right
    let i = col;
    do{
        i++;
    } while (i>=0 && i<cells[row].length && cells[row][i].classList.contains("player"+currentPlayer))
    let counter = 0;
    i--;
    while (i>=0 && i<cells[row].length && cells[row][i].classList.contains("player"+currentPlayer)){
        counter++;
        i--;
    }

    if(counter>=4){
        // hasWon = true;
        return true;
    }
    // Up down
    i = row;
    do{
        i++;
    } while (i>=0 && i<cells.length && cells[i][col].classList.contains("player"+currentPlayer))
    counter = 0;
    i--;
    while (i>=0 && i<cells.length && cells[i][col].classList.contains("player"+currentPlayer)){
        counter++;
        i--;
    }
    if(counter>=4){
        return true;
    }
    // bottom left to top right
    i = row; // row
    k = col; // col
    do{
        i++;
        k--;
    } while (i>=0 && i<cells.length && k>=0 && k<cells[0].length && cells[i][k].classList.contains("player"+currentPlayer))
    counter = 0;
    i--;
    k++;
    while (i>=0 && i<cells.length && k>=0 && k<cells[0].length && cells[i][k].classList.contains("player"+currentPlayer)){
        counter++;
        i--;
        k++;
    }
    
    if(counter>=4){
        return true;
    }
    // top left to bottom right
    i = row; // row
    k = col; // col
    do{
        i--;
        k--;
    } while (i>=0 && i<cells.length && k>=0 && k<cells[0].length && cells[i][k].classList.contains("player"+currentPlayer))
    counter = 0;
    i++;
    k++;
    while (i>=0 && i<cells.length && k>=0 && k<cells[0].length && cells[i][k].classList.contains("player"+currentPlayer)){
        counter++;
        i++;
        k++;
    }

    if(counter>=4){
        return true;
    }
    return false;
}

function selfDestruct(){
    let temp = document.getElementById("mainDiv")
    temp.innerHTML = "<div>player " + currentPlayer + " wins,</div><br/><button onclick = \"refreshPage()\">Play again?</button>"
}

function refreshPage(){
    location.reload();
}

function findLowestAvailable(array2d, col){
    for(var i = array2d.length-1; i >= 0; i--){
        if(!(array2d[i][col].classList.contains("taken"))){
            return i;
        }
    }
    return null;
}


function main(){
    gameBoard = document.getElementById("gameBoard");
    aboveGameBoard = document.getElementById("aboveGameBoard");
    cols = 7;
    rows = 6; 
    for(var j = 0; j < cols; j++){
        let temp = document.createElement("div");
        temp.classList.add("hiddenCell")
        temp.style.opacity = "0";
        temp.style.transform = "translate(0,-50px)"
        hiddenCells.push(temp)
        aboveGameBoard.appendChild(temp)
    }

    for(var i = 0; i < rows; i++){
        let tempArr = []
        for(var j = 0; j < cols; j++){
            let temp = document.createElement("div");
            temp.classList.add("cell")
            temp.classList.add("row"+i)
            temp.classList.add("col"+j)
            // if(i==rows-1){
            //     temp.classList.add("taken")
            // }
            temp.addEventListener("mouseover", (e) => {
                for(var arr of cells){
                    for(var j = 0; j < arr.length; j++){
                        let item = arr[j];
                        if(item.isEqualNode(e.target)){
                            // item.innerText = j;
                            hiddenCells.forEach((hidCell)=>{
                                hidCell.style.opacity = "0";
                                hidCell.style.transform = "translate(0,-50px)"
                            })
                            for(var i = 0; i < cells[0].length; i++){
                                for(var k = 0; k < cells.length; k++){
                                    cells[k][i].classList.remove("otherHover")
                                }
                            }
                            hiddenCells[j].style.opacity = "1";
                            hiddenCells[j].style.transform = "translate(0,0px)"
                            let row = findLowestAvailable(cells, j);
                            let lowest = cells[row][j];
                            lowest.classList.add("otherHover")
                        }
                    }
                }
            });
            tempArr.push(temp)
            gameBoard.appendChild(temp)
        }
        cells.push(tempArr);
    }
    console.table(cells);
    console.table(hiddenCells);
}

