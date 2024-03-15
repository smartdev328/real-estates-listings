import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem, setEditItem } from '../actions/listingActions';
import API from '../api';

import { RootState } from '../store';

interface EditFormProps {
  onSave: () => void
}

const EditForm= ({ onSave }: EditFormProps) => {
  const [type, setType] = useState('');
  const [price, setPrice] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [squareFootage, setSquareFootage] = useState(0);
  const editItem = useSelector((state: RootState) => state.listings.editItem);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editItem) {
      setType(editItem.type)
      setPrice(editItem.price)
      setBedrooms(editItem.beds)
      setBathrooms(editItem.bath)
      setSquareFootage(editItem.propertysqft)
    }
  }, [editItem])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const params = {
        ...editItem,
        type,
        price,
        beds: bedrooms,
        bath: bathrooms,
        propertysqft: squareFootage,
      }
      await API.put(`/listings/${editItem?.id}`, params);
      dispatch(updateItem(params));
      setEditItem(null);
      onSave();
    } catch (err) {
      return err;
    }
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit} onReset={onSave}>
      <div>
        <label>Type</label>
        <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
      </div>
      <div>
        <label>Price</label>
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </div>
      <div>
        <label>Bedrooms</label>
        <input
          type="number"
          placeholder="Bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(Number(e.target.value))}
        />
      </div>
      <div>     
        <label>Bathrooms</label>
        <input
          type="number"
          placeholder="Bathrooms"
          value={bathrooms}
          onChange={(e) => setBathrooms(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Square Footage</label>
        <input
          type="number"
          placeholder="Square Footage"
          value={squareFootage}
          onChange={(e) => setSquareFootage(Number(e.target.value))}
        />
      </div>
      <button className="save" type="submit">Save</button>
      <button className="cancel" type="reset">Cancel</button>
    </form>
  );
};

export default EditForm;
