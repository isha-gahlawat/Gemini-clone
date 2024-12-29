import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
const Sidebar = () => {
  const [extend, setextend] = useState(false);
  const { onsent, prevprompt, setrecentprompt,newchat } = useContext(Context);
 
  const loadprompt=async(prompt)=>{
    setrecentprompt(prompt);
    onsent(prompt);
  }

  
  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          onClick={() => setextend((prev) => !prev)}
          src={assets.menu_icon}
          alt=""
        />
        <div className="new" onClick={()=>{newchat()}}>
          <img className="newimg" src={assets.plus_icon} alt="" />
          {extend ? <p>New Chat</p> : null}
        </div>
        {extend ? 
          <div className="recent">
            <p className="recent-titile">Recent</p>
            {prevprompt.map((item, index) => {
              return (
                <div onClick={()=>{loadprompt(item)}} key={index} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0,18)}...</p>
                </div>
              )
            })}
          </div>
         : null}
      </div>
      <div className="bottom">
        <div className="bitem  recent-entry">
          <img className="question" src={assets.question_icon} alt="" />
          {extend ? <p>Help</p> : null}
        </div>
        <div className="bitem recent-entry">
          <img className="activity" src={assets.history_icon} alt="" />
          {extend ? <p>Activity</p> : null}
        </div>
        <div className="bitem recent-entry">
          <img className="settings" src={assets.setting_icon} alt="" />
          {extend ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
