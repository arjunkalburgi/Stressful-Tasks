import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  items: Array<any>;
  new_item_form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public itemService: ItemService
  ){}

  ngOnInit(){
    this.items = this.itemService.getItems();

    this.new_item_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
    });
  }

  createItem(value) {
    this.itemService.createItem(value.title, value.description);
    this.new_item_form.reset();
    // this.goBack();
  }

}
