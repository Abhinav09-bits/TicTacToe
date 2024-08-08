let boxes = document.querySelectorAll(".box");
let resBtn = document.querySelector("#R");
let newGamebttn = document.querySelector("#new");

let turnO = true;
let count = O;

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8],
    [2, 4, 6], [3, 4, 5], [6, 7, 8],
];

const resetGame= () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
  };

boxes.forEach((box) => {

    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO){
            box.innerText= "O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
       box.disabled = true;
       count++;
       if (count===9 && !isWinner){
        gameDraw();
       }

       let isWinner = checkWiner();
       

       checkWiner = () =>{
        for(patterm of winPatterns){
            let pos1val = boxes [pattern[0]].innerText;
            let pos2val = boxes [pattern[0]].innerText;
            let pos3val = boxes [pattern[0]].innerText;

            if(pos1val !="" && pos2val !="" && pos3val!=""){
                if(pos1val===pos2val===pos3val)
                {
                    console.log("Winner");
                }
            }
        }
       }
    });
});




