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
    `function sortTable(number) {
      var table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById("table_read");
      switching = true;
      /*Make a loop that will continue until
      no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
          one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("TD")[number];
          y = rows[i + 1].getElementsByTagName("TD")[number];
          //check if the two rows should switch place:
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
          and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
    }`

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
