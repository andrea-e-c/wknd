import React from 'react';
import '../Home.css';

const seedEvents = [
    {
        id: 1,
        title: "Magic Show",
        date: "08/30/2022",
        time: "9:00pm",
        type: "public",
        description: "Enjoy a magical evening of wonder and entertainment!"
    },
    {
        id: 2,
        title: "Andrea's Birthday Bash",
        date: "09/15/2022",
        time: "7:30pm",
        type: "private",
        description: "Andrea is celebrating another year of not dying!"
    },
    {
        id: 3,
        title: "Ice Skating with a Shark",
        date: "12/25/2022",
        time: "9:00pm",
        type: "public",
        description: "Does it sound like a bad idea? That's because it is a bad idea."
    },
]

export const Home = () => {
    return (
        <div>
            <h1> Hello, this is your home component!</h1>
            {seedEvents.map((event) => {
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