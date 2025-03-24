import React from 'react'
import { useNavigate} from "react-router-dom";
import './Home.css'
function Home() {
    const navigate = useNavigate();
  return (
    <div className='initial'>
              <div className='initialtext' style={{marginTop: "10vh"}}>
                Welcome to S'morepedia!
              </div>
              <div className='initialtext'>
                Start Your Journey By Searching Above
              </div>
              <button className='createbutton' onClick={() => {
                navigate("/create")
              }}>
                Can't Find What You're looking For? Click Me to Create a Page
              </button>
            </div>
  )
}

export default Home
