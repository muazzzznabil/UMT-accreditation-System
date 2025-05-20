/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

export const UseJson = (file: string) => {
  const [data, setData] = useState<Json>({} as Json); // Initialize as an object

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(file);
        const jsonData = await response.json();
        setData(jsonData); // Assuming `ptj` is the key in the JSON
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [file]);

  return data;
};

type Json = { [key: string]: any };
