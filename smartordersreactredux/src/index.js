import React from "react";
import { render } from "react-dom";
import MenuBar from "./MenuBar";
import Cover from "./Cover";
import MenuElements from "./MenuElements";
import PaymentAndSummary from "./PaymentAndSummary.js"
import "./index.css";
import { createStore } from "redux";
import { Provider } from 'react-redux'
import {  connect } from "react-redux";
import {onesplice} from "./helperfunctions"
import ModalOrder from "./ModalOrder";
import burger1 from './images/burger1.jpg';
import burger2 from './images/burger2.jpg';
import waterbottle from './images/waterbottle.png';
import tinofcoke from './images/tinofcoke.png'
import frenchfries from './images/frenchfries.png'


import Footer from "./Footer"

const initialstate = {
  customerName: '',
  view: "table",
  tableid: -1,
  items: [{key: 0, name: "Burger with double cheese", image: burger1, type: "burgers", price: 10.3, removableadds: ['cheese', 'cucumber', 'onions'], options: [{name: "Size", elements: [{name: "standard beef 170g", price: 0.0, isChosen: true},{name: "extra beef 260g ", price: 5.3, isChosen: false}]}, {option: {name: "option 2",price: 0.6}}]},{key: 1, name: "Spicy burger",image: burger2, type: "burgers", price: 5.3, removableadds: [], options: []}, {key: 2, name: "Coke", image: tinofcoke, type: "drinks", price: 1.3, removableadds: [], options: []},{key: 3, name: "Burger with double cheese", type: "burgers", price: 10.3, removableadds: [], options: []},{key: 4, name: "Burger with double cheese", type: "burgers", price: 10.3, removableadds: [], options: []}, {key: 5, name: "Water 500ml bottle ", image: waterbottle, type: "drinks", price: 2.49, removableadds: [], options: []}, {key: 6, name: "French Fries with ketchup", image: frenchfries, type: "adds", price: 8.5, removableadds: [], options: []}], // item = [item: [key: name: "ds", type: "burger", price: 0.0, removableadds: [], options: [option1:[[name: 1, price:4.0],2,3,4], option2:[2,3,4,1]]]
  orders: [],
  totalprice: 0,
  isModalOpen: false,
  itemToAddInModal: 0
};
function reducer(state = initialstate, action){
  switch(action.type){
    case "SET_VIEW":
      return {footerLength: state.footerLength, totalprice: state.totalprice, customerName: action.customerName, tableid: state.tableid, view: action.newview, items: state.items, orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: action.key};
    case "PUT_TOTAL_PRICE":
      return {footerLength: state.footerLength, totalprice: state.orders.length!==0 ? state.orders.map(e=>e.price).reduce(function(prev,cur){return prev+cur}).toFixed(2) : 0, customerName: action.customerName, tableid: state.tableid, view: state.view, items: state.items, orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: action.key};
    case "PUT_CUSTOMER_NAME":
      return {footerLength: state.footerLength, totalprice: state.totalprice, customerName: action.customerName, tableid: state.tableid, view: state.view, items: state.items, orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: action.key};
    case "OPEN_MODAL":
      console.log("modal is now opened viewing: "+action.itemToAddInModal)
      return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: state.view, items: state.items, orders: state.orders, isModalOpen: true, keyToAddInModal: action.key};
    case "CLOSE_MODAL":
        console.log("modal is now closed")
        return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: state.view, items: state.items,  orders: state.orders.slice(0,state.orders.length-1).concat(action.itemToAddToOrder), isModalOpen: false, keyToAddInModal: 0};
    case "VIEW_TABLE": 
      console.log("changed view to : table")
      return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: "table", items: state.items,  orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
    case "VIEW_BURGERS": 
      console.log("changed view to : burgers")
      return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: "burgers", items: state.items,  orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
    case "VIEW_DRINKS":
      console.log("changed view to : drinks")
      return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: 'drinks',  items: state.items,  orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
    case "VIEW_ADDS":
        console.log("changed view to : adds ")
        return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: "adds",  items: state.items,  orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.itemToAddInModal};
    case "CHECK_KEY": // todo 
        console.log("adding key " + action.key + " element: " + state.items.find(e=>e.key===action.key).key)
         return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: state.view, items: state.items, orders: state.orders.filter(e=>e.key===action.key).length>0 ? state.orders.filter(e=>e.key!==action.key) : state.orders.concat(JSON.parse(JSON.stringify(state.items.find(e=>e.key===action.key)))), isModalOpen: state.isModalOpen, keyToAddInModal: state.itemToAddInModal}
    case "ADD_ITEM": 
        console.log("adding key " + action.key + " element: " + state.items.find(e=>e.key===action.key).key)
        return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: state.view, items: state.items, orders: state.orders.concat(JSON.parse(JSON.stringify(state.items.find(e=>e.key===action.key)))), isModalOpen: state.isModalOpen, keyToAddInModal: state.itemToAddInModal};
    case "SUBTRACK_ITEM": 
        console.log("subtracking key: "+action.key+" index of "+ state.orders.indexOf(action.key))
        return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: state.view, items: state.items, orders: onesplice(state.orders, action.key), isModalOpen: state.isModalOpen, keyToAddInModal: state.itemToAddInModal}; 
    case "REMOVE_KEY": 
        console.log("removing key: "+action.key+" index of "+ state.orders.indexOf(action.key))
        return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: state.view, items: state.items, orders: state.orders.map(e=>e.key!==action.key), isModalOpen: state.isModalOpen, keyToAddInModal: state.itemToAddInModal};
    case "PUT_TABLE_NAME": 
        return {footerLength: state.footerLength, totalprice: state.totalprice, tableid: action.name, view: state.view, items: state.items, orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.itemToAddInModal};
    case "SET_FOOTER_LENGTH": 
        return {footerLength: action.footerLength, totalprice: state.totalprice, tableid: state.tableid, view: state.view, items: state.items, orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.itemToAddInModal};

    default: return state;
  }
}
const store = createStore(reducer);

const App = () => (  <Provider store={store}>
  <div>
      <Cover style = {{width: "100%", textAlign: "center"}} store={store}></Cover>
        <div style={{position: "relative"}}>
        <ModalOrder store={store}></ModalOrder>
            

          <MenuBar store={store}></MenuBar>
          
          <div style = {{width: "100%"}}>
            <MenuElements style={{width: "100%", positon: "static"}} store={store}></MenuElements>
          </div>
          <br></br>      
        </div>
        <Footer store={store}></Footer>
        <PaymentAndSummary store={store}></PaymentAndSummary>
        
  </div>
  </Provider>
);

export default connect(App)
render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
