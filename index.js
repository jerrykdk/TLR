let shiftArray = [];
let selectedType = "not selected";
  

function showDiv() {
    document.getElementById('hello').style.display = "block";
 
  }
  
  function showValue() {
    var name = document.getElementById('name').value;
    document.getElementById('ans').innerHTML = "Welcome back, " + name + "!";
    document.getElementById('hello').style.display = "none";
  }

  function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

// //today's date
// var curday = function(sp){
//   today = new Date();
//   var dd = today.getDate();
//   var mm = today.getMonth()+1; //As January is 0.
//   var yyyy = today.getFullYear();
  
//   if(dd<10) dd='0'+dd;
//   if(mm<10) mm='0'+mm;
//   return (mm+sp+dd+sp+yyyy);
//   };
//   console.log(curday('/'));
//   document.getElementById("demo").innerHTML = curday;



// define a constructor to create player objects
var shiftObject = function (pDay, pYear, pType, pMonth, pHours) {
  this.Day = pDay;
  this.Year = pYear;
  this.ID = shiftArray.length + 1;
  this.Type = pType;  // action  comedy  drama  horrow scifi  musical  western
  this.Month = pMonth;
  this.Hours = pHours;
}

shiftArray.push(new shiftObject("24", 2020, "DoubleShift", "04", "5.5"));
shiftArray.push(new shiftObject("22", 2020, "BasicShift", "04", "4.5"));
shiftArray.push(new shiftObject("23", 2020, "DoubleShift", "04", "2.5"));


document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("buttonAdd").addEventListener("click", function () {
    shiftArray.push(new shiftObject(document.getElementById("day").value, document.getElementById("year").value,
      selectedType, document.getElementById("month").value, document.getElementById("hours").value));
});

  $(document).bind("change", "#select-type", function (event, ui) {
    selectedType = $('#select-type').val();
  });

  document.getElementById("buttonSortHours").addEventListener("click", function () {
    shiftArray.sort(dynamicSort("Hours"));
    createList();
    document.location.href = "index.html#ListAll";
  });

  document.getElementById("buttonSortType").addEventListener("click", function () {
    shiftArray.sort(dynamicSort("Type"));
    createList();
    document.location.href = "index.html#ListAll";
  });


$(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
 // document.getElementById("IDparmHere").innerHTML = "";
  createList();
});
  
  document.getElementById("buttonClear").addEventListener("click", function () {
    document.getElementById("day").value = "";
    document.getElementById("year").value = "";
    document.getElementById("month").value = "";
    document.getElementById("hours").value = "";
  });
  
$(document).on("pagebeforeshow", "#Load", function (event) {   // have to use jQuery 
  document.getElementById("day").value = "";
  document.getElementById("year").value = "";
  document.getElementById("month").value = "";
  document.getElementById("hours").value = "";
  });

$(document).on("pagebeforeshow", "#page3", function (event) {   // have to use jQuery 
  let localID =  document.getElementById("IDparmHere").innerHTML;
  document.getElementById("oneDay").innerHTML = "Day " + shiftArray[localID-1].Day;
  document.getElementById("oneYear").innerHTML = "Year " + shiftArray[localID - 1].Year;
  document.getElementById("oneType").innerHTML = "Shift Type " + shiftArray[localID - 1].Type;
  document.getElementById("oneHours").innerHTML = "Hours Total " + shiftArray[localID - 1].Hours;
  document.getElementById("oneMonth").innerHTML = "Month " + shiftArray[localID - 1].Month;
 });

});

function createList()
{
  // clear prior data
  var divUserlist = document.getElementById("divMovieList");
  while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
  divMovieList.removeChild(divMovieList.firstChild);
  };

  var ul = document.createElement('ul');  
  console.log(shiftArray);
  shiftArray.forEach(function (element,) {   // use handy array forEach method
    var li = document.createElement('li');
    li.innerHTML = "<a data-transition='pop' class='oneMovie' data-parm=" + element.ID + "  href='#page3' >Details  </a> " + element.ID + ":  " + element.Month + "/" + element.Day + " | " + element.Type + "  " + element.Hours + "hrs";
    ul.appendChild(li);
  });
  divMovieList.appendChild(ul)

    //set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
    var classname = document.getElementsByClassName("oneMovie");
    Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            //do something here with parameter on  pickbet page
            document.getElementById("IDparmHere").innerHTML = parm;
            document.location.href = "index.html#page3";
        });
    });
   
};
  


/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  }
}