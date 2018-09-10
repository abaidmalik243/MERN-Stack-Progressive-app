import React, { Component } from 'react';
import axios from 'axios';
// import formData from 'form-data';

class AdSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ad: {
        titleAd: '',
        catId: '',
        description: '',
        userName: '',
        mobile: '',
        provinceId: '',
        cityId: ''
      },
      categories: [],
      provinceList: [],
      cities: [],
      // selectedFile: null
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


    // debugger;
  }



  SaveAd = (e) => {
    e.preventDefault();
    // debugger;
    alert('001 => you are in Save ad, before debugger, hi!');

    // var ad_data = {
    //   titleAd: this.state.ad.titleAd.trim(),
    //   category: this.state.ad.category.trim(),
    //   description: this.state.ad.description.trim(),
    //   userName: this.state.ad.userName.trim(),
    //   mobile: this.state.ad.mobile.trim(),
    //   province: this.state.ad.provinceId.trim(),
    //   city: this.state.ad.city.trim(),
    //   // myImage: e.target.productImage
    // }
    // debugger;

    var form = document.getElementById('addform');
    var myFormData = new FormData(form);
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

        <div className="col-md-8">
          <div className="panel panel-default">
          {/* encType="multipart/form-data" */}
            <form onSubmit={this.SaveAd} id='addform' ref={(el) => this.myFormRef = el} >
              <div className="panel-heading"><h1>Submit an Ad</h1></div>
              <div className="panel-body">

                <div className="form-group">
                  <label className="col-sm-2 control-label">Title Ad :</label>
                  <div className="col-md-10">
                    <input className="form-control" id="titleAd" name="titleAd" type="text" onChange={this._changeHandler} />
                  </div>
                </div><hr />
                <div className="form-group">
                  <label className="col-sm-2 control-label">Category*</label>
                  <div className="col-md-10">
                    <select className="form-control" id="catId" name="catId" onChange={this._changeHandler}>
                      <option> -- Select Ad Category -- </option>
                      {categories.map((category, index) => {
                        return (
                          <option key={category._id} value={category._id}>{category.name}</option>
                        )
                      }
                      )}

                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">Modal</label>
                  <div className="col-md-10">
                    <input className="form-control" id="modal" name="modal" type="text" onChange={this._changeHandler} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">Price</label>
                  <div className="col-md-10">
                    <input className="form-control" id="price" name="price" type="text" onChange={this._changeHandler} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">Description*.</label>
                  <div className="col-md-10">
                    <textarea className="form-control" id="description" name="description" onChange={this._changeHandler}></textarea>
                  </div>
                </div><br />
                <div className="form-group">
                  <label className="col-md-2"></label>
                  <div className="col-sm-10">
                    {/* <img id="img" src={Productimage} style={imgStyle} className="img_profile" alt="" /> */}
                    <input style={{ display: 'block' }} type="file" name="productImage" />
                  </div>

                </div><br />
                <div className="form-group">
                  <label className="col-sm-2 control-label">Name *</label>
                  <div className="col-md-10">
                    <input className="form-control" id="userName" name="userName" type="text" onChange={this._changeHandler} />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="col-sm-2 control-label">Province*</label>
                  <div className="col-md-10">
                    <select className="form-control" id="provinceId" name="provinceId" onChange={this._changeHandler}>
                      <option> -- Select Your Province -- </option>
                      {provinceList.map((province, index) => {
                        return (
                          <option key={province._id} value={province._id}>{province.name}</option>
                        )
                      }
                      )}

                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">City</label>
                  <div className="col-md-10">
                    <select className="form-control" id="cityId" name="cityId" onChange={this._changeHandler}>
                      <option key="0"> -- Select Your City -- </option>
                      {cities.map((city, index) => {
                        return (
                          <option key={city._id} value={city._id}>{city.name}</option>
                        )
                      }
                      )}

                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">Phone number*</label>
                  <div className="col-md-10">
                    <input className="form-control" id="mobile" name="mobile" type="text" onChange={this._changeHandler} />
                  </div>
                </div>
                <p>By clicking 'Submit' you confirm that you have carefully read and understood all the facts, statements and conditions stated in the Terms of Use & Posting Rules of our website to which you unconditionally agree and accept as true and correct and constituting a binding agreement between us.</p>

              </div>
              <div className="panel-footer"><button type="submit" className='btn btn-primary'>Submit</button>
              </div>
            </form>
          </div>

        </div>
        <div className="col-md-2">

        </div>
      </div>
    );
  }
}

export default AdSubmit;
