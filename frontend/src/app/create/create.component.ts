import { Renderer2, Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private service:ApiserviceService,
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document,

    private router:ActivatedRoute
    ) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  calendar:any;

  ngOnInit(): void {

    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res, 'res==>');
          this.calendar = res.data.rows[0].dt_nascimento
          this.userForm.patchValue({
            cd_pessoa:res.data.rows[0].cd_pessoa,
            nm_pessoa:res.data.rows[0].nm_pessoa,
            nm_sobrenome:res.data.rows[0].nm_sobrenome,
            nr_telefone:res.data.rows[0].nr_telefone,
            tp_sangue:res.data.rows[0].tp_sangue,
            dt_nascimento:this.calendar.slice(8, -14) + '/' + this.calendar.slice(5, -17) + '/' + this.calendar.slice(0, -20)
          });
      });
    }

    

    let script = this._renderer2.createElement('script');

    script.text =
    `flatpickr("input[type=datetime-local]", {
    enableTime: false,
    dateFormat: "d/m/Y",
    });
    
    var phoneMask = IMask(
      document.getElementById('phone-mask'), {
        mask: '(00)0.0000-0000'
      });
      
      var cpf = IMask(
        document.getElementById('cpf'), {
          mask: '000.000.000-00'
        });
      `

    this._renderer2.appendChild(this._document.body, script);
  }

  userForm = new FormGroup({

    'cd_pessoa':new FormControl('', Validators.required),
    'nm_pessoa':new FormControl('', Validators.required),
    'nm_sobrenome':new FormControl(),
    'nr_telefone':new FormControl(),
    'tp_sangue':new FormControl(),
    'dt_nascimento':new FormControl('', Validators.required)
    
  });


  userUpdate(){
    console.log(this.userForm.value,'updateform')

    if(this.userForm.valid){
      this.service.updateData(this.userForm.value, this.getparamid).subscribe((res)=>{
          console.log(res, 'resupdated');
          this.successmsg = res.message;
      });
    }else{
      this.errormsg = 'todos campos são requeridos!'
    }
    
  }

  userSubmit(){
    console.log(this.userForm);
    if(this.userForm.valid){

      console.log(this.userForm.value);
      this.service.createData(this.userForm.value).subscribe((res) => {
        console.log(res, 'res==>'); 
        this.userForm.reset();
        this.successmsg = res.message;
      });

    }else{

      this.errormsg = 'todos os campos são requeridos!';

    }
  }

}
