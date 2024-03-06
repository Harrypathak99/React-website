import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Login.css'
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isloading, setIsLoading] = useState(false)

    const navigate =useNavigate();
  

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a login process (e.g., fetch request)
    setTimeout(() => {
      // After some time (e.g., 2 seconds), set isLoading back to false
      setIsLoading(false);
      // Perform further actions after successful login
      
    }, 500);
    try {
        if(username==='' || password===''){
      
            setErrorMessage('Input username and password!');
              return <p>please input data</p>;
           }
           if (username.length < 5 || password.length < 6) {
            setErrorMessage('At least 5 and 6 characters needed respectively!');
           }

           else{
      const response = await axios.post('http://localhost:8000/register/', {
        username,
        password,
      });
      console.log(response.data);
      setErrorMessage("REGISTERED SUCCESSFULY. Go to the login page")
      navigate("/");
    }} catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage('Failed to register user');
      }
    }
  };

  return (
    <div className="start"><h1>Welcome to the Harry Restaurant App</h1>
              <p style={{fontSize: '18px'}}>Register to start your delicious day!</p><br/>
    <div className='mains'>
    <div class="login-container">
    <h1>Register</h1>
    
      {errorMessage && <p style={{ color: 'red', fontSize: '15px' }}>{errorMessage}</p>}
      
      <form>
                   <div className='container'>
                      <label for="uname"><b>Username</b></label><br/>
                      <input type="text" placeholder="Enter Username" name="uname" value={username} onChange={(e)=>setUsername(e.target.value)} required minlength="5"/>

                      <br/><label for="psw"><b>Password</b><br/></label>
                      <input type="password" placeholder="Enter Password" name="psw" value={password} onChange={(e)=>setPassword(e.target.value)} required minlength="6"/>
                

                          
                      {isloading ? (<button type="button" style={{background: "#006400"}}>Loading</button>):(<button type="button" onClick={handleRegister} disabled={isloading}>Register</button>) }
                      

                      
                    </div>
                   
                   </form>
        {/* <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <div class="container" style={{backgroundColor: "#dddddd", display: 'flex', alignItems: 'center'}}><p style={{fontSize:'15px'}}>Are you new here?</p>&nbsp;
    <Link to="/login"><span><button type="submit" class="cancelbtn" >Login</button></span></Link>
        </div>
      
    </div>
    </div>
    </div>
    
  );
};

export default Register;
