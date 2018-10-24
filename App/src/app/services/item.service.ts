import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: Array<any> = []
  availableColours = ['st-taskColour--red', 'st-taskColour--orange', 'st-taskColour--green', 'st-colorBg--yellow', 'st-taskColour--purple', 'st-taskColour--blue', 'st-taskColour--pink']

  constructor() {
    this.createItem("Omg exam")
    this.createItem("Omg exam")
    this.createItem("Omg exam")
  }

  createItem(title) {
    this.items.push({
      'id': Math.random().toString(36).substr(2, 5),
      'title': title,
      'colour': this.chooseNewItemColour(), 
      'percentage': this.chooseNewItemPercentage()
    });
  }

  getItems(){
    return this.items;
  }

  updateItem(newValues){
    let itemIndex = this.items.findIndex(item => item.id == newValues.id);
    this.items[itemIndex] = newValues;
  }

  chooseNewItemColour() {
    let index = Math.floor(Math.random() * Math.floor(this.availableColours.length));
    let colour = this.availableColours[index]; 
    this.availableColours.splice(index, 1); 
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

        // if item is reduced to less than 0, it should be removed
        if (item.percentage <= 0) {
          this.items.splice(this.items.indexOf(item), 1); 
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
