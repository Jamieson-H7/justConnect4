window.onload = main;
var gameBoard;
var aboveGameBoard;
var cells = [];
var hiddenCells = [];

document.addEventListener("click", (e)=>{
    for(var arr of cells){
        for(var j = 0; j < arr.length; j++){
            let item = arr[j];
            if(item.isEqualNode(e.target)){
                // item.innerText = j;
                findLowestAvailable(cells, j).classList.add("taken")
            }
        }
    }
})

function findLowestAvailable(array2d, col){
    for(var i = array2d.length-1; i >= 0; i--){
        if(!(array2d[i][col].classList.contains("taken"))){
            return array2d[i][col];
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
                            findLowestAvailable(cells, j).classList.add("otherHover")
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

