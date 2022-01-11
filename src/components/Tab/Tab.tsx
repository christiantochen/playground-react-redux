import React, { ReactElement, ReactNode } from 'react';

export type TabProps = {
    children: ReactNode;
};

export function Tab(props: TabProps): ReactElement {
    const { children } = props;
    return (
        <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 mb-4">
            {children}
        </ul>
    );
}
