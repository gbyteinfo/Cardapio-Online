import React, { useContext, useEffect } from "react";
import { ContextAdm } from "../../context/ContextAdm";
import ModalLogin from "./Modal_Login/ModalLogin";

/***********************************************************************************
@GetUsuarios = Cxt - Objeto do estado contedo o array de Lanches sem Filtro
************************************************************************************/

function ModalL(){
    const { GetUsuarios } = useContext(ContextAdm);
    
    useEffect(() => { 
        const aux_methods = ( async() => { 
            await GetUsuarios(); 
        }); 
        return aux_methods();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>  
            <div className="modal text-center" role="dialog" tabindex="-1" id="modal-l"  >
                <div className="modal-dialog" role="document" style={{alignItems:"center",width:"380px"}} >
                    <ModalLogin />
                </div>
            </div>
        </>
    )
}
export default ModalL