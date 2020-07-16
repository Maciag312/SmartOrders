import {puttablename, viewtable, setview} from "./actions.js"
import React from "react";
import Button from '@material-ui/core/Button';
import {  connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { useState } from 'react';
import "./Footer.css";
import SummaryOrders from './SummaryOrders'
import "./animator.css";

 function Footer(props){
    //  const 

    const pviewpayment = () => {
      props.store.dispatch(setview('payment'));
    };

    const pviewtable = () => {
        props.store.dispatch(viewtable());
    };
    function handleOrder(){
      pviewpayment();
    }
    function handleClick(){
        setCurstyle((show? "footer" : "slide"))
        setShow(!show)
    }
  
    const footerHeight = 160+24*props.footerLength;

    const [show, setShow] = useState(false)
    const [curstyle, setCurstyle] = useState("footer")

    const useStyles = makeStyles(theme => ({
            root: {
              '& > *': {
                margin: theme.spacing(1),
                width: 200,
              },
            },
          }));
          
    const classes = useStyles();  
      return (
          <div style = {{...show? {height: footerHeight+"px"}: {},...(props.view==='burgers'||props.view==='drinks'||props.view==='adds')? {transform: "translate(0%,0)"}: props.view==='payment'? {transform: "translate(-100%,0)"}:{transform: "translate(100%,0)"}}} className={show?'transform2 slide':"transform2 footer"}>
              <div style={{width: "100%", textAlign: "center"}}>


              </div>
              
                <div style={{width: "100%", textAlign: "center", color: "#767676"}}>
                  <div style = {{marginTop: "10px"}} > 
                    <div style = {{float: "left", marginTop: "10px",  marginLeft: "10px",fontSize: "calc(14px + .2vw)"}}> {props.tableid}
                    </div>
                    <Link style = {{float: "left", marginLeft: "10px", marginTop: "10px", fontSize: "calc(14px + .2vw)", cursor:"pointer"}} onClick={pviewtable}>Change table</Link>
                    <div style = {{float: "right", paddingRight: "15px", marginTop: "10px", display: "inline-block", fontSize: "calc(14px + .2vw)",  cursor:"pointer"}}>
                        
                      Total price {props.totalprice}&nbsp;&nbsp;&nbsp;
                      <Link style = {{color: "limegreen", cursor:"pointer"}} onClick={handleClick}>Checkout</Link>
                    </div>
                  </div>
                </div>
                {show?<div className = "transform2">
                   <SummaryOrders  className = "transform2" style={{position: "relative", paddingTop: "40px"}} store={props.store}></SummaryOrders>
                    <Link className = "transform2" disabled={props.totalprice != 0? false : true} onClick={props.totalprice === 0?'':handleOrder} style = {{color: props.totalprice!=0? "limegreen" : "lightgray",transition: "0.4s", float: "right", marginTop: "0px", marginRight: "10px", cursor:  props.totalprice!=0? "pointer" : "default"}}>Make Order</Link>
                </div>:<></>}
          </div>  
      );
  }
  function mapStateToProps(state){
    return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: state.view, items: state.items,  orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
  }
const mapDispatchToProps = {setview, puttablename, viewtable};

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
