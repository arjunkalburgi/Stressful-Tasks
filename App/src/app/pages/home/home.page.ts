import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  items: Array<any>;
  new_item_form: FormGroup;
  @ViewChild('stgraph') doughnutCanvas;
  doughnutChart: any;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService
  ){}

  ngOnInit(){
    this.items = this.itemService.getItems();

    this.new_item_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
    });

    this.displayChart(); 
  }

  createItem(value) {
    this.itemService.createItem(value.title);
    this.new_item_form.reset();
    this.update(); 
  }

  moreStress(item) {
    this.itemService.moreStress(item); 
    this.update(); 
  }

  lessStress(item) {
    this.itemService.lessStress(item); 
    this.update(); 
  }

  displayChart() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: this.itemService.getData(),
          backgroundColor: this.itemService.getColours()
        }]
      },
      options: {
        cutoutPercentage: 74,
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: false,
        }
      },

    });
  }

  update() {
    this.items.sort((a, b) => b.percentage - a.percentage)
    this.doughnutChart.data.datasets[0].data = this.itemService.getData(); 
    this.doughnutChart.data.datasets[0].backgroundColor = this.itemService.getColours(); 
    this.doughnutChart.update();
  }
}
