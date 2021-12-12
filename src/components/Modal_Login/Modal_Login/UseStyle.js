import { makeStyles } from '@material-ui/core/styles';

function UseStyles(){
    const useStylesLogin = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '0 auto',
          },
        },
        botao:{
          color: "#f2f2f2",
          backgroundColor: "#152238",
          '&:hover': {
            backgroundColor: "#23395F",
          },
        },
        paperStyle:{
          padding:"10px 20px 30px 10px", 
          width:"300px", 
          margin:"20px auto",
        },
        avatarDate: {
          fontSize:"13px",
          float:"right",
          margin:"10px 0 0 10px"
        },
        avatar: {
          boxShadow: theme.shadows[8],
          width: "75px", 
          height: "75px",
          float:"left",
          margin:"0 10px 0 0"
        },
        divPaddin:{
          padding:"40px"  
        }
      }));
      return useStylesLogin();
}
export default UseStyles