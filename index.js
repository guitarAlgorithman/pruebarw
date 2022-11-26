const express = require("express")
const app = express();
app.use(express.json())
require('dotenv').config()

let clientes=[]

const getOne=(nombre)=>{
    return clientes.find(c=>c.nombre==nombre)
}

const editCliente=(nombre, newNombre,newComentario)=>{
    const element=clientes.find(x=>x.nombre==nombre)
    const pos=clientes.indexOf(element);
    clientes[pos]={
        nombre:newNombre,
        comentario:newComentario,
    }
}


const deleteCliente=(nombre)=>{
    clientes=clientes.filter(x=> x.nombre!= nombre) 
}

app.get("/",(req,res)=>{
    
    if(clientes.length==0){
        res.send("nada")    }
    res.json(clientes)
})

app.get("/:nombre",(req,res)=>{
    res.json(getOne(req.params.nombre))
})

app.post("/",(req,res)=>{
    //obtengo los actaules
    clientes.push(req.body)
    res.send("comentario enviado")
})



app.patch("/:nombre",(req,res)=>{
    editCliente(req.params.nombre,req.body.nombre,req.body.comentario)
    res.send("ok")
})


app.delete("/:nombre",(req,res)=>{
    deleteCliente(req.params.nombre)
    res.send("ok")
})
app.listen(process.env.PORT,()=>{
    console.log(`running at ${process.env.PORT}`);
})