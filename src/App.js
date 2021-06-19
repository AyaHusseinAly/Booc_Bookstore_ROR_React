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






import {
  Switch,
  Route,
} from "react-router-dom";



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

function App() {
  
  return (
    <div>
      <Header></Header>
      <div style={{minHeight:400}}>
      <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/genre/:id" exact component={Genre}/>
          <Route path="/map" component={Map}/>
          <Route path="/writer" component={Writer}/>
          <Route path="/community" component={Community}/>
          <Route path="/mystories" component={MyStories}/>
          <Route path="/addstory" component={AddStory}/>
          <Route path="/bookdetails/:isbn" render={(props) => <BookDetails {...props} />} />
          <Route path="/userprofile" component={UserProfile}/>
          <Route path="/admin" component={Admin}/>
          {/* <Route path="/searchresults" component={SearchResults}/> */}




        </Switch>

      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
