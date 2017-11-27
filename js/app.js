var startDay;
var endDay;
var h0;
var m0;
var s0;
var h1;
var m1;
var s1;

var startExp;
var endExp;
var totalExp;
var finalExp = 0;
var fatigue = 0;
var firstTime = true;


function start() {
  document.getElementById('clockIn').innerHTML = '<button onclick="end()">end</button>';

  startDay = new Date(),
    h0 = startDay.getHours(),
    m0 = startDay.getMinutes(),
    s0 = startDay.getSeconds();
    document.getElementById('timeStart').innerHTML= h0+":"+m0+":"+s0;
  rested();
};

function end() {
  document.getElementById('clockIn').innerHTML = '<button onclick="start()">start</button>';
  endDay = new Date(),
    h1 = endDay.getHours(),
    m1 = endDay.getMinutes(),
    s1 = endDay.getSeconds();
    document.getElementById('timeEnd').innerHTML= h1+":"+m1+":"+s1;
    console.log("You just finished day: "+mon.workDay);

    result();
    SMstat();
    characterUpdate();
};

function rested() {
  if(firstTime===true){
    totalRest=0;
    console.log("You just started the game. This is day "+mon.workDay);
    firstTime=false;
    characterUpdate();
  } else {
    mon.workDay++;
    console.log("You just started day "+mon.workDay);
    startExp = m0*60+s0;
    endExp = m1*60+s1;
    totalRest = startExp-endExp;
    // console.log("rest started: "+endExp);
    // console.log("rest ended: "+startExp);
    mon.monRest = totalRest*mon.monRestM;
    mon.monFatigue = mon.monFatigue-mon.monRest;
    if (mon.monFatigue < 0){
      mon.monFatigue = 0;
    }
    console.log("rested for: "+totalRest+" minutes.");
    console.log("fatigue currently at: "+mon.monFatigue);
    characterUpdate();
  }
}

function result() {
  startExp = m0*60+s0;
  endExp = m1*60+s1;
  totalExp = endExp-startExp;
  // console.log("work started: "+startExp);
  // console.log("work ended: "+endExp);
  document.getElementById('timeDifference').innerHTML= totalExp;
  console.log('minutes worked today: '+totalExp);
}

function SMstat() {
  mon.totalMin = mon.totalMin+totalExp;
  finalExp = (totalExp*mon.monExpM)-mon.monFatigue;
  fatigue = totalExp*mon.monFatigueM;
  mon.monFatigue = mon.monFatigue+fatigue;
  mon.monExperience = mon.monExperience+finalExp;
  document.getElementById('dayEnd').innerHTML = 'Experience Gained on day '+ mon.workDay+': '+finalExp;
  console.log('experience gained today: '+finalExp);
  console.log('fatigue gained today: '+fatigue);
  console.log("fatigue currently at: "+mon.monFatigue);
}

function fatigueCheck(){
  if (mon.monFatigue >= 30){
    fatigueState = "You're gonna Die";
  } else if (mon.monFatigue >= 20) {
    fatigueState = "You're very tired";
  } else if (mon.monFatigue >= 10){
    fatigueState = "Kinda tired";
  } else if (mon.monFatigue > 0){
    fatigueState = "Looking Good";
  } else {
    fatigueState = "Well Rested";
  };
}

function characterUpdate() {
  console.log('salarymon total work time: '+mon.totalMin+ ' minutes.');
  console.log("salarymon experience total: "+mon.monExperience);
  fatigueCheck();
  document.getElementById('stat').innerHTML =
    'This is Day '+mon.workDay+
    '<br>Total salarymon experience: '+mon.monExperience+
    '<br>Your Fatigue level is: '+fatigueState;

}
/* 
11/26/2017
Things to consider:
Salarymon classes
skills for each classes

Level ups!


*/