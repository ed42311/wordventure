const express = require('express');
const mongoose = require('mongoose');
const app = express();

const router = express.Router();
const World = require('../models/world');

router.route('/worlds')

  .post((req, res) => {
    const world = new World();
    const { body } = req

    for (let key in body) {
      world[key] = body[key];
    }

    world.save((err, plant) => {
      if (err)
        res.send(err);
      res.json({
        message: "World Saved",
        world
      });
    });
  })

  .get((req, res) => {
     World.find({}, (err, worlds) => {
      if (err) {
        res.status(400).json({
          success: false,
          message: "Worlds not loaded.",
          errors: new Error(err)
        });
      } else {
        res.status(200).json({
          success: true,
          message: "All Worlds Loaded.",
          worlds,
        });
      }
     });
  })

router.route('/world/:world_id')

  .get((req, res) => {
    World.findById(req.params.world_id, (err, world) => {
      if (err) {
        res.send(new Error(err));
      } else {
        res.json({
          message: "World Found!",
          world
        });
      }
    });
  })

  .put((req, res) => {
    World.findById(req.params.world_id, (err, world) => {
      if (err) {
        res.send(new Error(err));
      } else {
        const { body } = req
        for (key in body) {
          world[key] = body[key];
        }

        world.save((err, world) => {
          if (err)
            res.send(new Error(err));
          res.json({
            message: "Plant Updated!",
            world
          });
        });
      }
    });
  })

module.exports = router;
