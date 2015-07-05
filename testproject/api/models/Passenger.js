/**
* Passenger.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    first_name: 'STRING',
    last_name: 'STRING',
    bio: 'TEXT',
    car:{
      model:'Car'
    }
  }
};

