const express = require('express');
const mysql = require('mysql2');

const server = express();
server.use(express.json());

const bd = mysql.createConnection({
   host:"localhost",
   user: "root",
   password: "",
   database: "FACULDADE" 
});

bd.connect((err) => {
    if(err) {
        console.log("Erro ao conectar ao banco: ", err);
    }
    console.log("Conectado ao banco MySQL!");
});

server.get("/", (req, res)=> {
    res.send("API Funcionando!");
});

server.get("/alunos", (req, res) => {
    const sql = "SELECT * FROM ALUNO";
    bd.query(sql, (err, result) => {
        res.json(result);
        res.status(200);
    });
})

server.post("/alunos", (req, res) => {
    const {nome, idade} = req.body;
    const sql = "INSERT INTO ALUNOS (NOME, IDADE) VALUES (?, ?)";
    bd.query(sql, [nome, idade], (err, result) => { 
        if(err) 
            return res.status(500);

        res.status(201).send("Aluno cadastrado com sucesso!");
    });
});

server.listen(3070, () => {
    console.log("Servidor rodando na porta 3060!");
});
