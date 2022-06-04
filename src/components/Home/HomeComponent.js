import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { contextGeral } from "../../context/Context";
import "./style.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const HomeComponent = () => {
  let navigate = useNavigate();
  const { data, setData } = useContext(contextGeral);

  return (
    <section className="containerHome">
      <section className="buttonHome">
        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => navigate("/criar")}
        >
          Criar
        </Button>
      </section>
      {data && data.length > 0 ? <section className="tableHome">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Idade</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Editar</TableCell>
                <TableCell align="right">Apagar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((pessoa, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {pessoa.nome}
                    </TableCell>
                    <TableCell align="right">{pessoa.idade}</TableCell>
                    <TableCell align="right">{pessoa.email}</TableCell>
                    <TableCell align="right">{pessoa.id}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => navigate(`/editar/${pessoa.id}`)}
                      >
                        Editar
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          axios
                            .delete(
                              `https://crud-mern-backend-eduardoddmg.herokuapp.com/apagar/${pessoa.id}`
                            )
                            .then(() => console.log("deletado com sucesso!"));
                          setData(
                            data.filter((value) => value.id !== pessoa.id)
                          );
                        }}
                      >
                        Apagar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section> : <h3 style={{width: '70%', margin: '0 auto', textAlign: 'center'}}>Não há nenhum contato cadastro, por favor cadastre</h3>}
    </section>
  );
};

export default HomeComponent;
