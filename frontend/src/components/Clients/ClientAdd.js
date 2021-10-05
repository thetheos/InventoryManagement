import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Link } from "react-router-dom";
import StorageIcon from '@material-ui/icons/Storage';
import { DropzoneArea } from 'material-ui-dropzone'
import Grid from '@material-ui/core/Grid';
import ArticleCard from '../inventory/InventoryCard'
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


function ClientAdd(props) {
    const classes = useStyles();
    
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [phone, setPhone] = useState(null)
    const [mail, setMail] = useState(null)


    function onChangeField(e, fieldString) {
        if (fieldString == 'name'){
            setName(e.target.value)
        }else if(fieldString == 'surname'){
            setSurname(e.target.value)
        }else if(fieldString == 'phone'){
            setPhone(e.target.value)
        }else if(fieldString == 'mail'){
            setMail(e.target.value)
        }
    }

    const upload = (e) => {
        const postData =
        {
            "client_name": name,
            "client_surname": surname,
            "client_phone": phone,
            "client_mail": mail,
        }
        let formData = new FormData();
        formData.append("data", JSON.stringify(postData));
        axios({
          method: "post",
          url: "http://localhost:1337/clients",
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
                <Link style={{ textDecoration: 'none' }} to="/clients">
                    <Typography color="textPrimary" className={classes.link}>
                        <StorageIcon className={classes.icon} />
                        Client
                    </Typography>
                </Link>

                <Typography color="textPrimary" className={classes.link}>
                    <PlaylistAddIcon className={classes.icon} />
                        Ajout d'un client
                </Typography>
            </Breadcrumbs>


        <Grid container spacing={3}>
            <Grid item md={8} xs={12} sm={8} style={{alignItems: 'center'}}>
                <form className={classes.root} noValidate autoComplete="off">
                    
                    <TextField
                        id="filled-disabled"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        onChange={(e)=> onChangeField(e, 'name')}
                    />
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Surname"
                            variant="outlined"
                            fullWidth
                            onChange={(e)=> onChangeField(e, 'surname')}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            onChange={(e)=> onChangeField(e, 'phone')}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Mail"
                            variant="outlined"
                            fullWidth
                            onChange={(e)=> onChangeField(e, 'mail')}
                        />
                    </div>
                </form>
            </Grid>


        </Grid>

        <Link onClick={upload} to="/clients">
            <Fab style={saveButton} aria-label="add">
                <SaveIcon />
            </Fab>
        </Link>
            
        </div>
    );
}

export default ClientAdd