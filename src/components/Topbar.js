import React, {useEffect, useState} from 'react'
import Logo from '../assets/smorelogo.png'
import './Topbar.css'
import {getContent, listPages, pageExists, addPage, editPage} from "../middleware.js";
import { useNavigate, useLocation } from "react-router-dom";

function formatTitle(title3){
    for(let  i = 0; i < title3.length; i++){
        if(title3.substring(i, i+1) === "-"){
            title3 = title3.substring(0, i) + " " + title3.substring(i+1, title3.length);
        }
    }
    return title3;
}
function deformatTitle(title3){
    for(let  i = 0; i < title3.length; i++){
        if(title3.substring(i, i+1) === " "){
            title3 = title3.substring(0, i) + "-" + title3.substring(i+1, title3.length);
        }
    }
    return title3;
}

// const curateResults = (soFar, navigate, setResults, setResultLinks) => {
//     soFar = soFar.toLowerCase();
//     console.log("Made it " + soFar);
    
//     let newResults = [];
//     let newResultLinks = [];

//     let count = 0;
//     for(let i = 0; i < pages.length; i++) {
//         if(pages[i].toLowerCase().startsWith(soFar)) {
//             newResults.push(pages[i]);
//             newResultLinks.push(links[i]);
//             count++;
//         }
//         if(count === 5) break;
//     }

//     setResults(newResults);
//     setResultLinks(newResultLinks);
// };

// let results = [];
// let resultLinks = [];
let pages = [];
let links = [];


function Topbar() {
    const [results, setResults] = useState([]);
    const [resultLinks, setResultLinks] = useState([]);
    const [userInBar, setUserInBar] = useState(false);
    const [searchVal, setSearchVal] = useState('')
    const [resultsVisibile, setResultsVisible] = useState(false);
    const [onHomePage, setOnHomePage] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if(!userInBar){
            if(resultsVisibile){
                setTimeout(() => {
                    setResultsVisible(false);
                }, 200)
            }
        }else{
            setResultsVisible(true)
        }
        
    }, [userInBar])
    const handleInputChange = (event) =>{
        const newValue = event.target.value;
        setSearchVal(newValue);
        if(searchVal.length === 0){
            results.length = 0;
            console.log('len to 0')
        }
        console.log(newValue)
        const soFar = newValue.toLowerCase();

        let newResults = [];
        let newResultLinks = [];

        let count = 0;
        for(let i = 0; i < pages.length; i++) {
            if(pages[i].toLowerCase().startsWith(soFar)) {
                newResults.push(pages[i]);
                newResultLinks.push(links[i]);
                count++;
            }
            if(count === 5) 
                break;
        }
        setResults(newResults);
        setResultLinks(newResultLinks);

    // setResults(newResults);
    // setResultLinks(newResultLinks);
    //     curateResults(newValue, navigate, results, setResults, resultLinks, setResultLinks);
    }
    useEffect(() => {
        const func = async () => {
            const nms = await listPages();
            pages = [];
            links = [];
            for(let i = 0; i < nms.length; i++){
                console.log("Name:");
                console.log(nms[i]);
                pages.push(nms[i]);
                links.push("/" + deformatTitle(nms[i]) +"/view")
            }
            // curateResults("", navigate, results, setResults, resultLinks, setResultLinks);
        }
        if(location.pathname === "/"){
            console.log("I'm at home");
            setOnHomePage(true);
        }else{
            setOnHomePage(false);
        }
        func();
    }, [])
    const onBarFocus = () => {
        if(searchVal === ''){
            // curateResults('', navigate, results, setResults, resultLinks, setResultLinks)
        }
        let newResults = [];
        let newResultLinks = [];

        let count = 0;
        for(let i = 0; i < pages.length; i++) {
                newResults.push(pages[i]);
                newResultLinks.push(links[i]);
                count++;
            
            if(count === 5) 
                break;
        }
        setResults(newResults);
        setResultLinks(newResultLinks);
        setUserInBar(true)
    }
    const onBarDefocus = () => {
        
        setUserInBar(false)
    }
  return (
    <div className='Topbar'>
        <div className='left' onClick={() => {
            navigate('/');
        }}>
            <img src={Logo} className='logo'/>
            <header className='logofont'>S'morepedia</header>  
            {/* <input type="checkbox" id="darkmode-toggle"/>
        <label for="darkmode-toggle"></label> */}
        </div>
        <div className='right' 
        > 
        
            <form className = "search-box">
                <input
                className='search-bar'
                type = "search" 
                placeholder = "Search S'morepedia" 
                onFocus={onBarFocus}
                onBlur={onBarDefocus}
                value={searchVal}
                onChange={handleInputChange}
                />
            </form>
            <div className='results' style={{
                display: resultsVisibile ? 'flex': 'none'
                }}>
                {results.map((element, index) => (
                    <button className='result' key={index} onClick={() => {
                        
                        console.log("Button Pressed");
                        navigate(resultLinks[index])
                        }}>
                        {element}
                    </button>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Topbar
