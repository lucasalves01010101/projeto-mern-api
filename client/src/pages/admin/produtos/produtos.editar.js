import React,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';

import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  title: {flexGrow: 1,},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(2),paddingBottom: theme.spacing(4),},
  paper: {padding: 35,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  formControl:{width:'100%'},
  btnSuccess:{ backgroundColor:"green",color:"#fff","&:hover":{backgroundColor:"#12b912"}},
}));

export default function ProdutoCadastrar() {
  const classes = useStyles();

  const [nome_produto, setNome] = useState('');
  const [descricao_produto, setDescricao] = useState('');
  const [preco_produto, setPreco] = useState('');
  const [qtd_produto, setQtd] = useState('');

  const { idProduto } = useParams();


  useEffect(() => {
    async function getProdutos(){
      var response = await api.get('/api/produtos.details/'+idProduto);
      
      setNome(response.data.nome_produto);
      setDescricao(response.data.descricao_produto);
      setPreco(response.data.preco_produto);
      setQtd(response.data.qtd_produto);
    }

    getProdutos();
  },[])

  async function handleSubmit(){

    const data = {
      nome_produto:nome_produto, 
      descricao_produto:descricao_produto,
      preco_produto:preco_produto,
      qtd_produto: qtd_produto,
      _id:idProduto
  }

      if(nome_produto!==''&&descricao_produto!==''&&preco_produto!==''&&qtd_produto!==''){
        const response = await api.put('/api/produtos/',data);

        if(response.status===200){
          window.location.href='/admin/produtos'
        }else{
          alert('Erro ao atualizar o Produto!');
        }
      }else{
        alert('Por favor, preencha todos os campos!');
      }

     

  }
  
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'PRODUTOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button style={{marginBottom:10}} variant="contained" href={'/admin/produtos'}><ArrowBackIcon />  Voltar</Button>
              <Paper className={classes.paper}>
                <h2>Cadastro de Produtos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome_produto"
                      name="nome"
                      label="Nome Do Produto"
                      fullWidth
                      autoComplete="off"
                      value={nome_produto}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="descricao_produto"
                      name="descricao"
                      label="Descrição do Produto"
                      fullWidth
                      autoComplete="off"
                      value={descricao_produto}
                      onChange={e => setDescricao(e.target.value)}  
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="number"
                      required
                      id="preco_produto"
                      name="preco"
                      label="Preço do Produto"
                      fullWidth
                      autoComplete="off"
                      value={preco_produto}
                      onChange={e => setPreco(e.target.value)}
                    />
                  </Grid>
            
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="number"
                      required
                      id="qtd_produto"
                      name="qtd"
                      label="Quantidade do Produto"
                      fullWidth
                      autoComplete="off"
                      value={qtd_produto}
                      onChange={e => setQtd(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button variant="container" onClick={handleSubmit} className={classes.btnSuccess}>
                Salvar
                  </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}