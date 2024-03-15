import { Router } from 'express';

import { login, register, getProfile } from 'controllers/auth.controller';
import { checkJwt } from 'middleware/checkJwt';
import { validatorLogin, validatorRegister } from 'middleware/validation/auth';

const router = Router();

router.post('/login', [validatorLogin], login);
router.post('/signup', [validatorRegister], register);
router.get('/me', [checkJwt], getProfile);

export default router;
