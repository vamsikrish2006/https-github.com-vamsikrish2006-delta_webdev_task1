
let rsc = 0;
let bsc = 0;
let rtime = 120;
let btime = 120;
let mtime = 30;
let rtimer = setInterval(rclock,1000);
let btimer = null;
let mtimer = setInterval(mclock,1000);


function toggle(){
    mtime = 30;
    if (turn === "red"){
        clearInterval(rtimer);
        rtimer = null;
        if (btimer === null){
            btimer = setInterval(bclock,1000);
        }
        finish();
    }
    if (turn === "blue"){
        clearInterval(btimer);
        btimer = null;
        if (rtimer===null){
            rtimer = setInterval(rclock,1000);
        }
        finish();   
    }
}
function mclock(){
    let mins = Math.floor(mtime/60);
    let secs = mtime % 60;
    document.getElementById("movet").textContent = `${mins}:${secs.toString().padStart(2,'0')}`;

    if(mtime===0){
        document.getElementById("movet").textContent = `0:00`;
        clearInterval(mtimer);
        mtimer=null;
        if(turn==="red"){
            window.alert("You took too long for a move.Blue wins!!");
        }
        else if(turn==="blue"){
            window.alert("You took too long for a move.Red wins!!");
        }
    }
    mtime-=1;
}

function rclock(){
    console.log("rclock tick");
    let mins = Math.floor(rtime/60);
    let secs = rtime % 60;
    document.getElementById("redt").textContent = `${mins}:${secs.toString().padStart(2,'0')}`;
    if (rtime===0||btime===0){
        clearInterval(rtimer);
        rtimer=null;
        console.log(rsc);
        console.log(bsc);
        if(rsc>bsc){
            window.alert("Red wins");
        }
        else if(bsc>rsc){
            window.alert("Blue wins");
        }
        else{
            window.alert("Draw");
        }
    }
    rtime-=1;
}

function bclock(){
    console.log("bclock tick");
    let mins = Math.floor(btime/60);
    let secs = btime % 60;
    document.getElementById("bluet").textContent = `${mins}:${secs.toString().padStart(2,'0')}`;
    if(rtime===0||btime===0){
        clearInterval(btimer);
        btimer=null;
        console.log(rsc);
        console.log(bsc);
        if(rsc>bsc){
            window.alert("Red wins");
        }
        else if (bsc>rsc){
            window.alert("Blue wins");
        }
        else{
            window.alert("Draw");
        }
    }
    btime-=1;
}


function pause(){
    if (!paused){
    clearInterval(mtimer);
    mtimer = null;
    if (turn === "red"){
        clearInterval(rtimer);
        rtimer = null;
    }
    if (turn === "blue"){
        clearInterval(btimer);
        btimer = null;
    }
    paused = true;
}
}
function resume(){
    if (paused){
    mtimer = setInterval(mclock,1000);

    if (turn === "blue"){
        if (btimer === null){
            btimer = setInterval(bclock,1000);
        }
    }
    if (turn === "red"){
        if (rtimer===null){
            rtimer = setInterval(rclock,1000);
        }
    }
    paused = false;
}
}

function reset(){
    location.reload();
}