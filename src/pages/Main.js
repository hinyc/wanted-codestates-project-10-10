import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import BackImg from '../asset/main_bg.png';

import {
  CompleteRemovedMsg,
  CompleteSavedMsg,
  MemoRequestMsg,
} from '../components/Feedback';

import ForestCard from '../components/ForestCard';

const forestInfo = [
  {
    id: 1,
    name: '충청도휴양마을',
    address: '충청도',
    memo: 'Test메모10',
    phoneNumber: '012-2334-1232',
  },
  {
    id: 2,
    name: '전라도휴양마을',
    address: '전라도',
    memo: 'Test메모20',
    phoneNumber: '012-2334-1232',
  },
  {
    id: 3,
    name: '강원도휴양마을',
    address: '강원도',
    memo: 'Test메모12',
    phoneNumber: '012-2334-1232',
  },
  {
    id: 4,
    name: '경기도휴양마을',
    address: '경기도',
    memo: 'Test메모22',
    phoneNumber: '012-2334-1232',
  },
  {
    id: 5,
    name: '경사도휴양마을',
    address: '경상도',
    memo: 'Test메모13',
    phoneNumber: '012-2334-1232',
  },
  {
    id: 6,
    name: '제주도휴양마을',
    address: '제주도',
    memo: 'Test메모23',
    phoneNumber: '012-2334-1232',
  },
];

export default function Main() {
  const [myForestPlaces, setMyForestPlaces] = useState(forestInfo);
  const [filterName, setFilterName] = useState('이름');
  const [showFilterList, setFilterList] = useState(false);
  const [showFeedbackMemo, setShowFeedbackMemo] = useState(false);
  const [showFeedbackSave, setShowFeedbackSave] = useState(false);
  const [showFeedbackRemove, setShowFeedbackRemove] = useState(false);

  const keyWordRef = useRef(null);
  const FeedbackHandler = (setter) => {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 1000);
  };

  const showFilterHandler = () => {
    if (showFilterList) {
      setFilterList(false);
    } else {
      setFilterList(true);
    }
  };

  const onChangeInput = () => {
    const keyword =
      filterName === '이름'
        ? 'forestName'
        : filterName === '메모'
        ? 'memo'
        : 'address';
    const filteredForest = forestInfo.filter((item) =>
      item[keyword].includes(keyWordRef.current.value),
    );
    setMyForestPlaces(filteredForest);
  };

  return (
    <>
      <MainPage showFilterList={showFilterList}>
        <div className="main_filter">
          <div className="filter" onClick={showFilterHandler}>
            <span>{filterName}</span>
            <span>&#62;</span>
            <ul onClick={(e) => setFilterName(e.target.textContent)}>
              <li>이름</li>
              <li>주소</li>
              <li>메모</li>
            </ul>
          </div>
          <input
            type="text"
            ref={keyWordRef}
            placeholder="검색어를 입력해주세요"
            onChange={onChangeInput}
          />
        </div>
        <div className="main_list">
          {!myForestPlaces && <p>저장된 목록이 없습니다</p>}
          <ul>
            {myForestPlaces &&
              myForestPlaces.map((place) => (
                <ForestCard key={place.id} placeInfo={place} />
              ))}
          </ul>

          <div>
            <button>&#43;</button>
          </div>
        </div>
      </MainPage>
      <ButtonStyle onClick={() => FeedbackHandler(setShowFeedbackMemo)}>
        memo
      </ButtonStyle>
      <ButtonStyle onClick={() => FeedbackHandler(setShowFeedbackSave)}>
        save
      </ButtonStyle>
      <ButtonStyle onClick={() => FeedbackHandler(setShowFeedbackRemove)}>
        remove
      </ButtonStyle>
      {showFeedbackMemo && <MemoRequestMsg />}
      {showFeedbackSave && <CompleteSavedMsg />}
      {showFeedbackRemove && <CompleteRemovedMsg />}
    </>
  );
}

const MainPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 390px;
  height: 844px;
  padding: 30px 0;
  background: url(${BackImg}) center/cover no-repeat;
  overflow: auto;
  .main_filter {
    display: flex;
    justify-content: space-around;
    position: relative;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    > .filter {
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      width: 112px;
      height: 54px;
      border: transparent;
      border-radius: 15px;
      background: transparent;
      color: white;
      box-shadow: 2px 2px 6px 0px gray;

      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        max-height: ${({ showFilterList }) =>
          showFilterList ? '200px' : '0px'};
        padding-left: 0;
        margin-top: 10px;

        border-radius: 15px;
        background: transparent;
        box-shadow: 2px 2px 6px 0px gray;
        list-style: none;

        transition: max-height 300ms ease-in;
        overflow: hidden;
      }

      li {
        width: 100%;
        height: 100%;
        padding: 10px 0;
        border-radius: 15px;
        text-align: center;
      }

      li:hover {
        background-color: #000000;
        opacity: 10%;
      }
    }

    input {
      padding: 0 8px;
      border: transparent;
      border-radius: 15px;
      background-color: transparent;
      color: #ffffff;
      font-size: 18px;
      font-weight: 600;
      box-shadow: 2px 2px 6px 0px gray;
      outline: none;
    }

    input::placeholder {
      color: #ffffff;
    }
  }

  .main_list {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin-top: 70px;

    p {
      color: #ffffff;
      font-size: 22px;
      font-weight: 600;
    }

    button {
      width: 52px;
      height: 52px;
      line-height: 52px;
      margin-top: 10px;
      border: transparent;
      border-radius: 15px;
      color: #85f9cf;
      background-color: #ffffff;
      font-weight: 600;
      font-size: 50px;
      cursor: pointer;
    }
  }
`;

const ButtonStyle = styled.button`
  border: 1px solid black;
  padding: 20px;
  :hover {
    color: red;
  }
  :active {
    opacity: 0.6;
  }
`;
