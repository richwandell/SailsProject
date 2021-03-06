module.exports = {
  /**
   * Route for displaying the list of cars
   * @param req
   * @param res
   */
  list: function (req, res) {
    Car.find().populate('passengers').populate('parts').exec(function (e, cars) {
      res.view('car/list', {cars: cars, numcars: cars.length});
    });
  },
  /**
   * A route that adds a new car from the car add form
   * @param req
   * @param res
   */
  addCar: function (req, res) {
    if (req.body.car_name && req.body.car_name.trim() != '') {
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
    }
    else {
      req.flash('car_name_error', 'has-error');
      res.redirect('/car/list');
    }
  },
  /**
   * An action for deleting a passenger
   * @param req
   * @param res
   */
  deleteCar: function (req, res) {
    Car.destroy({id: req.body.car_id}).exec(function () {
      req.flash('message', 'Success! you have deleted a car');
      res.redirect('/car/list');
    });
  },
  passengerList: function (req, res) {
    var id = req.param("id");
    if (id) {
      Car.find({id: id}).populate('passengers').exec(function (e, cars) {
        res.view('car/passenger', {passengers: cars[0].passengers, car: cars[0]});
      });
    }
    else {
      req.flash('error', 'Missing car id');
      res.redirect('/car/list');
    }
  },
  partList: function (req, res) {
    var id = req.param("id");
    if (id) {
      Car.find({id: id}).populate('parts').exec(function (e, cars) {
        if(cars[0].parts.length > 0){
          var parts_total = Number(
            Math.round(cars[0].parts.map(function (part) {
              return part.price;
            }).reduce(function (a, b) {
              return a + b;
            }) * 100) / 100).toFixed(2)
        }else{
          var parts_total = 0;
        }

        res.view('car/part', {
          parts: cars[0].parts,
          car: cars[0],
          parts_total: parts_total
        });
      });
    }
    else {
      req.flash('error', 'Missing car id');
      res.redirect('/car/list');
    }
  },
  /**
   * An action for the passenger detail page
   * @param req
   * @param res
   */
  detail: function (req, res) {
    var id = req.param("id");
    if (id) {
      Car.find({id: id}).populate('passengers').populate('parts').exec(function (e, car) {
        res.view('car/detail', {car: car[0]});
      });
    }
    else {
      req.flash('error', 'Missing car id');
      res.redirect('back');
    }
  }
};

