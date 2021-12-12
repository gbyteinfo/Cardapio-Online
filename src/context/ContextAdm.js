import React, { createContext, useState } from 'react';
import ServiceUsuario from '../service/ServiceUsuario';
/***********************************************************************************
@usuarioData = Objeto do estado contendo o usuario atual
************************************************************************************/


const ContextAdm = createContext();
function ProviderContextAdm({children}){
    const [usuarioData, setUsuarioData] = useState([]);

    const getUsuarios = ( async() => {
        await ServiceUsuario.getUsuarios().then((response) => {
            setUsuarioData(response.data)
        })
    });
    
    return(
        <>
            <ContextAdm.Provider value={{
                GetUsuarios:getUsuarios,

                setUserData:setUsuarioData,
                userData:usuarioData

            }}>{/**/}{children}
            </ContextAdm.Provider>
        </>
    )
}
export {ContextAdm, ProviderContextAdm};