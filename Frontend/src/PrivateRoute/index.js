import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "../utils/useLocalstorage";
const PrivateRoute=({children})=>{

   const [jwt, setjwt] = useLocalState("", "jwt");
   const [isLoading,setIsLoading] = useState(true);
   const [isValid,setIsValid] = useState(null);
   
   if(jwt){

      fetch(`/api/auth/validate?token=${jwt}`, {
         headers:{
            "Content-Type" :"application/json",
            
            Authorization:`Bearer ${jwt}`
      
         },
         method: "get",
         
      })
   
      
      .then((response)=>{
         if(response.status === 200 )return response.json();
      })
      .then((isValid) =>{
            setIsValid(isValid);
            setIsLoading(false);
         })
      }
     else{
      return <Navigate to='/login'/>;
     }
   return isLoading?(
      <div>Loading...</div>
   ):isValid == true?(
      children
   ):
   (
      <Navigate to='/login'/>
   );
};
export default PrivateRoute;