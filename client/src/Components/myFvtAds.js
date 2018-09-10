import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MyFvtAds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetail: JSON.parse(localStorage.getItem('loginDetail') || "{}"),
            Products: [{
                adId: {
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
                },
                userId: '',

            }
            ],
        }

        axios.post('/api/olx/myFvtAds', { userId: this.state.loginDetail._id })
            .then(res => {
                console.log('fvt detail', res.data);
                this.setState({ Products: res.data });
                // console.log('state data ', this.state.Products);
            }).catch(err => console.log(err));
    }


    render() {
        const { Products } = this.state;
        console.log('fvt ads',Products);
        console.log('k', Products);
        return (
            <div>
                <h2>My Favorite Ads</h2><hr />
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>Sr#</th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            {/* <th>Category</th> */}
                            {/* <th>Province</th> */}
                            <th>Description</th>
                            {/* <th>Phn#</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Products.length > 0 ?
                                Products.map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td style={{ width: '15%' }}>{product.adId.titleAd}</td>
                                            <td style={{ width: '20%' }}>
                                                <img src={'http://localhost:9192/' + product.adId.productImage} className="img-responsive" alt='product' />
                                            </td>
                                            {/* <td>{product.adId.catId.name}</td> */}
                                            {/* <td>{product.provinceId.name}</td> */}
                                            <td>{product.adId.description}</td>
                                            {/* <td>{product.mobile}</td> */}
                                            <td style={{ width: '20%' }}>
                                                <Link to={`/adDetail/${product.adId._id}`} className="btn btn-info btn-sm">View</Link>
                                                {/* &nbsp;<button className="btn btn-danger btn-sm" data-toggle="modal" data-target="#myModal" onClick={() => this.delAssign(product.adId._id, product.adId.titleAd, product.adId.userName)} >Delete</button> */}
                                            </td>
                                        </tr>
                                    )
                                }
                                ) :
                                <tr>
                                    <td colSpan="6"><h2 className='text-center'>Ads Not Found</h2></td>
                                </tr>
                        }

                    </tbody>
                </table>
            </div>
        )
    }

}

export default MyFvtAds;