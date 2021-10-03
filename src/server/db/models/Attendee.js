const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');



const Attendee = db.define('attendee', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = Attendee