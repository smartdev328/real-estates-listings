import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { FavoriteListing } from '../entities/favoriteListing.entity';
import { Listing } from '../entities/listing.entity';
import { User } from '../entities/user.entity';
import { CustomError } from '../utils/response/customError';

export const editFavoriteStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, listingId } = req.body;

  try {
    const listingRepo = getRepository(Listing);
    const favoriteListingRepo = getRepository(FavoriteListing);
    const userRepo = getRepository(User);

    const listing = await listingRepo.findOne(listingId);
    const user = await userRepo.findOne(userId);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const favoriteListing = await favoriteListingRepo.findOne({ where: { user_id: userId, listing_id: listingId } });
    if (favoriteListing) {
      // remove
      await favoriteListingRepo.delete(favoriteListing.id);
      res.json({ message: 'Listing removed from favorites', status: false });
    } else {
      const newFavoriteListing = new FavoriteListing();
      newFavoriteListing.user = user;
      newFavoriteListing.listing = listing;
      await favoriteListingRepo.save(newFavoriteListing);
      res.json({ message: 'Listing added to favorites', status: true });
    }
  } catch (err) {
    const customError = new CustomError(400, err);
    return next(customError);
  }
};
