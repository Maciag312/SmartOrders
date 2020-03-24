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

function PaymentAndSummary(props){
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
    

    const [hid, setHid] = useState({zIndex: "2", visibility: "visible", position: "absolute", height: "70vh", width: "100vw", backgroundColor: "white", textAlign: "center", transform: "translate(100%,0)"})
    const [show, setShow] = useState({zIndex: "2", visibility: "visible", position: "absolute", height: "70vh", width: "100vw", backgroundColor: "white", textAlign: "center",  transform: "translate(0,0)"})
    const [waitingTime, setWaitingTime] = useState(15);

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

    const classes = useStyles();  
      return (
          <div className="transform2" style={props.view === "payment" ? show : hid} >
              <IconButton onClick={handleClick} style={{float: "left",paddingLeft: "10px" }}>
                <ChevronLeftIcon style={{ color: "limegreen", fontSize: 50}}></ChevronLeftIcon></IconButton>
            <div style={{fontSize: "35px", color: "limegreen", paddingRight: "50px"}}>Aprox. waiting time is&nbsp;{waitingTime}</div>
            <SummaryOrders style={{position: "relative", paddingTop: "40px"}} store={props.store}></SummaryOrders>
            <br></br>
            <div style ={{fontSize: "24px", fontWeight: "bold"}}>
                Total price&nbsp;{props.totalprice}
            </div>
            <br></br>

            <Button style={{backgroundColor: "limegreen", color: "white", marginTop: "20px"}} onClick={fputtablename.bind(this)}>Go</Button>
          </div>  
      );
  }
  function mapStateToProps(state){
    return {totalprice: state.totalprice, tableid: state.tableid, customerName: state.customerName, view: state.view, items: state.items,  orders: state.orders,isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
  }
const mapDispatchToProps = {setview, puttablename,putcustomername, viewburgers};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentAndSummary)
