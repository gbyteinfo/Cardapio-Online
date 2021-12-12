import React, { createContext, useState } from "react";
import ServiceFunctions from "../service/ServiceFunctions";


const ContextCardapioLanches = createContext();

function ProviderContexCLanches({children}){
    const [listaFullLanches, setListaFullLanches] = useState([]);
    

    const getLanches = ( async() => {
        await ServiceFunctions.getLanches().then((response) => {  
            setListaFullLanches(response.data);
        })
    })

    return(
        <>
            <ContextCardapioLanches.Provider value={{
                GetLanches : getLanches,
                
                cxtSetLFullLanches : setListaFullLanches,
                cxtListaFullLanches : listaFullLanches 

            }}>{/**/}{children}
            </ContextCardapioLanches.Provider>
        </>
    );
};
export {ContextCardapioLanches, ProviderContexCLanches};