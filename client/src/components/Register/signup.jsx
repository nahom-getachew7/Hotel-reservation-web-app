import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import LoginBtn from "../LogIn/login";
const theme = createTheme();

export default function SignupBtn(props) {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleCloses = () => {
      setOpen(false);
    };
    const [credentials, setCredentials] = useState({
      username:undefined,
    email : undefined,
    country:"",
    img:"",
    city:"",
    phone: "",
    password: undefined,
    isAdmin: undefined
  });

 
  // const { loading, error, dispatch } = useContext(AuthContext);

const navigate = useNavigate()

const handleChange = (e) => {
  setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
};

const handleClick = async (e) => {
  e.preventDefault();
  // console.log(credentials["username"])
  let result
  try {
     result = await axios.post(         
      "http://localhost:8800/api/auth/register",         
      {  
    username: credentials["username"],
    email :  credentials["email"],
    img:credentials["img"],
    city:credentials["city"],
    phone: credentials["phone"],
    password: credentials["password"],
    isAdmin: credentials["isAdmin"]
      }
    );
    // console.log(result["status"]);
    // console.log(result["data"]);
    if (result["data"] == "User has been created." && result["status"] =="200"){
      console.log(result["status"]);
      console.log(result["data"]);
      alert("your haver registerd you can login now");
      window.location.reload(false);
     

    
    }

  } catch (error) {
    console.error(error.response.result);     
  }
};
 

  return (
    <div>
     
           <Dialog open={open} onClose={handleCloses}>
        <DialogTitle>Sign in</DialogTitle>
        <DialogContent>
          
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleCloses} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="username"
                  onChange={handleChange}
                  label="Full Name"
                  autoFocus
                />
              </Grid>
          
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
             onClick={handleClick}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloses}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <button variant="outlined" className="headerBtn"  onClick={handleClickOpen}>{props.name}</button>
    </div>
  );
}


