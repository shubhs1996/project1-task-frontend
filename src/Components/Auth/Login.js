import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'


import {login} from '../../store/actions/auth'

import './Login.css'

class Signin extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({ element: (message, className) => <div className="validateClass">{message}</div> });
        this.state = {
          email:'',
          password:''
        }
    }


    //handling submit
    handleSubmit=(e)=>{
        e.preventDefault()
        if (this.validator.allValid()) {
           this.props.signIn(this.state)
           this.setState({
             email:'',
             password:''
           })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
      
     
      
    }

    //handling change
    handleChange=(e)=>{
      this.setState({
        [e.target.id]:e.target.value,
      })
    }

    render() {
      //checking for authentication
     const {authToken}=this.props
     if(authToken) return <Redirect to='/'/>
     
        return (
            <div className="container white login-container">
              <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-lighten-1 center">Sign In</h5>
              
                <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" onChange={this.handleChange} value={this.state.email}/>
                {this.validator.message('', this.state.email, 'required')}
                </div>
                <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={this.handleChange} value={this.state.password}/>
                {this.validator.message('', this.state.password, 'required')}
                </div>
                <div className="input-field center">
                <button className="btn pink lighten-1 z-depth-0">Login</button>
                <div className="red-text center">
                {this.props.authError?<p>{this.props.authError}</p>:null}
                </div>
                </div> 
              </form>
                
            </div>
        )
    }
}



//mapping redux state to props of class component
const mapStateToProps=(state)=>{


  return{
    authError:state.Auth.authError,
    authToken:state.Auth.token,
    userId:state.Auth.user

  }
}
//mapping store actions to props
const mapDispatchToProps=(dispatch)=>{
  return {
    signIn:(creds)=> dispatch(login(creds)),
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Signin)