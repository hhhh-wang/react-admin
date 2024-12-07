import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import userService, { SignInReq } from '@/api/services/userService';
import { getItem, removeItem, setItem } from '@/utils/storage';

import { UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
    userInfo: Partial<UserInfo>;
    userToken: UserToken;
    // 使用 actions 命名空间来存放所有的 action
    actions: {
        setUserInfo: (userInfo: UserInfo) => void;
        setUserToken: (token: UserToken) => void;
        clearUserInfoAndToken: () => void;
    };
};

export const useUserStore = create<UserStore>((set) => ({
    userInfo: getItem<UserInfo>(StorageEnum.User) || {},
    userToken: getItem<UserToken>(StorageEnum.Token) || {},
    actions: {
        setUserInfo: (userInfo) => {
            set({ userInfo });
            setItem(StorageEnum.User, userInfo);
        },
        setUserToken: (userToken) => {
            set({ userToken });
            setItem(StorageEnum.Token, userToken);
        },
        clearUserInfoAndToken() {
            set({ userInfo: {}, userToken: {} });
            removeItem(StorageEnum.User);
            removeItem(StorageEnum.Token);
        },
    },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () => useUserStore((state) => state.userInfo.permissions);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
    const { t } = useTranslation(); // 国际化翻译
    const navigatge = useNavigate(); // 路由跳转
    const { notification, message } = App.useApp(); // antd 的全局通知和消息组件
    const { setUserToken, setUserInfo } = useUserActions(); // 从 store 中获取更新用户状态的方法

    // 使用 react-query 管理登录请求的异步操作
    const signInMutation = useMutation(userService.signin);

    const signIn = async (data: SignInReq) => {
      try {
        // 调用 API，进行登录
        const res = await signInMutation.mutateAsync(data);
        const { user, accessToken, refreshToken } = res;

        // 登录成功后，更新用户状态
        setUserToken({ accessToken, refreshToken }); // 存储令牌
        setUserInfo(user); // 存储用户信息

        // 跳转到首页
        navigatge(HOMEPAGE, { replace: true });

        // 显示成功通知
        notification.success({
          message: t('sys.login.loginSuccessTitle'), // 多语言标题
          description: `${t('sys.login.loginSuccessDesc')}: ${data.account}`, // 描述中显示用户名
          duration: 3,
        });
      } catch (err) {
        // 如果登录失败，显示错误消息
        message.warning({
          content: err.message,
          duration: 3,
        });
      }
    };

    // 使用 useCallback 缓存 signIn 方法，避免不必要的重新创建
    return useCallback(signIn, []);
};
