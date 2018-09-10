import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pwd: '',
      re_pwd: ''
    }
  }

  _checkPassword = (e) => {
    const { pwd, re_pwd } = this.state;
    // console.log(' pass ', this.state.pwd)
    // console.log('re pass ', this.state.re_pwd)
    if (pwd !== re_pwd){
      alert('Your password is Wrong (not match)');
      this.myForm.reset();
    }
  }

  _checkEmail = (e) => {
    // e.preventDefault();

    const { email } = this.state; // const email = this.state.email;
    var userEmail = { email: email }
    // console.log(userEmail);
    // alert('state email is :  ', userEmail)

    axios.post('/api/olx/checkEmail', userEmail)
      .then(
        res => {
          if (res) {

            if (res.data) {
              alert('This email address is already registered');
              // document.getElementById('error_email').innerHTML('This email address is already registered')
              this.myForm.reset();
            } else {
              // alert("Email Available");
            }

          }

        });
  }

  _changeHandler = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({
      state
    })
  }

  addNewUser = (e) => {
    e.preventDefault();
    // alert('before debugger, hi!');
    // debugger;
    const { email, pwd } = this.state;

    axios.post('/api/olx/addUser', { email, pwd })
      .then(
        res => {
          if (res) {
            alert('Your are successfully registered');
            this.props.history.push("/");
          }

        });
        this.myForm.reset();
  }
  render() {
    return (
      <div>
        <div className="row">

          <div className="col-md-8 col-sm-8 col-xs-12 col-md-offset-2 col-sm-offset-2">
            <div className="panel panel-default">
              <form onSubmit={this.addNewUser} method="POST" ref={(el) => { this.myForm = el }}>
                <div className="panel-heading"><h3>Registration Form</h3></div>
                <div className="panel-body">

                  <div className="form-group">
                    <label className="col-md-3 col-sm-3 control-label">Email:</label>
                    <div className="col-md-9 col-sm-9">
                      <input className="form-control" name="email" type="email" placeholder="Enter your email" onBlur={this._checkEmail} onChange={this._changeHandler} />
                      <span id="error_email"></span>
                    </div>
                  </div><hr />
                  <div className="form-group">
                    <label className="col-md-3 col-sm-3 control-label">Password:</label>
                    <div className="col-md-9 col-sm-9">
                      <input className="form-control" name="pwd" type="password" placeholder="Enter your password" onChange={this._changeHandler} />
                    </div>
                  </div><hr /><hr />

                  <div className="form-group">
                    <label className="col-md-3 col-sm-3 control-label">Repeat Password:</label>
                    <div className="col-md-9 col-sm-9">
                      <input className="form-control" type="password" name="re_pwd" onBlur={this._checkPassword} onChange={this._changeHandler} placeholder="Enter again your password" />
                    </div>
                  </div>


                </div>
                <div className="panel-footer"><button className='btn btn-primary btn-lg'>Create Account</button>
                </div>
              </form>
            </div>
            <Link to='/login' >Your have already registeration? Login</Link>
          </div>
          <div className="col-md-2"></div>
        </div>

      </div>
    );
  }
}

export default App;
