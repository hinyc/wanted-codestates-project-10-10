import { useEffect, useState } from 'react';
import styled from 'styled-components';

export function MemoRequestMsg() {
  return (
    <FeedbackContainerStyle //
      height={'60px'}
      width={'210px'}
      fontSize={'18px'}
      top={'10%'}
      left={'70%'}
    >
      메모를 입력해주세요.
    </FeedbackContainerStyle>
  );
}

export function CompleteSavedMsg() {
  const [opacity, setOpacity] = useState(1);
  console.log('시작전');

  let animation;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function softRemover() {
    setOpacity(opacity - 0.05);
    animation = requestAnimationFrame(softRemover);

    if (opacity < 0.01) {
      cancelAnimationFrame(animation);
    }
  }
  console.log('도/돼나?');

  console.log(opacity);
  useEffect(() => {
    softRemover();
  }, [softRemover]);

  window.addEventListener('click', () => console.log('click'));
  return (
    <FeedbackContainerStyle //
      height={'60px'}
      width={'275px'}
      fontSize={'18px'}
      backgroundColor={'#85F9CF '}
      top={'13%'}
      opacity={opacity}
    >
      저장이 완료되었습니다.
    </FeedbackContainerStyle>
  );
}

export function CompleteRemovedMsg() {
  return (
    <FeedbackContainerStyle //
      height={'60px'}
      width={'275px'}
      fontSize={'18px'}
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
  font-size: ${(props) => props.fontSize || '16px'};
  top: ${(props) => props.top || '50%'};
  left: ${(props) => props.left || '50%'};
  opacity: ${(props) => props.opacity || 0.5};
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  font-weight: 700;
  border-radius: 15px;
  text-align: center;
  position: absolute;
`;
