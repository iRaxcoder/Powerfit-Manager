import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import routes,{LoginView} from './routes/routes';
import AuthContext from './components/hooks/Authentication/AuthContext';
import { useContext, useEffect, useState } from 'react';

function App() {
  const {userAuth}=useContext(AuthContext);
  const [isLog,setIsLog]=useState(null);
  useEffect(()=>{
    if(userAuth===1){
      setIsLog(1);
    }else{
      setIsLog(null);
    }
  },[userAuth]);
  return (
    <div className="App">
      <Router>
            <Routes>
              <Route path='/'
              element={LoginView.element}/>
                {routes.map(route=>(
                    <Route
                        path={route.path}
                        element={isLog?route.element:LoginView.element}
                    />
                ))}
            </Routes>
      </Router>
    </div>
  );
}

export default App;
