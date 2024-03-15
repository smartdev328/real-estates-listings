import { Router } from 'express';

import { list, show, edit, destroy } from 'controllers/listings.controller';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';
import { validatorEdit } from 'middleware/validation/listing';

const router = Router();

router.get('/', list);

router.get('/:id([0-9]+)', [checkJwt], show);

router.put('/:id([0-9]+)', [checkJwt, validatorEdit, checkRole(['USER', 'ADMIN'], true)], edit);

router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'], true)], destroy);

export default router;
