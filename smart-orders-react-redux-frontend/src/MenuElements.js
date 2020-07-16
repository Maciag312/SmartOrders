import {additem,subtrackitem,checkkey, removekey} from "./actions.js"
import React from "react";
import Button from '@material-ui/core/Button';
import {  connect } from "react-redux";
import MenuElement from "./MenuElement.js";
import ModalOrder from "./ModalOrder";
import ScrollMenu from 'react-horizontal-scrolling-menu';

const category =  (name)  => <div style ={{width: "100%"}}><hr style={{width:"100%"}}></hr><div style ={{float: "left", padding: "0px 0 0 15px", color: "lightgrey", fontWeight:"bold"}}>{name}</div>
</div>
function MenuElements(props) {
        const subcatg = props.items !== undefined ? props.items.filter(e=>e.type==props.view).map(e=>e.subcat) : 0
        const uniquecat = [...new Set(subcatg)]
        const itemsInCatgegory = props.items !== undefined ? props.items.filter(e=>e.type==props.view)  : 0

        const Arrow = ({ text, className }) => {
            return (
              <div
                className={className}
              >{text}</div>
            );
          };
           
           
          const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
          const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
          const ScrollMenuImp = (menuitems) => 
            <ScrollMenu
                    data={menuitems}
                    wheel={false}
                    alignCenter={false}
                    hideSingleArrow={false}
                />
        return (<div style ={{backgroundColor: "#FBFBFB"}}>
                {props.isModalOpen==true?
                    <ModalOrder ></ModalOrder>:<div></div>}
                <div  className={'transform2'} style={(props.view==='burgers'||props.view==='drinks'||props.view==='adds')? {transform: "translate(0%,0)"}: props.view==='payment'? {transform: "translate(-100%,0)"}:{transform: "translate(100%,0)"}}>
                    {uniquecat.length>1?<div>{uniquecat.map((c)=><div>{category(c)}<br></br>{ScrollMenuImp(itemsInCatgegory!=0?itemsInCatgegory.filter(e=>e.subcat===c).map((e)=><MenuElement store={props.store} pkey={e.key}></MenuElement>):<div></div>)}</div>)}<hr style={{width: "100%", border: "1px solid #FBFBFB"}}></hr><br></br><br></br></div>
                    :<div>{ScrollMenuImp(itemsInCatgegory!=0?itemsInCatgegory.map((e)=><MenuElement store={props.store} pkey={e.key}></MenuElement>):<div></div>)}<hr  style={{width: "100%", border: "1px solid #FBFBFB"}}></hr><br></br><br></br></div>}
                </div>
            </div>
        );
}
    
    
function mapStateToProps(state){
   return {view: state.view, items: state.items, orders: state.orders,isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
}
const mapDispatchToProps = {additem,subtrackitem, checkkey,removekey};
    
export default connect(mapStateToProps, mapDispatchToProps)(MenuElements)
    