import React, { useContext, useEffect } from "react";
import Modal from "../Modal_Cardapio/Modal";
import { ContextCardapioLanches } from "../../context/ContextCardapioLanches";
import UseStyles from "./UseStyle";
import { Button, CardActions, CardContent, Grid, Paper, Typography } from "@material-ui/core";

/***********************************************************************************
@cxtListaFullLanches = Cxt - Objeto do estado contedo o array de Lanches sem Filtro
@setListaFullLanches = Cxt - Função do estado seta ListaFullLanches 
@GetLanches          = Cxt - Metodo para Request => getLanches()
************************************************************************************/

function Main() {
    const useStylesLogin = UseStyles();
    const { cxtListaFullLanches, GetLanches, setListaFullLanches } = useContext(ContextCardapioLanches);

    useEffect(() => { 
        const aux_methods = ( async() => { 
            await GetLanches(); 
        }); 
        return aux_methods();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const HandleLancheClick = (event, item) =>{
        event.preventDefault();
        console.log("Item adicionado: ", item.nomeLanche)
    }
    const HandleLancheIfood = (event, item) => {
        event.preventDefault();
        console.log("Item Ifood: ", item)
    }
    return(
        <>
            <section className="portfolio" id="cardapio">
                <div>
                    <div className="row" >
                        {cxtListaFullLanches && cxtListaFullLanches.map((element) => {
                            return(
                                <div className="col-md-6 col-lg-4 item-padding">
                                    <div className="d-block mx-auto portfolio-item">   
                                        <div className={`d-flex portfolio-item-caption position-absolute h-100 w-100`} >
                                            <div className="text-center text-white my-auto portfolio-item-caption-content w-100">     
                                                <Paper className={useStylesLogin.paperStyle} elevation={3}>
                                                    <Grid container spacing={3} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                                                        <Grid item xs={12}>
                                                            <CardContent alignItems={"left"}>
                                                                <Typography variant="h3"><b>{element.nomeLanche}</b></Typography>
                                                                <Typography variant="h4">{element.ingredientes}</Typography>
                                                            </CardContent>
                                                            <CardActions>
                                                                <Grid>
                                                                    <Typography className="precoWhatsapp" variant="h5">R$ {parseInt(element.preco)},00</Typography>
                                                                    <Button
                                                                        className={useStylesLogin.botaoWhatsapp} 
                                                                        data-toggle="modal"
                                                                        href="#modal-la"
                                                                        onClick={((event) => HandleLancheClick(event, element))}
                                                                    >
                                                                        Adicionar Lanche
                                                                    </Button>
                                                                </Grid>
                                                                <Grid>
                                                                    <Typography className="precoIfood" variant="h5"> R$ {parseInt(element.preco)+parseInt(element.desconto)},00</Typography>
                                                                    <Button
                                                                        className={useStylesLogin.botaoIfood} 
                                                                        color="red"
                                                                        onClick={((event) => HandleLancheIfood(event, element.nomeLanche))}
                                                                    >
                                                                    Pedir Com Ifood
                                                                    </Button>
                                                                </Grid>
                                                            </CardActions>  
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </div>                                            
                                        </div>
                                        <img alt={'Alt da imagem'} className="img-fluid" src={element.imagemCardapio} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <Modal pedido={cxtListaFullLanches} funPedido={setListaFullLanches}/>
        </>
    )
}

export default Main