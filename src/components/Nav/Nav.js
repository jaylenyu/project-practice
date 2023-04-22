import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import './Nav.scss';

const Nav = () => {
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/search?q=${searchText}`)
      .then(res => res.json())
      .then(data => {
        setSearchList(data);
      });
  }, [searchText]);

  const searchProdut = e => {
    setSearchText(e.target.value);
  };

  const handleModal = () => {
    setIsOpenModal(prev => !prev);
  };

  const goToDetail = id => {
    navigate(`/detail/${id}`);
  };

  return (
    <nav className="nav">
      <div className="contentContainer">
        <Link className="logo" to="/">
          Wecode
        </Link>
        <div className="search">
          <input
            className="searchInput"
            placeholder="검색"
            value={searchText}
            onChange={searchProdut}
          />
          {searchText.length > 0 && (
            <div className="searchBox">
              {searchList &&
                searchList.products.map(list => {
                  return (
                    <span
                      key={list.id}
                      className="result"
                      onClick={() => goToDetail(list.id)}
                    >
                      {list.title}
                    </span>
                  );
                })}
            </div>
          )}
        </div>
        <div className="menuBox">
          <div className="loginBtn" onClick={handleModal}>
            로그인
          </div>
          <Link className="listPageBtn" />
        </div>
        {isOpenModal && <Modal setIsOpenModal={setIsOpenModal} />}
      </div>
    </nav>
  );
};

export default Nav;
