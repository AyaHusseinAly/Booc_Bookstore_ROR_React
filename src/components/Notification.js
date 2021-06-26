import React, { Component } from 'react';
import '../style/notification.css';

class Notification extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(<div >
            {this.props.notification.kind === 'story' &&
            <div className='notification-outer'>
                <img src={this.props.notification.image} className='notification-img'></img>
                <div className='notification-content'>
                    <p className='notification-title'>{this.props.notification.body}</p>
                    <p className='notification-text'><strong>Summary: </strong> {this.props.notification.summary}</p>
                </div>
            </div>}
        </div>);
    }
}
export default Notification;