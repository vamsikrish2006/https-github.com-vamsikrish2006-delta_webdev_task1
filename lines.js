let weird = [
    [1,7],[2,8],[5,11],
    [6,12],[9,15],[10,16]
]
let i=0;
let j=1;

function rect(x){
    const circle = document.getElementById(`circle${x}`);
    const rect = circle.getBoundingClientRect();
    const containerRect = document.getElementById("container").getBoundingClientRect();

    const centerX = rect.left - containerRect.left + rect.width / 2;
    const centerY = rect.top - containerRect.top + rect.height / 2;
    return [centerX, centerY]; 
} 

function recty(x,uhm){
    const circle = document.getElementById(`circle${x}`);
    const rect = circle.getBoundingClientRect();
    const containerRect = document.getElementById(`box${uhm}`).getBoundingClientRect();

    const centerX = rect.left - containerRect.left + rect.width / 2;
    const centerY = rect.top - containerRect.top + rect.height / 2;
    return [centerX, centerY]; 
}

function line(p1,p2,uhm){
    const x1 = recty(p1,uhm)[0];
    const x2 = recty(p2,uhm)[0];
    const y1 = recty(p1,uhm)[1];
    const y2 = recty(p2,uhm)[1];

    const length = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
    
    const anglerad = Math.atan2(y2-y1,x2-x1);
    const angle = anglerad*(180/Math.PI);

    const box = document.getElementById(`box${uhm}`);
    if (!box) {
        console.warn(`Element with ID 'box${uhm}' not found.`);
        return; // Exit the function early
    }
    else{
        console.log("Hi");
    }
    box.insertAdjacentHTML(`afterbegin`, `<div id="line${i}" style="position: absolute; height: 0.7vh; background: black; transform-origin: 0 0; z-index:2;"></div>`);
    let line = document.getElementById(`line${i}`);
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    i+=1;
}

line(1,7,2);
line(2,8,2);
line(5,11,2);
line(6,12,4);
line(9,15,4);
line(10,16,4);

function smth(j){
    let ele = document.getElementById(`numb${j}`);
    if (j<=18||(j>24&&j<=42)){
        if(j%6===1){
            ele.style.transform = "translate(0,2.3vh)";
        }
        else if(j%6===2){
            ele.style.transform = "translate(-1vw,2.3vh)";
        }
        else if(j%6===3){
            ele.style.transform = "translate(-1vw,-2.3vh)";
        }
        else if(j%6===4){
            ele.style.transform = "translate(0,-2.3vh)";
        }
        else if(j%6===5){
            ele.style.transform = "translate(1vw,-2.3vh)";
        }
        else if(j%6===0){
            ele.style.transform = "translate(1vw,2.3vh)";
        }
    }
    else{
        if(j%6===1){
            ele.style.transform = "translate(0.7vw,0.7vh)";
        }
        else if(j%6===2){
            ele.style.transform = "translate(0,-2vh)";
        }
        else if(j%6===3){
            ele.style.transform = "translate(-1.5vw,1vh)";
        }
        else if(j%6===4){
            ele.style.transform = "translate(0.7vw,-0.7vh)";
        }
        else if(j%6===5){
            ele.style.transform = "translate(0,2vh)";
        }
        else if (j%6===0){
            ele.style.transform = "translate(-1.5vw,-1vh)";
        }
    }
}


function numb(p1,p2,wt){
    const containerRect = document.getElementById("container").getBoundingClientRect();
    const xc = containerRect.left + rect.width/2;
    const yc = containerRect.top + rect.height/2;

    const x1 = rect(p1)[0];
    const x2 = rect(p2)[0];
    const y1 = rect(p1)[1];
    const y2 = rect(p2)[1];
    
    const centerX = (x1+x2)/2;
    const centerY = (y1+y2)/2;

    const container = document.getElementById("container");
    if (!container) {
        console.error("Cannot find container");
        return;
    }
    container.insertAdjacentHTML(`afterbegin`,`<p id="numb${j}" style="position: absolute; color: red; height:5vh; 1px solid rgba(0, 0, 0, 0.2); text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4); transform-origin:0 0; z-index:20;">${wt}</p>`);
    let ele = document.getElementById(`numb${j}`);
    let eleRect = ele.getBoundingClientRect();

    const elex = eleRect.left;
    const eley = eleRect.top;

    const deltax = (xc - elex);
    const deltay = (yc - eley);



    ele.style.left = `${centerX - eleRect.width/2}px`;
    ele.style.top = `${centerY - eleRect.height/2}px`;
    smth(j);
    ele.style.margin = 0;   
    ele.style.fontSize = "2em";
    j+=1;
}

edgewts.forEach(triad => numb(triad[0],triad[1],triad[2]));
    
window.addEventListener('resize', () => {

    document.querySelectorAll('[id^=line]').forEach(el => el.remove());
    i = 0;
    line(1,7,2);
    line(2,8,2);
    line(5,11,2);
    line(6,12,4);
    line(9,15,4);
    line(10,16,4);

    
    document.querySelectorAll('[id^=numb]').forEach(el => el.remove());
    j = 1;
    edgewts.forEach(([p1, p2, wt]) => numb(p1, p2, wt));
});