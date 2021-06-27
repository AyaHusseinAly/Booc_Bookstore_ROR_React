import React, { Component } from 'react';
import axios from 'axios';
import Notification from './Notification';
import {Link} from 'react-router-dom'

class NotificationsPage extends Component{
    constructor(props){
        super(props);
        this.state={
            notifications: []
        };
    }
    componentDidMount(){
        axios.post('http://localhost:3000/notifications/get_notifications',{
            //  reciever_id: this.props.user?.id
            reciever_id: localStorage.getItem('user_id')
         })
         .then(response => {
             if(response.data.message === 'notifications found'){
                 this.setState({
                     notifications: response.data.notifications
                 });
                 console.log("nots",response.data.notifications)
                 console.log("state",this.state.notifications)
                // for (const notification of response.data.notifications){
                //     if(notification.read == false){
                //         this.setState({
                //             newNotifications: this.state.newNotifications + 1
                //         })
                //     }
                //     console.log("num",this.state.newNotifications)
                // }
             }
             else{
                 console.log("no notification")
             }
         })
         .catch(error=>{
             console.log(error)
         })
    }
    render(){
        const notifications = Object.keys(this.state.notifications).length>0 ? this.state.notifications.map((notification, index) => {
            // console.log(notification)
                var link = ''
                if(notification.kind==='story' || notification.kind==='story-comment'){
                    link = `/shortStory/${notification.instance_id}`
                }
                console.log(link)
                return(<div className='notification-container' style={{width:'auto'}}><Link className='notification-link' to={link}><Notification notification={notification} ></Notification></Link></div>)
        }): <span>{this.props.user.id && 'You have no notifications.' ||  <Link to="/login">Login to view notifications</Link>}</span>
        return(<div className='container m-5'>
            {notifications}

        </div>);
    }
}
export default NotificationsPage;