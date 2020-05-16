import React, { useState } from 'react';
import './LoginForm.css';
import { API_BASE_URL } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function LoginForm(props)
{
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })
    const handleChange = (e) =>
    {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) =>
    {
        e.preventDefault();
        const payload =
        {
            "email": state.email,
            "password": state.password,
        }
        //TODO
        //Use promises and asyn awaits to handle login stuff
    }

    const redirectToHome = () =>
    {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToRegister = () =>
    {
        props.history.push('/register');
        props.updateTitle('Register');
    }
    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label /*htmlFor="exampleInputEmail1"*/>Username</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter username"
                        value={state.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? <br></br></span>
                <span className="loginText click-here" onClick={() => redirectToRegister()}>CLICK HERE<br></br></span>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);