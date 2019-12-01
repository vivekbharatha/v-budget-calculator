import { Component, OnInit } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  budgetItems: BudgetItem[] = new Array<BudgetItem>();
  totalBudget: number = 0;

  constructor() { }

  ngOnInit() {
    let dbItems = localStorage.getItem('items') || '[]';
    this.budgetItems = JSON.parse(dbItems);
    this.refreshTotalBudget();
  }

  addItem(newItem: BudgetItem) {
    this.budgetItems.push(newItem);
    this.totalBudget += newItem.amount;
    this.saveToDB();
  }

  deleteItem(item: BudgetItem) {
    this.budgetItems.splice(this.budgetItems.indexOf(item),1);
    this.totalBudget -= item.amount;
    this.saveToDB();
  }

  saveToDB() {
    localStorage.setItem('items', JSON.stringify(this.budgetItems));
  }

  refreshTotalBudget() {
    this.totalBudget = 0;
    this.budgetItems.forEach((item) => {
      this.totalBudget += item.amount;
    });
  }

}
