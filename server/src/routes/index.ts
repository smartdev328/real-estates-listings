import { Router } from 'express';

import auth from './auth';
import favoriteListings from './favorite-listings';
import listings from './listings';

const router = Router();

router.use('/auth', auth);
router.use('/listings', listings);
router.use('/favorite-listings', favoriteListings);

export default router;
