import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { stringify } from 'querystring';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emeil: '',
      pwd: '',
      loginDetail: {}
    }
  }

  _changeHandler = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value.trim();
    this.setState({
      state
    })
  }

  loginData = (e) => {
    e.preventDefault();

    // alert('Login Page');
    // debugger;
    const { email, pwd } = this.state; // const email = this.state.email;
    var data = {
      // email: e.target.email.value.trim(),
      // pwd: e.target.pwd.value.trim()
      email: email,
      pwd: pwd
    }
    // console.log(data);

    // this.state.loginDetail.push(data);
    // this.setState({ loginDetail: this.state.loginDetail });
    axios.post('/api/olx/login', data)
      .then(
        res => {
          if (res) {
            // alert('you are at login page');
            console.log(res);
            if (res.data !== 'NO') {
              alert('You are successfully logged in');
              // console.log(res.data);
              localStorage.setItem('loginDetail', JSON.stringify(res.data));
              // this.props.history.push("/profile");
              this.props.history.push("/loginAds");
            } else {
              alert('Email or Password is invalid, plz try again.');
              this.props.history.push("/login");
            }

          }

        });
    this.myFormRef.reset();
    // debugger;
  }
  render() {
    return (
      <div className="row">

        <div className="col-md-8 col-sm-8 col-xs-12 col-md-offset-2 col-sm-offset-2">
          <div className="panel panel-default">
            <form onSubmit={this.loginData} ref={(el) => this.myFormRef = el}>
              <div className="panel-heading"><h3>Login Form</h3></div>
              <div className="panel-body">

                <div className="form-group">
                  <label className="col-md-3 col-sm-3 control-label">Email:</label>
                  <div className="col-md-9 col-sm-9">
                    <input className="form-control" type="email" name="email" placeholder="Enter your email" onChange={this._changeHandler} />
                  </div>
                </div><hr />
                <div className="form-group">
                  <label className="col-md-3 col-sm-3 control-label">Password</label>
                  <div className="col-md-9 col-sm-9">
                    <input className="form-control" type="password" name="pwd" placeholder="Enter your password" onChange={this._changeHandler} />
                  </div>
                </div>

              </div>
              <div className="panel-footer"><button type="submit" className='btn btn-primary btn-lg'>Login</button>
              </div>
            </form>
          </div>

          <Link to='/register' >New user? Register your account</Link>

        </div>
        <div className="col-md-2">

        </div>
      </div>
    );
  }
}

export default Login;
