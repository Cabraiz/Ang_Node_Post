import { Renderer2, Component, OnInit, Inject } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(
    private service:ApiserviceService,
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document
    ) { }

  readData:any;
  successmsg:any;

  ngOnInit(): void {
    this.getAllData();

    let script = this._renderer2.createElement('script');

    script.text =
    ``

    this._renderer2.appendChild(this._document.body, script);
  }

  deleteID(cd_pessoa:any){
    console.log(cd_pessoa,'deleteid==>');
    this.service.deleteData(cd_pessoa).subscribe((res)=>{
      console.log(res,'deleteres==>');
      this.successmsg = res.message;
      this.getAllData();
      

    });
  }

  getAllData(){
    this.service.getAllData().subscribe((res)=>{
      console.log(res, 'res==>');

      this.readData = res.data.rows;
      console.log(this.readData.rows);
    });
  }
  
}
