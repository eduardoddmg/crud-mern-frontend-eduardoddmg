import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { contextGeral } from "../../context/Context";
import './style.css';
import { Button, TextField } from '@mui/material';
import validator from 'validator'

const CriarComponent = () => {
  let navigate = useNavigate();

  const { data, setData } = useContext(contextGeral);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [messageNome, setMessageNome] = useState("");
  const [messageIdade, setMessageIdade] = useState("");
  const [messageEmail, setMessageEmail] = useState("");

  const postarFront = () => {
    let valid = 1;
    if (!validator.isEmail(email)) 
    {
      setMessageEmail('email inválido')
      valid = 0;
    }
    else setMessageEmail('');
    if (!idade || parseInt(idade) < 1) 
    {
      setMessageIdade('idade inválida');
      valid = 0;
    }
    else setMessageIdade('');
    if (!nome || nome.length < 2) 
    {
      setMessageNome('nome inválido');
      valid = 0;
    }
    else setMessageNome('');
    if (valid === 0) return false;
    else 
    {
      console.log('cheguei aqui');
      setData([
        ...data,
        {
          nome,
          idade: parseInt(idade),
          email,
          id: new Date().getTime(),
        },
      ]);
      setNome("");
      setIdade("");
      setEmail("");
      setMessageNome("");
      setMessageIdade("");
      setMessageEmail("");
      return true;
    }
  };

  const postarBack = () => {
    axios
      .post("https://crud-mern-backend-eduardoddmg.herokuapp.com/criar", {
        nome,
        idade: parseInt(idade),
        email,
        id: new Date().getTime(),
      })
      .then((resp) => console.log(resp));
  };

  return (
    <div className="container">
      <h2>CRIAR CONTATO</h2>
      <form className="containerForm">
        <TextField
          error={messageNome ? true : false}
          helperText={messageNome}
          fullWidth
          type="text"
          label="Nome"
          margin="dense"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          error={messageIdade ? true : false}
          helperText={messageIdade}
          fullWidth
          type="text"
          label="Idade"
          margin="dense"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <TextField
          error={messageEmail ? true : false}
          fullWidth
          helperText={messageEmail}
          type="text"
          label="Email"
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (postarFront()) 
            {
              postarBack();
              navigate(-1);
            }
          }}
        >
          enviar
        </Button>
      </form>
    </div>
  );
};

export default CriarComponent;
