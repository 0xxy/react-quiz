import React from "react";
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from "../../components/UI/Input/Input";
import axios from "axios";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export default class Auth extends React.Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Write correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Write correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLenth: 6
        }
      }
    }
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATKDjBrvHHGptbd3MB37xpjIIl9s3_rb8', authData)

      console.log(response);
    } catch(err) {
      console.log(err);
    }
  }

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATKDjBrvHHGptbd3MB37xpjIIl9s3_rb8', authData)

      console.log(response);
    } catch(err) {
      console.log(err);
    }
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if(!validation) {
      return true
    }

    let isValid = true

    if(validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if(validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if(validation.minLenth) {
      isValid = value.length >= validation.minLenth && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    
    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, isFormValid
    })
  } 

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input 
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Auth</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
           
           {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >Login</Button>

            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >Sign Up</Button>
          </form>
        </div>
      </div>
    )
  }
}