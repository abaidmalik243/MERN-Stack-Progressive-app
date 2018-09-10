import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Products: [],
            myCatId: this.props.match.params.cat_id,
            delId: '',
            titleAd: '',
            userName: ''
        }

        axios.post('/api/olx/category/:cat_id', { cat_id: this.state.myCatId })
            .then(res => {
                this.setState({ Products: res.data });
            }).catch(err => console.log(err));
    }

    delAssign = (id, title, user) => {
        if (id) {
            this.setState({ delId: id, titleAd: title, userName: user });
        }
    }

    DeleteBook = (id) => {
        // alert('you are in delete function');
        axios.delete('/api/olx/deleteProduct', { data: { id: id } })
            .then(res => {
                console.log(res.data);
                if (res) {
                    axios.post('/api/olx/category/:cat_id', { cat_id: this.state.myCatId })
                        .then(res => {
                            this.setState({ Products: res.data });
                        }).catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err))

    }



    render() {
        const { Products } = this.state;
        return (
            <div>
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
                                            <td style={{ width: '15%' }}>{product.titleAd}</td>
                                            <td style={{ width: '20%' }}>
                                                <img src={'http://localhost:9192/' + product.productImage} className="img-responsive" alt='product' />
                                            </td>
                                            {/* <td>{product.catId.name}</td> */}
                                            {/* <td>{product.provinceId.name}</td> */}
                                            <td>{product.description}</td>
                                            {/* <td>{product.mobile}</td> */}
                                            <td style={{ width: '20%' }}>
                                                <Link to={`/adDetail/${product._id}`} className="btn btn-info btn-sm">View</Link>
                                                {/* &nbsp;<button className="btn btn-danger btn-sm" data-toggle="modal" data-target="#myModal" onClick={() => this.delAssign(product._id, product.titleAd, product.userName)} >Delete</button> */}
                                            </td>
                                        </tr>
                                    )
                                }
                                ) :
                                <tr>
                                    <td colSpan="6"><h2 className='text-center'>Ads Not Fount</h2></td>
                                </tr>
                        }

                    </tbody>
                </table>

                {/* Start Modal */}
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog modal-sm">

                        {/* Modal content */}
                        <center>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Are you sure to delete your Ad?</h4>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Product Name: </strong> {this.state.titleAd}</p>
                                    <p><strong>User Name: </strong> {this.state.userName}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.DeleteBook(this.state.delId)}>Delete</button>
                                </div>
                            </div>
                        </center>
                        {/* end modal content */}

                    </div>
                </div>
                {/* end model */}
            </div>
        )
    }

}

export default Products;