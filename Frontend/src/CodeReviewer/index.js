import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import '../App.css';
import { useLocalState } from "../utils/useLocalstorage";
const CodeReviewer=()=>{
    const [jwt, setjwt] = useLocalState("", "jwt");
    const[assignments, setassignments] = useState(null);
    const[data, setdata] = useState(null);
    function editReview(assignment){
        window.location.href = `/assignment/${assignment.id}`;
    }
    function claimAssignment(assignment){
        const decodedjwt = jwtDecode(jwt);
        const user={
                
                username:decodedjwt.sub,
                
                }
                assignment.codeReviewer =user;
                assignment.status = "In Review";
        fetch(`/api/assignments/${assignment.id}`,{
                headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${jwt}`,
    
                },
                method:"PUT",
                body:JSON.stringify(assignment)
        }).then((updatedassignment)=>{
                const assignmentCopy =[...assignments];
                const i = assignmentCopy.findIndex((a)=>a.id === assignment.id)
                assignmentCopy[i]= updatedassignment;
                setassignments(assignmentCopy);

        })
        window.location.href='/'
    }
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
                    setassignments(assignmentsData);
            });
    },[jwt])
    function HandleAssignment(e){

            e.preventDefault();
            window.location.href='/create'
     

    }
    function HandleLogout(){
            setjwt(null);
            window.location.href='/login'
    }
    
    return(
        
            <div style={{margin:"2em" , marginTop:"0em"}}>
            <Row>
                <Col>
           
       
            <div className="d-flex justify-content-between"  >
           <Button type="submit" style={{marginTop:"2em"}} onClick={HandleAssignment}>create asssignment</Button> 
           
           <Button type="logout" style={{marginTop:"2em"}} onClick={HandleLogout}>Logout</Button> 
           </div>  

           <h1 style={{margin:"2em"}}>Code Reviewer Dashboard</h1>
           
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
                 {assignments && assignments.filter((assignment)=> assignment.status === "In Review").length >0 ? (
                    

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
                            
                            <Card.Subtitle style={{marginTop:"1rem"}} className="mb-2 text-muted">Submitted By : {assignment.userSubmitted}</Card.Subtitle>
                            <Card.Subtitle style={{marginTop:"1rem"}} className="mb-2 text-muted">{assignment.status}</Card.Subtitle>
                            
                            
                            <Card.Text style={{marginTop:"2rem"}}>

                           
                            </Card.Text>
                            <Button
                            className="lg"
                            variant="primary"
                            readOnly
                            onClick={()=>{editReview(assignment)}}
                            >
                             View
                            </Button>
                            </Card.Body>
                            </Card>
                            

                    ))}
                            </div>
                            
                    
                    ) : (
                        
                        
                        <div>No Assignments Found..</div>
            
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
                >Awaiting Review</h3>

            {assignments && assignments.filter((assignment)=> assignment.status === "Submitted" || assignment.status === "Resubmitted").length >0 ?  (
                    

                    <div
                    className="d-grid gap-5"
                    style={{gridTemplateColumns:"repeat(auto-fit,18rem)" ,marginTop:"2em", marginLeft:"5em"}}
                    >
                            
                    {assignments.filter((assignment)=>assignment.status === "Submitted" || assignment.status === "Resubmitted" ).sort((a,b)=>{
                    if(a.status === "Resubmitted")return -1;
                    else return 1;
                }
                    ).map((assignment)=>(
                            
                                    <Card
                                            key={assignment.id}
                                            style={{width:"18rem" , height:"18rem"}}
                                    >
                            <Card.Body className="d-flex flex-column justify-content-around">
                            <Card.Title>Assignment: {assignment.number}</Card.Title>
                            <Card.Subtitle style={{marginTop:"1rem"}} className="mb-2 text-muted">Submitted By : {assignment.userSubmitted}</Card.Subtitle>
                            <Card.Subtitle style={{marginTop:"1rem"}} className="mb-2 text-muted">{assignment.status}</Card.Subtitle>
                          
                            <Card.Text style={{marginTop:"2rem"}}>
                        
                            
                            </Card.Text>
                            
                           
                               
                                <Button
                                className="lg"
                                variant="primary"
                                onClick={()=>{claimAssignment(assignment)}}
                                >
                                 Claim
                                </Button>
                                
                        
                            </Card.Body>
                            </Card>
                            

                    ))}
                            </div>
                            
                    
                    ) : (
                        
                        
            <div>No Assignments Found..</div>
            
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
                 {assignments  && assignments.filter((assignment)=> assignment.status === "Needs Update").length >0 ?(
                    

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
                            
                            
                            <Card.Subtitle style={{marginTop:"1rem"}} className="mb-2 text-muted">Submitted By : {assignment.userSubmitted}</Card.Subtitle>
                            <Card.Subtitle style={{marginTop:"1rem"}} className="mb-2 text-muted">{assignment.status}</Card.Subtitle>
                            
                            <Card.Text style={{marginTop:"2rem"}}>

                            
                            </Card.Text>
                            <Button
                            className="lg"
                            variant="primary"
                            onClick={()=>{ window.location.href = `/assignment/${assignment.id}`}}
                            >
                             View
                            </Button>
                            </Card.Body>
                            </Card>
                            

                    ))}
                    
                            </div>
                            
                    
                    ) : (
                        
                        
                        <div>No Assignments Found..</div>
            
            )}
                </div>
            
            
            
            
            
            </Col>  
            </Row>
            </div>
           
            
            
    )
}
export default CodeReviewer;