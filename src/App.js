import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Map from './components/Map';
import Community from './components/Community';
import Writer from './components/Writer';
import Admin from './components/Admin';
import MyStories from './components/MyStories';
import AddStory from './components/AddStory';
import SearchResults from './components/SearchResults';
import UserProfile from './components/UserProfile';
import BookDetails from './components/BookDetails';
import Genre from './components/Genre';
import GoogleAPI from './classes/GoogleAPI';
import FavoritesPage from "./components/FavoritesPage";
import BookShelf from "./components/BookShelf";
import ShortStoryDetails from './components/ShortStoryDetails';


import Registration from './components/auth/Registration';
import Login from './components/auth/Login'


import React, { Component } from 'react';




import {
  Switch,
  Route,
} from "react-router-dom";
import { isConstructorDeclaration } from 'typescript';



// const api=new GoogleAPI();
// api.getByAuthor("conan doyle").then(res=>{
//   console.log(res)
// })
// api.getByCategory("fiction").then(res=>{
//     console.log(res)
// })

// api.getFilteredBooks({
//   'inauthor':'conan',
//   'subject':'foction',
//   'filter':'free-ebooks'
// }).then(res=>{
//   console.log(res)
// })

// /<<<<<<< HEAD
// function App() {

//   return (
//     <div>
//       <Header></Header>

//       <div style={{ minHeight: 400 }}>
//         <Switch>
//           <Route path="/" exact component={Home} />
//           <Route path="/genre/:id" exact component={Genre} />
//           <Route path="/map" component={Map} />
//           <Route path="/writer" component={Writer} />
//           <Route path="/community" component={Community} />
//           <Route path="/mystories" component={MyStories} />
//           <Route path="/addstory" component={AddStory} />
//           <Route path="/bookdetails/:isbn" render={(props) => <BookDetails {...props} />} />
//           <Route path="/userprofile" component={UserProfile} />
//           <Route path="/admin" component={Admin} />
// =======
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(data) {
    console.log(data.user);
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  render() {
    return (
      <div>
        <Header
          loggedInStatus={this.state.loggedInStatus} user={this.state.user}>
        </Header>
        <div style={{ minHeight: 400 }}>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Home {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
            <Route path="/genre/:id" exact component={Genre} />
            <Route path="/map" component={Map} />
            <Route path="/writer" component={Writer} />
            <Route path="/community" component={Community} />
            <Route path="/mystories" component={MyStories} />
            <Route path="/addstory" component={AddStory} />
            <Route path="/bookdetails/:isbn" render={(props) => <BookDetails {...props} />} />
            <Route path="/FavoritesPage" component={FavoritesPage}/>
            <Route path="/BookShelf" component={BookShelf}/>
            <Route path="/userprofile" component={UserProfile} />
            <Route path="/admin" component={Admin} />
            <Route
              path="/sign_up"
              render={props => (
                <Registration {...props} loggedInStatus={this.state.loggedInStatus} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login {...props} loggedInStatus={this.state.loggedInStatus} handleLogin={this.handleLogin} />
              )}
            />
            {/* <Route path="/searchresults" component={SearchResults}/> */}
            <Route path="/shortStory/:id" component={ShortStoryDetails} />
            {/* <Route path="/story/:id" render={(props) => <ShortStoryDetails {...props} />} /> */}




          </Switch>

        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
