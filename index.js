let movieArray = [];
let selectedGenre = "not selected";

// define a constructor to create player objects
var MovieObject = function (pTitle, pYear, pGenre, pMan, pWoman) {
  this.Title = pTitle;
  this.Year = pYear;
  this.ID = movieArray.length + 1;
  this.Genre = pGenre;  // action  comedy  drama  horrow scifi  musical  western
  this.Man = pMan;
  this.Woman = pWoman;
}

movieArray.push(new MovieObject("Moonstruck", 1981, "Drama", "Nicholas Cage", "Cher"));
movieArray.push(new MovieObject("Wild At Heart", 1982, "Drama", "Nicholas Cage", "Laura VanDern"));
movieArray.push(new MovieObject("Raising Arizona", 1983, "Comedy", "Nicholas Cage", "Holly Hunter"));

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("buttonAdd").addEventListener("click", function () {
    movieArray.push(new MovieObject(document.getElementById("title").value, document.getElementById("year").value,
      selectedGenre, document.getElementById("man").value, document.getElementById("woman").value));
});

  $(document).bind("change", "#select-genre", function (event, ui) {
    selectedGenre = $('#select-genre').val();
  });

  document.getElementById("buttonSortTitle").addEventListener("click", function () {
    movieArray.sort(dynamicSort("Title"));
    createList();
    document.location.href = "index.html#ListAll";
  });

  document.getElementById("buttonSortGenre").addEventListener("click", function () {
    movieArray.sort(dynamicSort("Genre"));
    createList();
    document.location.href = "index.html#ListAll";
  });

$(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
 // document.getElementById("IDparmHere").innerHTML = "";
  createList();
});
  
  document.getElementById("buttonClear").addEventListener("click", function () {
    document.getElementById("title").value = "";
    document.getElementById("year").value = "";
    document.getElementById("man").value = "";
    document.getElementById("woman").value = "";
  });
  
$(document).on("pagebeforeshow", "#Load", function (event) {   // have to use jQuery 
  document.getElementById("title").value = "";
  document.getElementById("year").value = "";
  document.getElementById("man").value = "";
  document.getElementById("woman").value = "";
  });

$(document).on("pagebeforeshow", "#page3", function (event) {   // have to use jQuery 
  let localID =  document.getElementById("IDparmHere").innerHTML;
  document.getElementById("oneTitle").innerHTML = "The title is: " + movieArray[localID-1].Title;
  document.getElementById("oneYear").innerHTML = "Year released " + movieArray[localID - 1].Year;
  document.getElementById("oneGenre").innerHTML = "Genre " + movieArray[localID - 1].Genre;
  document.getElementById("oneWoman").innerHTML = "Leading Woman " + movieArray[localID - 1].Woman;
  document.getElementById("oneMan").innerHTML = "Leading Man " + movieArray[localID - 1].Man;
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
  console.log(movieArray);
  movieArray.forEach(function (element,) {   // use handy array forEach method
    var li = document.createElement('li');
    li.innerHTML = "<a data-transition='pop' class='oneMovie' data-parm=" + element.ID + "  href='#page3'>Get Details </a> " + element.ID + ":  " + element.Title + "  " + element.Genre;
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