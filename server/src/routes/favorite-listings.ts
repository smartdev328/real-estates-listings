import { Router } from 'express';

import { editFavoriteStatus } from 'controllers/favorite-listings.controller';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';
import { validatorEdit } from 'middleware/validation/favorite-listing';

const router = Router();

router.post('/', [checkJwt, validatorEdit, checkRole(['USER', 'ADMIN'], true)], editFavoriteStatus);

export default router;
