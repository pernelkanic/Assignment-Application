import React, { useState } from "react";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import '../App.css';
import { useLocalState } from "../utils/useLocalstorage";

const CodeReviewerAssignmentCreation = () => {
    const AssignmentId = window.location.href.split("/assignment/")[1];
    const [Assignment, setAssignment] = useState({
        description: "",
        status: null,
    });
    const [jwt, setjwt] = useLocalState("", "jwt");
    const [assignmentstatusenums, setassignmentstatusenums] = useState([]);

    function updateAssignment(prop, value) {
        const newAssignment = { ...Assignment };
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function handleImageSelect(e) {
        const selectedImage = e.target.files[0];
        
        setAssignment({ ...Assignment });
      }
    
      function save() {
        const formData = new FormData();
        formData.append("description", Assignment.description);
        
    
        fetch('/api/assignments', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.status === 200) return response.json();
          })
          .then((data) => {
            if (data && data.length > 0) {
              const firstAssignment = data[0];
              window.location.href = '/';
              alert("Assignment Created Successfully");
            } else {
              console.error("Error creating assignment:", data);
            }
          });
      }
      
        return(
            <Container className="mt-5">
              
                {Assignment ?(
                    <>
                    <Row className="d-flex align-items-center">
                        <Col>
                <h1 >Create Assignment </h1>
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
              <textarea id="branch"
              onChange={(e)=>{updateAssignment("description" , e.target.value)}}

              type=""
              
              name="textValue" 
              rows={20}
              cols={50}
                placeholder="Description"
              value={Assignment.description}
                />
                </Col>
            </Form.Group>
            
           
    
    
               
               
                
                     <Button type="submit" variant="primary" style={{marginTop:"2em" , marginLeft:"2em"}} onClick={()=>save()}>Create Assignment</Button> 
                
                
               
    
                <Button type="submit" style={{marginTop:"2em" , marginLeft:"2em"}} variant="secondary" onClick={()=>window.location.href="/"}>Back</Button> 
                </>
                 )
                
                : (<></>)}
            </Container>
        )
    }
   

export default CodeReviewerAssignmentCreation