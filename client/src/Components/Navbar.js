import React  from 'react';
import { //BrowserRouter as Router, Route , 
    Link
} from 'react-router-dom';

class Navbar extends React.Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse" >
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <a className="navbar-brand" href="javascript:void(0)">OLX APP</a>
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>

                                </div>
                                <div className="collapse navbar-collapse" id="myNavbar">
                                    <ul className="nav navbar-nav">
                                        <li><Link to='/'>Pakistan's Largest</Link></li>
                                    </ul>

                                </div>
                            </div>
                        </nav>

                {/* <nav className="navbar navbar-inverse">
                    <div className="container">
                        <ul className="nav navbar-nav">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/insert'>Data Insert</Link></li>
                        </ul>
                    </div>
                </nav> */}
            </div>
        );
    }
}

export default Navbar;