import Drawer from './components/drawer'
import InventoryList from './components/inventory/InventoryList'
import InventoryAdd from './components/inventory/InventoryAdd'
import InventoryDetail from './components/inventory/InventoryDetail'
import ClientList from './components/Clients/ClientList'
import ClientAdd from './components/Clients/ClientAdd'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function App() {
  return (
  <Router>
  <Switch>
    <Route exact path="/">
      <Drawer title="Louvain-li-Nux inventaire" content={<InventoryList/>} />
    </Route>
    <Route path="/inventory/add">
      <Drawer title="Louvain-li-Nux inventaire" content={<InventoryAdd/>} />
    </Route>
    <Route path="/inventory/:id">
      <Drawer title="Louvain-li-Nux inventaire" content={<InventoryDetail/>} />
    </Route>
    <Route path="/clients/add">
      <Drawer title="Louvain-li-Nux clients" content={<ClientAdd/>}/>
    </Route>
    <Route path="/clients">
      <Drawer title="Louvain-li-Nux clients" content={<ClientList/>}/>
    </Route>
  </Switch>
  </Router>
  )
}

export default App;
