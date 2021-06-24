import React, { Component } from 'react';
import '../style/notfound.css'

class NotFound extends Component {
    constructor(props){
        super(props);
        this.goToHome=this.goToHome.bind(this);
    }
    goToHome(){
        this.props.history.push('/');
    }
    render(){
        return(<div className="body-404 pt-5">
                    <div className="image-404"></div>
                    <h1>Oops! Something went wrong!</h1>
                    <button className="btn-404" onClick={this.goToHome}>Return to Home</button>           
                </div>);
    }
}

export default NotFound;