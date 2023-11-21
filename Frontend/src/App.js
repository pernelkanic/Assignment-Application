import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from "jwt-decode";
import { React, useState } from "react";
import { Route, Routes, } from "react-router-dom";
import CodeReviewer from "./CodeReviewer";
import CodeReviewerAssignmentCreation from './CodeReviewerAssignmentCreation';
import CodeReviewerAssignmentView from './CodeReviewerAssignmentView';
import PrivateRoute from "./PrivateRoute";
import AssignmentView from "./assignmentView";
import HomePage from "./home/index";
import Login from "./login/index";
import { useLocalState } from "./utils/useLocalstorage";
function App() {
  const [jwt, setjwt] = useLocalState("", "jwt");
 const[roles,setroles] = useState(getRolesFromJwt());

 function getRolesFromJwt(){
  if(jwt){
  const decodedjwt = jwt_decode(jwt);
  return decodedjwt.authorities;
}
return [];

 }
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
     
      <Route path="/create" element={
      roles.find((role)=>role === 'ROLE_CODE_REVIEWER') ?
      (<PrivateRoute>
        <CodeReviewerAssignmentCreation/>
        </PrivateRoute>
        ):(
          <>NOT ALLOWED...</>
        )
      }
      />
      <Route
        path="/"
        element={
          roles.find((role)=>role === 'ROLE_CODE_REVIEWER') ?
        (<PrivateRoute>
        <CodeReviewer/>
        </PrivateRoute>
        ):(
        <PrivateRoute>
        <HomePage/>
        </PrivateRoute>
        )
        }
        />
        <Route
        path="/assignment/:assignmentId"
        element={
          roles.find((role)=>role === 'ROLE_CODE_REVIEWER') ?
          (
          <PrivateRoute>
            <CodeReviewerAssignmentView/>
          </PrivateRoute>
          )
        : ( <PrivateRoute>
            <AssignmentView/>
          </PrivateRoute>
          )
        }
        />

    </Routes>


  );
};

export default App;
