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
                                    <TiSocialFacebook className='icono' />
                                    <BiLogoLinkedin className='icono' />
                                    <BiLogoTwitter className='icono' />
                                    <AiOutlineInstagram className='icono' />
                                </div>
                                <div className='boton-footer-contenedor'>
                                    <button className='boton-footer'>CONTACTANOS</button>
                                </div>
                            </div>

                            <div className='parte-centro'>
                          
                                <div className='contenido-contacto'>

                                    <p className='texto-contacto'>    {<AiOutlinePhone className='icono' />} +58 414 527-2754</p>
                                    <p className='texto-contacto'>    {<AiOutlineMail className='icono' />} rocket-net@gmail.com</p>
                                    <p className='texto-contacto'>    {<TbBrandGoogleMaps className='icono' />}Zona este, Barquisimeto</p>
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
