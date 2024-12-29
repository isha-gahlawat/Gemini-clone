import React from "react";
import "./Main.css";
import { assets } from "../../../assets/assets";
import { useContext } from "react";
import { Context } from "../../../context/context";

const Main = () => {
  const { onsent, recentprompt,loading,showresult,setinput, input,resultdata,setrecentprompt,setprevprompt
  } = useContext(Context);

  const loadingp=async(prompt)=>{
  const a=prompt.childNodes[0];
  if (a) { const text = a.textContent;
  setrecentprompt(text);
  setprevprompt(prev=>[...prev,text])
  onsent(text);
  }
   else { console.error('Element not found'); } }

  return (
    <>
      <div className="main">
        <nav>
          <p>Gemini</p>
          <img src={assets.user_icon} alt="" />
        </nav>

        {!showresult ? (
          <div className="mid">
            <div className="greet">
              <p>
                <span>Hello,Isha.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card" onClick={(e)=>loadingp(e.target)} >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" id="2" onClick={(e)=>loadingp(e.target)}>
                <p>Briefly summarize this concept:urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" id="3" onClick={(e)=>loadingp(e.target)}>
                <p>Brainstrom team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" id="4" onClick={(e)=>loadingp(e.target)}>
                <p>Improve the readibility of following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </div>
        ) : (
          <div className="mid" id="res">
            <div className="res-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentprompt}</p>
            </div>
            <div className="res-data">
              <img src={assets.gemini_icon} alt="" />
              {loading?<div className="loader">
                <hr></hr>
                <hr></hr>
                <hr></hr>
              </div>
             : <p dangerouslySetInnerHTML={{ __html: resultdata }}></p>}
            </div>
          </div>
        )}
        <div className="end">
          <input
            onChange={(e) => setinput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter a prompt here "
          ></input>
          <div className="asset">
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            <img onClick={() => onsent()} src={assets.send_icon} alt="" />
          </div>
        </div>

        <footer>
          <p>
            Gemini may display inaccurate info,including about people,so double
            check its responses.Your privacy and Gemini apps
          </p>
        </footer>
      </div>
    </>
  );
};

export default Main;
