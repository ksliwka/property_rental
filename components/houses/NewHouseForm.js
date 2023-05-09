import { useRef } from 'react';

import classes from './NewHouseForm.module.css';

function NewHouseForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const locationInputRef = useRef();
  const descriptionInputRef = useRef();
  const rentalAvailabilityRef = useRef();
  const priceRef = useRef()

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredRentalAvailability = rentalAvailabilityRef.current.value;
    const eneteredPrice = priceRef.current.value;

    const houseData = {
      title: enteredTitle,
      image: enteredImage,
      location: enteredLocation,
      rentalAvailability: enteredRentalAvailability,
      price: eneteredPrice,
      description: enteredDescription,
    };

    props.onAddMeetup(houseData);
  }

  return (
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input type='url' required id='image' ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='location'>Location</label>
          <input type='text' required id='location' ref={locationInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='date'>Date</label>
          <input type='text' required id='date' ref={rentalAvailabilityRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='price'>Price</label>
          <input type='text' required id='date' ref={priceRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add</button>
        </div>
      </form>
  );
}

export default NewHouseForm;