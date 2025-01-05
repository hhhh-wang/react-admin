import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import dayjs from 'dayjs';

const HomeTimeDisplay: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(dayjs());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Card className="h-[100%]">
            <div className="flex h-[100%] flex-col items-center justify-start space-y-8 pt-6">
                <div className="text-xl font-medium text-gray-600">{currentTime.format('YYYY年MM月DD日 (dddd) (GMT+8)')}</div>

                <div className="flex items-center justify-center">
                    <div
                        className="flex items-center text-7xl font-normal text-[#1890ff]"
                        style={{
                            fontFamily: 'Segment7, monospace',
                            letterSpacing: '2px',
                        }}
                    >
                        <span className="inline-block min-w-[2.1ch] text-center">{currentTime.format('HH')}</span>
                        <span className="mx-2 mb-5 opacity-80">:</span>
                        <span className="inline-block min-w-[2.1ch] text-center">{currentTime.format('mm')}</span>
                        <span className="mx-2 mb-5 opacity-80">:</span>
                        <span className="inline-block min-w-[2.1ch] text-center">{currentTime.format('ss')}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default HomeTimeDisplay;
