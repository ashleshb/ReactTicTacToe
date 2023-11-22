import React, { useState, useEffect, useCallback } from 'react';
import '../Styles/Quote.css';
import IconImg from '../Assets/Images/Group 3.svg';

function Quote() {
  const [quote, setQuote] = useState('');
  const [Seq_Num, setSeq_Num] = useState(1); // Start from 1

  const Fetch_Quotes = useCallback(async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setQuote(data.slip.advice);
    } catch (error) {
      console.error('Error in fetching the quotes:', error);
    }
  }, []);

  useEffect(() => {
    
    Fetch_Quotes();

   
    const intervalId = setInterval(() => {
      Fetch_Quotes();
      setSeq_Num((prevSeq_Num) => prevSeq_Num + 1);
    }, 60000); // 60000 milliseconds = 1 minute

   
    return () => clearInterval(intervalId);
  }, [Fetch_Quotes]);

  return (
    <div className='quotes'>
      <h2>Quote #{Seq_Num}</h2>
      <p>{quote}</p>
      <div className='cir_1'>
        <img alt='imgHere' src={IconImg} />
      </div>
    </div>
  );
}


export default Quote;