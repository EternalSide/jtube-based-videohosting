import {ChildrenProps} from "@/constants/types/index.shared";

const AuthLayout = ({children}: ChildrenProps) => {
	return <div className='flex min-h-screen justify-center items-center'>{children}</div>;
};
export default AuthLayout;
