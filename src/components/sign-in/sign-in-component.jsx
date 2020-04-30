import React, { Component } from "react";

import './sign-in-styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signInWithGoogle } from '../../firebase/firbase.utils';
class SignIn extends Component {
 constructor(props) {
  super(props);
  this.state = {
   email: '',
   password: ''
  }
 }

 handleSubmit = event => {
  event.prevetDefaul();
  this.setState({
   email: '',
   password: ''
  });

 }

 handleChange = event => {
  const { value, name } = event.target;
  this.setState({ [name]: value });
 }

 render() {
  return (
   <div className="sign-in">
    <h2>
     I already have and account
    </h2>
    <span>Sign in with your email and password</span>
    <form onSubmit={this.handleSubmit}>
     <FormInput
      name="email"
      value={this.state.email}
      type="email"
      required
      handleChange={this.handleChange}
      label="email" />
     <FormInput
      name="password"
      value={this.state.password}
      type="password"
      required
      autoComplete="off"
      handleChange={this.handleChange} label="password" />
     <div className="buttons">
      <CustomButton type="submit">Sign In</CustomButton>
      <CustomButton isGoogleSignIn onClick={signInWithGoogle}>Sign In with Google</CustomButton>
     </div>
    </form>
   </div>
  )
 }

}

export default SignIn;