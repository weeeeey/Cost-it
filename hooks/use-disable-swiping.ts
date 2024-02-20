import { useEffect } from 'react';

export const useDisableSwiping = () => {
    useEffect(() => {
        const preventTouchPadSwipe = (e: WheelEvent) => {
            // 터치패드에서의 스와이프 동작을 막음
            if (e.deltaX < 0) {
                e.preventDefault();
            }
        };
        // 터치패드 스와이프 이벤트 핸들러 등록
        document.addEventListener('wheel', preventTouchPadSwipe, {
            passive: false,
        });

        // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
        return () => {
            document.removeEventListener('wheel', preventTouchPadSwipe);
        };
    }, []);
};
