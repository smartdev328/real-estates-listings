import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { StringToDoubleTransformer } from '../utils/toDoubleTransformer';

import { FavoriteListing } from './favoriteListing.entity';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brokertitle: string;

  @Column()
  type: string;

  @Column({ type: 'numeric', transformer: StringToDoubleTransformer })
  price: number;

  @Column()
  beds: number;

  @Column()
  bath: number;

  @Column({ type: 'numeric', transformer: StringToDoubleTransformer })
  propertysqft: number;

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  main_address: string;

  @Column()
  administrative_area_level_2: string;

  @Column()
  locality: string;

  @Column()
  sublocality: string;

  @Column()
  street_name: string;

  @Column()
  long_name: string;

  @Column()
  formatted_address: string;

  @Column({ type: 'numeric', transformer: StringToDoubleTransformer })
  latitude: number;

  @Column({ type: 'numeric', transformer: StringToDoubleTransformer })
  longitude: number;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => FavoriteListing, (favoriteListings) => favoriteListings.listing, { cascade: true })
  favoriteListings: FavoriteListing[];
}
