/**
 * ************************************
 *
 * @module  MainContainer
 * @author
 * @date
 * @description stateful component that renders TotalsDisplay and MarketsContainer
 *
 * ************************************
 */

 import React, { Component } from 'react';
 import { connect } from 'react-redux';
 import TotalsDisplay from '../components/TotalsDisplay.jsx';
 import Store from '../store.js'
 import MarketsContainer from './MarketsContainer.jsx';
 // import from child components...
 
 
 const mapStateToProps = state => ({
   // add pertinent state here
 });
 
 class MainContainer extends Component {
   constructor(props) {
     super(props);
   }
 
   render() {
 
     
     return(
       <div className="container">
         <div className="outerBox">
           <h1 id="header">MegaMarket Loyalty Cards</h1>
           <TotalsDisplay/>
           <MarketsContainer/>
         </div>
       </div>
     );
   }
 
 }
 
 export default connect(mapStateToProps, null)(MainContainer);
 