import React, { useState } from "react";
import { Button, Container, Form } from 'react-bootstrap';
import { useLocalState } from "../utils/useLocalstorage";
const Login =()=>{
    const [jwt, setjwt] = useLocalState("", "jwt");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    
  function handleClick(e){
    e.preventDefault();
    const reqbody = {
      "username": username,
      "password": password
    }
    fetch("/api/auth/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(reqbody),
    })

      .then((response) =>{ 
       if(response.status === 200){
            return Promise.all([response.json() , response.headers])
       }
       else return Promise.reject("Invalid Login attempt");
        })
    
      .then(([body, headers]) => {
        setjwt(headers.get("authorization"));
        window.location.href="/"
    })
    .catch((message)=>{
        alert(message);
    })
  }

    return(
        <>
        <Container>
          
            <div>

              
                <Form style={{marginTop:"15em"}}>
                <h1 style={{textAlign:"center"}}>Login</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <div>

                    <Form.Label className="fs-6">Username:</Form.Label>
                    <Form.Control className="
col-2" type = "text" id="username" value={username}
                    onChange={(e)=>setusername(e.target.value)}
                    />
                    </div>
                    <div>
                    <Form.Label >Password:</Form.Label>
                    <Form.Control type = "text" id="password" value={password}
                    onChange={(e)=>setpassword(e.target.value)}
                    />
                    </div>
                    </Form.Group>
                    <Button type="submit" size="md" onClick={handleClick} style={{ position: "absolute" , top: "70%",left: "48%"}}>submit</Button>
                    </Form>
             
            </div>
           
            </Container>
            
        </>
    )
}

export default Login;
