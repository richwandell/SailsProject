/**
* Car.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: 'STRING',
    make: 'STRING',
    model: 'STRING',
    year: 'date',
    passengers: {
      collection: 'Passenger',
      via: 'car'
    },
    parts:{
      collection: 'Part',
      via: 'car'
    }
  }
};

