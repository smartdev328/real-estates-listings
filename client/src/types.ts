export type ListingType = {
  id: number
  brokertitle: string
  type: string
  price: number
  beds: number
  bath: number
  propertysqft: number
  address: string
  state: string
  main_address: string
  administrative_area_level_2: string
  locality: string
  sublocality: string
  street_name: string
  long_name: string
  formatted_address: string
  latitude: number
  longitude: number
  isLiked?: boolean
  favoriteListings: FavoriteUser[]
};

export type FavoriteUser = {
  id: number
  user_id: number
  listing_id: number
}

export type LoginResponse = {
  message: string
  data: string
}

export type ErrorObject = {
  errors: string[],
}

export type User = {
  id: number
  role: string
  email: string
}

export type FilterOptions = {
  search?: string
  minPrice?: number
  maxPrice?: number
  minBeds?: number
  maxBeds?: number
  minBaths?: number
  maxBaths?: number
}

export type SortOption = {
  field: string
  dir: string
}
