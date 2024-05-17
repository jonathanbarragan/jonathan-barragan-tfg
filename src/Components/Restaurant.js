import React, { useState, useEffect } from 'react';
import data from '../restaurantes.json';
export const Restaurant=() => {
    console.log(data);
  return (
    <h1>{data.restaurant_name}</h1>
  );
}

export default Restaurant;
