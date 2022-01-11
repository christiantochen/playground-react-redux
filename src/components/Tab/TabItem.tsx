import React, { ReactElement, ReactNode } from 'react';

export type TabItemProps = {
    id: string;
    children: ReactNode;
    controls: string;
    selected?: boolean;
};

export function TabItem(props: TabItemProps): ReactElement {
    const { id, children, controls, selected } = props;

    return (
        <li id={id} className="nav-item" role="presentation">
            <a
                href={`#${controls}`}
                className={`    nav-link
                                block
                                text-sm
                                leading-tight
                                uppercase
                                border-x-0 border-t-0 border-b-2 border-transparent
                                px-6
                                py-3
                                my-2
                                hover:border-transparent hover:bg-gray-100
                                focus:border-transparent
                                ${selected ? 'active' : ''}
                            `}
                data-bs-toggle="pill"
                data-bs-target={`#${controls}`}
                role="tab"
                aria-controls={controls}
                aria-selected={selected}
            >
                {children}
            </a>
        </li>
    );
}
