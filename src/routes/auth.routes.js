import {Router} from 'express';

import { 
  setResistance, 
  getResistance,
  getAllResistances, 
  getAllBands, 
  getAllMultipliers, 
  getAllTolerances 
} from '../controllers/auth.controller.js';

import { resistanceSchema } from '../schemas/auth.schema.js';
import { validateSchema } from '../middlewares/validator.midleware.js';

const router = Router();

router.get('/bands', getAllBands);
router.get('/multipliers', getAllMultipliers);
router.get('/tolerances', getAllTolerances);

router.get('/resistances', getAllResistances);
router.get('/resistance', getResistance);
router.post('/resistance', validateSchema( resistanceSchema ), setResistance);

export default router;