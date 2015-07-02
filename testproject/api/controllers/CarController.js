/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * Route for displaying the list of cars
   * @param req
   * @param res
   */
  list: function (req, res) {
    Car.find().populate('passengers').exec(function(e, cars){
      res.view('car/list', {cars: cars, numcars: cars.length});
    });
  },
  /**
   * A route that adds a new car from the car add form
   * @param req
   * @param res
   */
  addCar: function(req, res){
    if(req.body.car_name && req.body.car_name.trim() != '') {
      Car.create({
        name: req.body.car_name
      }).exec(function (e, record) {
        if (!e) {
          req.flash('message', 'Success! Added a new car');
          res.redirect('/car/list');
        }
        else {
          req.flash('error', 'Error!');
          res.redirect('/car/list');
        }
      });
    }else{
      req.flash('error', 'Error!');
      res.redirect('/car/list');
    }
  }
};

