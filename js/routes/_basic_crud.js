
var middleware = require('../middleware');

/**
 * I moved the guts of the basic CRUD operations into a centralized place so
 * there's much less code duplication.
 */
module.exports = {
  defineReadAll: function(model, app) {
    app.get(`/${model.modelName.toLowerCase()}/all`, middleware.authenticate, middleware.decodeSession, function (req, res) {
      var pageLength = req.query.pageLength;
      var pageNumber = req.query.pageNumber;
      // TODO: Implement paging

      model.find({ user_id: req.username })
        .catch(function(err) {
          console.error(err);
          res.sendStatus(500);
        })
        .then(function(objects) {
          res.json(objects);
        });
    });
  },

  defineRead: function(model, app) {
    app.get(`/${model.modelName.toLowerCase()}/:id`, middleware.authenticate, middleware.decodeSession, function (req, res) {
      var id = req.params.id;

      model.findOne({ _id: id, user_id: req.username })
        .catch(function(err) {
          console.error(err);
          res.sendStatus(500);
        })
        .then(function(object) {
          res.json(object);
        });
    });
  },

  defineCreate: function(model, app) {
    app.post(`/${model.modelName.toLowerCase()}`, middleware.authenticate, middleware.decodeSession, function (req, res) {
      var newObj = new model(req.body);
      newObj.user_id = req.username;

      newObj.save()
        .catch(function(err) {
          console.error(err);
          res.sendStatus(500);
        })
        .then(function() {
          res.sendStatus(200);
        });
    });
  },

  defineUpdate: function(model, app) {
    app.put(`/${model.modelName.toLowerCase()}/:id`, middleware.authenticate, middleware.decodeSession, function (req, res) {
      var id = req.params.id;

      model.findOne({ _id: id, user_id: req.username })
        .then(function(object) {
          if(object) {
            object = Object.assign(object, req.body);
            return object.save();
          } else {
            res.sendStatus(404);
          }
        })
        .catch(function(err) {
          console.error(err);
          res.sendStatus(500);
        });
    });
  },

  defineDelete: function(model, app) {
    app.delete(`/${model.modelName.toLowerCase()}/:id`, middleware.authenticate, middleware.decodeSession, function (req, res) {
      var id = req.params.id;

      model.deleteOne({ _id: id, user_id: req.username })
        .then(function(result) {
          res.json(result);
        })
        .catch(function(err) {
          console.error(err);
          res.sendStatus(500);
        });
    });
  }
};
