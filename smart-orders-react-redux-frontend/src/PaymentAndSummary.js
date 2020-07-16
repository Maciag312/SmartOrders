import {setview, puttablename, putcustomername, viewburgers} from "./actions.js"
import React from "react";
import './animator.css'
import SummaryOrders from './SummaryOrders'
import Button from '@material-ui/core/Button';
import {  connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';  
import IconButton from  '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';

function PaymentAndSummary(props){

  const [tableName, setTableName] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [blik, setBlik] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(true);
  const [blikError, setBlikError] = useState(true);

    const fputtablename = () => {
        const name = tableName;
        const cname = customerName;
        console.log("table field: " + name)
        console.log("Customer name field: " + cname)

        props.store.dispatch(puttablename(name));
        props.store.dispatch(putcustomername(cname));
        props.store.dispatch(viewburgers())
    };
    const handleClick = () => {
      props.store.dispatch(setview('burgers'))
    }
    const payByBlik = () => {

    }
    const BlikValidator = (val) => (event) => {
     if(val==='email'){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emerror = !re.test(String(event.target.value).toLowerCase());
        setEmailError(emerror);
        setEmail(event.target.value);
     }
     else if(val==='blik'){
       if(event.target.value.match(/^\d+(\.\d+)?$/)&&event.target.value.length<7){
         if(event.target.value.length!==6){
           setBlikError(true)
         }else{
           setBlikError(false)
         }
         setBlik(parseInt(event.target.value))
       }

     }




    }

    const [hid, setHid] = useState({zIndex: "2", visibility: "visible", position: "absolute", width: "100vw", backgroundColor: "#FBFBFB", textAlign: "center", transform: "translate(100%,0)"})
    const [show, setShow] = useState({zIndex: "2", visibility: "visible", position: "absolute", width: "100vw", backgroundColor: "#FBFBFB", textAlign: "center",  transform: "translate(0,0)"})
    const [waitingTime, setWaitingTime] = useState(15);

    const useStyles = makeStyles(theme => ({
            root: {
              '& > *': {
                margin: theme.spacing(1),
                width: 200,
              },
            },
          }));
          
  
    var payvalidator = blikError;

    const classes = useStyles();  
      return (
          <div className="transform2" style={props.view === "payment" ? show : hid} >
              <IconButton onClick={handleClick} style={{float: "left",paddingLeft: "10px" }}>
                <ChevronLeftIcon style={{ color: "limegreen", fontSize: 50}}></ChevronLeftIcon></IconButton>
            <div style={{fontSize: "35px", color: "limegreen", paddingRight: "50px"}}>Aprox. waiting time is&nbsp;{waitingTime}</div>
            <SummaryOrders style={{position: "relative", paddingTop: "40px"}} store={props.store}></SummaryOrders>
            <br></br>
            <div style ={{fontSize: "24px", marginLeft: "20px", color: "#767676", width: "100%", textAlign: "left"}}>
                Total price&nbsp;{props.totalprice}
                <br></br>
                If you want to get recipt please give your
                <br></br>
                <TextField error={emailError&&email.length!==0} id="standard-basic" label="e-mail" value={email} onChange={BlikValidator('email')} />
                <br></br>
                Give 6-difit number to pay with blik
                <br></br>
                <TextField error={blikError&&blik.length!==0} id="standard-basic" label="6-digit blik number" value={blik} onChange={BlikValidator('blik')} />
                <br></br>
                <Button disabled={payvalidator} style={payvalidator? {backgroundColor: "lightgrey", color: "white", marginTop: "20px"} : {backgroundColor:"limegreen", color: "white", marginTop: "20px"}} onClick={payByBlik}>Pay</Button>

                <br></br>
                <Link style={{fontSize: "18px"}} onClick={payByBlik}>Pay by card</Link>

                <br></br>
                <Link style={{fontSize: "18px"}} onClick={payByBlik}>Or pay at cash</Link>
            </div>
           

            <br></br>

          </div>  
      );
  }
  function mapStateToProps(state){
    return {totalprice: state.totalprice, tableid: state.tableid, customerName: state.customerName, view: state.view, items: state.items,  orders: state.orders,isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
  }
const mapDispatchToProps = {setview, puttablename,putcustomername, viewburgers};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentAndSummary)
