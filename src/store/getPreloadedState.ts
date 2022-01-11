import { PartialRootState } from './configureStore';

import { initialUserListState, UserListState } from '../store/reducers/users';

const getPreloadedUserListState = (): UserListState => {
    return {
        ...initialUserListState,
    };
};

const getPreloadedState = (): PartialRootState => {
    return {
        users: getPreloadedUserListState(),
    };
};

export default getPreloadedState;
