import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'share-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  //Intento

  constructor( private gifsService:GifsService){}

  get tagSideBar(){

    return this.gifsService.tagHistory;
  }

}


