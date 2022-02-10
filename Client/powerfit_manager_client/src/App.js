import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import routes from './routes/routes';
import AuthContext from './components/hooks/Authentication/AuthContext';
import { useContext } from 'react';

function App() {
  const {userAuth}=useContext(AuthContext);
  return (
    <div className="App">
      <Router>
            <Routes>
              <Route path='/'
              element={routes[1].element}/>
                {routes.map(route=>(
                    <Route
                        path={route.path}
                        element={userAuth?route.element:(
                          <>
                          {routes[1].element}
                          </>
                        )}
                    />
                ))}
            </Routes>
      </Router>
    </div>
  );
}

export default App;
