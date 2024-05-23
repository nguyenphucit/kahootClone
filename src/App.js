import './App.css';
import { GamePage } from './pages/GamePage/GamePage';
import { LobbyPage } from './pages/LobbyPage/LobbyPage';
import {WelcomePage} from './pages/WelcomePage/WelcomePage'
import { Route,Routes } from 'react-router-dom';
import { AdminTest } from './TestAdmin';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { CreateQuizPage } from './pages/CreateQuizPage/CreateQuizPage';
import { CreateGamePage } from './pages/CreateGamePage/CreateGamePage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { OTPPage } from './pages/OTPPage/OTPPage';
import { ResultSummary } from './component/ResultSummary/ResultSummary';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/admin/createQuiz' element={<CreateQuizPage/>}/>
        <Route path='/admin/createGame' element={<CreateGamePage/>}/>
        <Route path='/' element={<WelcomePage/>}/>
        <Route path='/lobby/:gameId' element={<LobbyPage/>}/>
        <Route path='/game/:gameId' element={<GamePage/>}/>
        <Route path='/test' element={<AdminTest/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register'element={<RegisterPage/>}/>
        <Route path='/otpVerify' element={<OTPPage/>}/>
        <Route path='/result' element={<ResultSummary/>}/>
      </Routes>
    </div>
  );
}

export default App;
