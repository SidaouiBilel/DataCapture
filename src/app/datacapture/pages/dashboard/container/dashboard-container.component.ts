import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardComponent implements OnInit{
  selectedDomain: any;
  domains: any[];
  data: any[];
  keys = Object.keys;

  constructor(private service: DashboardService) {
    this.domains = [];
    this.data = [];
  }

  ngOnInit() {
    this.service.getAllSuper().subscribe((domains: any) => {
      this.domains = domains.resultat;
    });
  }

  selectDomain(event: any): void {
    this.selectedDomain = {id: event.identifier, name: event.name};
    this.loadData(event.identifier);
  }

  loadData(id: string): void {
    this.service.getDashboardData(id).subscribe((data) => {
      this.data = data;
    });
  }
}
