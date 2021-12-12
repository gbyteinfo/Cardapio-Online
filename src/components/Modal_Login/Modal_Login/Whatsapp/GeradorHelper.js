class GeradorHelper{
    constructor(){
        throw new Error(`Class GeradorHelper não é Estanciada, chamar a classe Direto como Variavel`)
    }

    /* GERANDO COD 4 DIG  */
    static cod4Numbers(){
        let cvc = [];
            for(var i=0;i<=5;i++){
            if(i === 1 || i === 2 || i === 3 || i === 4 || i === 5){
            cvc[i] = '-';
            i++;
            }
            cvc[i]=(Math.floor(Math.random() * (9 - 0)) + 0);
        }
        return cvc.join('');
    }
    /* GERANDO NUMERO CARTÃO CRÉDITO */
    static cartaoNumero(){
        let nconta = [];
            for(var i=0;i<19;i++){
            if(i === 4 || i === 9 || i === 14){
            nconta[i] = ' ';
            i++;
            }
            nconta[i]=(Math.floor(Math.random() * (4 - 0)) + 0);
        }
        return nconta.join('')
    }

    /*GERANDO NUMERO CVC */
    static cvcNumero(){
        let cvc = [];
            for(var i=0;i<4;i++){
            if(i === 1 || i === 2 || i === 3 ){
            cvc[i] = '-';
            i++;
            }
            cvc[i]=(Math.floor(Math.random() * (9 - 0)) + 0);
        }
        return cvc.join('');
    }
    /* GERANDO ID USUARIO */
    static idUsuario(data){
        let cvc = [];
            for(var i=0;i<7;i++){
            if(i === 2 || i === 4 || i === 6){
            cvc[i] = '';
            i++;
            }
            cvc[i]=(Math.floor(Math.random() * (9 - 0)) + 0);
        }
        return cvc.join('');
    }
    /* CRÉDITO DE CODIGO PARA EQUIPE SIRIUS - RAFAELA - ALEXANDRE - JORGE | 2021 */
}
export default GeradorHelper;