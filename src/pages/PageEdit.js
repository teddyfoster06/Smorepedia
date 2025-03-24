import React, { useState, useEffect } from 'react'
import './PageEdit.css'
import { useParams } from 'react-router-dom';
import {getContent, listPages, pageExists, addPage, editPage} 
from "../middleware.js";
import { useNavigate } from "react-router-dom";


function formatTitle(title3){
    for(let  i = 0; i < title3.length; i++){
        if(title3.substring(i, i+1) === "-"){
            title3 = title3.substring(0, i) + " " + title3.substring(i+1, title3.length);
        }
    }
    return title3;
}

const submitEdits = async (title, content, infobox, navigate, oldTitle) => {
    const res = await editPage(title, content, infobox, oldTitle);
    if(res){
        navigate(`/${title}/view`)
    }
}

function PageEdit() {
    const {urlTitle} = useParams();
    const navigate = useNavigate();
    // const[titles, setTitles] = useState([]);
    const[title, setTitle] = useState("Loading...");
    const[infobox, setInfobox] = useState("Loading...");
    const[content, setContent] = useState("Loading...");
    const[selTab, setselTab] = useState("Help");

    useEffect(() => {
        const fetchData = async () => {
            const response = await getContent(urlTitle)
            
            // setTitles(names);
            console.log(response);
            setTitle(response.title);
            setContent(response.content);
            setInfobox(response.infobox);
        }
        fetchData();
    }, [])


    return (
    <div className='All1'>
        <div className='content'>
            <form>
            <h2 className='elabels'>Title</h2>
            {title}
            <h2 className='elabels'>Infobox</h2>
            <textarea className='boxeditor' rows='100' cols={window.innerWidth / 30} style={{display: (infobox !== "Loading..."? "inline-block" : "none")}} value={infobox} onChange={(event) => {
                if(infobox !== "Loading..."){
                    setInfobox(event.target.value)
                }
            }}/>
            
            <h2 className='elabels'>Page Content</h2>
                <textarea className='editor' rows='100' cols={window.innerWidth / 15} style={{display: (content !== "Loading..."? "inline-block" : "none")}} value={content} onChange={(event) => {
                if(content !== "Loading..."){
                    setContent(event.target.value)
                }
            }}/>
            </form>
            <div>
                <button onClick={() => {
                    submitEdits(urlTitle, content, infobox, navigate, title);
                }}>Submit Edits</button>
            </div>
        </div>
        <div className='demo'>
            <div className='tabs'>
                <div className='tab'style={{
                    backgroundColor: selTab === "Help" ? "white" : "black", 
                    color: selTab === "Help" ? "black" : "white",
                    width: "100%"
                    }}
                    onClick={() => {
                        setselTab("Help")
                    }}
                    >
                    Help & Documentation
                </div>
            </div>
            <div className='bottomBit'>
            <div style={{
                display:selTab === "Help" ? 'inline-block': "none" , width: "100%"
            }}>
             


<h2 className="step-header">Step 1: Creating an Info Box</h2>
<p className="step-description">
  An info box is a special section that organizes information in a structured way.
  Each row of the info box is contained within curly braces <code className="syntax">{`{}`}</code>. You’ll have a label and its corresponding value for each piece of data.
</p>
<pre className="example-syntax">
  {`{Label: Value}`}
</pre>

<pre className="example-syntax">
  {`{Name: John Doe}`}
  {`{Birthdate: January 1, 1990}`}
  {`{Occupation: Software Developer}`}
  {`{Nationality: American}`}
</pre>



<h2 className="step-header">Step 2: Big Headers</h2>
<p className="step-description">
  Big headers are used to highlight major section titles. These are wrapped in <code className="syntax">{`{^`}</code> and <code className="syntax">{`^}`}</code>.
</p>
<pre className="example-syntax">
  {`{^ Big Header Text ^}`}
</pre>


<pre className="example-syntax">
  {`{^ Biography ^}`}
  {`{^ Early Life ^}`}
  {`{^ Career ^}`}
</pre>



<h2 className="step-header">Step 3: Little Headers</h2>
<p className="step-description">
  Little headers are subheadings or smaller titles under a big header. These are wrapped in curly braces <code className="syntax">{`{}`}</code>.
</p>
<pre className="example-syntax">
  {`{Little Header Text}`}
</pre>


<pre className="example-syntax">
  {`{Early Childhood}`}
  {`{Education}`}
  {`{First Job}`}
</pre>



<h2 className="step-header">Step 4: Normal Text</h2>
<p className="step-description">
  Normal text, or body content, does not require any special formatting. It is just plain text with no curly braces around it.
</p>
<pre className="example-syntax">
  {`John Doe was born in a small town and grew up with a passion for technology. After graduating from college, he pursued a career in software development.`}
</pre>

            </div>
            </div>
        </div>
    </div>
  )
}

export default PageEdit
