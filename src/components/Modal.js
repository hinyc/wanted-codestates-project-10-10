import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CompleteModifiedMsg, MemoExistMsg, MemoRequestMsg } from './Feedback';

const Modal = ({ data, setModalOpen, setMyForestPlaces, setShowSaveMsg, setShowRemoveMsg, setShowCompleteModifiedMsg }) => {
  const isMain = window.location.pathname === '/';
  const [showExistMsg, setShowExistMsg] = useState(false);
  const [showMemoRequestMsg, setShowMemoRequestMsg] = useState(false);
  const { fcNm, fcAddr, ref1, memo } = data;
  const [inputValue, setInputValue] = useState(memo);
  const [myForestList, setMyForestList] = useState([]);

  const inputValueRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const test = JSON.parse(window.localStorage.getItem('myForest'));
    if (test !== null) {
      setMyForestList(test);
    }
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  const saveMyForest = () => {
    if (inputValue) {
      if (!myForestList.some((v) => v.fcNm === fcNm)) {
        const myForestArry = [
          ...myForestList,
          {
            fcNm,
            fcAddr,
            ref1,
            memo: inputValue,
          },
        ];
        window.localStorage.setItem('myForest', JSON.stringify(myForestArry));
        setModalOpen(false);
        navigate('/');
        setShowSaveMsg(true);
      } else {
        setShowExistMsg(true);
      }
    } else {
      setShowMemoRequestMsg(true);
    }
  };

  const deleteMemo = () => {
    const places = JSON.parse(localStorage.getItem('myForest'));
    const filtered = places.filter((v) => v.fcNm !== fcNm);
    localStorage.setItem('myForest', JSON.stringify(filtered));
    setShowRemoveMsg(true);
    setMyForestPlaces(filtered);
    setModalOpen(false);
  };

  const updateMemo = () => {
    if (inputValue.length > 0) {
      const places = JSON.parse(localStorage.getItem('myForest'));
      const updated = places.map((place) => {
        if (place.fcNm === fcNm) {
          place.memo = inputValue;
        }
        return place;
      });
      localStorage.setItem('myForest', JSON.stringify(updated));
      setMyForestPlaces(updated);
      setModalOpen(false);
      setShowCompleteModifiedMsg(true);
    } else {
      setShowMemoRequestMsg(true);
    }
  };

  return (
    <>
      <ModalBox>
        <>
          <ModalContents>
            <Box>
              <p className="BoxText">이름</p>
              <p className="BoxData">{fcNm}</p>
            </Box>
            <Box>
              <p className="BoxText">주소</p>
              <p className="BoxData">{fcAddr}</p>
            </Box>
            <Box>
              <p className="BoxText">연락처</p>
              <p className="BoxData">{ref1}</p>
            </Box>
            <BoxTwo>
              <p className="BoxText">메모</p>
              <MemoInput ref={inputValueRef} value={inputValue || ''} onChange={(event) => setInputValue(event.target.value)} />
              {isMain && (
                <>
                  <DeleteButton onClick={deleteMemo}>삭제</DeleteButton>
                  <UpdateButton onClick={updateMemo}>수정</UpdateButton>
                </>
              )}
              {!isMain && <SaveButton onClick={saveMyForest}>저장</SaveButton>}
            </BoxTwo>
          </ModalContents>
          <ModalBackground onClick={closeModal} />
        </>
      </ModalBox>
      {showExistMsg && <MemoExistMsg setShowExistMsg={setShowExistMsg} />}
      {showMemoRequestMsg && <MemoRequestMsg setShowMemoRequestMsg={setShowMemoRequestMsg} />}
    </>
  );
};

const ModalBox = styled.div`
  width: auto;
  height: auto;
`;

const ModalContents = styled.div`
  width: 75%;
  height: auto;
  padding: 10% 8%;
  overflow: hidden;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: fadeInModal 0.35s;
  z-index: 9;

  @keyframes fadeInModal {
    from {
      opacity: 0;
      margin-top: -150px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;

const Box = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 30px;

  .BoxText {
    color: #ccc;
    font-size: 1rem;
    font-weight: bold;
  }
  .BoxData {
    font-size: 1rem;
    font-weight: bold;
    margin-top: 15px;
  }
`;

const BoxTwo = styled(Box)`
  margin-top: 30px;
`;

const MemoInput = styled.input`
  width: 100%;
  height: 45px;
  margin-top: 15px;
  padding: 0 10px;
  border: 1px solid #efefef;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;

const SaveButton = styled.button`
  width: 100%;
  height: 45px;
  color: #fff;
  margin-top: 20px;
  padding: 0 10px;
  background-color: #85f9cf;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  font-weight: bold;
  font-size: 16px;
`;

const DeleteButton = styled.span`
  width: 48%;
  height: 45px;
  box-sizing: border-box;
  display: inline-block;
  color: #fff;
  margin-top: 20px;
  padding: 0 10px;
  background-color: red;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  font-weight: bold;
  font-size: 16px;
  line-height: 45px;
  text-align: center;
`;

const UpdateButton = styled.span`
  width: 48%;
  height: 45px;
  box-sizing: border-box;
  display: inline-block;
  color: #fff;
  margin-top: 20px;
  margin-left: 4%;
  padding: 0 10px;
  background-color: #85f9cf;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  font-weight: bold;
  font-size: 16px;
  line-height: 45px;
  text-align: center;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;

  animation: fadeInBackground 0.35s;

  @keyframes fadeInBackground {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default Modal;
