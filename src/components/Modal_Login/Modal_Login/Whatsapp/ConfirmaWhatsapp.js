import React from "react";

const ConfirmaWhatsapp = () => {
    
    return (
        <>
            {// INPUT DA CONFIRMAÇÃO DO WHATSAPP
                            tkWpPP !== false || userFullnwhatsapp.length <= 0 || userFullnwhatsapp.replace(/\D+/g, '').length < 11 ? null : 
                                
                            <Grid item xs={12} >
                                <InputMask 
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
                                    <b>Codigo não verificado</b>
                                </div>
                                    :
                                    <div style={{fontSize:"10px", textAlign:"start"}}>
                                        <b>Código Verificado para: </b>{userFullnwhatsapp}<br />
                                        <b>Cod Gerado: </b>{HandleAutenticarWhatsapp}<br />
                                    </div>
                                }
                            </Grid>
                        }
        </>
    );
};
export default ConfirmaWhatsapp;