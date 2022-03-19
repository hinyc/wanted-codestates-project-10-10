import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

export function MemoRequestMsg({ setShowMemoRequestMsg }) {
  useEffect(() => {
    const setTimeoutID = setTimeout(() => setShowMemoRequestMsg(false), 900);
    return () => clearTimeout(setTimeoutID);
  }, [setShowMemoRequestMsg]);
  return (
    <FeedbackContainerStyle //
      height={'60px'}
      width={'210px'}
      top={'10%'}
      left={'70%'}
    >
      메모를 입력해주세요.
    </FeedbackContainerStyle>
  );
}

export function MemoExistMsg({ setShowExistMsg }) {
  useEffect(() => {
    const setTimeoutID = setTimeout(() => setShowExistMsg(false), 900);
    return () => clearTimeout(setTimeoutID);
  }, [setShowExistMsg]);
  return (
    <FeedbackContainerStyle //
      height={'60px'}
      width={'210px'}
      top={'10%'}
      left={'70%'}
    >
      이미 등록되었습니다.
    </FeedbackContainerStyle>
  );
}

export function CompleteSavedMsg({ setShowSaveMsg }) {
  useEffect(() => {
    const setTimeoutID = setTimeout(() => setShowSaveMsg(false), 900);
    return () => clearTimeout(setTimeoutID);
  }, [setShowSaveMsg]);
  return (
    <FeedbackContainerStyle //
      height={'60px'}
      width={'275px'}
      backgroundColor={'#85F9CF '}
      top={'13%'}
    >
      저장이 완료되었습니다.
    </FeedbackContainerStyle>
  );
}
export function CompleteModifiedMsg({ setShowCompleteModifiedMsg }) {
  useEffect(() => {
    const setTimeoutID = setTimeout(
      () => setShowCompleteModifiedMsg(false),
      900,
    );
    return () => clearTimeout(setTimeoutID);
  }, [setShowCompleteModifiedMsg]);
  return (
    <FeedbackContainerStyle //
      height={'60px'}
      width={'275px'}
      backgroundColor={'#85F9CF '}
      top={'13%'}
    >
      수정이 완료되었습니다.
    </FeedbackContainerStyle>
  );
}

export function CompleteRemovedMsg({ setShowRemoveMsg }) {
  useEffect(() => {
    const setTimeoutID = setTimeout(() => setShowRemoveMsg(false), 900);
    return () => clearTimeout(setTimeoutID);
  }, [setShowRemoveMsg]);
  return (
    <FeedbackContainerStyle //
      height={'60px'}
      width={'275px'}
      top={'55%'}
    >
      삭제가 완료되었습니다.
    </FeedbackContainerStyle>
  );
}

export const FeedbackContainerStyle = styled.div`
  background-color: ${(props) => props.backgroundColor || '#FF6B6B'};
  width: ${(props) => props.width || '200px'};
  height: ${(props) => props.height || '62px'};
  line-height: ${(props) => props.height || '62px'};
  color: ${(props) => props.color || '#ffffff'};
  font-size: ${(props) => props.fontSize || '18px'};
  top: ${(props) => props.top || '50%'};
  left: ${(props) => props.left || '50%'};
  opacity: ${(props) => props.opacity || '100%'};
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  font-weight: 700;
  border-radius: 15px;
  text-align: center;
  position: fixed;
  z-index: 9;
  animation: softRemover 1s;
  @keyframes softRemover {
    0% {
      opacity: 1;
    }
    40% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
