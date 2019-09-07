'use strict';

module.exports = function(app) {

  var mongodb = require('../controllers/MongoDBController');

  //   *********** KUDOS ***********
  app.route('/api/kudos/list')
    .get(mongodb.list_kudos);     

  app.route('/api/kudos/add')
    .post(mongodb.add_kudos);       
    
  app.route('/api/kudos/del/:id')
    .delete(mongodb.del_kudos);       
};