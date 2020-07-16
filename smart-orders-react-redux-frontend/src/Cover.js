import {puttablename, putcustomername, viewburgers} from "./actions.js"
import React from "react";
import './animator.css'
import Button from '@material-ui/core/Button';
import {  connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

function Cover(props){
    const fputtablename = () => {
        const name = tableName;
        const cname = customerName;
        console.log("table field: " + name)
        console.log("Customer name field: " + cname)

        props.store.dispatch(puttablename(name));
        props.store.dispatch(putcustomername(cname));
        props.store.dispatch(viewburgers())
    };
    

    const [hid, setHid] = useState({zIndex: "2", visibility: "visible", position: "absolute", width: "100vw", backgroundColor: "#FBFBFB", textAlign: "center", marginTop: "120px", transform: "translate(-100%,0)"})
    const [show, setShow] = useState({zIndex: "2", visibility: "visible", position: "absolute", width: "100vw", backgroundColor: "#FBFBFB", textAlign: "center", marginTop: "120px", transform: "translate(0,0)"})
    const useStyles = makeStyles(theme => ({
            root: {
              '& > *': {
                margin: theme.spacing(1),
                width: 200,
              },
            },
          }));
          
    const [tableName, setTableName] = useState('')
    const [customerName, setCustomerName] = useState('')

    var disable = !(customerName.length>0&&tableName.length>0)

    const classes = useStyles();  
      return (
          <div className="transform2" style={props.view === "table" ? show : hid} >
            <div style={{fontSize: "35px", color: "limegreen"}}>Help us find you</div>
            <form className={classes.root} noValidate autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Choose table</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                >
                <MenuItem value={'Rome'}>Rome</MenuItem>
                <MenuItem value={'Kyoto'}>Kyoto</MenuItem>
                <MenuItem value={'Istanbul'}>Istanbul</MenuItem>
              </Select>
            </FormControl>
                <br></br>
                <TextField id="standard-basic" label="your name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </form>
            <br></br>
            <Button style={disable===true?{backgroundColor: "lightgrey", color: "white"}:{backgroundColor: "limegreen", color: "white"}} onClick={fputtablename.bind(this)}  disabled={disable} >Go</Button>
          </div>  
      );
  }
  function mapStateToProps(state){
    return {tableid: state.tableid, customerName: state.customerName, view: state.view, items: state.items,  orders: state.orders,isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
  }
const mapDispatchToProps = {puttablename,putcustomername, viewburgers};

export default connect(mapStateToProps, mapDispatchToProps)(Cover)
