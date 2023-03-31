var showtime = document.getElementById("showtime");

showtime.innerText = " 20 "+":"+" 00 ";

var sessiondec = document.getElementById("sessiondec");
var sessioninc = document.getElementById("sessioninc");

var sessionP = document.getElementById("sessionP");
var breakP = document.getElementById("breakP");

var breakHeading = document.getElementById("breakHeading");
var sessionHeading = document.getElementById("sessionHeading");

var i=20;
var x = 0;

var idStart;
var idBreak;

sessiondec.addEventListener("click" ,function(){
    if(i>1)
    {x = i-1;
        i--;
    sessionP.innerText = x + " min";
    if(x<10){
        x="0"+x;
    }
    showtime.innerText = x+" : "+"00";}

});
sessioninc.addEventListener("click" ,function(){
    x = i+1;
    i++;
    sessionP.innerText = x + " min";
    if(x<10){
        x="0"+x;
    }
    showtime.innerText = x+" : "+"00";


});

var breakdec = document.getElementById("breakdec");
var breakinc = document.getElementById("breakinc");

var j=5;
var y = 0;

breakdec.addEventListener("click" ,function(){
    if(j>1){
    y = j-1;
    j--;
    breakP.innerText = y + " min";}
});

breakinc.addEventListener("click" ,function(){
    y = j+1;
    j++;
    breakP.innerText = y + " min";
});

var sessionpausetime;
var breakpausetime;

var start = document.getElementById("start");
var pause = document.getElementById("pause");
var reset = document.getElementById("reset");

reset.addEventListener("click",function(){
    // location.reload();

    count = 0;
    i=20;
    x = 0;
    j=5;
    y=0;

    clearInterval(idStart);
    clearInterval(idBreak);
    clearInterval(idRestart);

    showtime.innerText = " 20 "+":"+" 00 ";

    pause.classList.add("class" ,"hidden");
    start.classList.remove("class", "hidden");
    sessionHeading.classList.add("class" ,"hidden");
    breakHeading.classList.add("class" ,"hidden");
    restart.classList.add("class", "hidden");

    
    sessiondec.disabled = false;
    sessioninc.disabled = false;
    breakdec.disabled = false;
    breakinc.disabled = false;

    sessionP.innerText = 20 + " min";
    breakP.innerText = 5 + " min";

    sessionpausetime = 0;
    breakpausetime = 0;



});

var count = 0;

start.addEventListener("click",startfunction);

function startfunction(){
    count++;
    // console.log(count);

    sessionHeading.innerText = "Session "+count;

    // if(pCount > 0){
    //     seconds = sessionpausetime;
    // }
    // else{
    if(x==0){
        seconds = 20*60;
    }
    else{
        seconds = x*60;
    }
    // }
    
    var id = setInterval(function(){
        var mm,ss;
        mm = parseInt(seconds/60);
        ss = seconds%60;

        if( mm < 10){
            mm = "0"+mm;
        }

        if( ss < 10){
            ss = "0"+ss;
        }

        showtime.innerText =  mm +" : "+ ss ;
        sessionpausetime = seconds;
        seconds--;

        if(seconds == -1){
            clearInterval(id);
            breakStart();
        }
        
        start.classList.add("class", "hidden");
        sessionHeading.classList.remove("class" ,"hidden");
        breakHeading.classList.add("class" ,"hidden");
        pause.classList.remove("class" ,"hidden");


        sessiondec.disabled = true;
        sessioninc.disabled = true;
        breakdec.disabled = true;
        breakinc.disabled = true;

        
       
    },1000)

idStart = id;

}


function breakStart(){
    if(y==0){
        sec = 5*60;
    }
    else{
        sec = y*60;
    }
    var breakid = setInterval(function(){
        var mm,ss;
        mm = parseInt(sec/60);
        ss = sec%60;

        if( mm < 10){
            mm = "0"+mm;
        }
        if( ss < 10){
            ss = "0"+ss;
        }
        showtime.innerText =  mm +" : "+ ss ;
        breakpausetime = sec;
        sec--;

        sessionHeading.classList.add("class" ,"hidden");
        breakHeading.classList.remove("class" ,"hidden");
        
        if( sec == -1){
            clearInterval(idBreak);

            // console.log("Hooda")

            startfunction(); 
        }
    },1000)
    idBreak = breakid;
}

var pCount = 0;
pause.addEventListener("click" ,pauseFunction);
function pauseFunction(){
    count--;
    pCount++;

    clearInterval(idStart);
    clearInterval(idBreak);
    clearInterval(idRestart);


    pause.classList.add("class" ,"hidden");
    restart.classList.remove("class" ,"hidden");

}

var idRestart;
var restart = document.getElementById("restart");

restart.addEventListener("click" ,restartFunction);

var pauseHeading;
 function restartFunction(){
    
    let text = sessionHeading.getAttribute("class");
    // if(text != "hidden"){
    //     pauseHeading = sessionHeading.innerText;
    //     console.log(pauseHeading);
    // }
    // else {
    //     pauseHeading = breakHeading.innerText;
    // }
    
    // secn = ?

    if( sessionpausetime > 0){
        secn = sessionpausetime;
    }
    else {
        secn = breakpausetime;
    }
    idRestart = setInterval(function(){
        var mm,ss;
        mm = parseInt(secn/60);
        ss = secn%60;

        if( mm < 10){
            mm = "0"+mm;
        }
        if( ss < 10){
            ss = "0"+ss;
        }
        showtime.innerText =  mm +" : "+ ss ;
        
        secn--;
        sessionpausetime = secn;
        if(secn == -1){
            clearInterval(idRestart);
            if(pauseHeading != "Break!"){
                count++;
                breakStart();
            }
        }



   }, 1000);

   restart.classList.add("class" ,"hidden");
   pause.classList.remove("class" ,"hidden");

}
