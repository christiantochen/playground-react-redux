import React, { ReactElement, ReactNode } from 'react';

export type TabPaneProps = {
    id: string;
    children: ReactNode;
    labelledby: string;
    selected?: boolean;
};

export function TabPane(props: TabPaneProps): ReactElement {
    const { id, children, labelledby, selected } = props;
    return (
        <div
            id={id}
            className={`tab-pane fade ${selected ? 'show active' : ''}`}
            role="tabpanel"
            aria-labelledby={labelledby}
        >
            {children}
        </div>
    );
}
