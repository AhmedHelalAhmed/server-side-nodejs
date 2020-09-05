const express = require("express");
const bodyParser = require("body-parser");

const Leaders = require("../models/leaders");

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter
  .route("/")
  .get((req, res, next) => {
    Leaders.find({})
      .then(
        (leaders) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leaders);
        },
        (error) => {
          next(error);
        }
      )
      .catch((error) => next(error));
  })
  .post((req, res, next) => {
    Leaders.create(req.body)
      .then(
        (leader) => {
          console.log("leader Created ", leader.toObject());
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        (error) => {
          next(error);
        }
      )
      .catch((error) => {
        next(error);
      });
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("put operation not supported on /leaders");
  })
  .delete((req, res, next) => {
    Leaders.remove({})
      .then(
        (operationsInfo) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(operationsInfo);
        },
        (error) => {
          next(error);
        }
      )
      .catch((error) => {
        next(error);
      });
  });
leaderRouter
  .route("/:leaderId")
  .get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        (error) => {
          next(error);
        }
      )
      .catch((error) => {
        next(error);
      });
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /leaders/" + req.params.leaderId);
  })
  .put((req, res, next) => {
    Leaders.findByIdAndUpdate(
      req.params.leaderId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        (error) => {
          next(error);
        }
      )
      .catch((error) => {
        next(error);
      });
  })
  .delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
      .then(
        (operationsInfo) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(operationsInfo);
        },
        (error) => {
          next(error);
        }
      )
      .catch((error) => next(error));
  });

module.exports = leaderRouter;
