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
import ProductTable from '../Product/ProductTable';
import {useState, useEffect} from 'react';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
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

  const saveButton = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    background: '#e79908',
     color: '#fff'
  };


function InventoryAdd(props) {
    const classes = useStyles();

    const [title, setTitle] = useState('Title')
    const [picture, setPicture] = useState(null)
    const [pictureUrl, setPictureUrl] = useState(null)
    const [numberStock, setNumberStock] = useState(0)
    const [description, setDescription] = useState('Description')
    const [articleRows, setArticleRows] = useState([]);

    useEffect(() => {
        setNumberStock(articleRows.length)
    }, [articleRows])

    function onChangeField(e, fieldString) {
        if (fieldString == 'title'){
            setTitle(e.target.value)
        }else if(fieldString == 'picture'){
            if (e.length > 0){
                setPicture(e[0])
                setPictureUrl(URL.createObjectURL(e[0]))
            }
        }else if(fieldString == 'description'){
            setDescription(e.target.value)
        }
    }

    const upload = (e) => {
        const postData =
        {
            "title": title,
            "description": description,
            "stock": numberStock,
        }
        let formData = new FormData();
        formData.append("files.image", picture);
        formData.append("data", JSON.stringify(postData));
        axios({
          method: "post",
          url: "http://localhost:1337/inventories",
          data: formData
        })
          .then(({ data }) => {
            console.log("Succesfully uploaded: ", JSON.stringify(data));
          })
          .catch((error) => {
            console.log("Error: ", error.message);
          });
      };

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
                        onChange={(files) => onChangeField(files, 'picture')}
                    />
                    
                    <TextField
                        id="filled-disabled"
                        label="Titre"
                        variant="outlined"
                        fullWidth
                        onChange={(e)=> onChangeField(e, 'title')}
                    />
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            onChange={(e)=> onChangeField(e, 'description')}
                        />
                    </div>
                    <h2>En stock</h2>
                    <ProductTable rows={articleRows} setRows={setArticleRows}/>
                </form>
            </Grid>

            <Grid item md={4} xs={12} sm={4}>
                <ArticleCard title={title} image={pictureUrl} description={description} stock={numberStock} disabled={true}/>
            </Grid>

        </Grid>

        <Link onClick={upload}>
            <Fab style={saveButton} aria-label="add">
                <SaveIcon />
            </Fab>
        </Link>
            
        </div>
    );
}

export default InventoryAdd