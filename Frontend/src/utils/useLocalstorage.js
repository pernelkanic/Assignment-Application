import { useEffect, useState } from "react";

function useLocalState(defaultValue , key){
    const[value, setvalue] = useState(()=>{
       const localstorage = localStorage.getItem(key);
       return localstorage !==null? JSON.parse(localstorage):defaultValue ;
    });
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value));

    },[key,value]);
    return [value , setvalue];
}
export { useLocalState };
