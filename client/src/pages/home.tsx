/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { EditForm, Filters, Sort, TableRow } from '../components';
import { RootState } from '../store';
import { logout, saveUser } from '../actions/authActions';
import { deleteItem, setItems } from '../actions/listingActions';
import { FilterOptions, ListingType, SortOption } from '../types';
import API from '../api';

const LIMIT = 10;

const Table: React.FC = () => {
  const listings = useSelector((state: RootState) => state.listings.items);
  const profile = useSelector((state: RootState) => state.auth.user);
  const [editId, setEditId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sort, setSort] = useState<SortOption>({ field: 'id', dir: 'asc'});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/auth/me');
        const user = res.data.data;
        dispatch(saveUser(user));
      } catch (err) {
        console.log(err);
        return err;
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    fetchListings();
  }, [profile, page, filters, sort]);

  const fetchListings = async () => {
    try {
      const encodedFilters = Object.entries(filters)
        .map(([key, value]) => `filters[${encodeURIComponent(key)}]=${encodeURIComponent(value)}`)
        .join('&');

      const res2 = await API.get(`/listings?limit=${LIMIT}&page=${page}&sort=${sort.field}&order=${sort.dir}&${encodedFilters}`);
      const items = res2.data.data as ListingType[];
      items.forEach(item => {
        item.isLiked = item.favoriteListings.filter(item => item.user_id === profile?.id).length > 0;
      })
      dispatch(setItems(items));
      const count = Math.ceil(res2.data.total / LIMIT);
      setPageCount(count);
      return res2;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure to delete this listing?')) {
      try {
        await API.delete(`/listings/${id}`);
        dispatch(deleteItem(id));
        fetchListings();
      } catch (err) {
        return err;
      }
    }
  };

  const changeFavoriteStatus = async (id: number) => {
    try {
      const res = await API.post(`/favorite-listings`, { userId: profile?.id, listingId: id });
      const updatedItems = [...listings];
      const index = updatedItems.findIndex(item => item.id === id);
      updatedItems[index] = {
        ...updatedItems[index],
        isLiked: res.data.status,
      };
      dispatch(setItems(updatedItems));
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  const handleFilterChange = (filterOptions: FilterOptions) => {
    Object.keys(filterOptions).forEach(key => (
      filterOptions[key as keyof FilterOptions] === '' || filterOptions[key as keyof FilterOptions] === undefined)
        && delete filterOptions[key as keyof FilterOptions]
    );
    setFilters(filterOptions);
    setPage(1);
  }

  const handleSortChange = (sortOption: SortOption) => {
    setSort(sortOption);
    setPage(1);
  } 

  return (
    <div>
      <div className="home-header">
        {!profile ?
          <Link to="/login">Login</Link>
        : (
          <>
            <div className='profile'>{profile.email} ({profile.role})</div>
            <div className='logout-btn' onClick={handleLogout}>Logout</div>
          </>
        )}
      </div>
      <div className="filters-bar">
        <Filters onChange={handleFilterChange} />
        <Sort onChange={handleSortChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Price</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Square Footage</th>
            <th align='center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing: ListingType) => (
            <React.Fragment key={listing.id}>
              {editId === listing.id ? (
                <tr>
                  <td colSpan={7}>
                    <EditForm onSave={() => setEditId(null)} />
                  </td>
                </tr>
              ) : (
                <TableRow
                  data={listing}
                  handleDelete={handleDelete}
                  setEditId={setEditId}
                  changeFavoriteStatus={changeFavoriteStatus}
                />
              )}
            </React.Fragment>
          ))}
          
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        forcePage={page - 1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Table;
