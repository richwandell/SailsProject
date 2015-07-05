module.exports = {
  /**
   * An action for adding a new part from the add part form
   * @param req
   * @param res
   */
  addPart: function(req, res) {
    var error = false;
    //Check that we have a valid part name
    if (!req.body.part_name || req.body.part_name.trim() === '') {
      //Set error for the part form
      req.flash('part_name_error', 'has-error');
      error = true;
    }
    else {
      //Reset the value entered
      req.flash('part_name_entry', req.body.part_name);
    }
    //Check that we have a number for part_price
    if (!req.body.part_price || isNaN(req.body.part_price)) {
      //Set error for part price
      req.flash('part_price_error', 'has-error');
      error = true;
    }
    else {
      req.flash('part_price_entry', req.body.part_price);
    }
    if (error) {
      res.redirect('back');
      return;
    }
    Part.create({
      name: req.body.part_name,
      price: req.body.part_price,
      car: req.body.part_car
    }).exec(function (e, record) {
      if (!e) {
        req.flash('message', 'Success! Added a new car part');
      }
      else {
        req.flash('error', 'Error!');
      }
      res.redirect('back');
    });
  }
};