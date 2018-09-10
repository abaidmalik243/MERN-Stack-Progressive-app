import React from 'react'
import logo from '../assets/images/olx.png';
// import '../index.css'
class Footer extends React.Component {
    render() {
        return (
            <footer className="container-fluid footer-background" style={{ minHeight: 200, }} >
                <div className="container">

                    <div className='row' >
                    <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-2 col-sm-2 col-xs-12" >
                            <img src={logo} className="img-fluid" width={80} alt="" />
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-6" >
                            <ul className="list-unstyled" >
                                <li> <a href="#">Location Map</a> </li>
                                <li><a href="#">Popular Searches</a> </li>
                                <li><a href="#">Sitemap</a> </li>
                            </ul>
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-6" >
                            <ul className="list-unstyled" >
                                <li> <a href="#">Who we are </a> </li>
                                <li><a href="#">Join OLX</a> </li>
                                <li><a href="#">Happy OLXers</a> </li>

                            </ul>
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-6" >
                            <ul className="list-unstyled" >
                                <li> <a href="#">Terms of Use</a> </li>
                                <li><a href="#">Help & Contact Us</a> </li>

                            </ul>
                        </div>
                        
                        <div className="col-md-2 col-sm-2 col-xs-6" >
                            <ul className="list-unstyled" >
                                <li style={{ fontWeight: 'bold' }} >Contact Us</li>
                                <li> <a href="#">help@olx.com.pk</a> </li>
                                <li><a href="#"><h6>080010101 <small> (9:30am to 6:30pm)</small></h6></a> </li>
                                <li><a href="#"><h6>Business Packages <small>(featured ads, advertising)</small></h6></a> </li>
                                <li><a href="#">click here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;