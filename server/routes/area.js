const express = require('express');
const mongoose = require('mongoose');
const app = express();

const router = express.Router();
const Area = require('../models/area');

router.route('/areas')

  .get((req, res) => {
     Area.find({}, (err, areas) => {
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
          areas,
        });
      }
     });
  })

router.route('/area/:area_id')

  .get((req, res) => {
    Area.findById(req.params.area_id, (err, area) => {
      if (err) {
        res.status(400).json({
          success: false,
          message: 'Haven\'t found world!',
          errors: new Error(err)
        });
      } else {
        const result = {}
        result.success = true
        if(!area) {
          result.message = `Area Not Found for id ${req.params.area_id}`
          result.area = {}
        } else {
          result.message = 'Area Found!'
          result.area = area
        }
        res.status(200).json(result);
      }
    });
  })

  .put((req, res) => {
    Area.findById(req.params.area_id, (err, area) => {
      if (err) {
        res.send(new Error(err));
      } else {
        const { body } = req
        for (key in body) {
          area[key] = body[key];
        }

        area.save((err, area) => {
          if (err)
            res.send(new Error(err));
          res.json({
            message: "Plant Updated!",
            area
          });
        });
      }
    });
  })

  .delete( ( req, res ) => {
    Area.findById(req.params.world_id, (err, area) => {
      if(err) {
        res.status(400).json({
          message: "Area Not Removed!",
          errors: new Error(err)
        });
      } else {
        area.remove()
        res.status(200).json({
          message: "Area Removed!",
        });
      }
    })
  })

module.exports = router;
