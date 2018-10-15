const express = require('express');
const mongoose = require('mongoose');
const app = express();

const router = express.Router();
const World = require('../models/world');
const Area = require('../models/area');

router.route('/worlds')

  .post((req, res) => {
    const world = new World();
    const { body } = req

    for (let key in body) {
      world[key] = body[key];
    }

    world.save((err, world) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).json({
          message: "World Saved",
          world
        });
      }
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
        res.status(400).json({
          success: false,
          message: 'Haven\'t found world!',
          errors: new Error(err)
        });
      } else {
        const result = {}
        result.success = true
        if(!world) {
          result.message = `World Not Found for id ${req.params.world_id}`
          result.world = {}
        } else {
          result.message = 'World Found!'
          result.world = world
        }
        res.status(200).json(result);
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

  .delete( ( req, res ) => {
    World.findById(req.params.world_id, (err, world ) => {
      if(err) {
        res.status(400).json({
          message: "World Not Removed!",
          errors: new Error(err)
        });
      } else {
        world.remove()
        res.status(200).json({
          message: "World Removed!",
        });
      }
    })
  })

router.route('/world/areas/:world_id')

  .delete((req, res) => {
    World.findById(req.params.world_id, (err, world) => {
      if (err) {
        res.send(new Error(err));
      }
    })
    .populate('areas')
		.exec( function ( err, world ) {
      const { areas } = world
      for (let i = 0; i < areas.length; i++) {
        areas[i].remove()
      }
      res.status(200).json({
        success: true,
        message: `Areas Deleted from ${req.params.world_id}`
      });
		})
  })

router.route('/world/add_area/:world_id')

  .put((req, res) => {
    World.findById(req.params.world_id)
      .exec((err, world) => {
        if (err) {
          res.send(new Error(err));
        } else {
          const area = new Area();
          const { body } = req
          for (let key in body) {
            area[key] = body[key];
          }
          area.save((err, area) => {
            if (err) {
              res.send(err);
            } else  {
              world.areas.push(area)
              world.save((err, world) => {
                if (err) {
                  res.send(new Error(err));
                } else {
                  res.status(200).json({
                    message: "World Updated With New Area!",
                    world
                  });
                }
              });
            }
          });
        }
      })
  })

router.route('/world/entrance/:world_id')

  .get((req, res) => {
    World.findById( req.params.world_id, ( err, world ) => {
      if (err)
        res.send(err)
    })
    .populate('areas')
    .exec((err, world) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: "Haven't found world!",
            errors: new Error(err)
          });
        }
        const { areas } = world
        let entrance = {}
        if (areas.length) {
          entrance = areas.filter(area => area.isEntrance).pop()
        }
        res.status(200).json({
          success: true,
          message: "First Area Found!",
          area: entrance
        });
    })
  })

module.exports = router;
