/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * Action for displaying the list of passengers
   * @param req
   * @param res
   */
  list: function(req, res){
    Passenger.find().populate('car').populate('family').exec(function(e, passengers){
      Car.find().exec(function(e, cars){
        res.view('passenger/list', {passengers: passengers, cars: cars});
      });
    });
  },
  /**
   * An action that adds a new passenger to a Car
   * @param req
   * @param res
   */
  addPassenger: function(req, res){
    Passenger.create({
      first_name: req.body.passenger_first_name,
      last_name: req.body.passenger_last_name,
      car: req.body.passenger_car
    }).exec(function(e, record){
      if(!e) {
        req.flash('message', 'Success! Added a passenger to this car');
        res.redirect('/passenger/list');
      }else{
        req.flash('error', 'Error!');
        res.redirect('/passenger/list');
      }
    });
  },
  /**
   * An action for deleting a passenger
   * @param req
   * @param res
   */
  deletePassenger: function(req, res){
    Passenger.destroy({id: req.body.passenger_id}).exec(function(){
      req.flash('message', 'Success! you have deleted a passenger');
      res.redirect('/passenger/list');
    });
  },
  /**
   * An action for the passenger detail page
   * @param req
   * @param res
   */
  detail: function(req, res){
    var id = req.param("id");
    if(id){
      Passenger.find({id: id}).populate('car').populate('family').exec(function(e, passenger){
        console.log(passenger);
        res.view('passenger/detail', {passenger: passenger[0]});
      });
    }else{
      req.flash('error', 'Missing passenger id');
      res.redirect('/passenger/list');
    }
  },
  car: function(req, res){
    var id = req.param("id");
    if(id){
      Car.find({id: id}).populate('passengers').exec(function(e, cars){
        res.view('passenger/car', {passengers: cars[0].passengers, car: cars[0]});
      });
    }else{
      req.flash('error', 'Missing car id');
      res.redirect('/car/list');
    }
  }
}