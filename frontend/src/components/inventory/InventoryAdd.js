import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Link } from "react-router-dom";
import StorageIcon from '@material-ui/icons/Storage';
import { DropzoneArea } from 'material-ui-dropzone'
import Grid from '@material-ui/core/Grid';
import ArticleCard from './InventoryCard'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    link: {
      display: 'flex',
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(2),
        },
      },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  }));

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

function InventoryAdd(props) {
    const classes = useStyles();

      


    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link style={{ textDecoration: 'none' }} to="/">
                    <Typography color="textPrimary" className={classes.link}>
                        <StorageIcon className={classes.icon} />
                        Inventaire
                    </Typography>
                </Link>

                <Typography color="textPrimary" className={classes.link}>
                    <PlaylistAddIcon className={classes.icon} />
                        Ajout d'un article
                </Typography>
            </Breadcrumbs>

            
            

        <Grid container spacing={3}>
            <Grid item md={8} xs={12} sm={8} style={{alignItems: 'center'}}>
                <form className={classes.root} noValidate autoComplete="off">
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        filesLimit='1'
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={(files) => console.log('Files:', files)}
                    />
                    
                    <TextField
                        id="filled-disabled"
                        label="Titre"
                        defaultValue="Hello World"
                        variant="outlined"
                        fullWidth
                    />
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                </form>
            </Grid>

            <Grid item md={4} xs={12} sm={4}>
                <ArticleCard title="Preview: " description="hello world" stock="666"/>
            </Grid>


        </Grid>

            
        </div>
    );
}

export default InventoryAdd