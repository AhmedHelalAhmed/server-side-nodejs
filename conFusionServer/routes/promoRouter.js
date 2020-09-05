const express = require("express");
const bodyParser = require("body-parser");

const Promotions = require("../models/promotions");

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .get((req, res, next) => {
    Promotions.find({})
      .then(
        (promotions) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotions);
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
    Promotions.create(req.body)
      .then(
        (promotion) => {
          console.log("promotion Created ", promotion.toObject());
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotion);
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
    res.end("put operation not supported on /promotions");
  })
  .delete((req, res, next) => {
    Promotions.remove({})
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

promoRouter
  .route("/:promoId")
  .get((req, res, next) => {
    Promotions.findById(req.params.promoId)
      .then(
        (promotion) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotion);
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
    res.end(
      "POST operation not supported on /promotions/" + req.params.promoId
    );
  })
  .put((req, res, next) => {
    Promotions.findByIdAndUpdate(
      req.params.promoId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
      .then(
        (promotion) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotion);
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
    Promotions.findByIdAndRemove(req.params.promoId)
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
module.exports = promoRouter;
