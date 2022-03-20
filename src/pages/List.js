//list
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Modal from '../components/Modal';
import ForestCard from '../components/ForestCard';
import Spinner from '../components/Spinner';
import axios from 'axios';

export default function List({ setShowSaveMsg }) {
  const URL =
    'https://my-proxy-forest.herokuapp.com/https://www.chungbuk.go.kr/openapi-json/pubdata/pubMapForest.do';
  const PAGE_NUMBER = 1;
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [forestDataList, setforestDataList] = useState([]);
  const targetRef = useRef(null);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectList, setSelectList] = useState({});
  const idSet = new Set();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${URL}?pageNo=${page}&numOfRows=20`);
      const { response } = await JSON.parse(data);
      setforestDataList((prev) => [...prev, ...response]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const callback = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) setPage(page + 1);
    },
    [page],
  );

  useEffect(() => {
    console.log(targetRef.current);
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [callback, options]);

  const handleClick = () => {
    navigate('/');
    setShowSaveMsg(false);
  };

  const cardList = forestDataList.map((dataObj, idx) => {
    if (idSet.has(dataObj.fcNo)) {
      return '';
    } else {
      idSet.add(dataObj.fcNo);
      return (
        <ForestCard
          setSelectList={setSelectList}
          setModalOpen={setModalOpen}
          placeInfo={dataObj}
          key={dataObj.fcNo}
          dataObj={dataObj}
          ref={idx + 4 === forestDataList.length ? targetRef : undefined}
        />
      );
    }
  });
  return (
    <ListContainer>
      <ListPage>
        <ButtonWrapper>
          <ReturnButton onClick={handleClick}>
            <span>메인으로</span>
          </ReturnButton>
        </ButtonWrapper>
        {isLoading ? (
          <Spinner />
        ) : (
          <CardListWrapper>{cardList}</CardListWrapper>
        )}
        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            data={selectList}
            setShowSaveMsg={setShowSaveMsg}
          />
        )}
      </ListPage>
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 10px;
  background: #efefef;
`;

const ListPage = styled.div`
  position: relative;
  margin: auto;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 390px;
  height: 100%;
  min-height: 300px;
  max-height: 844px;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
`;

const ButtonWrapper = styled.section`
  width: 362px;
  height: 75px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const ReturnButton = styled.button`
  &:before {
    content: '<';
  }
  width: 70px;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  color: #ccc;
  cursor: pointer;
  margin-top: 20px;

  span {
    font-size: 16px;
    margin-left: 4px;
    :hover {
      opacity: 0.65;
    }
    :active {
      opacity: 0.95;
    }
  }
`;

const CardListWrapper = styled.section`
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > article {
    margin-bottom: 45px;
  }
`;
