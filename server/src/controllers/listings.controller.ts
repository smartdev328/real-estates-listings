import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { FavoriteListing } from 'entities/favoriteListing.entity';

import { Listing } from '../entities/listing.entity';
import { CustomError } from '../utils/response/customError';

type ListingQueryType = {
  page: string;
  limit: string;
  sort?: string;
  order?: string;
  filters?: {
    search?: string;
    min_price?: string;
    max_price?: string;
    beds?: string;
    bath?: string;
    min_sqft?: string;
    max_sqft?: string;
  };
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { page, limit, sort, order, filters } = req.query as ListingQueryType;

  const listingRepository = getRepository(Listing);
  try {
    const pageSize = limit ? parseInt(limit as string) : 10;
    const pageNumber = page ? parseInt(page as string) : 1;
    const dir = order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const sortBy = sort ? (sort as string) : 'id';

    let queryBuilder = listingRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.favoriteListings', 'favoriteListings');

    if (filters?.search) {
      const keyword = filters.search.toLowerCase();
      queryBuilder = queryBuilder
        .where('listing.brokertitle ILIKE :search', { search: `%${keyword}%` })
        .orWhere('listing.type ILIKE :search', { search: `%${keyword}%` })
        .orWhere('listing.formatted_address ILIKE :search', { search: `%${keyword}%` })
        .orWhere('listing.locality ILIKE :search', { search: `%${keyword}%` });
    }

    if (filters?.min_price) {
      queryBuilder = queryBuilder.andWhere('listing.price >= :min_price', { min_price: filters.min_price });
    }

    if (filters?.max_price) {
      queryBuilder = queryBuilder.andWhere('listing.price <= :max_price', { max_price: filters.max_price });
    }

    if (filters?.beds) {
      const beds = filters.beds.split(',').map((bed) => parseInt(bed));
      queryBuilder = queryBuilder.andWhere('listing.beds IN (:...beds)', { beds });
    }

    if (filters?.bath) {
      const bath = filters.bath.split(',').map((b) => parseInt(b));
      queryBuilder = queryBuilder.andWhere('listing.bath IN (:...baths)', { baths: bath });
    }

    const total = await queryBuilder.getCount();

    // Sorting
    if (sortBy && dir) {
      queryBuilder = queryBuilder.orderBy(`listing.${sortBy}`, dir);
    }

    // Pagination
    const skip = (pageNumber - 1) * pageSize;
    queryBuilder = queryBuilder.skip(skip).take(pageSize);

    const listings = await queryBuilder.getMany();
    res.customPagination(200, pageNumber, pageSize, total, listings);
  } catch (err) {
    const customError = new CustomError(400, err);
    return next(customError);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const listingRepository = getRepository(Listing);
  try {
    const listing = await listingRepository.findOne(id);

    if (!listing) {
      const customError = new CustomError(404, ['Listing not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'Listing found', listing);
  } catch (err) {
    const customError = new CustomError(400, err);
    return next(customError);
  }
};

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const listingRepository = getRepository(Listing);
  const favoriteListingRepository = getRepository(FavoriteListing);
  try {
    const listing = await listingRepository.findOne({ where: { id }, relations: ['favoriteListings'] });

    if (!listing) {
      const customError = new CustomError(404, [`Listing not found.`]);
      return next(customError);
    }
    console.log(listing.favoriteListings);
    await Promise.all(
      listing.favoriteListings.map(async (favListing) => {
        await favoriteListingRepository.delete(favListing.id);
      }),
    );
    listingRepository.delete(id);

    res.customSuccess(200, 'Listing successfully deleted.', { id: listing.id });
  } catch (err) {
    const customError = new CustomError(400, err);
    return next(customError);
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { beds, bath, price, propertysqft } = req.body;

  const listingRepository = getRepository(Listing);
  try {
    const listing = await listingRepository.findOne({ where: { id } });

    if (!listing) {
      const customError = new CustomError(404, ['Listing not found.']);
      return next(customError);
    }

    try {
      const updatedListing = {
        ...listing,
        price,
        beds,
        bath,
        propertysqft,
      };
      await listingRepository.save(updatedListing);
      res.customSuccess(200, 'Listing successfully saved.', updatedListing);
    } catch (err) {
      const customError = new CustomError(409, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, err);
    return next(customError);
  }
};
