const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");
const port = 3002;
const app = express();

app.use(cors());
app.use(express.json());



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Documentação disponível em http://localhost:${port}/api-docs`)
})
app.listen(port, ()=> console.log ("Rodando na porta " + port));

const connection = require('./db/connection.js');

// cadastro usuarios

app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES(?, ?, ?)';
    
    connection.query(query, [nome, email, senha], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar pessoa' });
        }
        res.json({ success: true, message: "Pessoa cadastrada com sucesso"});
    });
});


// login usuarios 

app.post('/login', (req, res) => { 
    const { email, senha } = req.body;
 
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
 
    connection.query(query, [email, senha], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }
        if (results.length > 0) {
            console.log("login realizado")
            res.json({ success: true, message: 'Login realizado' });
        } else {
            res.json({ success: false, message: 'Email ou senha incorretos' });
        }
    });
});

// adicionar hábitos

app.post('/adicionarHabito', (req, res) => {
    const { habito, periodo} = req.body;
    const query = 'INSERT INTO habitos (habito, periodo) VALUES(?, ?)';
    
    connection.query(query, [habito, periodo], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao adicionar hábito' });
        }
        res.json({ success: true, message: "Hábito adicionado com sucesso"});
    });
});

// buscar habitos 

app.get('/habitos', (req, res) => {
    const query = 'SELECT * FROM habitos';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar hábito' });
        }
        res.json({ success: true, data: results });
    });
});

// buscar habitos da manhã

app.get('/habitos/manha', (req, res) => {
    const query = 'SELECT * FROM habitos WHERE periodo = "Manhã"';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar hábito' });
        }
        res.json({ success: true, data: results });
    });
});

// buscar habitos da tarde

app.get('/habitos/tarde', (req, res) => {
    const query = 'SELECT * FROM habitos WHERE periodo = "Tarde"';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar hábito' });
        }
        res.json({ success: true, data: results });
    });
});

// buscar habitos da noite

app.get('/habitos/noite', (req, res) => {
    const query = 'SELECT * FROM habitos WHERE periodo = "Noite"';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar hábito' });
        }
        res.json({ success: true, data: results });
    });
});

// deletar habitos

app.delete('/habitos/:id', (req, res) =>{
    const {id} = req.params
    const query = 'DELETE FROM habitos WHERE id = ?'
    connection.query(query, [id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao deletar hábito'})
        }
        res.json({success: true, message: "Hábito deletado"})
    })
})

// adicionar checklist 

app.post('/adicionarChecklist', (req, res) => {
    const {conteudo} = req.body;
    const query = 'INSERT INTO checklist (conteudo) VALUES(?)';
    
    connection.query(query, [conteudo], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao adicionar checklist' });
        }
        res.json({ success: true, message: "Checklist adicionado com sucesso"});
    });
});

// buscar checklist 

app.get('/checklist', (req, res) => {
    const query = 'SELECT * FROM checklist';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar checklist' });
        }
        res.json({ success: true, data: results });
    });
});

// deletar checklist

app.delete('/checklist/:id', (req, res) =>{
    const {id} = req.params
    const query = 'DELETE FROM checklist WHERE id = ?'
    connection.query(query, [id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao completar checklist'})
        }
        res.json({success: true, message: "Checklist concluído"})
    })
})

// adicionar lembrete 

app.post('/adicionarLembrete', (req, res) => {
    const {titulo, dia} = req.body;
    const query = 'INSERT INTO lembretes (titulo, dia) VALUES(?, ?)';
    
    connection.query(query, [titulo, dia], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao adicionar lembrete' });
        }
        res.json({ success: true, message: "Lembrete adicionado com sucesso"});
    });
});

// buscar lembrete 

app.get('/lembretes', (req, res) => {
    const query = 'SELECT * FROM lembretes ';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar lembretes' });
        }
        res.json({ success: true, data: results });
    });
});

// editar lembretes 

app.put('/lembretes/:id', (req, res) =>{
    const {titulo, dia} = req.body
    const {id} = req.params
    const query = 'UPDATE lembretes SET titulo = ?, dia = ? WHERE id = ?'
    connection.query(query, [titulo, dia, id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao atualizar lembrete'})
        }
        res.json({success: true, message: "Lembrete atualizado"})
    })
})


// deletar lembretes

app.delete('/lembretes/:id', (req, res) =>{
    const {id} = req.params
    const query = 'DELETE FROM lembretes WHERE id = ?'
    connection.query(query, [id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao deletar lembrete'})
        }
        res.json({success: true, message: "Lembrete deletado"})
    })
})