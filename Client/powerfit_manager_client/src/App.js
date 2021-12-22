import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routes/routes';
import Sidebar from './components/layout/Sidebar';

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
