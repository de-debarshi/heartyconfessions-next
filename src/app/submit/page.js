'use client'

import { useState } from 'react';
import ConfessionService from '@/services/ConfessionService';

export default function SubmitConfession() {
    const [inputs, setInputs] = useState({});
    const [formError, setFormError] = useState({});
    const [formSubmitted, setFormSubmitted] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
      setFormError(false);
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      if (inputs.age && inputs.sex && inputs.content) {
        const newConfession = {
          age: inputs.age,
          sex: inputs.sex,
          categories: ['Random'],
          content: inputs.content
        };
          let confession = await ConfessionService.submitConfession(newConfession);
          let shareableLink = `/confession/${confession._id}`;
          if(confession._id) {
            setFormSubmitted(true);
          }
      } else {
        setFormError(true);
      }
    }

    return (
      <div className="submit-confession-page">
        {
          formSubmitted !==true && (
            <form onSubmit={handleSubmit} className="submit-confession-form">
              <div className="form-element">
                <label>Enter your age:</label>
                <input 
                    type="number" 
                    name="age" 
                    value={inputs.age || ""} 
                    onChange={handleChange}
                />
              </div>
              <div className="form-element">
                <label>Choose your gender:</label>
                <select name="sex" value={inputs.sex} onChange={handleChange}>
                    <option value="" default>Select</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                </select>
              </div>
              {/* <div className="form-element">
                <label>Choose your confession category:</label>
                <select name="categories" value={inputs.categories} onChange={handleChange}>
                    <option value="" default>Select</option>
                    <option value="Random">Random</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Romance">Romance</option>
                    <option value="Funny">Funny</option>
                </select>
              </div> */}
              <div className="form-element">
                <label>Write your confession below:</label>
                <textarea placeholder="Start typing..." name="content" value={inputs.content} onChange={handleChange} rows="20" cols="40" />
              </div>
              <button type="submit" className="button-styled">Submit Confession</button>
              {
                formError===true && (<div className="error-message">Please fill all the fields above</div>)
              }
            </form>
          )
        }
        {
          formSubmitted === true && (
            <div>
              <p>Your confession is submitted successfully!</p><p>Please wait while it is being reviewed and approved.</p>
              <div>
                <a href="/submit" className="button-styled submit-stories-btn">Submit Another</a>
              </div>
              <div>
                <a href="/explore" className="button-styled">Explore Stories</a>
              </div>
            </div>
          )
        }
      </div>
    );
}