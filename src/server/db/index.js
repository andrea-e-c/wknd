const db = require('./db')

const Event = require('./models/Event')
const User = require('./models/User')
const Attendee = require('./models/Attendee')

Event.belongsTo(User);
User.hasMany(Event);
Event.hasMany(Attendee);
Attendee.belongsTo(Event);
User.hasMany(Attendee);
Attendee.belongsTo(User)


module.exports = {
  db,
  models: {
    User, Event, Attendee
  },
}


/*
Event       User

     attendee
*/ 