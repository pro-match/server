"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require("./pro.ctrl");

router.get("/register", ctrl.view.register);
router.post("/register", ctrl.api.register);
// 
router.get("/allpros", ctrl.api.allpros);


module.exports = router;
