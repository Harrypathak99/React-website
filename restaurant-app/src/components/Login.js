import { useNavigate } from "react-router"
import { fetchToken, setToken } from "../auth/Auth"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from "react"
import axios from "axios"
import './Login.css'
import Navbar from "./Navbar"
import App from "../App"
import Home from './Home';
import Menu from './Menu';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Register from "./Register";
import MenuDetail from './MenuDetail';
import CateDetail from './CateDetail';
import Categories from './Categories';
import { RequireToken} from './../auth/Auth'


export default function Login(){
  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isloading, setIsLoading] = useState(false)

  //check to see if the fields are not empty
  const login = ()=> {
    setIsLoading(true);

    // Simulate a login process (e.g., fetch request)
    setTimeout(() => {
      // After some time (e.g., 2 seconds), set isLoading back to false
      setIsLoading(false);
      // Perform further actions after successful login
    
    }, 500);


     if(username==='' & password===''){
      
      setErrorMessage('Input username and password!');
        return <p>please input data</p>;
     }else{
        // make api call to our backend. we'll leave thisfor later
         axios.post('http://localhost:8000/login/',{
             username: username,
             password: password
         })
         .then(function(response){
           console.log(response.data.token)
           if(response.data.token){
             setToken(response.data.token)
             navigate("/")
           }
           else {
            console.log(errorMessage)
           }
           
         })
         .catch(function(error){
          console.log(error, 'error');
          
          setErrorMessage('Invalid credentials!');
           return <p>Thi is error </p>;
           
         });
     }
 }

    return(
        <>
        
        <Routes>
          <Route path="/app" element={<App />} />
          
        </Routes>

        
    

       
          {
            fetchToken()
             ?(
              <App />
            ):(
              <>
              <div className="start"><h1>Welcome to the Harry Restaurant App</h1>
              <p style={{fontSize: '18px'}}>Login to start your delicious day!</p><br />
               <div className="mains">
               
                <div className="login-container">
                <h1>Login</h1>
                {errorMessage && <p style={{ color: 'red', fontSize: '15px' }}>{errorMessage}</p>}
                    
                   <form>
                   <div class="container">
                      <label for="uname"><b>Username</b></label><br/>
                      <input type="text" placeholder="Enter Username" name="uname" value={username} onChange={(e)=>setUsername(e.target.value)} required />

                      <br/><label for="psw"><b>Password</b><br/></label>
                      <input type="password" placeholder="Enter Password" name="psw" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                     
                          
                      {isloading ? (<button type="button" style={{background: "#006400"}}>Loading</button>):(<button type="button" onClick={login} disabled={isloading}>Login</button>) }
                      

                      
                    </div>
                   
                   </form>
  <div class="container" style={{backgroundColor: "#dddddd", display: 'flex', alignItems: 'center'}}><p style={{fontSize:'15px'}}>Are you new here?</p>&nbsp;
    <Link to="/register"><span><button type="submit" class="cancelbtn" >Register</button></span></Link>
  </div>
                       {/* <label style={{marginRight: 10 }}>Input Username</label>
                       <input type='text' onChange={(e)=>setUsername(e.target.value)}/>

                       <label style={{marginRight: 10 }}>Input Password</label>
                       <input type='text' onChange={(e)=>setPassword(e.target.value)}/>

                       <button type='button' onClick={login}>Login</button>    */}
                       
                  

                </div>
                </div>
                </div>
                </>
            )
          }
         
        </>
        
    )
}