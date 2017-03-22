'use strict';

document.addEventListener('click', onSearchClick);
document.addEventListener('click', onDropdownTogglerClick);


let sitetoolbarClassName  = 'sitetoolbar';
let sitetoolbarSelector = '.' + sitetoolbarClassName;

let searchInitialized = false;


function onDropdownTogglerClick(event){
     if (!event.target.closest) return; // svg
     let toggler = event.target.closest('[data-dropdown-toggler]');
     if (!toggler) return;
    toggler.nextElementSibling.style.display = toggler.nextElementSibling.offsetWidth ? 'none' : 'block';
}

// toggle search on/off, autofocus on input when "on"
function onSearchClick(event){
    
    if(!event.target.closest) return;

    //возвращает ближайший родительский элемент (или сам элемент)
    let searchToggle = event.target.closest(sitetoolbarSelector + '__search-toggle'); 
    
    if (searchToggle) {
        if (!searchInitialized) searchInitialize();
        toggle();
    }
}


function searchInitialize() {

  var sitetoolbar = document.querySelector(sitetoolbarSelector);

  var input = sitetoolbar.querySelector(sitetoolbarSelector + '__search-input input');
  var find = sitetoolbar.querySelector(sitetoolbarSelector + '__find');

  var possibleSubmit;

  find.onmousedown = function(e) {
    possibleSubmit = true
  };

  input.onkeydown = function(e) {
    if (e.keyCode == 27) {
      this.value = "";
      toggle();
    }
  };

  input.onblur = function(e) {
    !possibleSubmit && toggle()
  };

  searchInitialized = true;
}


function toggle(){

    let paranja, sitetoolbar = document.querySelector(sitetoolbarSelector);

    sitetoolbar.classList.toggle(sitetoolbarClassName + '_search_open');

    let input = sitetoolbar.querySelector(sitetoolbarSelector + '__search-input input');

    if(sitetoolbar.classList.contains(sitetoolbarClassName  + '_search_open')){
        
        input.focus();

        paranja = document.createElement('div');
        paranja.className = 'search-paranja';
        paranja.style.top = sitetoolbar.offsetHeight + 'px';

        document.body.appendChild(paranja);
        document.body.classList.add('paranja-open');


    }else{


        paranja = document.querySelector('.search-paranja');
        paranja.parentNode.removeChild(paranja);
        document.body.classList.remove('paranja-open');
        
    }

}