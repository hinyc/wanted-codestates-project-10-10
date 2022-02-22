import React from 'react';
import styled from 'styled-components';
import BackImg from '../asset/main_bg.png';

export default function Main() {
  const MainPage = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 390px;
    height: 844px;
    padding: 30px 0;
    background: url(${BackImg}) center/cover no-repeat;

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

        > ul {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          padding-left: 0;
          border-radius: 15px;
          background: transparent;
          box-shadow: 2px 2px 6px 0px gray;
          list-style: none;

          li {
            width: 100%;
            padding: 10px 0;
            border-radius: 15px;
            text-align: center;
          }

          li:hover {
            background-color: #000000;
            opacity: 10%;
          }
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
      justify-content: center;
      flex: 1;

      p {
        color: #ffffff;
        font-size: 22px;
        font-weight: 600;
      }

      button {
        width: 52px;
        height: 52px;
        line-height: 52px;
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

  return (
    <MainPage>
      <div className="main_filter">
        <div className="filter">
          <span>이름</span>
          <span>&#60;</span>
          <ul className="filter_list">
            <li>이름</li>
            <li>메모</li>
          </ul>
        </div>
        <input type="text" placeholder="검색어를 입력해주세요" />
      </div>
      <div className="main_list">
        <p>저장된 목록이 없습니다</p>
        <ul></ul>
        <div>
          <button>&#43;</button>
        </div>
      </div>
    </MainPage>
  );
}
