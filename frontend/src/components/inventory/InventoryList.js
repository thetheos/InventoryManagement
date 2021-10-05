import { Button } from '@material-ui/core';
import InventoryCard from './InventoryCard'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Link } from "react-router-dom";

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
  background: '#e79908',
   color: '#fff'
};

function InventoryList() {

  const [articleList, setArticleList] = useState(null);


  const domain = "http://localhost:1337"
  useEffect(() => {    
    axios.get(domain+'/inventories').then(response => {
      console.log(response);
      const myInventory = response.data
      setArticleList(myInventory)
     
    });
  }, []);

  return (
    <div>

      <Grid container spacing={3}>
          {(articleList || []).map( (article) => {
            if(article.image[0]){
            return (<Grid item md={3} xs={12} sm={6}> 
                      <InventoryCard disabled={false} title={article.title} description={article.description} stock={article.stock} image={domain + article.image[0].url}/>
                    </Grid>)}
            else{
              return (<Grid item md={3} xs={12} sm={6}> 
                <InventoryCard title={article.title} description={article.description} stock={article.stock} />
              </Grid>)}
            }
          )}
      </Grid>
      <Link to="/inventory/add">
        <Fab style={style} aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
      
    </div>
  )
}

export default InventoryList;
