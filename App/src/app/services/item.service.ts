import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: Array<any> = []
  availableColours = ['st-taskColour--red', 'st-taskColour--orange', 'st-taskColour--green', 'st-colorBg--yellow', 'st-taskColour--purple', 'st-taskColour--blue', 'st-taskColour--pink']

  constructor() {
    this.createItem("Omg exam1")
    this.createItem("Omg exam2")
    this.createItem("Omg exam3")
  }

  createItem(title) {
    let randomId = Math.random().toString(36).substr(2, 5);
    let colour = this.chooseNewItemColour(); 
    this.items.push({
      'id': randomId,
      'title': title,
      'colour': colour, 
      'percentage': 0.5
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


}
