import React, { createContext, useState } from "react";

/***********Atributos, Objetos e funções Setados e Servidos no Provider************
@Task_APP       = Nome do token registrado no Local Storage
@ApagarToken    = Função JS verifica e apagar o token
@RegistrarToken = Função Js registra um Token com paramentos status e email
@userToken      = Objeto do estado contendo o token
@setUserToken   = Funcao do estado que registra o token
@msgUserToken   = Objeto do estado true ou false mensagem de token
@setMsgUserToken    = Função do estado set true ou false para mensagem de token null
//*********************************************************************************/

const ContextToken = createContext();
function ProviderToken({children}){
    const aux_tk = [JSON.parse(localStorage.getItem("Task_APP"))];
    const [ token, setToken ] = useState(aux_tk);
    const [ msgToken, setMsgToken ] = useState(false)

    const Verifica_Token = () => { 
            if(token[0] !== null || token[0] === null || token === undefined){
                token[0] === null || token[0] === undefined ? 
                    Registrar_Token(null, null)
                        : 
                        Registrar_Token(token[0].status_token, token[0].email_user)
            }
    }

    const Registrar_Token = (status, email) => {
        status === null && email === null ? 
            setToken([null]) 
                :
                localStorage.setItem("Task_APP",  //3° Registra Token
                    JSON.stringify({
                        "status_token":status, 
                        "email_user":email
                }))
    }

    const Apagar_Token = () => {
        localStorage.removeItem("Task_APP")   
    }

    return(
        <>
            <ContextToken.Provider value={{
                ApagarToken:Apagar_Token,
                RegistrarToken:Registrar_Token,
                VerificarToken:Verifica_Token,

                msgUserToken:msgToken,
                setMsgUserToken:setMsgToken,

                userToken:token, 
                setUserToken:setToken
                
            }}
            >{/**/}{children}
            </ContextToken.Provider>
        </>
    )
}
export {ContextToken, ProviderToken};
