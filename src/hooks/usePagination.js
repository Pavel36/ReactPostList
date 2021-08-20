import { useMemo } from "react";
import { useState } from "react";

export const usePagination = (totalPages) => {
    const [pagesArray, setPagesArray] = useState([]);
    useMemo(() => {
        let arr =[]
        for(let i=0; i<totalPages ; i++) {
          arr.push(i+1)
        }
        setPagesArray(oldArr => [...oldArr, ...arr])
      }, [totalPages])
    return pagesArray
};
