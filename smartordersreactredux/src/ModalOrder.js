import {closemodal, openmodal} from "./actions.js"
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

function ModalOrder(props){
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  
  const handleClose = () => {
    props.closemodal(props.keyToAddInModal)
    console.log(props.orders)
  };
  


  const handleChange = (optionIndex) => event => {
    console.log(props.keyToAddInModal.options[0].elements[0])
    var item = JSON.parse(JSON.stringify(props.keyToAddInModal));
    item.options[optionIndex].elements.find(e=>e.isChosen==true).isChosen = false
    props.openmodal(item)
  //  console.log(item.options[0].elemenents[0])
    console.log(props.keyToAddInModal.options[0])
    console.log(item.options[0])

    
    var elms = item.options[optionIndex].elements.map(el=>el.name!==event.target.value?el:{name: el.name, price: el.price, isChosen: true})

    console.log(item.options[0])

    item.options[optionIndex].elements = elms;
   // console.log(item.options[0].elemenents[0])
    console.log(props.keyToAddInModal.options[0])

    console.log("value of modal has been changed to: "+event.target.value)
    props.openmodal(item)
    console.log(props.keyToAddInModal.options[0])
   
  }

  // [{optionsname: name, index: id},{...}, ...]

  return (
    <div>
      {props.isModalOpen?
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.keyToAddInModal!=undefined}
        onClose={handleClose}
      >



        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{props.keyToAddInModal.name}</h2>
          <p id="simple-modal-description">
              
             {props.keyToAddInModal.options.map((option, index)=> 

                <FormControl component="fieldset">
                    <FormLabel style={{fontSize: "20px", color: "black"}} component="legend">{option.name}</FormLabel>
                  <RadioGroup aria-label="gender" name="gender2" value={props.keyToAddInModal.options[index].elements.find(e=>e.isChosen==true)!==undefined?props.keyToAddInModal.options[index].elements.find(e=>e.isChosen==true).isChosen:false} onChange={handleChange(index)}>

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



      </Modal>:<div></div>}
    </div>
  );
}

function mapStateToProps(state){
    return {view: state.view, items: state.items, orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
}
const mapDispatchToProps = {closemodal, openmodal};
    
export default connect(mapStateToProps, mapDispatchToProps)(ModalOrder)