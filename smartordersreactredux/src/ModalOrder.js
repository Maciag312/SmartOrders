import {closemodal} from "./actions.js"
import React from "react";
import Button from '@material-ui/core/Button';
import {  connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ModalOrder(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  var itemToAddToOrder = props.orders[props.orders.length-1]
  const handleClose = () => {
      itemToAddToOrder.name =  itemToAddToOrder.name + " changed"
    props.store.dispatch(closemodal(itemToAddToOrder))
  };
  const handleChange = (optionIndex) => event => {
    
    setOValue(event.target.value)
    console.log("value of modal has been changed to: "+event.target.value)
  }
  const [oValue, setOValue] = React.useState(itemToAddToOrder===undefined?[]:[...itemToAddToOrder.options.map(o=>o.name)])
  return (
    <div>
    
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.isModalOpen}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{itemToAddToOrder===undefined?'':itemToAddToOrder.name}</h2>
          <p id="simple-modal-description">
              
             {itemToAddToOrder===undefined?0:itemToAddToOrder.options.map((option, index)=> 
                <FormControl component="fieldset">
                    <FormLabel style={{fontSize: "20px", color: "black"}} component="legend">{option.name}</FormLabel>
                  <RadioGroup aria-label="gender" name="gender2" value={oValue[index]} onChange={handleChange(index)}>
                    {option.elements===undefined?'':option.elements.map((element)=> 
                     <FormControlLabel
                     value={element.name}
                     checked={element.isChosen}
                     control={<Radio color="primary" />}
                     label={element.name + " price: " + element.price + " PLN"}
                   />)}
                  </RadioGroup>
                </FormControl>)
            }
          </p>
        </div>
      </Modal>
    </div>
  );
}

function mapStateToProps(state){
    return {view: state.view, items: state.items, orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
}
const mapDispatchToProps = {closemodal};
    
export default connect(mapStateToProps, mapDispatchToProps)(ModalOrder)