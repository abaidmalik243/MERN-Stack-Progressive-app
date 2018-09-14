import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allMsg: [],
            loginDetail: JSON.parse(localStorage.getItem('loginDetail') || "{}"),
            Products: [],
            myCatId: this.props.match.params.cat_id,
            delId: '',
            titleAd: '',
            userName: ''
        }

        axios.post('/api/olx/loginAds', { userId: this.state.loginDetail._id })
            .then(res => {
                this.setState({ Products: res.data });
            }).catch(err => console.log(err));


    }

    componentDidMount() {
        // axios.post('/api/olx/loginAds', { userId: this.state.loginDetail._id })
        //     .then(res => {
        //         this.setState({ Products: res.data });
        //     }).catch(err => console.log(err));
    }

    delAssign = (id, title, user) => {
        if (id) {
            this.setState({ delId: id, titleAd: title, userName: user });
        }
    }

    showAllMsg = (id) => {
        const userId = this.state.loginDetail._id;
        // console.log(userId);
        if (id && userId) {
            // console.log(id)
            // this.setState({ delId: id, titleAd: title, userName: user });

            axios.post('/api/olx/showAllMsg', { adId: id, userId: userId })
                .then(res => {
                    // console.log(res.data);
                    this.setState({ allMsg: res.data });
                }).catch(err => console.log(err));
        }else{
            alert('Please again login your account for authentication');
        }
    }

    DeleteAd = (id) => {
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
        this.props.history.push("/loginAds");
    }



    render() {
        const { Products, allMsg } = this.state;
        return (

            <div>
                <h2>My Ads</h2><hr />
                <button id="jan" onClick={()=>console.log("working ....")} className="js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"></button>
                {/* <div><button type="button" className="btn btn-info js-push-btn">Subscribe</button></div> */}
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>Sr#</th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Category</th>
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
                                            <td>{product.catId.name}</td>
                                            {/* <td>{product.provinceId.name}</td> */}
                                            <td>{product.description}</td>
                                            {/* <td>{product.mobile}</td> */}
                                            <td style={{ width: '20%' }}>
                                                <Link to={`/adDetail/${product._id}`} className="btn btn-info btn-sm">View</Link>
                                                &nbsp;<button className="btn btn-danger btn-sm" data-toggle="modal" data-target="#myModal" onClick={() => this.delAssign(product._id, product.titleAd, product.userName)} >Delete</button>
                                                &nbsp; <br /><hr /><button className="btn btn-success btn-sm" data-toggle="modal" data-target="#showMsgModal" onClick={() => { this.showAllMsg(product._id) }} >Show Messages</button>
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

                        {/* Delete Modal content */}
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
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.DeleteAd(this.state.delId)}>Delete</button>
                                </div>
                            </div>
                        </center>
                        {/* end delete modal content */}


                    </div>
                </div>
                {/* end delete model */}


                {/* Start show msg Modal */}
                <div className="modal fade" id="showMsgModal" role="dialog">
                    <div className="modal-dialog modal-md">

                        {/* show msg Modal content */}
                        <center>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title"> All Messages </h4>
                                </div>
                                {/* <form onSubmit={this.sendAdMsg} method="POST" id='showmsg'> */}
                                <div className="modal-body">
                                    <div className="">
                                        { allMsg.length > 0 ?
                                            allMsg.map((msg, index) => {
                                            return (
                                                <div className="row" key={index}>
                                                    <div className="col-md-2"><label>Name: </label></div>
                                                    <div className="col-md-10"><input type="text" readOnly className="form-control" value={msg.name} name="senderName" /></div>
                                                    <hr />
                                                    <div className="col-md-2"><label>Mobile: </label></div>
                                                    <div className="col-md-10"><input type="text" readOnly className="form-control" value={msg.mobile} name="senderMobile" /></div>
                                                    <hr /><br />
                                                    <div className="col-md-2"><label>Message: </label></div>
                                                    <div className="col-md-10"><textarea name="msg" readOnly className="form-control" value={msg.msg} ></textarea></div>
                                                    <hr /><br /><hr />
                                                </div>
                                            )
                                        })
                                        : <div><center><h4>Empty Message Box</h4></center></div>
                                    }

                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    {/* <button type="submit" onClick={this.sendAdMsg} className="btn btn-success" data-dismiss="modal" >Send</button> */}
                                </div>
                                {/* </form> */}
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