import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import Commentscomp from "../comments";
import { useLocalState } from "../utils/useLocalstorage";

const CodeReviewerAssignmentView =()=>{
    const AssignmentId = window.location.href.split("/assignment/")[1];
    const[Assignment,setAssignment] = useState({
        githuburl:"",
        branch:"",
        description:"",
       status:null,
       image:null,
    }
        
    );
    const [jwt, setjwt] = useLocalState("", "jwt");
    const [assignmentstatusenums , setassignmentstatusenums] = useState([]);
    const [Comment, setComment] = useState({
        text:"",
        assignmentId:AssignmentId!=null?parseInt(AssignmentId):null,
        user:jwt
      } );
      
      const[commenttext,setCommentText] = useState([]);
      function updateAssignment(prop,value){
        const newAssignment = {...Assignment};
        newAssignment[prop] = value
         setAssignment(newAssignment);
        
    }
    function updateComment(value){
        const newComment= {...Comment};
        newComment.text = value
         setComment(newComment);
        
    }

    const prevassignment = useRef(Assignment);
    
    function save(status){
        if(status && Assignment.status !== status){
            updateAssignment("status" , status)
        }
        
        else{
            persist();
        }

    }
    function persist(){
        fetch(`/api/assignments/${AssignmentId}`,{
            headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${jwt}`,

            },
            method:"PUT",
            body:JSON.stringify(Assignment)
    }).then((response)=>{
            if(response.status===200)return response.json();
    })
    .then((assignmentsData)=>{
        setAssignment(assignmentsData);
        
    });
    }
    function submitComment(){
      

        fetch('/api/comments', {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json; charset=utf-8'
          },
          method: "post",
          body:JSON.stringify(Comment),
        }) .then((response) => {
          if (response.status === 200) return response.json();
          })
        .then((data)=>{
        const commentcopy = [...commenttext];
        commentcopy.push(data);
        setCommentText(commentcopy);
        
        })
        
      
    }
    useEffect(()=>{
        if(prevassignment.current.status != Assignment.status ){
            persist();
        }
        prevassignment.current= Assignment;
    },[Assignment])

    useEffect(()=>{
        fetch(`/api/assignments/${AssignmentId}`,{
                headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${jwt}`,

                },
                method:"GET"
        }).then((response)=>{
                if(response.status===200)return response.json();

        })
        .then((assignmentResponse)=>{
            let assignmentData = assignmentResponse.assignment;
            if(assignmentData.branch == null)assignmentData.branch="";
            if(assignmentData.githuburl == null)assignmentData.githuburl="";
            if(assignmentData.description == null)assignmentData.description="";
            setAssignment(assignmentData);
           
           setassignmentstatusenums(assignmentResponse.assignenums);
            
        });
},[])
useEffect(()=>{
    fetch(`/api/comments?Assignmentid=${AssignmentId}`,{
            headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${jwt}`,

            },
            method:"GET"
    }).then((response)=>{
      
      if(response.status===200)return response.json();
  })
  .then((comments)=>{
   
    setCommentText(comments)
    
})}
, [])

    
    return(
        <Container className="mt-5">
          
            {Assignment ?(
                <>
                <Row className="d-flex align-items-center">
                    <Col>
            <h1 >Assignment : {Assignment.number}</h1>
            </Col>
            <Col>
            <Badge pill bg="info">
             {Assignment.status}
            </Badge>
            </Col>
            </Row>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
        Description:
        </Form.Label>
            <Col sm="10">
            <textarea id="description"
            readOnly
            rows={17}
            cols={80}
             type="url" 
             value={Assignment.description}
          >
             {Assignment.description}
             </textarea>
            </Col>
        </Form.Group>
        {Assignment.image && (
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Image:
        </Form.Label>
        <Col sm="10">
            
          <img src={`data:image/jpeg;base64,${Assignment.image}`} alt="Assignment"
          style={{width:"50em"}}
           />
        </Col>
      </Form.Group>
    )}
       

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
        Video URL:
        </Form.Label>
            <Col sm="10">
          <Form.Control id=""
           type="url" 
           onChange= {(e)=>{updateAssignment("codeReviewUrl" , e.target.value)}}
          placeholder=""
          value={Assignment.codeReviewUrl}
        />
            </Col>
        </Form.Group>
           
            <Button type="submit" style={{marginTop:"2em"}} onClick={()=>save(assignmentstatusenums[4].status)}>Complete Review</Button> 
                {Assignment.status === 'Needs Update' ? (<>
                    <Button type="submit" variant="secondary" style={{marginTop:"2em" , marginLeft:"2em"}} onClick={()=>save(assignmentstatusenums[2].status)}>Re-claim</Button> 
                        </>):(

                    <>
                    <Button type="submit" variant="danger" style={{marginTop:"2em" , marginLeft:"2em"}} onClick={()=>save(assignmentstatusenums[3].status)}>Reject Assignment</Button> 
                    </>
                    )
                    }
            {Assignment.status === 'Pending Submission'?(
                 <Button type="submit" variant="primary" style={{marginTop:"2em" , marginLeft:"2em"}} onClick={()=>save(assignmentstatusenums[3].status)}>Create Assignment</Button> 
            ):(<></>)
            }
           

            <Button type="submit" style={{marginTop:"2em" , marginLeft:"2em"}} variant="secondary" onClick={()=>window.location.href="/"}>Back</Button> 
            
            
            <div className="mt-4 ">
            <h3>Comments</h3>
          <textarea
          onChange={(e)=>{updateComment(e.target.value)}}
          style={{width:"100%" , borderRadius:"0.25em"}}
          >
          
          </textarea>
          <Button onClick={()=>submitComment()}>Post Comment</Button>
           </div>
           <div className="mt-5">
           {commenttext.map((co)=>(
              <Commentscomp 
              createdDate = {co.createdDate}
              createdBy = {co.createdBy.name}
              text ={co.text}
              />
              ))}
         
          </div>
            </>
            
             )
            
            : (<></>)}
        </Container>
    )
}
export default CodeReviewerAssignmentView;