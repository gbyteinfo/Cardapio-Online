import React, { useContext } from "react";
import {Player} from '@lottiefiles/react-lottie-player';
import BtnLottieWhatsapp from '../../assets/loties/12305-whats-app-micro-interactions.json';
import Logo from '../../assets/img/imgs/Delivery-de-Lanches-Sumare-Kannibal-Burgues-Disk-Entrega-Sumare.png';
import Modal from "../Modal_Login/ModalL";
import { ContextLogin } from "../../context/ContextLogin";


function Header(){
    const { btnHeaderr } = useContext(ContextLogin);
    return(
        <>
        <header className="text-center text-white bg-dark masthead" style={{margin:"0px"}}>
            <div className="container">
            <img src={Logo} className="" id="logoImg" alt="imagem" width="100px" style={{margin:"0px 0px 0px 0px !important", padding:"0px !important" }}/>
                <h2 className="font-weight-light mb-0 banner-h2">Faça seu pedido online</h2>
                <h1 className="font-weight-light mb-0 banner-h1"><b className="bn-span-1">Delivery</b><br/> <b class="bn-span-2">de Lanches</b></h1>
                <div className="mt-7 banner-a-btn" id="bannerBtn">
                    <button className="btn cor-btn-lottie-whatsapp btn-xl " type="button" data-toggle="modal" href="#modal-l">
                        <span className="span-lottie-btn">{btnHeaderr}</span>
                        <Player
                            src={BtnLottieWhatsapp}
                            background="transparent" 
                            speed="0.9" 
                            className="fa banner-lottie-player" 
                            loop 
                            autoplay >
                        </Player>
                    </button>
                    {/*<button className="btn btn-xl cor-btn-lottie-google" type="button" >
                    <span className="span-lottie-btn">Login Com Google</span>
                        <Player
                            src={BtnLottieGoogle}
                            background="transparent" 
                            speed="0.6" 
                            className="fa banner-lottie-player-google" 
                            loop 
                            autoplay >
                        </Player>
                       
                    </button>*/}
                </div>
            </div>
        </header>
        <Modal/>
        </>
    )
}
export default Header