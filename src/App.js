import {Route, Switch} from 'react-router-dom'
import Login from './components/LoginPage'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import LoginCheck from './components/LoginCheck'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <LoginCheck exact path="/" component={Home} />
    <LoginCheck exact path="/jobs" component={Jobs} />
    <LoginCheck exact path="/jobs/:id" component={JobDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
