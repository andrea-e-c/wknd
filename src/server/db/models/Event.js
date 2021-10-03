const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');


const Event = db.define('event', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // date: {
  //   type: Sequelize.DATEONLY,
  //   allowNull: false
  // },
  // time: {
  //   type: Sequelize.DATE,
  //   defaultValue: false
  // },
  type: {
    type: Sequelize.ENUM('public', 'private'),
    defaultValue: "private"
  },
  description: {
      type: Sequelize.TEXT,
      defaultValue: 'Description here.'
  }
})

module.exports = Event