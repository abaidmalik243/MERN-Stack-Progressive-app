import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ad_image from '../assets/images/ad_image.jpg';
import house from '../assets/images/house.jpg';
import house1 from '../assets/images/house1.jpg';
import car from '../assets/images/car.jpg';
import car1 from '../assets/images/car1.jpg';
import mobile from '../assets/images/mobile1.jpg';
import ad from '../assets/images/ad.jpg';
import ad2 from '../assets/images/ad2.jpg';


var FontAwesome = require('react-fontawesome');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get('/api/olx/getAllCategories')
            .then(res =>
                this.setState({ categories: res.data })
            ).catch(err => console.log(err));
    }

    render() {
        const { categories } = this.state;
        return (
            <div>
                {/* Search bar */}
                {/* <div className="row">
                    <div className="col-md-12">
                        <div>
                        <div className="col-md-5">
                            <ul className="nav navbar-nav">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Select Category</a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a href="#" data-toggle="pill"></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-5"></div>
                        <div className="col-md-2"></div>
                        </div>
                    </div>
                </div> */}
                {/* end Search bar */}
                <div className="row">
                    <div className="col-md-8 col-sm-9 col-xs-12">
                        <div className="row text-center">
                            {categories.map((category, index) => {
                                return (
                                    <div className="col-md-2 col-sm-3 col-xs-3" key={index}>
                                        <Link to={`/category/${category._id}`}>
                                            <FontAwesome name="abc" className={category.image} size='2x' /><p>{category.name}</p>
                                        </Link>
                                    </div>
                                )
                            }
                            )}

                        </div>
                    </div>
                    <div className="col-md-4 col-sm-3 hidden-xs"><img alt="test1" src={ad_image} /></div>
                </div>

                <h2>FEATURED LINSTINGS</h2>
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-6"><img alt="test2" src={house} className="img-responsive" /></div>
                    <div className="col-md-4 col-sm-4 col-xs-6"><img alt="test3" src={house1} className="img-responsive" /></div>
                    <div className="col-md-4 col-sm-4 col-xs-12"><img alt="test4" src={car} className="img-responsive" /></div>
                </div><hr />
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-6"><img alt="test5" src={ad} className="img-responsive" /></div>
                    <div className="col-md-6 col-sm-6 col-xs-6"><img alt="test6" src={ad2} className="img-responsive" /></div>
                </div><hr />
                <h2>GREAT STORIES ON OLX</h2>
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-6">
                        <div>
                            <img alt="test7" src={house1} style={{ height: '200px' }} className="img-responsive" />
                            <p>Not Chinese telecommunications infrastructure company Huawei, which was recently excluded from involvement via a statement from then acting Home Affairs Minister Scott Morrison – now prime minister – and Communications Minister Mitch Fifield.</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-6">
                        <div>
                            <img alt="test8" src={mobile} style={{ height: '200px' }} className="img-responsive" />
                            <p>Not Chinese telecommunications infrastructure company Huawei, which was recently excluded from involvement via a statement from then acting Home Affairs Minister Scott Morrison – now prime minister – and Communications Minister Mitch Fifield.</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <div>
                            <img alt="test9" src={car1} style={{ height: '200px' }} className="img-responsive" />
                            <p>Not Chinese telecommunications infrastructure company Huawei, which was recently excluded from involvement via a statement from then acting Home Affairs Minister Scott Morrison – now prime minister – and Communications Minister Mitch Fifield.</p>
                        </div>
                    </div>
                </div><br /><br />
            </div>
        );
    }
}

export default Home;