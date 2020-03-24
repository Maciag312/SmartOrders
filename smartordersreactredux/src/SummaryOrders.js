import {puttablename} from "./actions.js"
import React from "react";
import Button from '@material-ui/core/Button';
import {setFooterLength} from './actions.js'
import {  connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

 function SummaryOrders(props){
    // const fputtablename = () => {
    //     const name = myValue;
    //     console.log("table field: " + name)
    //     props.store.dispatch(puttablename(name));
    //     setCurstyle({zIndex: "0", visibility: "hidden", position: "fixed"})
    // };
    
    // const [hid, setHid] = useState({zIndex: "0", visibility: "hidden", position: "absolute"});
    // const [show, setShow] = useState({zIndex: "2", visibility: "visible", position: "absolute", height: "100%", width: "100%", backgroundColor: "white"})
    // const [curstyle, setCurstyle] = useState( {zIndex: "2", visibility: "visible", position: "absolute", height: "100%", width: "100%", backgroundColor: "white", textAlign: "center", paddingTop: "120px"})    
    // const useStyles = makeStyles(theme => ({
    //         root: {
    //           '& > *': {
    //             margin: theme.spacing(1),
    //             width: 200,
    //           },
    //         },
    //       }));
          
    // const [myValue, setValue] = useState('')
    // const classes = useStyles();  
    const currency = 'PLN'
    const [reducedOrders, setReducedOrders] = useState(props.orders)

    function getReducedOrders(ordersToR){
        const seen = new Set();
        var red = ordersToR.map(function(item) {
            return {order: item, qty: props.orders.filter(or=>JSON.stringify(or)===JSON.stringify(item)).length};
        });
        red = red.filter(el => { // REMOVE DUPLICATES 
            const duplicate = seen.has(el.order.key); // ALTHOUGHT CANNOT BE KEYS 
            seen.add(el.order.key);
            return !duplicate;
        });
        props.store.dispatch(setFooterLength(red.length));
        return red
    }
    const redOrd = getReducedOrders(props.orders)
    const elements = redOrd.map(element => <div> <br></br>
        <div style ={{float: "left", paddingLeft: "20px",fontWeight: "bold"}}>
            {element.order.name + " x " + element.qty}
        </div>
        <div style ={{float: "right",paddingRight: "20px",fontWeight: "bold"}}>
            {(element.order.price*element.qty).toFixed(2)}{' ' + currency}
        </div>
    </div>);
      return (
            <div>
                <span style={{display: "block"}}>

                
                <div style = {{paddingTop: "40px", width: "100%"}}></div>
                <hr></hr>
                
                {elements}
                <br></br>
                <br></br>


                </span>
            </div>
      );
  }
  function mapStateToProps(state){
    return {footerLength: state.footerLength, tableid: state.tableid, view: state.view, items: state.items,  orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
  }
const mapDispatchToProps = {setFooterLength};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryOrders)
