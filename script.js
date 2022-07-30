let block = document.getElementById('block');
let hole = document.getElementById('hole');
let character = document.getElementById('character');
let jumping = 0;
let score = 0;
let scoreSFX = new Audio('Everything/sfx_point.wav');
let charDie = new Audio('Everything/sfx_die.wav');
let charWing = new Audio('Everything/sfx_wing.wav');
let charHit = new Audio('Everything/sfx_hit.wav');

hole.addEventListener('animationiteration' , ()=>{
    let random = -(Math.random()*300+150);
    hole.style.top = random + "px";
    score++;
});


setInterval(() => {
    let charPostion = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping == 0){
        character.style.top = (charPostion + 1.5) + "px";
    }

    // let blockPos = parseInt(window.getComputedStyle(block).getPropertyValue("left")); 
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if( blockLeft < 110){
        scoreSFX.play();
        document.getElementById('score').innerHTML = score;
    }

    let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    let charTop = -(500-charPostion);
    if(charPostion > 500 ){
        charDie.play();
        alert("game over , score : " + (score-1));
        character.style.top = 100 + "px";
        score = 0;
        block.style.left = 950 + "px";
    }

    if ( (blockLeft < 110) && (blockLeft > 50) &&(charTop < holeTop || charTop > (holeTop+150))) {
        charHit.play();
        character.style.top = (500) + "px";
        alert("game over , score : " + (score));
        character.style.top = 100 + "px";
        score = 0;
        block.style.left = 950 + "px";
    }

}, 5);

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
       jump(); 
    }
  })

function jump() {
    jumping = 1;
    let jumpcount = 0;
    let jumpInterval = setInterval(() => { 
        let charPostion = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if(charPostion > 22 && (jumpcount < 10)){
            character.style.top = (charPostion - 6) + "px";
        }
        if(jumpcount > 20){
            jumping = 0;
            jumpcount = 0;
            clearInterval(jumpInterval);
        }
        jumpcount++;
        charWing.play();
    }, 5);

}