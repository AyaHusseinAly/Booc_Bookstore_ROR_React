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






import {
  Switch,
  Route,
} from "react-router-dom";





function App() {
  return (

    <div>
      <Header></Header>
      <div style={{minHeight:400}}>
      <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/map" component={Map}/>
          <Route path="/writer" component={Writer}/>
          <Route path="/community" component={Community}/>
          <Route path="/mystories" component={MyStories}/>
          <Route path="/addstory" component={AddStory}/>
          <Route path="/bookdetails" component={BookDetails}/>
          <Route path="/searchresults" component={SearchResults}/>
          <Route path="/userprofile" component={UserProfile}/>
          <Route path="/admin" component={Admin}/>



        </Switch>

      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
