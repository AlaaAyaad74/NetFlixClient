import React from 'react'
import Card from '../components/ui/common/card/Card'
import  movies  from "../../data/movies.js";
import  series  from "../../data/series.js";
const CardDetails = () => {
    return (
        <>
          <h1>Series</h1>
          {series.map((item, index) => (
            <Card item={item} key={index} />
          ))}
          <h1>Movies</h1>
          {movies.map((item, index) => (
            <Card item={item} key={index} />
          ))}
        </>
      );
}

export default CardDetails
