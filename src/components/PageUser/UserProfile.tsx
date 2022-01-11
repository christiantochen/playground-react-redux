import { UserDetail } from 'github';
import React, { ReactElement } from 'react';

export type FollowListProps = {
    user: UserDetail;
};

export function UserProfile(props: FollowListProps): ReactElement {
    const { user } = props;

    return (
        <div className="flex-none w-40 md:w-64 mr-4">
            <img src={user.avatar_url} className="rounded-md w-full mb-4" />
            <div className="text-gray-900 text-xl">{user.name}</div>
            <div className="text-gray-400">{user.login}</div>
        </div>
    );
}
