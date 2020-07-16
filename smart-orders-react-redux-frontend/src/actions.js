export const VIEW_BURGERS = "VIEW_BURGERS";
export const VIEW_DRINKS = "VIEW_DRINKS";
export const VIEW_ADDS = "VIEW_ADDS";

export const CHECK_KEY = "CHECK_KEY";
export const ADD_ITEM = "ADD_ITEM";
export const SUBTRACK_ITEM = "SUBTRACK_ITEM";
export const REMOVE_KEY = "REMOVE_KEY";
export const PUT_TABLE_NAME = "PUT_TABLE_NAME";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const PUT_CUSTOMER_NAME = "PUT_CUSTOMER_NAME";

export const PUT_TOTAL_PRICE = "PUT_TOTAL_PRICE";
export const VIEW_TABLE = "VIEW_TABLE";
export const SET_VIEW = "SET_VIEW";
export const SET_FOOTER_LENGTH = "SET_FOOTER_LENGTH";


export function viewburgers(){
    return {type: VIEW_BURGERS}
}
export const viewtable = () => ({type: VIEW_TABLE});
export const setview = (newview) => ({type: SET_VIEW, newview});
export const setFooterLength = (footerLength) => ({type: SET_FOOTER_LENGTH, footerLength});

export const openmodal = (key) => ({type: OPEN_MODAL, key});
export const closemodal = (itemToAddToOrder) => ({type: CLOSE_MODAL, itemToAddToOrder});
export const putcustomername = (customerName) => ({type: PUT_CUSTOMER_NAME, customerName});

export const viewdrinks = () => ({type: VIEW_DRINKS});
export const viewadds = () => ({type: VIEW_ADDS});
export const additem = (key) => ({type: ADD_ITEM, key});
export const subtrackitem = (key) => ({type: SUBTRACK_ITEM, key});
export const removekey = (key) => ({type: REMOVE_KEY, key});
export const checkkey = (key) => ({type: CHECK_KEY, key});
export const puttablename = (name) => ({type: PUT_TABLE_NAME, name});

export const puttotalprice = (totalprice) => ({type: PUT_TOTAL_PRICE, totalprice});
