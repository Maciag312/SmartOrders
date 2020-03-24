import {additem,subtrackitem,checkkey, removekey} from "./actions.js"
import React from "react";
import Button from '@material-ui/core/Button';
import {  connect } from "react-redux";
import MenuElement from "./MenuElement.js";

class MenuElements extends React.Component {


    render() { 
        
        const cardelements =  this.props.items !== undefined ? this.props.items.filter(e=>e.type==this.props.view).map((e)=><MenuElement store={this.props.store} pkey={e.key}></MenuElement>) : <div></div>
        return (
            <div  className={'transform2'} style={(this.props.view==='burgers'||this.props.view==='drinks'||this.props.view==='adds')? {transform: "translate(0%,0)"}: this.props.view==='payment'? {transform: "translate(-100%,0)"}:{transform: "translate(100%,0)"}}>
                {cardelements}  
            </div>
        );
    }

}
    
    
function mapStateToProps(state){
   return {view: state.view, items: state.items, orders: state.orders,isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
}
const mapDispatchToProps = {additem,subtrackitem, checkkey,removekey};
    
export default connect(mapStateToProps, mapDispatchToProps)(MenuElements)
    