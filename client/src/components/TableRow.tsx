import { useSelector, useDispatch } from 'react-redux';

import { DeleteIcon, EditIcon, FavoriteIcon } from '../components/svg-icons';
import { setEditItem } from '../actions/listingActions';
import { RootState } from '../store';
import { ListingType } from '../types';

type TableRowProps = {
  data: ListingType, 
  handleDelete: (_: number) => void 
  setEditId: (_: number) => void
  changeFavoriteStatus: (_: number) => void
}

const TableRow = ({ data, handleDelete, setEditId, changeFavoriteStatus }: TableRowProps) => {
  const profile = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.type}</td>
      <td>{data.price}</td>
      <td>{data.beds}</td>
      <td>{data.bath}</td>
      <td>{data.propertysqft}</td>
      <td width={150} align='center'>
        {profile?.role === 'ADMIN' && (
          <>
            <button className="delete-btn" onClick={() => handleDelete(data.id)}>
              <DeleteIcon width={16} height={16} />
            </button>
            <button className="edit-btn" onClick={() => { setEditId(data.id); dispatch(setEditItem(data)) }}>
              <EditIcon width={16} height={16} />
            </button>
          </>
        )}
        {profile && (
          <button className={`favorite-btn ${data.isLiked ? 'active' : ''}`} onClick={() => changeFavoriteStatus(data.id)}>
            <FavoriteIcon width={16} height={16} />
          </button>
        )}
      </td>
    </tr>
  )
}

export default TableRow;
