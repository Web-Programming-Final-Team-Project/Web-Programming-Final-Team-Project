import React, { useState, useEffect } from 'react';

const StaffCallButton = () => {
    const [isCalling, setIsCalling] = useState(false);
    const [timer, setTimer] = useState(0);

    const handleCallClick = () => {
        setIsCalling(true);
        setTimer(30);
        playVoiceNotification();
    };

    const handleCancelClick = () => {
        setIsCalling(false);
        setTimer(0);
    };

    useEffect(() => {
        let countdown;
        if (isCalling && timer > 0) {
            countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(countdown);
        }
        return () => clearInterval(countdown);
    }, [isCalling, timer]);

    const playVoiceNotification = () => {
        const msg = new SpeechSynthesisUtterance(
            '직원을 호출했습니다. 잠시만 기다려주세요.'
        );
        msg.lang = 'ko-KR';
        window.speechSynthesis.speak(msg);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {!isCalling ? (
                <button
                    onClick={handleCallClick}
                    style={{
                        padding: '20px 40px',
                        fontSize: '18px',
                        backgroundColor: '#406ac1',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                    }}
                >
                    직원 호출
                </button>
            ) : (
                <div>
                    <p style={{ fontSize: '18px', color: '#406ac1' }}>
                        직원이 호출되었습니다. <br />
                        예상 대기 시간: {timer}초
                    </p>
                    <button
                        onClick={handleCancelClick}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#ff6b6b',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '10px',
                        }}
                    >
                        호출 취소
                    </button>
                </div>
            )}
        </div>
    );
};

export default StaffCallButton;
