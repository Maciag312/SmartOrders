import {puttotalprice, checkkey,subtrackitem, additem, openmodal ,removekey} from "./actions.js"
 import React from "react";
 import Button from '@material-ui/core/Button';
 import {  connect } from "react-redux";
 import Card from '@material-ui/core/Card';
 import Box from '@material-ui/core/Box';
import "./animator.css"
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

class MenuElement extends React.Component {
    constructor(props){
        super(props)
        this.state = {isActive: this.props.orders.map(order=>order.key).filter(k=>k===this.props.pkey).length > 0 }
    }
    
    checkkey = (key) => {
        this.props.store.dispatch(checkkey(key));
        this.props.store.dispatch(puttotalprice());

    };
    additem = (key) => {
        const el = this.props.items.find(e=>e.key===key)
        if(el.options.length>0)
            this.props.store.dispatch(openmodal(key))
        this.props.store.dispatch(additem(key));
        this.props.store.dispatch(puttotalprice());

    };
    subtrackitem = (key) => {
        this.props.store.dispatch(subtrackitem(key));
        this.props.store.dispatch(puttotalprice());

    };
    render() { 
        const currency = 'PLN'
       var key = this.props.pkey
       var quanitity = this.props.orders.map(order=>order.key).filter(k=>k===key).length
       console.log("element: " + key + " has qty: " + quanitity)
       console.log("updated orders: " + this.props.orders.map(o=>o.key))
       const checkedstyle = {height: "210px", width: "210px", backgroundColor: "lightgreen"};
       const uncheckedstyle = {height: "194px", width: "194px", backgroundColor: "white"};

       const checkedstylePad = {float: "left", padding: "20px"};
       const uncheckedstylePad = {float: "left", padding: "28px"};

       const curSt = this.props.orders.map(order=>order.key).filter(k=>k===this.props.pkey).length > 0 ? checkedstyle : uncheckedstyle
       const curStPad = this.props.orders.map(order=>order.key).filter(k=>k===this.props.pkey).length > 0 ? checkedstylePad : uncheckedstylePad
        return (
            <div className={'transform'} style = {curStPad}>
                <Card boxShadow="0 15px 50px -12px rgba(100,200,0,0.8)" raised={this.props.orders.map(order=>order.key).filter(k=>k===this.props.pkey).length > 0 ? true : false} onClick={this.checkkey.bind(this, key)} >
                    <CardActionArea style={curSt} className={'transform'}>
                        <CardMedia style = {{height: "120px",}}
                        image={this.props.items.find(e=>e.key===key).image}
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom style={{fontSize:"13px", fontFamily:"bold"}}>
                            {this.props.items.find(e=>e.key===key).name}
                        </Typography>
                        <Typography  color="textSecondary" style={{fontSize:"12px"}}>
                            {this.props.items.find(e=>e.key===key).price}{" "+currency}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                
                </Card>
                <Button style={{float:"left"}} onClick={this.additem.bind(this, key)}>+</Button>
                <Button style={{float:"left"}} onClick={this.subtrackitem.bind(this, key)}>-</Button>
                <Box style={{float:"left", paddingTop:"10px"}}>QTY&nbsp;{quanitity}</Box>

            </div>
        );
    }

}
    
    
function mapStateToProps(state){
    return {totalprice: state.totalprice, view: state.view, items: state.items,  orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
}
const mapDispatchToProps = {additem, puttotalprice, checkkey , openmodal, subtrackitem, removekey};
    
export default connect(mapStateToProps, mapDispatchToProps)(MenuElement)
    