import React from 'react';
import '../Home.css';
import { connect } from "react-redux";
import { fetchEvents } from "../store/allEvents";



 class Home extends React.Component {
     componentDidMount(){
         this.props.getEvents();
         console.log('hi, i am props', this.props)
     }
     render() {
         return (
             <div className="createForm">
                 <h1> Hello, this is your home component!</h1>
                 {this.props.events.map((event) => {
                     return (
                         <div key={event.id} className="eventDiv">
                             <h3>{event.title}</h3>
                             <h4>{event.date} {event.time}</h4>
                             <div> {event.type} </div>
                             <p> {event.description}</p>
                         </div>
                     )
                 })}
             </div>
         )
     }
}

const mapState = (state) => {
    return {
      events: state.events,
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      getEvents: () => dispatch(fetchEvents()),
    };
  };
  export default connect(mapState, mapDispatch)(Home);