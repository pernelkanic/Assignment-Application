import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useLocalState } from "../utils/useLocalstorage";
const HomePage=()=>{
        const [jwt, setjwt] = useLocalState("", "jwt");
        const[assignments, setassignments] = useState(null);
        
        useEffect(()=>{
                fetch('/api/assignments',{
                        headers:{
                                "Content-Type":"application/json",
                                Authorization:`Bearer ${jwt}`,

                        },
                        method:"GET"
                }).then((response)=>{
                        if(response.status===200)return response.json();
                })
                .then((assignmentsData)=>{
                        
                        console.log(assignmentsData);
                        setassignments(assignmentsData);
                
                });
        },[jwt])
        
        function HandleLogout(){
                setjwt(null);
                window.location.href='/login'
        }
        
        return(
             <div style={{margin:"2em" }}>
            <Row>
                <Col>
                <div style={{display:"flex", marginTop:"0.1em" , justifyContent:"center"  }}>
                <h1 className="titlewindow" style={{textAlign:'center'}}>Hejex Technologies</h1>
                <Button type="logout" style={{marginTop:"0.7em" ,
                       position:"relative",
                       left:"30%"
                }} onClick={HandleLogout}>Logout</Button> 
                
                </div>
                
            <div  style={{margin:"2em" , marginTop:"4em"}}  >
           
            <h1 >Student Dashboard</h1>
        
           </div>  
           <div className="assignment-wrapper">
           <h3
                className="px-4"
                style={{width:"min-content",
                        
                        marginBottom:"1em",
                        backgroundColor:"white",
                        whiteSpace:"nowrap",
                        
                        marginLeft:"2em",
                        marginTop:"-1.7em"

                        }}      
                >Pending Submission</h3>
                
                {assignments && assignments.filter((assignment)=> assignment.status === "Pending Submission").length >0? (
                        

                        <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns:"repeat(auto-fit,18rem)" ,marginTop:"2em", marginLeft:"5em"}}
                        >
                                
                        {assignments.filter((assignment)=>assignment.status === "Pending Submission").map((assignment)=>(
                                
                                        <Card
                                                key={assignment.id}
                                                style={{width:"18rem" , height:"18rem"}}
                                        >
                                <Card.Body className="d-flex flex-column justify-content-around">
                                <Card.Title>Assignment: {assignment.number}</Card.Title>
                                
                                <Card.Subtitle style={{marginTop:"1rem"}} className="mb-2 text-muted">{assignment.status}</Card.Subtitle>
                                <Card.Text style={{marginTop:"3px"}}>

                             
                                
                                </Card.Text>
                                <Button
                                className="lg"
                                variant="secondary"
                                onClick={()=>{
                                        window.location.href=`/assignment/${assignment.id}`
                                }}
                                >
                                 Edit
                                </Button>
                                </Card.Body>
                                </Card>
                                

                        ))}
                                </div>
                        
                        ) : (
                <>No Assignments Found..</>
                
                )}
                </div>
           
                <div className="assignment-wrapper">
           <h3
                className="px-4"
                style={{width:"min-content",
                        
                        marginBottom:"1em",
                        backgroundColor:"white",
                        whiteSpace:"nowrap",
                        
                        marginLeft:"2em",
                        marginTop:"-1.7em"

                }}      
                >Needs Update</h3>
                
                {assignments && assignments.filter((assignment)=> assignment.status === "Needs Update").length >0? (
                        

                        <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns:"repeat(auto-fit,18rem)" ,marginTop:"2em", marginLeft:"5em"}}
                        >
                                
                        {assignments.filter((assignment)=>assignment.status === "Needs Update").map((assignment)=>(
                                
                                        <Card
                                                key={assignment.id}
                                                style={{width:"18rem" , height:"18rem"}}
                                        >
                                <Card.Body className="d-flex flex-column justify-content-around">
                                <Card.Title>Assignment: {assignment.number}</Card.Title>
                                
                                <Card.Subtitle style={{marginTop:"1rem"}} className="mb-2 text-muted">{assignment.status}</Card.Subtitle>
                                <Card.Text style={{marginTop:"3px"}}>

                                
                                
                                </Card.Text>
                                <Button
                                className="lg"
                                variant="secondary"
                                onClick={()=>{
                                        window.location.href=`/assignment/${assignment.id}`
                                }}
                                >
                                 Edit
                                </Button>
                                </Card.Body>
                                </Card>
                                

                        ))}
                                </div>
                        
                        ) : (
                <>No Assignments Found..</>
                
                )}
                </div>

                <div className="assignment-wrapper">
           <h3
                className="px-4"
                style={{width:"min-content",
                        
                        marginBottom:"1em",
                        backgroundColor:"white",
                        whiteSpace:"nowrap",
                        
                        marginLeft:"2em",
                        marginTop:"-1.7em"

                }}      
                >In Review</h3>
                
                {assignments && assignments.filter((assignment)=> assignment.status === "In Review").length >0? (
                        

                        <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns:"repeat(auto-fit,18rem)" ,marginTop:"2em", marginLeft:"5em"}}
                        >
                                
                        {assignments.filter((assignment)=>assignment.status === "In Review").map((assignment)=>(
                                
                                        <Card
                                                key={assignment.id}
                                                style={{width:"18rem" , height:"18rem"}}
                                        >
                                <Card.Body className="d-flex flex-column justify-content-around">
                                <Card.Title>Assignment: {assignment.number}</Card.Title>
                                
                                <Card.Subtitle style={{marginTop:"1rem"}} className="mb-2 text-muted">{assignment.status}</Card.Subtitle>
                                <Card.Text style={{marginTop:"3px"}}>

                                
                                
                                </Card.Text>
                                <Button
                                className="lg"
                                variant="secondary"
                                onClick={()=>{
                                        window.location.href=`/assignment/${assignment.id}`
                                }}
                                >
                                 Edit
                                </Button>
                                </Card.Body>
                                </Card>
                                

                        ))}
                                </div>
                        
                        ) : (
                <>No Assignments Found..</>
                
                )}
                </div>


                <div className="assignment-wrapper">
                <h3
                     className="px-4"
                     style={{width:"min-content",
                             
                             marginBottom:"1em",
                             backgroundColor:"white",
                             whiteSpace:"nowrap",
                             
                             marginLeft:"2em",
                             marginTop:"-1.7em"
     
                             }}      
                     >Submitted</h3>
                     
                     {assignments && assignments.filter((assignment)=> assignment.status === "Submitted" || assignment.status === "Resubmitted") .length >0? (
                             
     
                             <div
                             className="d-grid gap-5"
                             style={{gridTemplateColumns:"repeat(auto-fit,18rem)" ,marginTop:"2em", marginLeft:"5em"}}
                             >
                                     
                             {assignments.filter((assignment)=>(assignment.status === "Submitted" || assignment.status === "Resubmitted"))
                             
                             .map((assignment)=>(
                                     
                                             <Card
                                                     key={assignment.id}
                                                     style={{width:"18rem" , height:"18rem"}}
                                             >
                                     <Card.Body className="d-flex flex-column justify-content-around">
                                     <Card.Title>Assignment: {assignment.number}</Card.Title>
                                     
                                     <Card.Subtitle style={{marginTop:"1rem"}} className="mb-2 text-muted">{assignment.status}</Card.Subtitle>
                                     <Card.Text style={{marginTop:"3px"}}>
     
                                  
                                     
                                     </Card.Text>
                                     <Button
                                     className="lg"
                                     variant="secondary"
                                     onClick={()=>{
                                             window.location.href=`/assignment/${assignment.id}`
                                     }}
                                     >
                                      Edit
                                     </Button>
                                     </Card.Body>
                                     </Card>
                                     
     
                             ))}
                                     </div>
                             
                             ) : (
                     <>No Assignments Found..</>
                     
                     )}
                     </div>
                <div className="assignment-wrapper">
           <h3
                className="px-4"
                style={{width:"min-content",
                        
                        marginBottom:"1em",
                        backgroundColor:"white",
                        whiteSpace:"nowrap",
                        
                        marginLeft:"2em",
                        marginTop:"-1.7em"

                        }}      
                >Completed</h3>
                
                {assignments && assignments.filter((assignment)=> assignment.status === "Completed").length >0? (
                        

                        <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns:"repeat(auto-fit,18rem)" ,marginTop:"2em", marginLeft:"5em"}}
                        >
                                
                        {assignments.filter((assignment)=>assignment.status === "Completed").map((assignment)=>(
                                
                                        <Card
                                                key={assignment.id}
                                                style={{width:"18rem" , height:"18rem"}}
                                        >
                                <Card.Body className="d-flex flex-column justify-content-around">
                                <Card.Title>Assignment: {assignment.number}</Card.Title>
                                
                                <Card.Subtitle style={{marginTop:"1rem"}} className="mb-2 text-muted">{assignment.status}</Card.Subtitle>
                                <Card.Text style={{marginTop:"3px"}}>

                                
                                
                                </Card.Text>
                                <Button
                                className="lg"
                                variant="secondary"
                                onClick={()=>{
                                        window.location.href=`/assignment/${assignment.id}`
                                }}
                                >
                                 View
                                </Button>
                                </Card.Body>
                                </Card>
                                

                        ))}
                                </div>
                        
                        ) : (
                <>No Assignments Found..</>
                
                )}
                </div>
                </Col>
                </Row>
                </div>    
        )
      
}
export default HomePage;