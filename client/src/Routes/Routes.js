import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../Components/Home';
import AdSubmit from '../Components/adSubmit';
import login from '../Components/login';
import register from '../Components/register';
import profile from '../Components/profile';
import productCategoryDisplay from '../Components/products';
import adDetail from '../Components/adDetail';
import loginAds from '../Components/loginAds';
import myFvtAds from '../Components/myFvtAds';
import Footer from './footer';
import logo from '../assets/images/olx.png';
import '../index.css'
// let adBtn = {
//     padding: '10px',
//     float: 'right'
// }
let logoStyle = {
    width: '70px',
    height: '70px',
    margin: 'auto'
}
// let secondUL_head = {
//     listStyle: 'none',
//     margin: '10px'

// }
let loginStyle = {


    // color: '#f0ad4e'
}

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetail: JSON.parse(localStorage.getItem('loginDetail')),
        }
        // console.log('my login id',this.state.loginDetail._id);
    }

   
    

    _logout = () => {
        localStorage.removeItem('loginDetail');
        alert('User logout ');
        // this.props.history.push("/login");
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <Router>
                                <div>

                                    {/* start */}
                                    <nav className="navbar navbar-default header-nav" >
                                        <div className="container-fluid">

                                            <div className="navbar-header">
                                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                                    <span className="sr-only">Toggle navigation</span>
                                                    <span className="icon-bar"></span>
                                                    <span className="icon-bar"></span>
                                                    <span className="icon-bar"></span>
                                                </button>
                                                <a className="navbar-brand" href="/"><img alt="logo" src={logo} className="" style={logoStyle} />

                                                </a>
                                            </div>

                                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                                <ul className="nav navbar-nav">
                                                    <li><Link to='/'><h3>Pakistan's Largest Marketplace</h3></Link></li>
                                                </ul>

                                                <ul className="nav navbar-nav navbar-right">
                                                    {this.state.loginDetail == null ?
                                                        <li><Link to='/login' className="btn btn-warning btn-md btnSubmit"><span className="glyphicon glyphicon-user"></span>&nbsp;My Account</Link></li>
                                                        :
                                                        <li className="dropdown">
                                                            <a href="#" className="dropdown-toggle btn btn-warning btn-md btnSubmit" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user"></span>&nbsp;{this.state.loginDetail.email} <span className="caret"></span></a>
                                                            <ul className="dropdown-menu">
                                                                <li><a href="/loginAds">My Account</a></li>
                                                                <li><a href="/myFvtAds">Favorite Ads</a></li>
                                                                <li role="separator" className="divider"></li>
                                                                <li><a href='/' onClick={this._logout}>Logout</a></li>
                                                            </ul>
                                                        </li>
                                                    }
                                                    <li><Link to='/AdSubmit' style={loginStyle} className="btn btn-warning btn-lg btnSubmit">Submit an Ad</Link></li>

                                                </ul>
                                            </div>
                                        </div>
                                    </nav>
                                    {/*  end*/}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Route exact path='/' component={Home} />
                                            <Route exact path='/AdSubmit' component={AdSubmit} />
                                            <Route exact path='/login' component={login} />
                                            <Route exact path='/register' component={register} />
                                            <Route exact path='/profile' component={profile} />
                                            <Route path='/category/:cat_id' component={productCategoryDisplay} />
                                            <Route path='/adDetail/:id' component={adDetail} />
                                            <Route path='/loginAds' component={loginAds} />
                                            <Route path='/myFvtAds' component={myFvtAds} />
                                        </div>
                                    </div>
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>

                <hr />

                <Footer />
            </div>
        )
    }

}
export default Routes;