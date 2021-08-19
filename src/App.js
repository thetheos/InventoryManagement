import { Button } from '@material-ui/core';
import Drawer from './components/drawer'
import ArticleCard from './components/articleCard'
import InventoryList from './components/InventoryList'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function App() {
  return (
        <Drawer title="Louvain-li-Nux inventaire" content={<InventoryList/>} />
        )
}

export default App;
