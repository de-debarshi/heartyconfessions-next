'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ConfessionService from '@/services/ConfessionService';
import Link from 'next/link';

export default function SubmitConfession() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const onSubmit = async (data) => {
      const confession = await ConfessionService.submitConfession(data);
      if (confession._id) {
        setFormSubmitted(true);
        reset();
      }
    };

    return (
      <div className="submit-confession-page">
        {
          !formSubmitted && (
            <form onSubmit={handleSubmit(onSubmit)} className="submit-confession-form">
              <div className="form-element">
                <label>Enter your age:</label>
                <input 
                  type="text" 
                  {...register('age', { 
                    required: 'Age is required', 
                    valueAsNumber: true, 
                    min: { value: 1, message: 'Age must be greater than 0' }, 
                    max: { value: 130, message: 'Age must be less than or equal to 130' }
                  })}
                />
                {errors.age && <div className="error-message">{errors.age.message}</div>}
              </div>
              <div className="form-element">
                <label>Choose your gender:</label>
                <select {...register('sex', { required: true })}>
                  <option value="">Select</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
                {errors.sex && <div className="error-message">Gender is required</div>}
              </div>
              <div className="form-element">
                <label>Confession category:</label>
                <select {...register('categories', { required: true })}>
                  <option value="">Select</option>
                  <option value="Random">General</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Love">Love</option>
                  <option value="Lust">Lust</option>
                  <option value="Funny">Funny</option>
                </select>
                {errors.categories && <div className="error-message">Category is required</div>}
              </div>
              <div className="form-element">
                <label>Write your confession below:</label>
                <textarea 
                  placeholder="Start typing..." 
                  {...register('content', { required: true })} 
                  rows="20" 
                  cols="40" 
                />
                {errors.content && <div className="error-message">Confession is required</div>}
              </div>
              <button type="submit" className="button-styled">Submit Confession</button>
            </form>
          )
        }
        {
          formSubmitted && (
            <div>
              <p>Your confession is submitted successfully!</p><p>Please wait while it is being reviewed and approved.</p>
              <div>
                <button
                  className="button-styled submit-stories-btn"
                  onClick={() => setFormSubmitted(false)}
                >
                  Submit Another
                </button>
              </div>
              <div>
                <Link href="/explore" className="button-styled">Explore Stories</Link>
              </div>
            </div>
          )
        }
      </div>
    );
}