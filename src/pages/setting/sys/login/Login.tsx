import { Layout } from 'antd';
import { Navigate } from 'react-router-dom';
import LocalePicker from '@/components/locale-picker';
import { useUserToken } from '@/store/userStore';
import { useThemeToken } from '@/theme/hooks';
import bgVideo from '@/assets/video/tree-growth-animation.mp4';
import LoginForm from './LoginForm';
import MobileForm from './MobileForm';
import { LoginStateProvider } from './providers/LoginStateProvider';
import QrCodeFrom from './QrCodeForm';
import RegisterForm from './RegisterForm';
import ResetForm from './ResetForm';
import AsyncVideoBackground from '@/pages/setting/sys/login/AsyncVideo';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

function Login() {
    const token = useUserToken();
    const { colorBgElevated } = useThemeToken();

    // 判断用户是否有权限
    if (token.accessToken) {
        // 如果有授权，则跳转到首页
        return <Navigate to={HOMEPAGE} replace />;
    }

    // 背景样式
    const gradientBg = `linear-gradient(${colorBgElevated}, ${colorBgElevated})`;

    return (
        <Layout className="relative flex !min-h-screen !w-full !flex-row">
            {/* 背景视频 */}
            <AsyncVideoBackground src={bgVideo} style={{ background: gradientBg }} />
            {/* 填充物 */}
            <div className="relative z-10 flex grow flex-col items-center justify-center gap-[80px] bg-center bg-no-repeat md:flex" />
            <div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
                <LoginStateProvider>
                    <LoginForm />
                    <MobileForm />
                    <QrCodeFrom />
                    <RegisterForm />
                    <ResetForm />
                </LoginStateProvider>
            </div>

            <div className="absolute right-2 top-0">
                <LocalePicker />
            </div>
        </Layout>
    );
}

export default Login;
