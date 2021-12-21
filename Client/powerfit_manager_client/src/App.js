import './App.css';
import Sidebar from './components/layout/Sidebar.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routes/routes';


function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar/>
        <Routes>
          {routes.map(route=>(
            <Route
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
