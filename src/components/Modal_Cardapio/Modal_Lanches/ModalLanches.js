import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography} from "@material-ui/core";
import imagemLanche from "../../../assets/img/imgs-cardapio/Delivery-de-Lanches-Sumare-Kannibal-Burgues-Disk-Entrega-Sumare-Lanche-1.jpg" ;
import DataHorario from "./DataHorario";

function ModalLanches(){
    const [activeStep, setActiveStep] = useState(0);
    
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        console.log("Final")
        setActiveStep(0);
    };

    const steps = [
        {
          label: 'Identificação',
          description: `Numero do Whatsapp`,
        },
        {
          label: 'Endereço de Entrega',
          description: 'Descricao2',
        },
        {
            label: 'Forma de Pagamento',
            description: 'Descricao3',
          },
        {
          label: 'Quantidade do Pedido',
          description: `Descricao4`,
        },
        {
            label: 'Resumo do Pedido',
            description: `Descricao4`,
        },
      ];
    return(
        <>
            
                <div className="modal-content dark modal-pai" style={{alignItems:"center"}}>
                    <div className="modal-header">
                        <p style={{fontSize:"12px", position:"static"}}><DataHorario /></p>
                    </div>
                    <div>
                        <img alt={'Alt da imagem'} src={imagemLanche} width="150px" />
                    </div>
                    <div className="modal-body">
                        <Box sx={{ maxWidth: 400 }}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                        optional={
                                            index === 4 ? (
                                                <Typography variant="caption">Último Step</Typography>
                                            ) : null
                                        }
                                        >
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                    <Typography>{step.description}</Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === steps.length - 1 ? 'Enviar Pedido' : 'Próxima Etapa'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Voltar
                                            </Button>
                                        </div>
                                    </Box>
                                    </StepContent>
                                </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length && (
                                <Paper square elevation={0} sx={{ p: 3 }}>
                                    <Typography>
                                        <hr/>
                                        <p>Pedido n°: <b>82446</b></p>
                                        <p>
                                            Recebemos seu pedido:<br />
                                            <b>Nome do Cliente</b>
                                        </p>
                                        <p>
                                            Acompanhe pelo Whatsapp:<br /> 
                                            <b>(99)99999-9999</b>
                                        </p>
                                        Obrigado pela preferência.
                                    </Typography>
                                    <Button onClick={handleReset} sx={{ mt: 3, mr: 3 }} >
                                        <button type="button" className="btn btn-success" data-dismiss="modal" aria-label="Close">
                                            Concluir e Sair
                                        </button>
                                    </Button>
                                    
                                </Paper>
                            )}
                        </Box>
                    </div>
                    {/*<div className="modal-footer">
                        <button type="button" className="btn btn-success">Pedido com Whatsapp</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Pedido com Ifood</button>
                    </div>*/}
                </div>
        </>
    )
}
export default ModalLanches
