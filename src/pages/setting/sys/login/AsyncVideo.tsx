import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';

interface AsyncVideoBackgroundProps {
    src: string;
    style?: React.CSSProperties;
}

const AsyncVideoBackground: React.FC<AsyncVideoBackgroundProps> = ({ src, style }) => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

    useEffect(() => {
        // 创建一个新的 video 元素用于预加载
        const video = document.createElement('video');
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        // 设置加载完成的事件监听
        video.addEventListener('loadeddata', () => {
            setVideoLoaded(true);
        });

        // 开始加载视频
        video.src = src;
        video.load();

        setVideoElement(video);

        // 清理函数
        return () => {
            video.remove();
        };
    }, [src]);

    return (
        <div className="absolute inset-0 z-0" style={style}>
            {!videoLoaded && (
                <div className="flex h-full w-full items-center justify-center">
                    <Spin size="large" />
                </div>
            )}
            {videoElement && (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video
                    ref={(el) => {
                        if (el && !el.src) {
                            el.src = videoElement.src;
                            el.autoplay = true;
                            el.loop = true;
                            el.muted = true;
                            el.playsInline = true;
                        }
                    }}
                    className={`h-full w-full object-cover transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            )}
        </div>
    );
};

export default AsyncVideoBackground;
