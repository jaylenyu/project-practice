import React, { useEffect, useState } from 'react';
import './Products.scss';

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        console.log(data.products);
        setProductsList(data.products);
      });
  }, []);

  const filterProducts = e => {};

  return (
    <div className="products">
      <div className="filterContainer">
        <select onChange={filterProducts}>
          <option value="">옵션을 선택해주세요</option>
          <option value="price">가격 낮은순</option>
          <option value="rating">별점 높은순</option>
          <option value="discountPercentage">할인율 높은순</option>
        </select>
      </div>
      <div className="listWrap">
        {productsList.length > 0 &&
          productsList.map(
            ({
              id,
              brand,
              title,
              description,
              category,
              images,
              price,
              rating,
              discountPercentage,
            }) => {
              return (
                <div key={id} className="cardContainer">
                  <img alt={id} src={images[0]} className="cardImage" />
                  <div className="contentBox">
                    <span>상품명 : {title}</span>
                    <span>가격 : {price}$</span>
                    <span>별점 : {rating}</span>
                    <span>할인율 : {discountPercentage}%</span>
                  </div>
                </div>
              );
            }
          )}
      </div>
      <div className="buttonWrap" />
    </div>
  );
};

export default Products;
