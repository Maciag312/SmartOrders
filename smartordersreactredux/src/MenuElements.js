import {additem,subtrackitem,checkkey, removekey} from "./actions.js"
import React from "react";
import Button from '@material-ui/core/Button';
import {  connect } from "react-redux";
import MenuElement from "./MenuElement.js";
import ModalOrder from "./ModalOrder";
function MenuElements(props) {

        const cardelements =  props.items !== undefined ? props.items.filter(e=>e.type==props.view).map((e)=><MenuElement store={props.store} pkey={e.key}></MenuElement>) : <div></div>
        return (<div>
                {props.isModalOpen==true?
                    <ModalOrder ></ModalOrder>:<div></div>}
                <div  className={'transform2'} style={(props.view==='burgers'||props.view==='drinks'||props.view==='adds')? {transform: "translate(0%,0)"}: props.view==='payment'? {transform: "translate(-100%,0)"}:{transform: "translate(100%,0)"}}>
                    {cardelements}  
                </div>
            </div>
        );
}
    
    
function mapStateToProps(state){
   return {view: state.view, items: state.items, orders: state.orders,isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
}
const mapDispatchToProps = {additem,subtrackitem, checkkey,removekey};
    
export default connect(mapStateToProps, mapDispatchToProps)(MenuElements)
    