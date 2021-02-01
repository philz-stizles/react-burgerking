import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'
import { authenticateAsync, setAuthRedirectPath } from '../../store/actions/auth'
import { checkValidity } from './../../utils/validation'
import './Auth.css'

class Auth extends Component {
    state = {
        isSignup: true,
        controls: {
            email: { 
                elementType: 'input',
                elementConfig: { type: 'email', placeholder: 'Email'},
                value: '',
                validations: {required: true},
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: { type: 'password', placeholder: 'Password'},
                value: '',
                validations: {required: true, minLength: 6},
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
    }

    componentDidMount() {
        const { building, authRedirectPath, onSetAuthRedirectPath } = this.props
        if(!building && authRedirectPath !== '/') {
            onSetAuthRedirectPath()
        }
    }

    inputChangeHandler = (event) => {
        console.log(event.target.name, event.target.value)
        const { name, value} = event.target
        const { controls } = this.state

        const updatedControls = {
            ...controls
        }

        const updatedFormField = {
            ...controls[name],
            value,
            valid: checkValidity(value, controls[name]['validations']),
            touched: true
        }

        updatedControls[name] = updatedFormField

        let formIsValid = true
        for(let field in updatedControls) {
            formIsValid = updatedControls[field].valid && formIsValid
        }

        this.setState({
            controls: updatedControls,
            formIsValid
        }, () => console.log(this.state.controls))
    }

    authHandler = (event) => {
        event.preventDefault()
        const { isSignup, controls: { email, password }} = this.state
        console.log(email.value, password.value)
        this.props.onAuth(email.value, password.value, isSignup)
    }

    authModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup}
        })
    }

    render() {
        const { controls, formIsValid, isSignup } = this.state
        const { loading, error, isAuthenticated, authRedirectPath } = this.props

        let errorMessage = null
        if(error) {
            errorMessage = (<p>{error.message}</p>)
        }

        let inputsOrSpinner = Object.keys(controls).map((field, i) => {
            return <Input 
                key={i} 
                shouldValidate={controls[field].validations}
                {...controls[field]} 
                name={field} 
                changed={this.inputChangeHandler} />
        })

        if(loading) {
            inputsOrSpinner = <Spinner />
        }

        let authRedirect = null
        if(isAuthenticated){
            authRedirect = <Redirect to={authRedirectPath} />
        }

        return (
            <div className="Auth">
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.authHandler}>
                    {inputsOrSpinner}
                    <Button disabled={!formIsValid} btnType="Success">ORDER</Button>
                </form>
                <Button click={this.authModeHandler} btnType="Danger">SWITCH TO {(isSignup) ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = ({ 
    auth: { loading, error, token, authRedirectPath } ,
    burger: { building }
}) => ({
    loading,
    error,
    isAuthenticated: token !== null,
    authRedirectPath,
    building
})

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, authMode) => dispatch(authenticateAsync(email, password, authMode)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth) 