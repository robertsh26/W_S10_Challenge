import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, orderCreationFailure } from '../state/actions';

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

export default function PizzaForm() {
  const [formState, setFormState] = useState(initialFormState);
  const dispatch = useDispatch();
  const orderStatus = useSelector(state => state.orderStatus);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    
    // Check if fullName is provided
    if (!formState.fullName) {
      dispatch(orderCreationFailure("fullName is required"));
      return;
    }

    
  
    // Check if size is provided and valid
    if (!formState.size || !['S', 'M', 'L'].includes(formState.size)) {
      dispatch(orderCreationFailure("size must be one of the following values: S, M, L"));
      return;
    }
  
    // Extract selected toppings
    const toppings = Object.keys(formState)
      .filter((key) => ['1', '2', '3', '4', '5'].includes(key) && formState[key])
      .map((key) => key);
  
    // Dispatch createOrder action if validation passes
    const orderData = {
      fullName: formState.fullName,
      size: formState.size,
      toppings: toppings,
    };
    
    dispatch(createOrder(orderData));
    
  };

  useEffect(() => {
    if (!orderStatus.isLoading && !orderStatus.error) {
      setFormState(initialFormState); // Reset form state upon successful order creation
    }
  }, [orderStatus]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {orderStatus.isLoading && <div className='pending'>Order in progress...</div>}
      {orderStatus.error && <div className='failure'>Order failed: {orderStatus.error}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={formState.size}
            onChange={handleChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={formState['1']}
            onChange={handleChange}
          />
          Pepperoni<br /></label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={formState['2']}
            onChange={handleChange}
          />
          Green Peppers<br /></label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={formState['3']}
            onChange={handleChange}
          />
          Pineapple<br /></label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={formState['4']}
            onChange={handleChange}
          />
          Mushrooms<br /></label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={formState['5']}
            onChange={handleChange}
          />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
