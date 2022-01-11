import { Repository } from 'github';
import React, { ReactElement } from 'react';

export type RepositoryListProps = {
    items: Repository[];
    onClick?: (url: string) => void;
};

export function UserRepositoryList(props: RepositoryListProps): ReactElement {
    const { items, onClick } = props;

    return (
        <ul className="bg-white rounded-lg text-gray-900">
            {items.map((item) => (
                <li
                    key={item.id}
                    className="px-6 py-2 border-b border-gray-200 w-full cursor-pointer hover:bg-gray-200"
                    onClick={() => onClick && onClick(item.html_url)}
                >
                    {item.name}
                </li>
            ))}
        </ul>
    );
}
