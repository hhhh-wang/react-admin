import React from 'react';
import { Card } from 'antd';
import dayjs from 'dayjs';
import './home-time-display.less';

const HomeTimeDisplay: React.FC = React.memo(() => {
    const [currentTime, setCurrentTime] = React.useState(dayjs());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Card className="home-time-card">
            {/* 日期 */}
            <div className="home-time-date">{currentTime.format('YYYY年MM月DD日 (dddd) (GMT+8)')}</div>

            {/* 时间 */}
            <div className="home-time-clock">
                <span>{currentTime.format('HH')}</span>
                <span className="colon">:</span>
                <span>{currentTime.format('mm')}</span>
                <span className="colon">:</span>
                <span>{currentTime.format('ss')}</span>
            </div>
        </Card>
    );
});

export default HomeTimeDisplay;
