import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { contextGeral } from "../../context/Context";
import validator from "validator";

import { Button, TextField } from "@mui/material";

const EditarComponent = () => {
  let navigate = useNavigate();
  let params = useParams();

  const { data, setData } = useContext(contextGeral);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [messageNome, setMessageNome] = useState("");
  const [messageIdade, setMessageIdade] = useState("");
  const [messageEmail, setMessageEmail] = useState("");

  useEffect(() => {
    if (data) {
      const item = data.find((value) => value.id === params.id);
      console.log(item);
      setNome(item.nome);
      setIdade(item.idade);
      setEmail(item.email);
    } else navigate(-1);
  }, []);

  const postarFront = () => {
    if (data) {
      for (let i of data) {
        if (i.id === params.id) {
          let valid = 1;
          if (!validator.isEmail(email)) {
            setMessageEmail("email inválido");
            valid = 0;
          } else setMessageEmail("");
          if (!idade || parseInt(idade) < 1) {
            setMessageIdade("idade inválida");
            valid = 0;
          } else setMessageIdade("");
          if (!nome || nome.length < 2) {
            setMessageNome("nome inválido");
            valid = 0;
          } else setMessageNome("");
          if (valid === 0) return false;
          else {
            i.nome = nome;
            i.idade = idade;
            i.email = email;
            setNome("");
            setIdade("");
            setEmail("");
            return true;
          }
        }
      }
    }
  };

  const postarBack = () => {
    axios
      .put(
        `https://crud-mern-backend-eduardoddmg.herokuapp.com/editar/${params.id}`,
        {
          nome,
          idade: parseInt(idade),
          email,
          id: params.id,
        }
      )
      .then((resp) => console.log(resp));
  };

  return (
    <div className="container">
      <h2>EDITAR CONTATO</h2>
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
          helperText={messageEmail}
          fullWidth
          type="text"
          label="Email"
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            console.log(nome, idade, email);
            if (postarFront()) {
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

export default EditarComponent;
