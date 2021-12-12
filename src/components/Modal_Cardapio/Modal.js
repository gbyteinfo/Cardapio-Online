import React, { useContext, useEffect } from "react";
import { ContextAdm } from "../../context/ContextAdm";
import ModalLanches from "./Modal_Lanches/ModalLanches";

/***********************************************************************************
@GetUsuarios = Cxt - Objeto do estado contedo o array de Lanches sem Filtro
@setUserData = Cxt - Função do estado seta usuarioData
@userData    = Cxt - Objeto do estado contendo o usuario atual
************************************************************************************/

function Modal(){
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
            <div className="modal text-center" role="dialog" tabindex="-1" id="modal-la"  >
                <div className="modal-dialog" role="document" style={{alignItems:"center",width:"380px"}} >
                    <ModalLanches />
                </div>
            </div>
        </>
    )
}
export default Modal