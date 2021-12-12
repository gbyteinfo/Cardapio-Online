import React from "react";
import NavHeader from '../components/includes/NavHeader';
import Header from '../components/includes/Header';
import Main from '../components/index/Main';
import Footer from '../components/includes/Footer';


function IndexHome(){
    /*const { userFullGoogle } = useContext(ContextLogin);
    const { userToken } = useContext(ContextToken);
    useEffect(() => {
        console.log("UserGoogle", userFullGoogle)
        console.log("Tokent: ", userToken)
    },[])*/
    return (
        <>
            <NavHeader/>
                <Header/>
                  <Main />
                    <Footer />    
        </>
    )
}
export default IndexHome;