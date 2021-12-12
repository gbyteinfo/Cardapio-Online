import { makeStyles } from '@material-ui/core/styles';

function UseStyles(){
    const useStylesLogin = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '0 auto',
          },
        },
        botaoWhatsapp:{
          fontSize:"10px",
          color: "#f2f2f2 !important",
          backgroundColor: "#211F20",
          '&:hover': {
            backgroundColor: "#24C15F",
          },
          padding:"10px 15px 10px 15px !important",
        },
        botaoIfood:{
            fontSize:"10px",
            color: "#f2f2f2 !important",
            backgroundColor: "#211F20",
            '&:hover': {
              backgroundColor: "#DC3545",
            },
            padding:"10px 15px 10px 15px !important",
          },
        paperStyle:{
          padding:"10px 20px 30px 10px", 
          width:"300px", 
          height:"0 auto",
          margin:"0 auto",
          backgroundColor:"rgba(0, 0, 0, 0.5)",
          
        },
        avatar: {
          boxShadow: theme.shadows[8],
          width: "150px", 
          height: "150px",
        },
        divPaddin:{
          padding:"40px"  
        }
      }));
      return useStylesLogin();
}
export default UseStyles