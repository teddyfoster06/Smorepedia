import React, { useEffect, useState } from 'react'
import './PageNormal.css'
import { useParams } from 'react-router-dom';
import {getContent, listPages, pageExists, addPage, editPage} from "../middleware.js";
import { useLocation, useNavigate } from "react-router-dom";

const input = `
{^Header 1^} = h2
Hey im teddy and im writing a paragraph.Coolthings.

Cooltgihina.

{Header 2} = h3
Paragraph 2 line 1.
Paragraph 2 line 2.

Paragraph 3.

`;
const infobox = [


];
//asidhashdhaohdlkh  
//{History} 
//hkjagkdgkajsgdj
//jdkljsahdjhakjd

let numofobjects = 0;
const readInput = (input1, setSubsections) => {
    let subsections = [


    ];
    console.log("We just formatted:" + input1)
  //  let sections = [];
 
    let currentHeader = "";
    let currentParagraph;
    let headerflag = true;
    let inHeader = false;
    let currentText = "";
    for (let i = 0; i < input1.length; i++){
        const char = input1[i];
        if(!inHeader){
            if (char === "{"){
             inHeader = true;
             if(currentText !== ""){
                subsections.push(
                    <p>
                        {currentText}
                    </p>
                 );
             }
             
            currentHeader = "";
             currentText = "";
            }else if(i + 1 < input1.length && char === '\n'){
                subsections.push(
                    <p>
                    {currentText}
                    </p>
                );
                subsections.push(
                    <br/>
                    //Someone shrink this god damn br
                );
                currentText = "";
            }else{

                currentText += char;
            }
        }else{
            //reset header
            if (char === "^"){ //{ followed by ^}
                headerflag = false;
                
            } else if (char === "}"){
                inHeader = false;
                if(!(currentHeader.trim() === "")){
                    if(!headerflag){
                        headerflag = true;
                        subsections.push(
                            <h2 key={numofobjects}> 
                            {currentHeader}
                            </h2>
                         )
                    }else{
                        subsections.push(              //add to subsections array
                            <h3 key={numofobjects}>  
                            {currentHeader}
                            </h3>
                        )
                    }
                }
            } else {
                currentHeader += char;             //add char to header if not { or }
            }    
        }
    }
    subsections.push(<p>{currentText}</p>);
    console.log(subsections)
    setSubsections(subsections);
};

function textToBox(infobox){
    let inBox = false;
    const boxes = [];
    let currentString = "";
    for(let i =0; i < infobox.length; i++){
        const char = infobox.charAt(i);
        if(char === "{" && !inBox){
            inBox = true;
        }else if(char === "}" && inBox){
            inBox = false;
            boxes.push(currentString)
            currentString = "";
        }else{
            currentString += char;
        }
    }
    return boxes;
}
// const result = readInput(input);
// console.log(result);
const loadContent = async (setContent, setInfobox, urlTitle, setSubsections, setTitle) => {
    const response =  await getContent(urlTitle);
    setTitle(response.title);
    setContent(response.content);
    setInfobox(textToBox(response.infobox));
    readInput(response.content, setSubsections)
}

function PageNormal() {
    const {urlTitle} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const[content, setContent] = useState("Loading...");
    const[infobox, setInfobox] = useState([]);
    const[title, setTitle] = useState("Loading...");
    const[subsections, setSubsections] = useState([]);
    useEffect(() => {
        loadContent(setContent, setInfobox, urlTitle, setSubsections, setTitle)
    }, [location.pathname])
    useEffect(() => {
        console.log(subsections);
    }, [subsections]);
    return (
    <div className='All3'>
        <div className='content-3'>
                <div className='pagetitle'>
                    {title}
                    <button className='edit-button' onClick={() => {
                    navigate('/' + urlTitle + '/edit')
                }}>
                    Edit Page ✏️
                </button>
                </div>
                
           
            
        {subsections.map((element, index) => (
        <React.Fragment key={index}>
          {element}
        </React.Fragment>
      ))}
        </div>
        <div className='infobox' style={{height:  (8 + (infobox.length * 4)) + "vh"}}>
            <div className='info-header1'>
                {title}
            </div>
            <div className='info-header2'>
                Key Stats:
            </div>
            {infobox.map((element, index) => (
                    <div className='infobox-bar'>
                        {element}
                    </div>
                ))}
        </div>
    </div>
  )
}

export default PageNormal
