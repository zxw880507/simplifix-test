import { useEffect, useState } from 'react';
import axios from 'axios';

export const useApplicationData = function() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/categories')
    .then(response => {
      setCategories(response.data);
    })
  },[]);

  return {categories};

}