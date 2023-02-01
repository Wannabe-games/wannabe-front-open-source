import { useTypedDispatch } from '@/store';
import { logout } from '@/store/slices/auth.slice';
import { useAuth } from '@micro-stacks/react';

interface IOptions {
    keepToasts: boolean;
}

export const useLogout = () => {
    const dispatch = useTypedDispatch();
    const { signOut } = useAuth();

    return {
        logout: (options?: IOptions) => {
            dispatch(logout(options));
            signOut();
        },
    };
};
