import React from "react";

function Footer(){
    return(
        <>
                <section className="text-white mb-0" id="footer">
                    <div className="container">
                        <div className="text-center mt-4">
                            <button className="btn btn-outline-light btn-xl" type="button">
                                <i className="fa fa-download mr-2"></i><span>Instalar App Pwa</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <div className="text-center text-white copyright py-4">
                    <div className="container"><small>Copyright ©&nbsp;Gbyteinfo 2021 - Desenvolvido com muito rocK!</small></div>
                </div>
                <div className="d-lg-none scroll-to-top position-fixed rounded"><a className="text-center text-white d-block js-scroll-trigger rounded" href="#page-top"><i className="fa fa-chevron-up"></i></a></div>
        </>
    )
}
export default Footer