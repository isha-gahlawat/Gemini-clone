import React, { useState } from "react";
import { createContext } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentprompt, setrecentprompt] = useState("");
  const [prevprompt, setprevprompt] = useState([]);
  const [showresult, setshowresult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultdata, setresultdata] = useState("");

  const delay=(index,nextword)=>{
    setTimeout(function(){
     setresultdata(prev=>prev+nextword);
    },75*index)
   }

   const newchat=()=>{
    setloading(false);
    setshowresult(false);
   }

  const onsent = async (prompt) => {
    setresultdata("");
    setloading(true);
    setshowresult(true);
    let response;
    if(prompt!==undefined){
     response=await run( prompt);
     setrecentprompt(prompt)
    }
    else{
    setprevprompt(prev=>[...prev,input])
    setrecentprompt(input);
    response= await run(input);
    }
    
    
   
    let rarray = response.split("**");
    let newres = "";
    for (let i = 0; i < rarray.length; i++) {
      if (i === 0 || i % 2 == 0) {
        newres += rarray[i];
      } else {
        newres += "<b>" + rarray[i] + "</b>";
      }
    }

    let newres2 = newres.split("*").join("</br>");
    let newres2array=newres2.split(" ");
    for (let i = 0; i < newres2array.length; i++){
        const nextword=newres2array[i];
        delay(i,nextword+" ");
    }
    
    setloading(false);
    setinput("");
  };

  const contextvalue = {
    input,
    setinput,
    recentprompt,
    setrecentprompt,
    prevprompt,
    setprevprompt,
    showresult,
    loading,
    onsent,
    resultdata,
    newchat,
  };

  return (
    <Context.Provider value={contextvalue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
