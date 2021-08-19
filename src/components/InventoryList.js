import { Button } from '@material-ui/core';
import ArticleCard from './articleCard'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

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
            
            return (<Grid item xs={3}> 
                      <ArticleCard title={article.title} description={article.description} stock={article.stock} image={domain + article.image[0].url}/>
                    </Grid>)
          })}
        </Grid>
    </div>
  )
}

export default InventoryList;
