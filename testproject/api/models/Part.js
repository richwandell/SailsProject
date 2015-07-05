/**
* Part.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: 'STRING',
    price: 'float',
    car:{
      model:'Car'
    },
    formattedPrice: function(){
      return Number(Math.round(this.price*100)/100).toFixed(2);
    }
  }
};

