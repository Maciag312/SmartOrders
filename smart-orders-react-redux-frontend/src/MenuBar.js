import React from 'react';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {viewburgers,viewdrinks,viewadds, setview} from "./actions.js"
import {  connect } from "react-redux";
import './animator.css';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  padding: {
    padding: theme.spacing(3)
  },
  demo1: {
    backgroundColor: theme.palette.background.paper
  },
  demo2: {
    backgroundColor: "#FBFBFB"
  }
}));


const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#FBFBFB"
  }
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: "none",
    
    fontWeight: "bold",
    opacity: 0.8,
    backgroundColor: "#FBFBFB",
    fontSize: 16,
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
      
    }
  }
}))(props => <Tab disableRipple {...props} />);



function ScrollableTabsButtonAuto(props) {

  const classes = useStyles();
  const [value, setValue] = React.useState(props.view);
  const [tabindex, setTabindex] = React.useState(0);
  const handleChange = (event, newValue) => {
    setTabindex(newValue)
    setValue(newValue);
    var val = newValue === 0 ? 'burgers' : newValue === 1 ? 'drinks' : newValue === 2 ? 'adds' : ''
    props.store.dispatch(setview(val));
  };


  return (
    <div className={'transform2'} style={(props.view==='burgers'||props.view==='drinks'||props.view==='adds')? {transform: "translate(0%,0)"}: props.view==='payment'? {transform: "translate(-100%,0)"}:{transform: "translate(100%,0)"}}>
        <StyledTabs
          
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
       >
          <StyledTab  className={'transform'} style={tabindex===0?{color: "limegreen"}:{color: "#767676"}} label="Burgers" {...a11yProps(0)} />
          <StyledTab className={'transform'}  style={tabindex===1?{color: "limegreen"}:{color: "#767676"}} label="Drinks" {...a11yProps(1)} />
          <StyledTab className={'transform'}  style={tabindex===2?{color: "limegreen"}:{color: "#767676"}} label="Adds" {...a11yProps(2)} />
         
        </StyledTabs>
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel> */}
    </div>
  );
}
function mapStateToProps(state){
  return {tableid: state.tableid, view: state.view, items: state.items,  orders: state.orders, isModalOpen: state.isModalOpen, keyToAddInModal: state.keyToAddInModal};
}
const mapDispatchToProps = {setview, viewburgers, viewdrinks, viewadds};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollableTabsButtonAuto)

