import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBBtn
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../styles/Footer.css';
import logo from '../Images/logo2.png';
import { TiSocialFacebook } from 'react-icons/ti';
import { BiLogoLinkedin } from 'react-icons/bi';
import { BiLogoTwitter } from 'react-icons/bi';
import { AiOutlineInstagram } from 'react-icons/ai';
import { AiOutlinePhone } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai';
import {TbBrandGoogleMaps} from 'react-icons/tb';




export default function Footer() {
    return (
        <MDBFooter className='contenido-footer'>
            <MDBContainer className='container-footer'>
                <MDBRow className='nose'>
                    <MDBCol>
                        <div className='panel-footer'>
                            <div className='parte-izquierda'>

                                <div className='contenedor-logo'><img src={logo} alt="" /></div>
                                <div className='iconos-contenedor'>
                                   <a href="https://www.facebook.com"> <TiSocialFacebook className='icono' /></a>
                                   <a href="https://ve.linkedin.com"> <BiLogoLinkedin className='icono' /></a>
                                   <a href="https://www.twitter.com"> <BiLogoTwitter className='icono' /></a>
                                   <a href="https://www.instagram.com">  <AiOutlineInstagram className='icono' /></a>
                                </div>
                                <div className='boton-footer-contenedor'>
                                  <a href="https://web.whatsapp.com/send?phone=584145272754"><button className='boton-footer'>CONTACTANOS</button> </a>
                                </div>
                            </div>

                            <div className='parte-centro'>
                          
                                <div className='contenido-contacto'>

                                    <a className='texto-contacto' href='https://web.whatsapp.com/send?phone=584145272754'>    {<AiOutlinePhone className='icono' href=''/>} +58 000 000-0000</a>
                                    <a className='texto-contacto' href='mailto:rocketnet@gmail.com? subject=Quiero contratar sus servicios'>    {<AiOutlineMail className='icono' />} rocket-net@gmail.com</a>
                                    <a className='texto-contacto' href='https://www.google.com/maps/@39.550051,-105.782067,6z?hl=es'>    {<TbBrandGoogleMaps className='icono' />}Zona este, Barquisimeto</a>
                                </div>
                            </div>

                            <div className='parte-derecha'>
                                <h2>Un poco sobre nosotros...</h2>
                                <p> La empresa líder en el mercado de servicios de Internet. Nuestro compromiso es proporcionarte una conexión estable y veloz para que puedas disfrutar de una experiencia en línea sin interrupciones.</p>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <div>
                <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '20px 0' }} />
            </div>

            <div className='texto-derechos'>
                © {new Date().getFullYear()} Rocket.net. Todos los derechos reservados.
            </div>
        </MDBFooter>
    );
}
