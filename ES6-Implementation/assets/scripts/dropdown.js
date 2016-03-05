class DropDown {
  constructor(data, parentNode){
    this.tagData = data;
    this.searchBar = document.createElement("INPUT");
    this.parentContainer = parentNode;
    this.active = { index:-1, currentTag: void 0 };
  }

  createDropDown(){

    // Setting Up the Search Bar
    let tags =  document.createElement("LABEL");
    tags.appendChild(document.createTextNode('TAGS:'))

    // Adding classes to Parent Container and Search Bar
    this.parentContainer.setAttribute('class', 'Tag-Container');
    this.searchBar.setAttribute('class', 'SearchBar');

    // Connecting SearchBar to Parent Container
    this.parentContainer.appendChild(this.searchBar);
    this.parentContainer.insertBefore(tags, this.parentContainer.childNodes[0]);

    // Looping through passedIn Data. Appending it to DOM
    this.tagData.forEach((data) => {
      let tag = document.createElement("P");
      tag.appendChild(document.createTextNode(data));
      tag.setAttribute('class', 'TAGS VISIBLE');
      this.parentContainer.appendChild(tag);
    });

    // Update the global store
    this.updateStore();

    // Setting Up Event Listeners
    this.keyDownListener();
    this.clickListener();
  }

  updateStore(){
    this.allDropDownTags = [...document.querySelectorAll('.TAGS')];
    this.visibleTags = [...document.querySelectorAll('.VISIBLE')];
  }

  // After something has been clicked reset your active
  resetActive(){

    // If their is an active Tag get rid of it
    if(this.active.currentTag){
      let className = this.active.currentTag.className.split(' ').filter(function(word){
        return word !== 'ACTIVE' ? true : false;
      }).join(' '); 
      
      this.active.currentTag.setAttribute('class', className);
      this.active = { index:-1, currentTag: void 0 }; 
    }

  }

  foundTag(){
    this.resetActive();
        
    this.allDropDownTags.forEach((soloTag) => {
      soloTag.setAttribute('class', "TAGS HIDE")
    });

    this.updateStore();
  }

  // Allows you to just toggle the previous tag
  toggleActive(){
    this.active.currentTag.setAttribute('class', 'TAGS VISIBLE');
  }

  dispatchDirection(d=false){
    if(d === 'DOWN'){
      this.active.currentTag = this.visibleTags[this.active.index+=1];  
    } else {
      this.active.currentTag = this.visibleTags[this.active.index-=1]; 
    }
    this.active.currentTag.setAttribute('class', 'TAGS VISIBLE ACTIVE');
  }

  enter(){
    let activeTag = document.querySelector('.ACTIVE');
    this.searchBar.value = activeTag.innerHTML;
    this.foundTag(); 
  }


  upArrow(){
    if(this.active.index !== 0 && this.active.index !== -1 ){
      if(this.active.index !== -1){
        this.toggleActive();
      }
      this.dispatchDirection(void 0);
    }
  }

  downArrow(){
    if(this.active.index !== this.visibleTags.length-1){
      if(this.active.index !== -1){
        this.toggleActive();
      }
      this.dispatchDirection('DOWN');
    }
  }

  filterTags(){

    let exactMatch = false;

    // Get rid of all the active tags
    this.resetActive();

    this.allDropDownTags.forEach((soloTag, i) => {
      let text = soloTag.innerHTML.toUpperCase();

      if(text.indexOf(this.keyValue) === -1){
        soloTag.setAttribute('class', 'TAGS HIDE');
      } else if(text === this.keyValue){
        this.active.currentTag = soloTag;
        exactMatch = true;
        soloTag.setAttribute('class', 'TAGS VISIBLE ACTIVE');
      } else if(text.indexOf(this.keyValue) !== -1){  
        soloTag.setAttribute('class', 'TAGS VISIBLE');
      }

    })

    // Update the store constantly with all the new Visible Tags
    this.updateStore();

    // Tracker for active when visibility matches
    if(exactMatch){
      this.visibleTags.forEach((visibleTag, i)=>{
        if(visibleTag === this.active.currentTag){
          this.active.index = i;
        }
      })
    }

  }

  keyReducer() {
    
    switch(this.keyNumber){
      case 40:
        return this.downArrow();
      case 38:
        return this.upArrow();
      case 13:
        return this.enter();
      case 37:
        return 'NO LEFT ARROW'; 
      case 39:
        return 'NO RIGHT ARROW';
      default:
        return this.filterTags();
    }

  }

  getKeyDownConstants(e){
    this.keyNumber = e.keyCode;
    this.keyValue = e.target.value.toUpperCase();
    this.keyReducer();
  }

  keyDownListener(){
    this.searchBar.addEventListener("keyup", this.getKeyDownConstants.bind(this));
  }

  clickListener(){
    
    this.parentContainer.addEventListener('click', (event) => {
      if(event.target.tagName === "P"){
        this.searchBar.value = event.target.innerText;
        this.foundTag();
      }
    });
  }

}

export default DropDown


