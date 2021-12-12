import React, { useContext, useEffect } from "react";
import { Avatar, Button, Grid, Snackbar, TextField} from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { ContextToken } from "../../../context/ContextToken";
import { ContextLogin } from "../../../context/ContextLogin";
import { useHistory } from 'react-router-dom';
import DataHorario from "./DataHorario";
import GoogleLogin from "react-google-login";
import UseStyles from './UseStyle';
import InputMask from "react-input-mask";
import GeradorHelper from './Whatsapp/GeradorHelper';
import ServiceUsuario from "../../../service/ServiceUsuario";

function ModalLogin(){
    const history = useHistory();
    const useStylesLogin = UseStyles();
    const { ResponseGoogle, userFullGoogle, BuscarEmailToken, PesquisaCep, 
            AutenticarConta, btnObjectt, tkToFF, tkWpPP, enderecoApi,
            userFullCep, userFullNumero, userFullnwhatsapp, codFullWhatsapp, codGeradoo, userIpp,
            setFullCep, setFullNumero, setFullnwhatsapp, setFullCodWhatsappp, setCodGeradoo, setUserIpp
          } = useContext(ContextLogin);
    const { VerificarToken, msgUserToken, setMsgUserToken, userToken} = useContext(ContextToken);

    //1° Verifica LocalStorage Token 
    useEffect(() => {
        const aux_methods = ( async() => {
            userToken[0] === null || userToken === undefined ?
            await VerificarToken()//Sem Token
                :
               await BuscarEmailToken(userToken[0].email_user)//Com Token
        });
        return  aux_methods();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const HandleCep = (event) => { return setFullCep(event.target.value); };
    const HandleSearchCep = ( async(event) => { await PesquisaCep(event.target.value) });
    const HandleNumero = (event) => { return setFullNumero(event.target.value); };
    const HandleNwhatsapp = (event) => { 
        setFullnwhatsapp(event.target.value); 
    };
    const HandleAutenticarWhatsapp = (() => {
        ServiceUsuario.getIpUser(setUserIpp)
        if(codGeradoo === ''){
            let codigo_aux = GeradorHelper.cod4Numbers().toString()
            setCodGeradoo(codigo_aux)
            console.log("Gerando Codigo... ",codigo_aux)
        }else{
            console.log("Codigo Gerado => ", codGeradoo)
        }

    });
    const HandleCodWhatsapp = (event) => { 
        setFullCodWhatsappp(event.target.value);
        console.log(event.target.value) 
        return false;
    };
    const HandleAutenticarConta = (event) => { return AutenticarConta(event, history); };
    const HandleCloseMsgToken = () => { return setMsgUserToken(false); };
    const HandleMostraEndereco = (event) => { 
        console.log(userIpp)
        alert(`
        Nome: ${userFullGoogle.nome}
        Telefone: ${userFullnwhatsapp}
        Email: ${userFullGoogle.email}
        Rua: ${enderecoApi.Rua}
        Bairro: ${enderecoApi.Bairro}
        Cidade: ${enderecoApi.Cidade}
        Uf: ${enderecoApi.Uf}
        Cep: ${userFullCep}
        Complemento: 
        DDD: ${enderecoApi.DDD}
        Gia: ${enderecoApi.Gia}
        Ibge: ${enderecoApi.Ibge}
        Siafi: ${enderecoApi.Siafi}

        Dados do local do usuario:
        IP: ${userIpp.ip}
        Latitude: ${userIpp.latitude}
        Longitude: ${userIpp.longitude}
        Provedor Internet: ${userIpp.org}

        `) 
        
    };
    return(
        <>
            <div className="modal-content modal-pai">
                <div className="modal-body">                                  
                        <Grid container spacing={3} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                            <Grid item xs={12}>
                                <div className="container">
                                    {userFullGoogle === null ?
                                        <><Grid item xs={12}>
                                            <GoogleLogin theme='dark'
                                                clientId="id google client"
                                                buttonText="Autenticar com Google"
                                                onSuccess={ResponseGoogle}
                                                onFailure={ResponseGoogle}
                                                cookiePolicy={'single_host_origin'}
                                            /> 
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField disabled={userFullGoogle === null ? true : false} label={userFullGoogle === null ? "Nome" : "Nome"} value={userFullGoogle !== null ? userFullGoogle.nome : ""}></TextField> 
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField disabled={userFullGoogle === null ? true : false} label={userFullGoogle === null ? "Email" : "Email"} value={userFullGoogle !== null ? userFullGoogle.email : ""} ></TextField>
                                        </Grid></>
                                            :  
                                                <Grid item xs={12}>
                                                    <Avatar className={useStylesLogin.avatar} alt={userFullGoogle.nome} src={userFullGoogle.imgUrl}/>
                                                    <p className={useStylesLogin.avatarDate}>
                                                        <DataHorario />< br/>
                                                        {userFullGoogle !== null ? userFullGoogle.nome : ""}<br />
                                                        {userFullGoogle !== null ? userFullGoogle.email : ""}

                                                    </p><br />
                                                </Grid>
                                    }
                                </div>
                            </Grid>
                            
                            
                            {// INPUT CEP
                            userFullGoogle === null ? null : 
                                <Grid item xs={12} >
                                    <InputMask 
                                        disabled={userFullGoogle === null ? true : false}
                                        onChange={HandleCep}
                                        onBlur={HandleSearchCep}
                                        mask="99999-999"
                                        value={userFullCep}
                                        maskChar=" "
                                        type="number"
                                    >
                                        {() => <TextField label={"Cep"}/>}
                                    </InputMask>
                                    
                                    {// ENDEREÇO DA API CASO EXISTA ELE EXIBE
                                    userFullCep.length === 0 || userFullCep.indexOf(' ') >= 0 || enderecoApi === ''? 
                                    <div style={{fontSize:"10px", textAlign:"start"}}>
                                        <b>Cep nao existe</b>
                                    </div>
                                        : 
                                        enderecoApi !== '' ?
                                        <div style={{fontSize:"10px", textAlign:"start"}}>
                                            <b>Rua: </b>{enderecoApi ? enderecoApi.Rua : ''}<br />
                                            <b>Bairro: </b>{enderecoApi ? enderecoApi.Bairro : ''}<br />
                                            <b>Cidade: </b>{enderecoApi ? enderecoApi.Cidade : ''} <b>| UF: </b>{enderecoApi !== '' ? enderecoApi.Uf : ''}<br />
                                        </div>
                                            :
                                            <div style={{fontSize:"10px", textAlign:"start"}}>
                                                <b>Cep nao existe</b>
                                            </div>
                                    }
                                    
                                    {// INPUT NUMERO
                                    userFullCep.length === 0 || userFullCep.indexOf(' ') >= 0 ? null : 
                                        <Grid item xs={12} >
                                            <InputMask 
                                                disabled={userFullCep === null ? true : false}
                                                onChange={HandleNumero}
                                                mask="999999"
                                                value={userFullNumero}
                                                maskChar=" "
                                                type="number"
                                            >
                                                {() => <TextField label={"Numero do Local"}/>}
                                            </InputMask>
                                        </Grid>
                                    }
                                </Grid>
                            }

                            {// INPUT WHATSAPP
                            userFullNumero.length <= 0 || userFullNumero.indexOf(' ') === 0 || enderecoApi === '' ? null :
                                <Grid item xs={12} >
                                    <InputMask 
                                        disabled={userFullNumero === null ? true : false}
                                        onChange={HandleNwhatsapp}
                                        onBlur={userFullnwhatsapp.replace(/\D+/g, '').length < 11 ? null : HandleAutenticarWhatsapp}
                                        mask="(99) 9 9999-9999"
                                        value={userFullnwhatsapp}
                                        type="number"
                                    >
                                        {() => <TextField label={"Whatsapp para Pedido"}/>}
                                    </InputMask>
                                </Grid>
                            }

                            {// INPUT DA CONFIRMAÇÃO DO WHATSAPP
                            tkWpPP !== false || userFullnwhatsapp.length <= 0 || userFullnwhatsapp.replace(/\D+/g, '').length < 11 ? null : 
                                
                                <Grid item xs={12} >
                                    <InputMask 
                                        //disabled={true}
                                        onChange={HandleCodWhatsapp}
                                        mask=" 9  9  9  9"
                                        value={codFullWhatsapp}
                                        type="number"
                                    >
                                        {() => <TextField label={"Codigo de Confirmação"}/>}
                                    </InputMask>
                                    {//VERIFICANDO CODE DIGITADO
                                    codFullWhatsapp.replace(/\D+/g, '').length < 4 ? 
                                    <div style={{fontSize:"10px", textAlign:"start"}}>
                                        <b>Enviado para Whatsapp: {userFullnwhatsapp}</b>
                                    </div>
                                        :
                                        <div style={{fontSize:"10px", textAlign:"start"}}>
                                            <b>Código enviado: {codGeradoo} </b><br />
                                            
                                        </div>
                                    }
                                </Grid>
                            }

                            <Grid item xs={12}>
                                {userFullGoogle !== null ?
                                    userFullCep.replace(/\D+/g, '') === '' || userFullCep.indexOf(' ') >= 0 ?     
                                    <Button disabled fullWidth variant="contained" color="primary" data-dismiss="modal">
                                        {btnObjectt.end}
                                    </Button>// endereco necessarrrio 
                                        :
                                        userFullNumero.replace(/\D+/g, '') === '' ?
                                        <Button disabled fullWidth variant="contained" color="primary" data-dismiss="modal">
                                            {btnObjectt.num}
                                        </Button>// numero necessarrrio
                                            :
                                            enderecoApi === '' ?
                                            <Button disabled fullWidth variant="contained" color="primary" data-dismiss="modal">
                                                {btnObjectt.cep}
                                            </Button>// cep não é válido
                                                :
                                                userFullnwhatsapp.replace(/\D+/g, '') === '' || userFullnwhatsapp.replace(/\D+/g, '').length < 11 ?     
                                                <Button disabled fullWidth variant="contained" color="primary" data-dismiss="modal">
                                                    {btnObjectt.wha}
                                                </Button>// whatsapp necessarrrio
                                                    :
                                                    /*tkWpPP === false*/ codFullWhatsapp.replace(/\D+/g, '') !== codGeradoo.replace(/\D+/g, '') || codFullWhatsapp.replace(/\D+/g, '').length < 4 ?
                                                    <Button disabled fullWidth variant="contained" color="primary" data-dismiss="modal"
                                                        onClick={(event) => {HandleAutenticarConta(event)}}>
                                                        {btnObjectt.con}
                                                    </Button>// confirmar whatsapp 
                                                        :
                                                        tkToFF === false ?
                                                        <Button fullWidth variant="contained" color="primary" data-dismiss="modal" 
                                                            onClick={(event) => {/*HandleAutenticarConta(event)*/ HandleMostraEndereco(event)}}>
                                                            {btnObjectt.reg}
                                                        </Button>// registrar e autenticar 
                                                            :
                                                            <Button fullWidth variant="contained" color="primary" data-dismiss="modal" 
                                                                onClick={(event) => {/*HandleAutenticarConta(event)*/ HandleMostraEndereco(event)}}>
                                                                {btnObjectt.bac}
                                                            </Button>// autenticar 
                                                                :
                                                                <Button disabled fullWidth variant="contained">
                                                                    {btnObjectt.emp}
                                                                </Button>// sem conta     
                                }                            
                            </Grid>
                        </Grid>
                    <Snackbar open={msgUserToken} autoHideDuration={4000} onClose={HandleCloseMsgToken}>
                        <Alert onClose={HandleCloseMsgToken} severity={userFullGoogle === null ? "error" : "success"}>
                            {userFullGoogle === null ? "Precisa autenticar uma conta Google" : "Email do usuario autenticado: " + userFullGoogle.email}
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </>
    )
}
export default ModalLogin
