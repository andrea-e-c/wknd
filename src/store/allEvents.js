import Axios from "axios";

const SET_EVENTS = "SET_EVENTS";

export const setEvents = (events) => {
  return {
    type: SET_EVENTS,
    events,
  };
};

export const fetchEvents = () => {
  return async (dispatch) => {
    const { data } = await Axios.get("/api/events");
    console.log("i am fetchEvents", data)
    const events = setEvents(data);
    dispatch(events);
  };
};

export default function eventsReducer(state = [], action) {
  switch (action.type) {
    case SET_EVENTS:
      return action.events;
    default:
      return state;
  }
}
