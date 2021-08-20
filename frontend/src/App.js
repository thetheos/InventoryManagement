import Drawer from './components/drawer'
import InventoryList from './components/inventory/InventoryList'
import InventoryAdd from './components/inventory/InventoryAdd'
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
      <Drawer title="Louvain-li-Nux inventaire" content={<InventoryList/>} />
    </Route>

  </Switch>
  </Router>
  )
}

export default App;
