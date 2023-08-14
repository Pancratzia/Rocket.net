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


export default function Footer() {
    return (
        <MDBFooter className='contenido-footer'>
            <MDBContainer className='container-footer'>
                <MDBRow className='nose'>
                    <MDBCol>
                        <div className='panel-footer'>
                            <div className='parte-izquierda'>

                                <h2>CONOCENOS</h2>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore adipisci eius, odit excepturi ex consectetur, totam ipsa facere quam cupiditate vel doloremque, suscipit corporis voluptate laboriosam veritatis doloribus exercitationem consequatur?</p>
                            </div>

                            <div className='parte-derecha'>
                                <h2>SERVICIOS</h2>
                                <p> LOLorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore adipisci eius, odit excepturi ex consectetur, totam ipsa facere quam cupiditate vel doloremque, suscipit corporis voluptate laboriosam veritatis doloribus exercitationem consequatur?</p>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <div>

            <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '20px 0' }} />

</div>

            <div className='texto-derechos'>
                © {new Date().getFullYear()} Rocket.net. All rights reserved.
            </div>
        </MDBFooter>
    );
}
