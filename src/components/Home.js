import React from 'react';
import '../Home.css';
import { connect } from "react-redux";
import { fetchEvents } from "../store/allEvents";

const events = [
    {
        "title": "Magic Show",
        "type": "public",
        "date": "Jan 7, 2022",
        "time": "9:00pm",
        "description": "Enjoy a magical evening of wonder and entertainment!"
    },
    {
        "title": "Andrea's Birthday Bash",
        "type": "private",
        "date": "Aug 30, 2022",
        "time": "7:00pm",
        "description": "Andrea is celebrating another year of not dying!"
    },
    {
        "title": "Ice Skating with a Shark",
        "type": "public",
        "date": "Feb 2, 2022",
        "time": "5:00pm",
        "description": "Does it sound like a bad idea? That's because it is a bad idea."
    }
]

 class Home extends React.Component {
    //  componentDidMount(){
    //      this.props.getEvents();
    //      console.log('hi, i am props', this.props)
    //  }
     render() {
         return (
             <div className="createForm">
                 <h1> Check out these nifty upcoming events!</h1>
                 <div className="container">
                 {events.map((event) => {
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