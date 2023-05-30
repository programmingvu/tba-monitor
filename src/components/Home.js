import React, {useContext, useState, useMemo, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
import NavBar from './NavBar';
import Monitor from './Monitor';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

setInterval(function() {
  window.location.reload();
}, 300000); 

function Home(){
  const themeDark = createMuiTheme({
    palette: {
      background: {
        default: "#D3D3D3"
      }
    }

  });

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

      const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#bf2126'
            }
          },
    });

 

    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));

    return(
        <>
        <NavBar />
        <MuiThemeProvider theme={themeDark}>
      <CssBaseline />
        
        <Box marginTop={10}>
      <Grid container spacing={10} justify = "center">
           <Grid item>
             <Item>
        <Monitor />
        </Item>
        </Grid>
        </Grid>
        </Box>
        </MuiThemeProvider>
        
        </>
    )

    
}

export default Home;