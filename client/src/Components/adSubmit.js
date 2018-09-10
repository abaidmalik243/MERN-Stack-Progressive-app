import React, { Component } from 'react';
import axios from 'axios';

class AdSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDetail: JSON.parse(localStorage.getItem('loginDetail') || "{}"),
      ad: {
        titleAd: '',
        catId: '',
        description: '',
        userName: '',
        mobile: '',
        provinceId: '',
        cityId: '',
        modal: '',
        price: '',
        productImage: ''
      },
      categories: [],
      provinceList: [],
      cities: [],
    }
    // console.log(this.state.loginDetail._id);
    if (localStorage.loginDetail== null) {
      alert('Please login first');
      this.props.history.push("/login");
    }
  }

  _changeHandler = (e) => {
    const state = this.state.ad;
    state[e.target.name] = e.target.value;
    this.setState({
      state
    });

    const provinceId = this.state.ad.provinceId;
    if (provinceId) {
      axios.post('/api/olx/getAllCities', { provinceId: provinceId })
        .then(res => {
          // console.log(res)
          this.setState({ cities: res.data })
        }
        ).catch(err => console.log(err));
    }

  }

  componentDidMount() {
    axios.get('/api/olx/getAllCategories')
      .then(res =>
        this.setState({ categories: res.data })
      ).catch(err => console.log(err));

    axios.get('/api/olx/getAllProvince')
      .then(res =>
        this.setState({ provinceList: res.data })
      ).catch(err => console.log(err));
  }

  saveAd = (e) => {
    e.preventDefault();
    var form = document.getElementById('addform');
    var myFormData = new FormData(form);
    console.log("userid",this.state.loginDetail._id)
    myFormData.append("userId", this.state.loginDetail._id);
    axios.post('/api/olx/adSubmit', myFormData)
      .then(
        res => {
          if (res) {
            alert('New Ad has been added successfully');
            this.props.history.push("/");
          }

        })
      .catch((err) => {
        alert(err.message)
      })

    this.myFormRef.reset();

  }
  render() {
    const { categories, provinceList, cities } = this.state;
    return (
      <div className="row">

        <div className="col-md-8 col-md-offset-2">
          <div className="panel panel-default">
            <form onSubmit={this.saveAd} id='addform' ref={(el) => this.myFormRef = el} >
              <div className="panel-heading"><h1>Submit an Ad</h1></div>

              <div className="panel-body">
                <div className="form-group">
                  <div className="col-md-2 col-sm-2 col-xs-12"> <label className="control-label">Title Ad:</label></div>
                  <div className="col-md-10  col-sm-10 col-xs-12">
                    <input className="form-control" id="titleAd" name="titleAd" type="text" onChange={this._changeHandler} />
                  </div>
                </div><br /><br />
                <div className="form-group">
                  <div className="col-md-2  col-sm-2 col-xs-12"><label className="control-label">Category:</label></div>
                  <div className="col-md-10  col-sm-10 col-xs-12">
                    <select className="form-control" id="catId" name="catId" onChange={this._changeHandler}>
                      <option> -- Select Ad Category -- </option>
                      {categories.map((category, index) => {
                        return (<option key={category._id} value={category._id}>{category.name}</option>);
                      }
                      )}
                    </select>
                  </div>
                </div><br /><br />
                <div className="form-group">
                  <div className="col-md-2 col-sm-2 col-xs-12"> <label className="control-label">Model:</label></div>
                  <div className="col-md-10  col-sm-10 col-xs-12">
                    <input className="form-control" id="modal" name="modal" type="number" min="0" onChange={this._changeHandler} />
                  </div>
                </div><br /><br />
                <div className="form-group">
                  <div className="col-md-2 col-sm-2 col-xs-12"> <label className="control-label">Price:</label></div>
                  <div className="col-md-10  col-sm-10 col-xs-12">
                    <input className="form-control" id="price" name="price" type="number" min="0" onChange={this._changeHandler} />
                  </div>
                </div><br /><br />
                <div className="form-group">
                  <div className="col-md-2 col-sm-2 col-xs-12"> <label className="control-label">Description:</label></div>
                  <div className="col-md-10  col-sm-10 col-xs-12">
                    <textarea className="form-control" id="description" name="description" onChange={this._changeHandler}></textarea>
                  </div>
                </div><br /><br />
                <div className="form-group">
                  <div className="col-md-2 col-sm-2 col-xs-12"> <label className="control-label">Photo:</label></div>
                  <div className="col-sm-10">
                    {/* <img id="img" src={Productimage} style={imgStyle} className="img_profile" alt="" /> */}
                    <input type="file" name="productImage" className="form-control" />
                  </div>

                </div><br /><br />
                <div className="form-group">
                  <div className="col-md-2 col-sm-2 col-xs-12"> <label className="control-label">Username:</label></div>
                  <div className="col-md-10  col-sm-10 col-xs-12">
                    <input className="form-control" id="userName" name="userName" type="text" onChange={this._changeHandler} />
                  </div>
                </div><br /><br />
                <div className="form-group">
                  <div className="col-md-2 col-sm-2 col-xs-12"> <label className="control-label">Province:</label></div>
                  <div className="col-md-10  col-sm-10 col-xs-12">
                    <select className="form-control" id="provinceId" name="provinceId" onChange={this._changeHandler}>
                      <option> -- Select Your Province -- </option>
                      {provinceList.map((province, index) => {
                        return (<option key={province._id} value={province._id}>{province.name}</option>);
                      }
                      )}
                    </select>
                  </div>
                </div><br /><br />
                <div className="form-group">
                  <div className="col-md-2 col-sm-2 col-xs-12"> <label className="control-label">City:</label></div>
                  <div className="col-md-10  col-sm-10 col-xs-12">
                    <select className="form-control" id="cityId" name="cityId" onChange={this._changeHandler}>
                      <option key="0"> -- Select Your City -- </option>
                      {cities.map((city, index) => {
                        return (<option key={city._id} value={city._id}>{city.name}</option>);
                      }
                      )}
                    </select>
                  </div>
                </div><br /><br />
                <div className="form-group">
                  <div className="col-md-2 col-sm-2 col-xs-12"> <label className="control-label">Mobile:</label></div>
                  <div className="col-md-10  col-sm-10 col-xs-12">
                    <input className="form-control" id="mobile" name="mobile" type="number" min="0" onChange={this._changeHandler} />
                  </div>
                </div><br /><br />
                <p>By clicking 'Submit' you confirm that you have carefully read and understood all the facts, statements and conditions stated in the Terms of Use & Posting Rules of our website to which you unconditionally agree and accept as true and correct and constituting a binding agreement between us.</p>
              </div>

              <div className="panel-footer"><center><button type="submit" className='btn btn-lg btn-warning'>Post your Ad</button></center></div>
            </form>
          </div>

        </div>
        <div className="col-md-2  col-sm-2"></div>
      </div>
    );
  }
}

export default AdSubmit;
