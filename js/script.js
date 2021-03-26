window.addEventListener('DOMContentLoaded', function() {
   setInterval(counterSeconds, 1000);
   const MasterKey = [+1, +2, 0],
         StripTool = [-1, 0, +2],
         Hammer = [+2, -2, 0],
   
         invertMasterKey = [-1, -2, 0],
         invertStripTool = [+1, 0, -2],
         invertHammer = [-2, +2, 0];

   const wrap = document.querySelector('.wrapper'),
         buttons = wrap.querySelectorAll(".tools__button"),
         displays = wrap.querySelectorAll('.displays__display'),
         btnReset = wrap.querySelector('.tools__reset'),
         progressBars = wrap.querySelectorAll('.progress-bar'),
         buttonsArr = [MasterKey, StripTool, Hammer],
         inputs = document.querySelector('[data-input]');
         // tms = document.querySelector('.timer'),
         // counter = document.querySelector('.counter');
   
         
   let fDisplay = 5,
       sDisplay = 5,
       tDisplay = 5,
/////////////////////Выигрышная комбинация:
       op1Display = 5,
       op2Display = 5,
       op3Display = 5,
////////////////////////////////
       count = 0,
       seconds = 0,
       state = "";
   buttons.forEach((e, i) => {
      e.addEventListener('click', e => {

      let check1 = fDisplay + buttonsArr[i][0] <= 10 && fDisplay + buttonsArr[i][0] >= 0,
          check2 = sDisplay + buttonsArr[i][1] <= 10 && sDisplay + buttonsArr[i][1] >= 0,
          check3 = tDisplay + buttonsArr[i][2] <= 10 && tDisplay + buttonsArr[i][2] >= 0;
          
         if(check1 && check2 && check3)
         {
            UseTool(buttonsArr[i]);
            
            setNumberOnDisplay(displays);
            
            checkDisplays();
            count++;
            counter.innerHTML = `${count}`;

            console.log(count);
         }
      });
   });

   btnReset.addEventListener('click', () => {
     /////////////////////////////////////////
   //   counter.innerHTML = `0`;

     state = "LOOSE";
     AjaxCall();
      console.log(inputs.value);
   //////////////////////////////////////////
      count = 0;
      clearInterval(counterSeconds);
      seconds=0;

      ///////////////////////////////////////
      fDisplay = savedNumbers[0],
      sDisplay = savedNumbers[1],
      tDisplay = savedNumbers[2],
      displays.forEach((e,i) => {
         e.innerHTML = `${savedNumbers[i]}`;
      });
      progressBars.forEach((e,i) => {
         e.style.width = `${savedNumbers[i]}0%`;
      });
   });
   function UseTool ($tool)
   {
       fDisplay += $tool[0];
       sDisplay += $tool[1];
       tDisplay += $tool[2];
       
   }

   function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

   let newArray = [-1,-1,-1,-1,-1,-1];
   for (let i = 0; i < newArray.length; i++) {
      let rnd = getRandomInt(0,3);
      switch(rnd) 
      {
         case 0: ChechUse(invertMasterKey, i, rnd); console.log('0'); break; 
         case 1: ChechUse(invertStripTool, i, rnd); console.log('1');break;
         case 2: ChechUse(invertHammer, i, rnd);console.log('2');break;
         default: console.log('err');
      }
   }
   

function ChechUse(tool, index, random)
{
    let check1 = fDisplay + tool[0] <= 10 && fDisplay + tool[0] >= 0,
        check2 = sDisplay + tool[1] <= 10 && sDisplay + tool[1] >= 0,
        check3 = tDisplay + tool[2] <= 10 && tDisplay + tool[2] >= 0;
    if(check1 && check2 && check3)
    {
        UseTool(tool);
        setNumberOnDisplay(displays);
        changePB(check1, check2, check3);
        newArray[index] = random;
    } 
}

   //Прочее
   function setNumberOnDisplay(displays) {
      let displaysArr = [fDisplay, sDisplay, tDisplay];
     
      displays.forEach((e,i) => {
         e.innerHTML = `${displaysArr[i]}`;
      });
      progressBars.forEach((e,i) => {
         e.style.width = `${displaysArr[i]}0%`;
      });
   }

   function checkDisplays() {
      if (fDisplay == op1Display && sDisplay == op2Display && tDisplay == op3Display) {
         console.log(inputs.value);
/////////////////////////////////////////
state = "WIN";
AjaxCall();
//////////////////////////////////////////
         clearTimeout(counterSeconds);
         setTimeout(reloads, 1000);
         function reloads(){
            alert("Победа, поздравляю!");
            location.reload();
         }
         count = 0;
         seconds=0;
         setInterval(counterSeconds, 1000);
      }
   }
   let savedNumbers = saveValueOnDisplays();
   function saveValueOnDisplays() {
      let D1 = fDisplay,
          D2 = sDisplay,
          D3 = tDisplay,
          arr = [D1, D2, D3];
          console.log(arr);
         return arr;
   }

  function changePB (fDisplay, sDisplay, tDisplay) {
   let mas = [fDisplay, sDisplay, tDisplay];
   progressBars.forEach((e,i) => {
      e.style.width = `${mas[i]}0%`;
   });
  }
   
  function counterSeconds() {
   seconds++;
   console.log(seconds);
   tms.innerHTML = `${seconds}`;
 }
function AjaxCall() {
   $.ajax({
      type:  'POST',
      url:  'php/action.php',
      data: {
          'name': inputs.value,
          'count': count,
          'seconds': seconds,
          'state': state
      }
   });
}
});
