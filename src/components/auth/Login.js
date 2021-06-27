import React, { Component } from 'react';
import axios from 'axios';
import '../../style/sign_up.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {PRODUCTION_BACKEND_URL,PRODUCTION_FRONTEND_URL} from '../../constants/index.js'
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
        axios.post(`${PRODUCTION_BACKEND_URL}/users/sign_in`, {
            user: {
                email: this.state.email,
                password: this.state.password,
            }
        },
        // {headers: {
        // "Access-Control-Allow-Credentials":"true"}},
        
        // {withCredentials: true}
        {headers: {"Access-Control-Allow-Origin": `${PRODUCTION_FRONTEND_URL}`,
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "Content-Type"}}
        )
        .then(response => {
            // console.log(response);
            if (response.status === 200){
                console.log("login successful");
                this.handleSuccessfulAuth(response.data);
                console.log(response.data);
            }
            // else {
            //     this.setState({
            //         formErrors: "Wrong e-mail or password."
            //     })

            // }
        })
        .catch(error =>{
            console.log(error);
            if (error.response?.status === 401){
                this.setState({
                    formErrors:Object.assign(this.state.formErrors, {error: "Wrong e-mail or password."})
                })
            }
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
        if(data.user.role == 'admin'){
            this.props.history.push("/admin");
        }
        else if(data.user.role == 'seller'){
            axios.post(`${PRODUCTION_BACKEND_URL}/get_bookstore_from_seller`,{
                seller_id: data.user.id
            })
            .then(response =>{
                if (response.data.message === "Bookstore Found"){
                    var store_id = response.data.bookstore_id
                    this.props.history.push(`/bookstorebooks/${store_id}`);
                }
                else{
                    console.log('you have no stores somehow');
                    this.props.history.push('/');
                }
            })
            .catch(error =>{
                console.log(error)
            })
        }
        else{
            this.props.history.push("/");
        }
    }
   
    render() { 
        var errors=[];
        if(Object.keys(this.state.formErrors).length >0){
            for(const error in this.state.formErrors){
                    errors.push(<li>{this.state.formErrors[error]}</li>);
            }
            console.log(this.state.formErrors)
        }
        return ( 
            <div className="outer" style={{background: `url('${process.env.PUBLIC_URL}/img/home_backgrnd.png')`}}>
                    
            <div className="mt-5 mb-5 inner" >
                { errors.length > 0 &&
            <div className="alert alert-danger m-4">
                        {errors}
                    </div>}
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


                <button type="submit" className="btn btn-dark btn-lg btn-block ">LogIn</button>
                <p className="forgot-password text-right">
                    Don't have an account? <a href="/sign_up">Create one</a>
                </p>
            </form>
            
        </div>
        </div>);
    }
}
 
export default Login;