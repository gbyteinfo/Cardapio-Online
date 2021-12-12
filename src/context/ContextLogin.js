import React, { createContext, useContext, useEffect, useState } from "react";
import { ContextToken } from "./ContextToken";
import ServiceUsuario from "../service/ServiceUsuario";
import axios from "axios";

const ContextLogin = createContext();
const msg_btn = {
  aut: "Autenticar Conta",
  ok: ", pedido com ",
  reg: "Registrar e Autenticar",
  bac: "Autenticar", 
  end: "Cep Necessário",
  num: "Numero Necessário",
  wha: "Whatsapp Necessário",
  emp: "Sem Conta",
  con: "Confirmar Whatsapp",
  cep: "CEP não é Válido"
}
function ProviderLogin({children}){
    const [ userGoogle, setUserGoogle] = useState(null);
    const [ btnHeader, setBtnHeader ] = useState(msg_btn.aut)
    const [ btnObject, setBtnObject ] = useState(msg_btn)
    const [ cep, setCep ] = useState('');
    const [ numero, setNumero ] = useState('');
    const [ enderecoAPI, setEnderecoAPI ] = useState('');
    const [ nwhatsapp, setNwhatsapp ] = useState('');
    const [ codGerado, setCodGerado ] = useState('');
    const [ codWhatsapp, setCodWhatsapp ] = useState('');
    const [ userIp, setUserIp ] = useState('');
    const [ tkToF, setTktof ] = useState(false);
    const [ tkWpP, setTkwpP ] = useState(false);
    const { setUserToken, setMsgUserToken } = useContext(ContextToken);
    
    useEffect(() => {
      function aux_method(){
          /*console.log("Cep", cep.replace(/\D+/g, '') )
          console.log("Numero", numero)
          console.log("Whatsapp", nwhatsapp.replace(/\D+/g, '').length)
          console.log("Whatsapp2", nwhatsapp.indexOf(' ') >= 0)
          console.log("TK true false", tkToF)
          console.log("User Google",userGoogle)
          console.log("Endereço", enderecoAPI)
          console.log(codWhatsapp)*/
      }
      return aux_method();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enderecoAPI])
    
    const Response_Google = ( async(response) => {
         if(response.error){ 
            setMsgUserToken(true)
            console.log("); ",response)
        }else{
          const { profileObj } = response;
          await Verifica_Email(profileObj.email)
          setMsgUserToken(true)
          setUserGoogle({
                "imgUrl": profileObj.imageUrl,
                  "email": profileObj.email,
                    "nome": profileObj.name,
              })
        }    
    });
    
    const Verifica_Email = ( async(email) => {
      await ServiceUsuario.getUserByEmail(email)
      .then((response) => {
        return response.data === "" ? 
          setUserToken([localStorage.setItem("Task_APP", 
          JSON.stringify({
            "status_token":false, //false not exists user in BD
            "email_user":email,
            "whats_user":false}
          ))]) + setTktof(false) + setTkwpP(false)
          : 
          setUserToken([localStorage.setItem("Task_APP", 
          JSON.stringify({
            "status_token":true, //true exists user in BD
            "email_user":email,
            "whats_user":nwhatsapp}
          ))]) + setTktof(true) + setTkwpP(true)
      })
    })

    const BuscarEmail_Token = ( async(email) => { //2° Buscar Email Token
      try {
        await ServiceUsuario.getUserByEmail(email)
          .then((response) => {
            const {data} = response;
            if(data === "" || data !== "") {
              if(data === ""){
                setUserToken([localStorage.setItem("Task_APP", 
                  JSON.stringify({
                    "status_token":false, //false not exists user in BD
                    "email_user":email,
                    "whats_user":false}
                ))]);
                setTktof(false)//status
                setTkwpP(false)//whats
                setBtnHeader(msg_btn.aut)
              }else if(data.email && data.email === email){
                setUserGoogle({
                  "imgUrl": data.imgUrl,
                    "email": data.email,
                      "nome": data.nome/*,
                        "cep": null,
                          "rua": null,
                            "bairro": null,
                              "cidade": null,
                                "ncasa": 0,*/
                });
                setUserToken([localStorage.setItem("Task_APP", 
                  JSON.stringify({
                    "status_token":true, //true exists user in BD
                    "email_user":email,
                    "whats_user":nwhatsapp,
                    "goog_user":[data]
                  }
                ))]);
                setTktof(true)//status
                setTkwpP(true)//whats
                const nome = data.nome.split(' ');
                setBtnHeader(nome[0] + msg_btn.ok);
              }
            }
          })
          .catch(error => {
              console.log("erro", error)
          });
        }catch(error) {
          console.error("erro",error)
        };
    });

    const Autenticar_Conta = ((event, history) => {
      event.preventDefault();
      const aux_tk = [JSON.parse(localStorage.getItem("Task_APP"))]
      switch (aux_tk[0].status_token) {
        case true:
          console.log("Usuario Existe, Carregando BD ...")
          const nome = userGoogle.nome.split(' ');
          setBtnHeader(nome[0] + msg_btn.ok);
          history.replace("/")
          break;
        case false:
          console.log("***Criando novo autor no BD...", )
          Registrar_Usuario(userGoogle, history);
          break;
        default:
      }
    });

    const Registrar_Usuario = ( async(userGoogle, history) => {
      await ServiceUsuario.createUsuario(userGoogle)
        .then((response) => {//Criando autor
          if(response.status === 200 || response.status === 201){
            console.log("***Autor criado", response);
              setUserToken(localStorage.setItem("Task_APP", //Seta Token e Cria key goo_user 
                  JSON.stringify({
                    "status_token":true, 
                    "email_user":response.data.email, 
                    "whats_user":response.data.whatsapp,
                    "goog_user":[response.data]}
                  )));
                  setTktof(true)
                  setTkwpP(true)
                  const nome = userGoogle.nome.split(' ');
                  setBtnHeader(nome[0] + msg_btn.ok);
                  history.replace("/")
          }else{
            console.log("***Ops... error register")
          };
        }).catch((error) => {
          console.log("erro", error)
        });
      });

      const Pesquisa_Cep = ( async(valor) => {
        var aux_cep = valor.replace(/\D/g, '');
        if(aux_cep !== ""){
            var valida_cep = /^[0-9]{8}$/;
            if(valida_cep.test(aux_cep)){
              const aux_end_aguarde = {
                Rua:" Seach...",
                Bairro:" Seach...",
                Cidade:" Seach...",
                Estado:" Seach...",
                Uf:" Seach..."
              }
              setEnderecoAPI(aux_end_aguarde)
              const getCepViaCep = await axios.get(`https://viacep.com.br/ws/${aux_cep}/json/`)
                .then((response) => { 
                  const {data} = response;
                  return data;
                })
                .then((data)=>{ 
                  if(!data.erro){
                    return data;
                  }
                  else{
                    console.log("erro_CEP",data.erro)
                    return data;
                  }
                }).catch(error => console.log('erro',error))
              return PesquisaCep_Callback(getCepViaCep);
            }
            else {
              alert("Formato de CEP inválido.");
            }
        }
        else {                
          alert("Cep em nullo");
        }
      });

      const PesquisaCep_Callback = ((getCepViaCep) => {
        if ( !("erro" in getCepViaCep)) {
          /* ATUALIZA OS CAMPOS DE ENDERECO */
          const aux_end = {
            Rua: getCepViaCep.logradouro,
            Bairro: getCepViaCep.bairro,
            Cidade: getCepViaCep.localidade,
            Uf: getCepViaCep.uf,
            Cep: getCepViaCep.cep,
            Complemento: getCepViaCep.complemento,
            DDD: getCepViaCep.ddd,
            Gia: getCepViaCep.gia,
            Ibge: getCepViaCep.ibge,
            Siafi: getCepViaCep.siafi
          }
          setEnderecoAPI(aux_end)
        }
        else {
            console.log("CEP Erro")
            setEnderecoAPI('')
        }
      })

    return(
        <>
            <ContextLogin.Provider value={{
                ResponseGoogle:Response_Google,
                BuscarEmailToken:BuscarEmail_Token,
                AutenticarConta:Autenticar_Conta,
                PesquisaCep:Pesquisa_Cep,

                userFullGoogle:userGoogle,
                setUserFullGoogle:setUserGoogle,
                
                userFullCep:cep,
                setFullCep:setCep,

                userFullNumero:numero,
                setFullNumero:setNumero,

                userFullnwhatsapp:nwhatsapp,
                setFullnwhatsapp:setNwhatsapp,

                codFullWhatsapp:codWhatsapp, 
                setFullCodWhatsappp:setCodWhatsapp,

                btnObjectt:btnObject,
                setBtnObjectt:setBtnObject,

                btnHeaderr:btnHeader,
              
                tkToFF:tkToF,
                setTktoff:setTktof,

                tkWpPP:tkWpP,
                setTkwpPP:setTkwpP,

                enderecoApi:enderecoAPI,

                codGeradoo:codGerado,
                setCodGeradoo:setCodGerado,

                userIpp:userIp,
                setUserIpp:setUserIp

            }}>{/**/}{children}
            </ContextLogin.Provider>
        </>
    )
}
export {ContextLogin, ProviderLogin};