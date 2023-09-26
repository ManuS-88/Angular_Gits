import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';
import { compileNgModule } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList : Gif[]=[];

  private _tagHistory:string[]=[];

  private apiKey:string = 'JuHzbGxMAsys8N17NqWOLGfvizYUOqJ8';
  private serviceUrl:string = 'http://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { }

  get tagHistory(){

    return [...this._tagHistory];
  }

  searchTag(tag:string):void{

    if(tag.length==0)return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','10')
      .set('q',tag)

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, {params})
        .subscribe( resp =>{
          this.gifList=resp.data
          //console.log({gifs: this.gifList});
        }
      )

    //Una forma de hacerlo, la otra es con HttpClientModule
    //async searchTag(tag:string):Promise<void>
    // fetch('http://api.giphy.com/v1/gifs/search?api_key=JuHzbGxMAsys8N17NqWOLGfvizYUOqJ8&q=Star Craft 2&limit=10')
    // .then(resp => resp.json())
    // .then(data=> console.log(data));
  }

  private organizeHistory(tag:string){
    tag=tag.toLocaleLowerCase();
    if(this._tagHistory.includes(tag)){

      this._tagHistory=this._tagHistory.filter((oldTag)=> oldTag!==tag)
    }

    this._tagHistory.unshift(tag);
    this._tagHistory=this._tagHistory.splice(0,10);


  }


}
