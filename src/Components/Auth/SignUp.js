import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator'
import {connect} from 'react-redux'
import {signUp} from '../../store/actions/auth'

import  './SignUp.css'
import { Redirect, Link } from 'react-router-dom'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({ element: (message, className) => <div className="validateClass">{message}</div> });
        this.state = {
            email:'',
            password:'',
            firstname:'',
            lastname:'',
        }
    }
  

    


  //handling submit
      handleSubmit= (e)=>{
        e.preventDefault()
        if (this.validator.allValid()) {
         this.props.signUp(this.state)
          this.setState({
            email:'',
            password:'',
            firstname:'',
            lastname:'',
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
      // const {signUpErr}=this.props;
      // if(!signUpErr) return <Redirect to='/auth/login'/>

        return (
            <div className="container white signup-container">
            {this.props.signUpMessage?<div className="success-msg">{this.props.signUpMessage} <Link onClick={this.props.onSuccessful}>click to Login</Link></div>:null}
              <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-lighten-1 center">Sign Up</h5>
                
                <div className="input-field">
                <label htmlFor="firstname">First Name</label>
                <input type="text" id="firstname" onChange={this.handleChange} value={this.state.firstname}/>
                {this.validator.message('', this.state.firstname, 'required')}
                </div>
                <div className="input-field">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" onChange={this.handleChange} value={this.state.lastname}/>
                {this.validator.message('', this.state.lastname, 'required')}
                </div>
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
                <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
                <div className="red-text center">
               {this.props.signUpErr?this.props.signUpErr:null}
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
    signUpErr:state.Auth.signUpErr,
    signUpMessage:state.Auth.signUpMsg
  }
}

//mapping store actions to props
const mapDispatchToProps=(dispatch)=>{
  return {
    signUp:(creds)=> dispatch(signUp(creds)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)