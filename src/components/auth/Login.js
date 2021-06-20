import React, { Component } from 'react';
import axios from 'axios';
import '../../style/sign_up.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            formErrors: {}

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
        
        
    }
    
    handleSubmit(event){
        console.log("submitted");
        axios.post("http://localhost:3000/users/sign_in", {
            user: {
                email: this.state.email,
                password: this.state.password,
            
            }
        },
        {withCredentials: false}
        )
        .then(response => {
            console.log(response.data);
            if (response.data.message === 'You are logged in'){
                console.log("login successful");
                this.handleSuccessfulAuth(response.data);
            }
            else {
                this.setState({
                    formErrors: "Wrong e-mail or password."
                })

            }
        })
        .catch(error =>{
            console.log("login error", error);
        });
        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push("/");
    }
   
    render() { 
        var errors=[];
        if(this.state.formErrors){
            for(const error in this.state.formErrors){
                for(const [i,detail] of this.state.formErrors[error].entries()){
                    errors.push(<li>{error} {detail}</li>);
                }
            }
        }
        return ( 
            <div className="outer">
                    
            <div className="mt-5 mb-5 inner">
            <div className="alert alert-danger m-4">
                        {errors}
                    </div>
                <form onSubmit={this.handleSubmit}>
                <h3>Log In</h3>
                <br/>
                
                <div className="form-group">
                    <label>Email</label>
                    <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    placeholder="email@example.com" 
                    value={this.state.email} 
                    onChange={this.handleChange}
                    required  />
                </div>

                <div className="form-group mb-5">
                    <label>Password</label>
                    <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    placeholder="Your Password" 
                    value={this.state.password} 
                    onChange={this.handleChange}
                    required/>
                </div>


                <button type="submit" className="btn btn-dark btn-lg btn-block ">Register</button>
                <p className="forgot-password text-right">
                    Don't have an account? <a href="/sign_up">Create one</a>
                </p>
            </form>
            
        </div>
        </div>);
    }
}
 
export default Login;