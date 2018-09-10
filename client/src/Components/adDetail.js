import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import car from '../assets/images/car.jpg';

class AdDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adId: this.props.match.params.id,
            loginDetail: JSON.parse(localStorage.getItem('loginDetail') || "{}"),
            checkFvtBtn: 'T',
            adDetail: {
                titleAd: '',
                description: '',
                catId: {
                    name: '',
                },
                provinceId: {
                    name: '',
                },
                cityId: {
                    name: '',
                },
                userName: '',
                price: '',
                productImage: '',
                modal: ''
            }
        }

        // console.log('user is at client side: ', this.state.loginDetail._id);
        axios.post('/api/olx/adDetail', { adId: this.state.adId })
            .then(res => {
                // console.log('detail', res.data)
                this.setState({ adDetail: res.data });
            }).catch(err => console.log(err));

    }


    componentDidMount() {

        axios.post('/api/olx/checkFvt', { adId: this.state.adId, userId: this.state.loginDetail._id })
            .then(res => {
                // console.log('detail', res.data)
                if (res.data == "found") {
                    this.setState({ checkFvtBtn: 'F' })
                } else {
                    this.setState({ checkFvtBtn: 'T' })
                }
            }).catch(err => console.log(err));

    }

    _addFavorite = (adId) => {
        if (adId && this.state.loginDetail._id) {
            axios.post('/api/olx/addFvt', { adId: adId, userId: this.state.loginDetail._id })
                .then(res => {
                    if (res.data !== "error") {
                        this.setState({ checkFvtBtn: 'F' })
                        alert('This ad successfully added in your favorite ads');
                    } else {
                        this.setState({ checkFvtBtn: 'T' })
                        alert('This ad id and user id is already exist');
                    }
                }).catch(err => console.log('err of fvt ', err));
        } else {
            alert('Please login first to add into your favorite Ads');
        }
    }

    _removeFavorite = (adId) => {
        if (adId) {
            // alert('at Un favorite');  
            // console.log('Ad id is: '+ adId + ' Uses id  is: '+ this.state.loginDetail._id); 

            const delFvtRecord = { adId: adId, userId: this.state.loginDetail._id }
            axios.delete('/api/olx/removeFvt', { data: delFvtRecord })
                .then(res => {
                    if (res) {
                        this.setState({ checkFvtBtn: 'T' });
                    }
                }).catch(err => console.log(err));
        }
    }



    render() {


        return (
            <div>
                {/* <h3>Product Detail Page</h3> */}
                <div className=''>
                    {this.state.adDetail ?
                        <div className='row'>

                            <div className='col-md-8' style={{ border: '1px solid lightgray' }}>
                                <div><br />
                                    <center><img src={'http://localhost:9192/' + this.state.adDetail.productImage} alt='jk' className="img-responsive" /></center>
                                </div>
                                <hr />
                                <div>
                                    <h3 style={{ textDecoration: 'underline' }}>Product Detail</h3>

                                    <div>
                                        <p>
                                            <strong>Product Name: </strong>{this.state.adDetail.titleAd} <br /><br />
                                            <strong>Model: </strong>{this.state.adDetail.modal} <br />
                                            <strong>Category: </strong>{this.state.adDetail.catId.name} <br /><br />
                                            <strong>Province: </strong>{this.state.adDetail.provinceId.name} <br />
                                            <strong>City: </strong>{this.state.adDetail.cityId.name}
                                        </p>
                                        <p>{this.state.adDetail.description}</p>
                                        <p style={{ fontStyle: 'italic', opacity: '0.5' }}>When you call, don't forget to mention that you found this ad on OLX.com.pk
                                                I do not wish to be contacted by telemarketers or representatives of any other website.
                                    </p>
                                    </div>
                                </div>

                            </div>
                            <div className='col-md-4'>
                                <div style={{ border: '1px solid lightgray' }}>
                                    <div style={{ backgroundColor: '#ffee7e', display: 'block', padding: '10px', textAlign: 'center' }}><h3>Rs: {this.state.adDetail.price}</h3></div>
                                    <div style={{ backgroundColor: '#f1f5fc', margin: '5px', padding: '10px 0px', textAlign: 'center' }}>
                                        <strong>Post by: {this.state.adDetail.userName}</strong>
                                        {/* <p>Click here to view user ads</p> */}
                                        {/* <Link to={`/user/${this.state.adDetail._id}`}>User Ads</Link> */}
                                    </div>
                                    <div style={{ backgroundColor: '#f1f5fc', margin: '5px', padding: '10px 0px', textAlign: 'center' }}>
                                        <strong>Phone Number</strong>
                                        <p>{this.state.adDetail.mobile}</p>
                                    </div>
                                    <div style={{ backgroundColor: '#f1f5fc', margin: '5px' }}>
                                        <div style={{ margin: '0px 30px', padding: '10px 0px' }}>
                                            <center><strong>Safety Tips for Buyers</strong></center><br />
                                            <p>1: Meet seller at safe location <br />
                                                2: Check the item before you buy <br />
                                                3: Pay only after collecting item
                                    </p>
                                        </div>
                                    </div>
                                    <div><center>
                                        {this.state.checkFvtBtn == 'T' ?
                                            <p className="btn btn-info" onClick={() => { this._addFavorite(this.state.adDetail._id) }}>Add to Favorite</p>
                                            :
                                            <p className="btn btn-warning" onClick={() => { this._removeFavorite(this.state.adDetail._id) }}> Remove from Favorite</p>
                                        }
                                        {/* <p className="btn btn-success">Send message to Seller</p> */}
                                    </center></div><br />
                                </div>
                            </div>
                        </div>
                        : <div>Not found</div>}
                </div>
            </div>
        )
    }
}

export default AdDetail;