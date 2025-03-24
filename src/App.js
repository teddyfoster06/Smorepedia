import Topbar from './components/Topbar';
import PageNormal from './pages/PageNormal';
import PageEdit from './pages/PageEdit';
import PageCreate from './pages/PageCreate';
import Home from './pages/Home.js'
import './App.css';
import {getContent, listPages, pageExists, addPage, editPage} from "./middleware.js";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className='All'>
<Router>
        
        <Topbar/>
        <Routes>
          <Route path='/:urlTitle/edit' element={<PageEdit/>}/>
          <Route path='/create' element={<PageCreate/>}/>
          <Route path='/:urlTitle/view' element={<PageNormal/>}/>
          <Route path='/' element={
            <Home/>
          }/>
        </Routes>
      </Router>
    </div>
      
  );
}

export default App;
