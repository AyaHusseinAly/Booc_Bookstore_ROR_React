import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/dropdown.js';
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Popper from 'popper.js';
import '../style/headerFooter.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {PRODUCTION_BACKEND_URL,PRODUCTION_FRONTEND_URL} from '../constants/index.js'

// import  { useHistory } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { ActionCableProvider, ActionCableConsumer, ActionCable } from 'react-actioncable-provider';
import { Popover, Button, OverlayTrigger } from 'react-bootstrap'
import Notification from './Notification';







class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            newNotifications: 0
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleReadNotifications = this.handleReadNotifications.bind(this)

        // const handleRedirect=()=>{
        //     this.props.history.push('/login');
        // }

    }
    handleLogout() {
        axios.delete(`${PRODUCTION_BACKEND_URL}/users/sign_out`,
            {
                headers: {
                    "Access-Control-Allow-Origin": `${PRODUCTION_FRONTEND_URL}`,
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type"
                }
            })
            .then(response => {
                if (response.data.message === 'signout success') {
                    //  this.setState({
                    //    loggedInStatus : "NOT_LOGGED_IN",
                    //    user : {},
                    //    avatar: ""
                    //  })
                    localStorage.removeItem("user_id");
                    //  let history = useHistory();
                    //  return <Redirect to='/login'  />
                    // this.props.history.push('/login')
                    // history.push("/login");
                    // this.props.handleRedirect()
                    window.location.reload()
                    //  this.props.history.push('/login')
                }
            })
            .catch(error => {
                console.log(error);
            })

        //    this.setState({
        //      loggedInStatus : "NOT_LOGGED_IN",
        //      user : {},
        //      avatar: ""
        //    })
    }
    handleReadNotifications() {
        if (localStorage.getItem('user_id')) {
            axios.post(`${PRODUCTION_BACKEND_URL}/notifications/read_notifications`, {
                reciever_id: localStorage.getItem('user_id')
            })
                .then(response => {
                    console.log(response)
                    if (response.data.message === "read notifications") {
                        this.setState({
                            newNotifications: 0
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    //    this.setState({
    //      loggedInStatus : "NOT_LOGGED_IN",
    //      user : {},
    //      avatar: ""
    //    
componentDidMount = () => {
    //  this.props.is_logged_in();
    axios.post(`${PRODUCTION_BACKEND_URL}/notifications/get_notifications`, {
        //  reciever_id: this.props.user?.id
        reciever_id: localStorage.getItem('user_id')
    })
        .then(response => {
            if (response.data.message === 'notifications found') {
                this.setState({
                    notifications: response.data.notifications
                });
                console.log("nots", response.data.notifications)
                console.log("state", this.state.notifications)
                for (const notification of response.data.notifications) {
                    if (notification.read == false) {
                        this.setState({
                            newNotifications: this.state.newNotifications + 1
                        })
                    }
                    console.log("num", this.state.newNotifications)
                }
            }
            else {
                console.log("no notification")
            }
        })
        .catch(error => {
            console.log(error)
        })
}
handleOnConnected = response => {
    console.log("connected", response);
}
handleRecieveNotification = response => {
    console.log(response)
    console.log(response.data);
    console.log(this.state);
    this.setState({
        notifications: [response.data, ...this.state.notifications]
    })
}
handleRecieveNotification = response => {
    console.log(response.notifications);
    console.log(this.state);
    this.setState({
        notifications: [...this.state.notifications, response.notifications]
    })
}


render() {
    var avatar;
    if (this.props.avatar) {
        avatar = this.props.avatar;
    }
    else {
        avatar = 'avatar.jpeg';
    }
    var name;
    if (this.props.user?.id) {
        name = this.props.user.name;
    }
    else {
        name = "Guest"
    }
    var account_btn;
    if (this.props.user?.id) {
        account_btn = <a
            className="dropdown-item"
            onClick={this.handleLogout}><i class="fas fa-sign-out-alt"></i> Logout</a>
    }
    else {
        account_btn = <a
            className="dropdown-item"
            href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>
    }
    const notifications = Object.keys(this.state.notifications).length > 0 ? this.state.notifications.map((notification, index) => {
        // console.log(notification)
        while (index < 5) {
            var link = ''
            if (notification.kind === 'story' || notification.kind === 'story-comment') {
                link = `/shortStory/${notification.instance_id}`
            }

            console.log(link)
            return (<div className='notification-container'><Link className='notification-link' to={link}><Notification notification={notification}></Notification></Link></div>)
        }
    }) : <span>{this.props.user.id && 'You have no notifications.' || <div className='notification-outer'><Link className='notification-link' to="/login">Login to view notifications</Link></div>}</span>
    const popover = (
        <Popover id="popover-notification" style={{ padding: 0, marginTop: 25 }}>
            <Popover.Content style={{ padding: 0, position: 'absolute', right: -50 }}>
                {notifications}
                {this.props.user.id && <div className='notification-outer'> <Link className='notification-link' to='/notifications'>View All Notifications</Link></div>}
            </Popover.Content>
            {/* <Popover.Title as="h3"><Link className='notification-link' to='/notifications'>View All Notifications</Link></Popover.Title>
               */}
        </Popover>
    );

    return (
        <nav className="py-2">
            <div className="row" style={{ marginRight: "-120px" }}>

                <div className="col-md-2  d-flex  align-items-center">
                    <img className=" mx-5 my-1 navbar-brand " src="img/logo.png" alt="Booc" />

                </div>

                <div className="col-md-4 " id="nav-padding-div">

                </div>

                <div className="col-lg-5 col-sm-9 col-xs-8 d-flex align-items-center justify-content-around ">
                    {this.props.role == "admin" && <a className=" text-white my-2 " href="/admin">Manage</a>}
                    {this.props.role == "seller" && <a className=" text-white my-2 " href={"/bookstorebooks/" + this.props.bookstore_id}>Manage your store</a>}

                    <a className=" text-white my-2 " href="/">Home</a>
                    <a className=" text-white my-2 " href="/map">Map</a>
                    <a className=" text-white my-2 " href="/community">Community</a>
                    <div className="writer"><a className="btn text-white" href="/writer">Writer</a></div>

                    {/* <div >
                        <a  href="#" ><img  className="  my-3 mr-3 icon"  src="img/icons/iconBell.png" /></a>
                        <a  href="#" className="text-light"><img  className="  m-1 rounded-circle"  src={avatar}  /> {name}  </a>
                        <a  href="#" ><img  className=" m-1 icondrop"  src="img/icons/iconDropdownWhite.png"  /></a>
                    </div> */}

                    <div className="dropdown show" >
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} onEntered={this.handleReadNotifications}>
                            <span>
                                <img className=" my-3 mr-3 icon" src="img/icons/iconBell.png" />
                                {(this.state.newNotifications > 0) && <div className='notification-overlay'>{this.state.newNotifications}</div>}
                            </span>
                        </OverlayTrigger>

                        {/* <a  href="#" ><img  className="  my-3 mr-3 icon"  src="img/icons/iconBell.png" /></a> */}
                        <img className="  m-1 rounded-circle" src={avatar} />

                        <a className="dropdown-toggle ml-2" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'white', fontSize: '2rem', backgroundColor: '#263044' }}>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink" >
                            <a className="dropdown-item" href='/writer'>{name}</a>
                            <hr class="dropdown-divider"></hr>
                            <a className="dropdown-item" href='/FavoritesPage'>
                                My Favourites
                            </a>
                            <a className="dropdown-item" href='/BookShelf'>
                                My Bookshelf
                            </a>
                            <a className="dropdown-item" href='/DownloadsPage'>
                                My Downloads
                            </a>
                            {/* <a className="dropdown-item" href='/'>
                                    My Bookmarks
                                </a> */}
                            <a className="dropdown-item" href='/writer'>
                                My Stories
                            </a>
                            <a className="dropdown-item" href='/AllStories'>
                                All Stories
                            </a>

                            <a className="dropdown-item" href='/UserPage'>
                                My Page
                            </a>
                            <hr class="dropdown-divider"></hr>
                            {account_btn}

                        </div>

                    </div>
                </div>

            </div>

            <ActionCableConsumer
                channel={{ channel: 'NotificationChannel', user_id: this.props.user.id }}
                onReceived={this.handleRecieveNotification}
                onConnected={this.handleOnConnected}
            />


        </nav >
    );
}
}




export default Header;