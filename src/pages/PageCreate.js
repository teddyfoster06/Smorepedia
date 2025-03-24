import React, { useState, useEffect } from 'react'
import './PageCreate.css'
import {getContent, listPages, pageExists, addPage, editPage} from "../middleware.js";
import { useNavigate } from "react-router-dom";

// let content = await query('byprop', {prop: 'content'});
// let title = 'maya l';
// for(let i = 0 ; i < content.length; i+=1){
//     if(content[i].title === title){
//         content = content[i].content;
//         i = content.length;
//     }
// }
// console.log(content);
async function onSubmit(title, navigate) {
    const output = await addPage(title);
    if(output){
        navigate("/" + output + "/edit");
    }
}
function PageCreate() {
    const [title, setTitle] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    return (
    <div className='All-6'>
        
        <div className='content-2'>
            <div className='createTitle'>
            Pick a Page Name (You Can't Change this later)
            </div>
            <input type="text" className='inputTitle' name="name" placeholder="Page Name Here" onChange={(event) => {
                setTitle(event.target.value)
            }}/>
            <button className='submitTitle' onClick={() => {
                setSubmitted(true)
                onSubmit(title, navigate)
            }}>Start Writing!</button>

            {submitted ? "Loading. If this takes more than a few seconds, reload the page and start over." :<div></div>}

        </div>
    </div>
  )
}

export default PageCreate
