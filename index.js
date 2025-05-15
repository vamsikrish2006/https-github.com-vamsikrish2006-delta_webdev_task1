let circles = 18;
let reds = 7;
let blues = 7;
let turn = "red";
let occupied = Array(circles).fill(false);
let active = null;
let adjacency = [...Array(circles)].map(() => Array(circles).fill(0));
let outer=0;
let middle=0;
let inner=0;
let paused = false;
let middleunlocked = false;
let innerunlocked = false;


function loop(a){
    let result = [];
    for (i=0;i<a.length-1;i+=1){
        result.push([a[i],a[i+1]])
    }
    result.push([a[a.length-1],a[0]])
    return result;         
    }
let adjacentpairs = [
    [1,7],[2,8],[5,11],[6,12],[9,15],[10,16]
    ];
adjacentpairs = adjacentpairs.concat(loop([0,1,3,5,4,2]));
adjacentpairs = adjacentpairs.concat(loop([6,7,9,11,10,8]));
adjacentpairs = adjacentpairs.concat(loop([12,13,15,17,16,14]));
console.log(adjacentpairs);

adjacentpairs.map(AddAdj);

function AddAdj(arr){
    let [a,b] = arr;
    adjacency[a][b]=1;
    adjacency[b][a]=1;
     }
document.getElementById("rscore").textContent = 0;
document.getElementById("bscore").textContent = 0;
document.getElementById("player").textContent = turn.charAt(0).toUpperCase() + turn.slice(1);
document.getElementById("player").style.color = turn;

function place(num){
    if (turn==="red"&&!occupied[num]&&reds!==0){
        document.getElementById(`circle${String(num)}`).style.backgroundColor = "red";
        toggle();
        turn = "blue";
        occupied[num] = true;
        reds-=1;
      }
    else if (turn==="blue"&&!occupied[num]&&blues!==0){
        document.getElementById(`circle${String(num)}`).style.backgroundColor = "blue";
        toggle();
        turn = "red";
        occupied[num] = true;
        blues-=1;
    }
    }

function activate(num){
    active = num;
    console.log("active",active);
    document.getElementById(`circle${String(num)}`).style.opacity = 0.7;
    }
function deactivate(num){
    active = null;
    document.getElementById(`circle${String(num)}`).style.opacity = 1;
    }

function getLayer(num) {
    if (num < 6) return "outer";
    if (num < 12) return "middle";
    return "inner";
    }


function placementstage(callback,num){
if (!paused){
if (!middleunlocked){
if(num<6){
place(num);
outer += 1;
document.getElementById("player").textContent = turn.charAt(0).toUpperCase() + turn.slice(1);
document.getElementById("player").style.color = turn;
if (outer===6){middleunlocked=true;}
}
}
else if (middleunlocked ){
if (reds!==0 || blues!==0){
if(num<12){
place(num);
middle += 1;
document.getElementById("player").textContent = turn.charAt(0).toUpperCase() + turn.slice(1);
document.getElementById("player").style.color = turn;
}
}
else if (reds===0 && blues ===0){
callback(move,num);
}
}
setTimeout(()=>{
if (inner===6){
finish();
if(rsc>bsc){
window.alert("Red wins");
}
else if (bsc>rsc){
window.alert("Blue wins");
}
else{
window.alert("Draw");
}
reset()
}
});
}
    console.log(outer);
    console.log(middle);
    console.log(inner);
 }

function movementstage(callback,num){
if (!paused){
if (reds!==0||blues!==0){
place(num);
middle += 1;  
}
if (reds===0 && blues ===0){
if(active===null && occupied[num]){
let color = document.getElementById(`circle${num}`).style.backgroundColor;
if ((turn === "red" && color === "red") || (turn === "blue" && color === "blue")) {activate(num);}
 }
 else if (active!== null && num===active){
 deactivate(num);
}
else if (active!==null && !occupied[num]){
callback(active,num);
}
}
}
document.getElementById("player").textContent = turn.charAt(0).toUpperCase() + turn.slice(1);
document.getElementById("player").style.color = turn;
}

function move(num1,num2){

if (adjacency[num1][num2] === 1 && num1 === active && !occupied[num2]){
let fromLayer = getLayer(num1);
let toLayer = getLayer(num2);  
if (toLayer!=="inner"||(toLayer==="inner"&&innerunlocked)){
if (fromLayer === "outer") outer -= 1;
if (fromLayer === "middle") middle -= 1;
if (fromLayer === "inner") inner -= 1;

if (toLayer === "outer") outer += 1;
if (toLayer === "middle") middle += 1;
if (toLayer === "inner") inner += 1;
    
if (middle === 6){innerunlocked = true;}
}
}
    
if (!paused){
if ( ((!innerunlocked) && (num2<12))|| innerunlocked){
if (turn === "blue" && adjacency[num1][num2]===1){
document.getElementById(`circle${String(num1)}`).style.backgroundColor = "";
document.getElementById(`circle${String(num2)}`).style.backgroundColor = "blue";
toggle();
turn = "red";
occupied[num1] = false;
occupied[num2] = true;
}
else if (turn === "red" && adjacency[num1][num2] ===1){
document.getElementById(`circle${String(num1)}`).style.backgroundColor = "";
document.getElementById(`circle${String(num2)}`).style.backgroundColor = "red";
toggle();
turn = "blue";
occupied[num1] = false;
occupied[num2] = true;
}
deactivate(num1);
}
}
}

let edgewts = [
    [0,1,1],[1,3,2],[3,5,1],[5,4,1],[4,2,3],[2,0,2],
    [6,7,6],[7,9,4],[9,11,5],[11,10,6],[10,8,4],[8,6,5],
    [12,13,8],[13,15,9],[15,17,8],[17,16,8],[16,14,9],[14,12,8],
    [1,7,1],[2,8,1],[5,11,1],[6,12,1],[9,15,1],[10,16,1]
];
edgewts = edgewts.concat(edgewts.map(([a,b,c])=>[b,a,c]));

console.log(edgewts);
function finish(){
    rsc = 0;
    bsc = 0;
    let occupiedby = [];
    occupiedby = Array.from({length: circles},(item,index)=>document.getElementById(`circle${String(index)}`).style.backgroundColor);
    let bgred = [];
    let bgblue = [];
    occupiedby.forEach((color, index) => {
    if (color === "red") bgred.push(index);
    if (color === "blue") bgblue.push(index);
    }); 
    edgewts.forEach(([a,b,c])=>
        bgred.includes(a) && bgred.includes(b) ? rsc += c/2 : null
    );
    edgewts.forEach(([a,b,c])=>
        bgblue.includes(a) && bgblue.includes(b) ? bsc += c/2 : null
    );
    document.getElementById("rscore").textContent = `${rsc}`;
    document.getElementById("bscore").textContent = `${bsc}`;
    }
