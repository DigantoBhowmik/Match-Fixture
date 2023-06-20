import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  openSidebar: boolean = true;

  menuSidebar = [
    {
      link_name: "Tournamnet",
      link: "/tournament",
      icon: "fa fa-trophy",
      sub_menu: []
    }
    
     
  ]

  constructor() { }

  ngOnInit() {

  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }
}
