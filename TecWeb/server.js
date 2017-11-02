
//referência dos módulos.
var express = require("express");
var app = express();
var mongoxlsx = require('mongo-xlsx');
var mongoose = require('mongoose');
//url do baco de dados remoto.
const url = "mongodb://sati2017:ti201702@mongo_ti2017:27017/ti2017";
//criando a conexão com o banco de dados.
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function (callback) {
	console.log("Conexao com o banco aberta.");
});
//criando o schema do banco de dados, funciona da mesma forma que criar um model de um objeto.
var Schema = mongoose.Schema;

var postoSchema = new Schema({
  cod:  String,
  nome: String,
  regiao:   String,
  endereco:String ,
  telefones: String,
  acolhimento: String,
  farmacia: String,
  position:String
});
mongoose.Promise = global.Promise;
// mongoose.createConnection(url, {
//   useMongoClient: true  
// });


//função que executa a busca dos postos com base na região selecionada.
app.get("/Regiao/:id",function(req,res){ 
  var Posto = mongoose.model("Posto",postoSchema);
  Posto.find({regiao: req.params.id},function(err,result){
    if(err)
      console.log(err);
    console.log(result);    
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end( JSON.stringify(result));
  }); 
});

//função que cria a tabela no banco. A tabela é criada a partir de um arquivo xls. 
app.get("/CreateBD/",function(req,res){
  console.log("connected");
  var Posto = mongoose.model("Posto",postoSchema);
  var model = null;
  var ods  = './Base de Postos de Saude.ods';
  
  mongoxlsx.xlsx2MongoData(ods, model, function(err, data) {    
    console.log('start');   
    data[0].forEach(function(element) {
      var posto = new Posto({
        cod: element.Cod,
        nome: element.Nome,
        regiao: element.Regiao,
        endereco: element.Endereco ,
        telefones: element.Telefones,
        acolhimento: element.Acolhimento,
        farmacia: element.Farmacia,
        position: element.Position
      });
      
      posto.save(function (err) {
        if (err) 
          return handleError(err);
        console.log("saved");

      })
    }, this);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end( JSON.stringify("Created"));
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("app listening at http://%s:%s", host, port)
});

