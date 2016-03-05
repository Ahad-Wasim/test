class DropDown {
  constructor(collection, parentNode){
    this.tagCollection = collection;
    this.searchBar = document.createElement("INPUT");
    this.container = parentNode;
    this.active = { index:-1, currentTag: void 0 };
  }

  createDropDown(){
    this.container.appendChild(this.searchBar);

    this.tagCollection.forEach((data) => {
      let tag = document.createElement("P");
      tag.setAttribute('class', 'VISIBLE');
      tag.appendChild(document.createTextNode(data));
      this.container.appendChild(tag)
    });

    this.keyDownListener()
    this.clickListener() 
  }

  toggleOff(){
    if(this.active.index === -1) return ;
    this.active.currentTag.setAttribute('class', 'VISIBLE');
    this.active.currentTag.style.background = 'none'; 
  }

  dispatchDirection(d=false, visibleTags){
    if(d === 'DOWN'){
      this.active.currentTag = visibleTags[this.active.index+=1];  
    } else {
      this.active.currentTag = visibleTags[this.active.index-=1]; 
    }
    this.active.currentTag.setAttribute('class', 'VISIBLE active');
    this.active.currentTag.style.background = 'blue';
  }

  enter({ allParagraphTags, keyValue }){
    var activeLanguage = document.querySelector('.active');
    this.searchBar.value = activeLanguage.innerHTML; 
        
    allParagraphTags.forEach(function(soloTag){
      soloTag.setAttribute('class', 'HIDDEN');
      soloTag.style.display = 'none';
    });
  }

  upArrow(constants){
    let {visibleTags} = constants;
    if(this.active.index !== 0 && this.active.index !== -1 ){
      if(this.active.index !== -1){
        this.toggleOff();
      }
      this.dispatchDirection(void 0, visibleTags);
    }
  }

  downArrow(constants){
    let {visibleTags} = constants;
    if(this.active.index !== visibleTags.length-1){
      if(this.active.index !== -1){
        this.toggleOff();
      }
      this.dispatchDirection('DOWN',visibleTags);
    }
  }

  filterTags({ allParagraphTags, keyValue }){

    allParagraphTags.forEach(function(soloTag){
      var text = soloTag.innerHTML.toUpperCase();
      
      if(text.indexOf(keyValue) === -1){
        soloTag.setAttribute('class', 'HIDDEN');
        soloTag.style.display = 'none';
      } else if(text.indexOf(keyValue) !== -1 && soloTag.style.display === 'none'){
        soloTag.setAttribute('class', 'VISIBLE');
        soloTag.style.display = 'block';
      }

    })
  }

  keyReducer(constants) {

    let {keyNumber} = constants;
    
    switch(keyNumber){
      case 40:
        return this.downArrow(constants);
      case 38:
        return this.upArrow(constants);
      case 13:
        return this.enter(constants);
      default:
        this.filterTags(constants);
    }

  }

  getKeyDownConstants(e){
    
    let visibleTags = [...document.querySelectorAll('.VISIBLE')];
    let allParagraphTags = [...document.getElementsByTagName("p")];

    let keyDownData = {
      keyNumber: e.keyCode,
      keyValue : e.target.value.toUpperCase(),
      visibleTags,
      allParagraphTags
    }

    this.keyReducer(keyDownData);

  }

  keyDownListener(){
    this.searchBar.addEventListener("keyup", this.getKeyDownConstants.bind(this));
  }

  clickListener(){
    
    let allParagraphTags = [...document.getElementsByTagName("p")];
    this.container.addEventListener('click', (event) => {
      if(event.target.tagName === "P"){
        this.searchBar.value = event.target.innerText;
        allParagraphTags.forEach((soloTag) => {
          soloTag.setAttribute('class', 'HIDDEN');
          soloTag.style.display = 'none';  
        });
      }
    });  
  }

}

export default DropDown


