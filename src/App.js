import Navbar from './components/Navbar';
import './App.css';
import About from './components/About';
import Search from './components/Search';
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import {BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';
import {useState ,useEffect} from 'react';
import axios from 'axios';


function App() {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  //const [repos, setRepos] = useState([]);

  
    //useEffect(async()=> {
     //const res = await axios.get('https://api.github.com/users');
     //setUsers(res.data)
    // },[])


    //const searchName = async(text) => {
    //  const res = await axios.get('https://api.github.com/users/${users}')
     // setUsers(res.data)
    //}

    //const searchName = async(name) => {
     // const res = await axios.get('https://api.github.com/search/users?q=${name}')
     // setUsers(res.data.items)
   // }

   const searchName = async text =>{
    const res=  await axios.get(`https://api.github.com/search/users?q=${text}`);
     setUsers(res.data.items) 
   }  
   
  
 const clearUsers = () => {
   setUsers([])
 }
  
//const getDetails = async(login) => {
// const res =  await axios.get('https://api.github.com/users/${login}')
// setUser(res.data)
//}

const  getDetails = async login =>{
  const res=  await axios.get(`https://api.github.com/users/${login}`)
  setUser(res.data)
}

//const  getRepos = async username =>{
 // const res=  await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=asc`)
 // setRepos(res.data)
//}
  return (
    
    <Router>
    <Navbar/>
    
    <div className='container'>
    <Switch>
    <Route exact path="/" render={
      props => (
        <>
<Search  searchName={searchName} showClear={users.length > 0 ? true:false} clearUsers={clearUsers}/>
    <Users users={users}/>
    </>
      )
    } 
    />
    
   <Route exact path="/about" component={About} />
   <Route exact path="/user/:anything"  render={
     props => (
       <>
       <UserDetail getDetails={getDetails} user={user} {...props}  />
       </>
     )
   } />
   </Switch>
   </div>
    </Router>
    
  );

}

export default App;
