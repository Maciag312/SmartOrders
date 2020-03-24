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
        setCurstyle((show? {top: "92%", height: "8%"} : {}))
        setShow(!show)
    }
    const [footerLength, setFooterLength] = React.useState(0);

    const handleFooterLength = (length) => { 
      setFooterLength(length)
    }
    const vallen = 10*footerLength;

    const [show, setShow] = useState(false)
    const [curstyle, setCurstyle] = useState({top: "92%", height: "8%)"})

    const useStyles = makeStyles(theme => ({
            root: {
              '& > *': {
                margin: theme.spacing(1),
                width: 200,
              },
            },
          }));
          
    const [myValue, setValue] = useState('')
    const classes = useStyles();  
      return (
          <div style = {{...curstyle,...(props.view==='burgers'||props.view==='drinks'||props.view==='adds')? {transform: "translate(0%,0)"}: props.view==='payment'? {transform: "translate(-100%,0)"}:{transform: "translate(100%,0)"}}} className={'transform footer'}>
              <div style={{width: "100%", textAlign: "center"}}>
                               


              </div>
                <div style={{width: "100%", textAlign: "center"}}><div style = {{marginTop: "15px"}} > <div style = {{color: "limegreen", float: "left", marginTop: "5px",  marginLeft: "10px", fontWeight: "bold",fontSize: "calc(10px + .5vw)"}}> {props.tableid}</div>
                                  <Link href="#" style = {{float: "left", marginLeft: "10px", marginTop: "5px", fontSize: "calc(10px + .5vw)"}} onClick={pviewtable}>Change table</Link>
                                  <div style = {{float: "right", paddingRight: "15px", display: "inline-block", fontSize: "calc(10px + .5vw)"}}>
                                
                                    Total price {props.totalprice}&nbsp;&nbsp;&nbsp;
                                    <Button style = {{color: "white", backgroundColor: "limegreen"}} onClick={handleClick}>GO TO CHECKOUT</Button>

                                    </div></div>


                </div>
                <SummaryOrders  style={{position: "relative", paddingTop: "40px"}} store={props.store}></SummaryOrders>
                <Button disabled={props.totalprice != 0? false : true} onClick={handleOrder} style = {{backgroundColor: props.totalprice!=0? "limegreen" : "lightgray",transition: "0.4s", color: "white", float: "right", marginTop: "0px", marginRight: "10px" }}>Make Order</Button>

          </div>  
      );
  }
  function mapStateToProps(state){
    return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: state.view, items: state.items,  orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
  }
const mapDispatchToProps = {setview, puttablename, viewtable};

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
