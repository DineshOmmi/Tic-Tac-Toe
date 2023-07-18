const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#Statustext');
const btn = document.querySelector('#restartbtn');
const wincondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;


initializeGame()
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    btn.addEventListener("click",restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellindex = this.getAttribute("cellIndex");
    if(options[cellindex] != "" || !running){
        return;
    }
    updatecell(this,cellindex);
    checkWinner();
}

function updatecell(cell,index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == 'X') ? "O" : "X" ;
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundwin = false;

    for(let i = 0;i<wincondition.length;i++){
        const condition = wincondition[i];
        const cellA= options[condition[0]];
        const cellB= options[condition[1]];
        const cellC= options[condition[2]];  
        if(cellA == "" || cellB == "" || cellC==""){
            continue;
        }
        if(cellA==cellB && cellB == cellC){
            roundwin = true;
            break;
        }
    }
    if(roundwin){
        statusText.textContent = `${currentPlayer}' Wins!`;
        running = false;
    }    
    else if(!options.includes("")){
        statusText.textContent = `Draw!`
        running = false;
    }
    else{
        changePlayer(); 
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent="");
    running = true;
    
}