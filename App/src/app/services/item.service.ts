import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: Array<any> = []
  availableColours = [['#FD898C', 'st-taskColour--red'], ['#E8BD93', 'st-taskColour--orange'], ['#3D9994', 'st-taskColour--green'], ['#F2EE8A', 'st-colorBg--yellow'], ['#AE93E8', 'st-taskColour--purple'], ['#78A8EF', 'st-taskColour--blue'], ['#E893D0', 'st-taskColour--pink'], ['#ff6961', 'st-taskColour--brightred'], ['#f8b88b', 'st-taskColour--brightorange'], ['#baed91', 'st-taskColour--litegreen'], ['#ADD8E6', 'st-taskColour--liteblue'], ['#f2a2e8', 'st-taskColour--brightpink']]

  constructor() {
    this.createItem("Omg exam")
    this.createItem("Omg exam")
    this.createItem("Omg exam")
  }

  getItems() {
    return this.items;
  }

  getData() {
    return this.items.map(a => a.percentage); 
  }

  getColours() {
    return this.items.map(a => a.colour); 
  }

  createItem(title) {
    let colour = this.chooseNewItemColour()
    this.items.push({
      'id': Math.random().toString(36).substr(2, 5),
      'title': title,
      'colour': colour[0], 
      'colourClass': colour[1], 
      'percentage': this.chooseNewItemPercentage()
    });
  }

  chooseNewItemColour() {
    let index = Math.floor(Math.random() * Math.floor(this.availableColours.length));
    console.log(index); 
    console.log(this.availableColours[index]); 
    let colour = this.availableColours[index]; 
    this.availableColours.splice(index, 1); 
    if (colour == null) {
      return ["darkslategray", ""]
    }
    return colour; 
  }

  chooseNewItemPercentage() {
    let newval = 1.0; 
    this.items.forEach(item => {
      newval = newval - (item.percentage * .8); 
      item.percentage = item.percentage * .8; 
    });
    return newval; 
  }

  moreStress(currentItem) {
    this.items.forEach(item => {
      if (item === currentItem) {
        item.percentage = item.percentage + 0.05; 

        // item cannot go above 1
        if (item.percentage >= 1) {
          item.percentage = 1; 
        }
      } else {
        item.percentage = item.percentage - (0.05 / (this.items.length - 1)); 
        
        // item cannot be less than 0 
        if (item.percentage <= 0) {
          item.percentage = 0; 
        }
      }
    })
  }

  lessStress(currentItem) {
    this.items.forEach(item => {
      if (item === currentItem) {
        item.percentage = item.percentage - 0.05; 

        // if item is reduced to less than 0, it should be removed. and it's colour added back
        if (item.percentage <= 0) {
          this.items.splice(this.items.indexOf(item), 1); 
          this.availableColours.push([currentItem.colour, currentItem.colourClass])
        }
      } else {
        item.percentage = item.percentage + (0.05/(this.items.length-1)); 

        // item cannot go above 1
        if (item.percentage >= 1) {
          item.percentage = 1;
        }
      }
    })
  }

}
