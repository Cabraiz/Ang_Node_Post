const express = require('express');
const bodyparser = require('body-parser'); 
const cors = require('cors');
const client = require("./config/db.config.js");



const app = express();

app.use(cors()); 
app.use(bodyparser.json());

app.listen(3000,()=>{
  console.log('Servidor Rodando');
})

//checar conexao com o banco
client.connect(err=>{
  if(err) {console.log(err,'Erro no Banco De Dados')}
  console.log('Conexao Com Servidor Bem Sucedida')
})


//todas os dados
app.get('/user',(req,res) => {
   
  let qr = 'select * from perfil';

  client.query(qr, (err, result) => {
    if(err){
      console.log(err,'errs');
    }
    

    if(result.rowCount > 0){
      res.send({
        message:'todos os dados',
        data:result
      });
    }

  }); 
});

//um unico dado pelo PK
app.get('/user/:id',(req,res) => {

  let gID = req.params.id;

  let qr = `SELECT * FROM perfil Where cd_pessoa = '${gID}'`;
  
  client.query(qr,(err,result)=>{
    if(err) {
      console.log(err);
    }

    if(result.rowCount > 0){
      res.send({
        message: '1',
        data:result
      });
    }else{
      res.send({
        message:'Nenhuma data a ser computada'
      })
    }
  });
});

//criar dados
app.post('/user',(req,res) => {

  console.log(req.body, 'criacaodedados');

  let cd_pessoa = req.body.cd_pessoa;
  let nm_pessoa = req.body.nm_pessoa;
  let nm_sobrenome = req.body.nm_sobrenome;
  let nr_telefone = req.body.nr_telefone;
  let tp_sangue = req.body.tp_sangue;
  let dt_nascimento = req.body.dt_nascimento;

  let qr = `INSERT INTO public.perfil(
    cd_pessoa, nm_pessoa, nm_sobrenome, nr_telefone, tp_sangue, dt_nascimento)
    VALUES ('${cd_pessoa}', '${nm_pessoa}', '${nm_sobrenome}', '${nr_telefone}', '${tp_sangue}', '${dt_nascimento}');`

  client.query(qr,(err,result)=>{
    if(err) {
      console.log(err);
    }

    if(result.rowCount > 0){
      res.send({
        message: 'Dados inseridos'
      });
    }else{
      res.send({
        message:'Problema na Inserção'
      })
    }
  });
  
});

//atualizar um unico dado
app.put('/user/:id',(req,res) => {

  console.log(req.body, 'atualizacaodedados');

  let gID = req.params.id;

  let cd_pessoa = req.body.cd_pessoa;
  let nm_pessoa = req.body.nm_pessoa;
  let nm_sobrenome = req.body.nm_sobrenome;
  let nr_telefone = req.body.nr_telefone;
  let tp_sangue = req.body.tp_sangue;
  let dt_nascimento = req.body.dt_nascimento;

  let qr = `UPDATE public.perfil
	SET cd_pessoa='${cd_pessoa}', nm_pessoa='${nm_pessoa}', nm_sobrenome='${nm_sobrenome}', 
  nr_telefone='${nr_telefone}', tp_sangue='${tp_sangue}', dt_nascimento='${dt_nascimento}'
	WHERE cd_pessoa = '${gID}';`

  client.query(qr,(err,result)=>{
    if(err) {console.log(err);}

    res.send({
      message:'Insercao Com Sucesso'
    })
  });
});

//deletar um unico dado
app.delete('/user/:id',(req,res) => {
  let gID = req.params.id;

  let qr = `DELETE FROM public.perfil
	WHERE cd_pessoa='${gID}'`

  client.query(qr,(err,result)=>{
    if(err) {console.log(err);}

    res.send({
      message:'Dado Deletado'
    })
  });

});