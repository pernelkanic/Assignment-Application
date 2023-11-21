import jwtDecode from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Commentscomp from "../comments";
import { useLocalState } from "../utils/useLocalstorage";

const AssignmentView =()=>{
    const {assignmentId}= useParams();
    const[Assignment,setAssignment] = useState({
        githuburl:"",
        branch:"",
       status:null,
       userSubmitted:"",
       description:"",
      image:null
       
    }
        
    );
    const [jwt, setjwt] = useLocalState("", "jwt");
    const [assignmentstatusenums , setassignmentstatusenums] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [Comment, setComment] = useState({
      text:"",
      assignmentId:assignmentId!=null?parseInt(assignmentId):null,
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
    
    const handleImageSelect = (e) => {
        setSelectedImage(e.target.files[0]);
      };
    
      
      const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };
  
    const prevassignment = useRef(Assignment);
    
    function save(status){
        
        

      if(status && Assignment.status !== status){
        updateAssignment("status" , status)
    }
        else{
           
            persist(); 
        }

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
  
   
    async function persist() {
        const decodedjwt = jwtDecode(jwt);
      
        if (selectedImage) {
          const base64Image = await getBase64(selectedImage); 
      
          
          const base64DataOnly = base64Image.split(",")[1];
          const newAssignment = {
            ...Assignment,
            image: base64DataOnly,
            userSubmitted: decodedjwt.sub,
          };
      
          
          fetch(`/api/assignments/${assignmentId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
            method: "PUT",
            body: JSON.stringify(newAssignment),
          })
            .then((response) => {
              if (response.status === 200) return response.json();
            })
            .then((assignmentsData) => {
              setAssignment(assignmentsData);
            })
            .catch((error) => {
              console.log("failed to upload the data");
            });
        } else {
          
          fetch(`/api/assignments/${assignmentId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
            method: "PUT",
            body: JSON.stringify({ ...Assignment, userSubmitted: decodedjwt.sub }),
          })
            .then((response) => {
              if (response.status === 200) return response.json();
            })
            .then((assignmentsData) => {
              setAssignment(assignmentsData);
            })
            .catch((error) => {
              console.log("failed to upload the data");
            });
        }
      }
    useEffect(()=>{
        if(prevassignment.current.status != Assignment.status ){
            persist();
        }
        prevassignment.current= Assignment;
    },[Assignment])


    
    useEffect(()=>{
      fetch(`/api/comments?Assignmentid=${assignmentId}`,{
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
    



    useEffect(()=>{
        fetch(`/api/assignments/${assignmentId}`,{
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




const descriptionTextAreaRef = useRef(null);

useEffect(() => {
  if (descriptionTextAreaRef.current) {
    
     descriptionTextAreaRef.current.style.height = "auto";
     descriptionTextAreaRef.current.style.width = "auto";

     
     descriptionTextAreaRef.current.style.height =
       descriptionTextAreaRef.current.scrollHeight + "px";
     descriptionTextAreaRef.current.style.width =
       descriptionTextAreaRef.current.scrollWidth +100+ "px";
  }
}, [Assignment.description]);

    
    return(
        <Container className="mt-5">
          
            {Assignment ?(
                <>
                <Row className="d-flex align-items-center">
                    <Col>
            <h1 >Assignment : {Assignment.number}</h1>
            </Col>
            <Col>
            <Badge pill bg={Assignment.status === 'Completed' ? "success" : "info"}>
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
             style={{
                
                resize: "none",
                padding: "5px",
                minHeight: "5em",
                overflowY: "auto",
                overflowX: "auto", 
                
              }}
            ref={descriptionTextAreaRef}
            wrap="off"
            value={Assignment.description}
            readOnly
             type="url" 
            />
             
             
             
            </Col>
            {Assignment.status === 'Pending Submission'?(
        <Form.Group as={Row} className="mb-3 mt-5">
        <Form.Label column sm="2">
          Upload Image:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
             
          />
          
        </Col>
      </Form.Group>
      
      ):(
         
          <Form.Group as={Row} className="mb-3 mt-5">
            <Form.Label column sm="2">
              Submitted image:
            </Form.Label>
            <Col sm="10">
                
              <img src={`data:image/jpeg;base64,${Assignment.image}`} alt="Assignment"
              style={{width:"50em"}}
               />
            </Col>
            <Form.Group as={Row} className="mb-3 mt-5">
            <Form.Label column sm="2">
              Submit new image:
            </Form.Label>
            <Col sm="10">
                <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
             
          />
              
            </Col>
          </Form.Group>
          </Form.Group>
          
          
          
          
      )    
      }
            
            </Form.Group>
            
       
        
           {Assignment.status === 'Completed'?(
            <>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
        Video URL:
        </Form.Label>
            <Col sm="10">
          <Form.Text style={{fontWeight:"bold"}}>
          {Assignment.codeReviewUrl}
          </Form.Text>
            </Col>
        </Form.Group>
        <Button type="submit" style={{marginTop:"2em"}} variant="secondary" onClick={()=>window.location.href="/"}>Back</Button> 
        </>

           ):Assignment.status === "Pending Submission"?(
                <>
             <Button type="submit" style={{marginTop:"2em"}} onClick={()=>save("Submitted")}>Submit asssignment</Button> 
                </>
           ):(
           <>
           <Button type="resubmit" style={{marginTop:"2em"}} className="mb-4" onClick={()=>save("Resubmitted")}>Re-Submit asssignment</Button> 
           </>)
          }

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
export default AssignmentView;