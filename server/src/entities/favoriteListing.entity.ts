import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

import { Listing } from './listing.entity';
import { User } from './user.entity';

@Entity('favoritelistings')
export class FavoriteListing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  listing_id: number;

  @ManyToOne(() => User, (user) => user.favoriteListings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Listing, (listing) => listing.favoriteListings)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;
}
