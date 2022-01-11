import { User } from 'github';
import React, { ReactElement } from 'react';

export type FollowListProps = {
    items: User[];
    onClick?: (url: string) => void;
};

export function UserFollowList(props: FollowListProps): ReactElement {
    const { items, onClick } = props;

    return (
        <ul className="bg-white rounded-lg text-gray-900">
            {items.map((item) => (
                <li
                    key={item.id}
                    className="flex items-center gap-4 px-6 py-2 border-b border-gray-200 w-full cursor-pointer hover:bg-gray-200"
                    onClick={() => onClick && onClick(item.html_url)}
                >
                    <img className="w-8 rounded-lg" src={item.avatar_url} />
                    <div>{item.login}</div>
                </li>
            ))}
        </ul>
    );
}
