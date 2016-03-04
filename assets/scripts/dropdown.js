

(function(){

  window.DropDown = function(languages){
    
    var searchBar = document.querySelector('#search');
    var languageList = document.getElementById("languageList");
    var active = {
      index: -1, 
      lang: void 0
    };


    var helper = {
      dispatchDirection: function(direction, active, visibleLanguages){
        if(direction === 'UP'){
          active.lang = visibleLanguages[active.index+=1];
          active.lang.setAttribute('class','VISIBLE active');
          active.lang.style.background = 'blue';
        } else if(direction === 'DOWN') {
          active.lang = visibleLanguages[active.index-=1];
          active.lang.setAttribute('class','VISIBLE active');
          active.lang.style.background = 'blue';
        }
        
      }
    }

    languages.forEach(function(language){
      var tag = document.createElement("LI");
      tag.setAttribute('class', 'VISIBLE');
      tag.appendChild(document.createTextNode(language));
      languageList.appendChild(tag);
    });



    // Split out to helper functions if time
    searchBar.addEventListener("keyup", function(event){

      var keyNumber = event.keyCode;
      var keyValue = event.target.value.toUpperCase();
      var visibleLanguages = Array.prototype.slice.call(document.querySelectorAll('.VISIBLE'));
      var languageNodes = Array.prototype.slice.call(document.getElementsByTagName("li"));

      if(keyNumber === 40){
        
        if(visibleLanguages.length-1 === active.index){
          return
        } else if(active.index !== -1){
          active.lang.setAttribute('class', 'VISIBLE');
          active.lang.style.background = 'none';
        } 
        helper.dispatchDirection('UP', active, visibleLanguages )

      } else if (keyNumber === 38){
       
        if(active.index === 0){
          return
        } else if(active.index !== -1){
          active.lang.setAttribute('class', 'VISIBLE');
          active.lang.style.background = 'none';
        } 

        helper.dispatchDirection('DOWN', active, visibleLanguages )

      } else if (keyNumber === 13) {
        var activeLanguage = document.querySelector('.active');
        searchBar.value = activeLanguage.innerHTML; 
        
        languageNodes.forEach(function(languageTag){
          languageTag.setAttribute('class', 'HIDDEN');
          languageTag.style.display = 'none';
        });


      } else {
        languageNodes.forEach(function(languageTag){
          var languageText = languageTag.innerHTML.toUpperCase();
          
          if(languageText.indexOf(keyValue) === -1){
            languageTag.setAttribute('class', 'HIDDEN');
            languageTag.style.display = 'none';
          } else if(languageText.indexOf(keyValue) !== -1 && languageTag.style.display === 'none'){
            languageTag.setAttribute('class', 'VISIBLE');
            languageTag.style.display = 'block';
          }

        });  
      }

    })

    languageList.addEventListener('click', function(event){
      if(event.target.tagName === "LI"){
        searchBar.value = event.target.innerText;
      } 
    });
  }
  
}.call(this));


