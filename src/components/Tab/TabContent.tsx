import React, { ReactElement, ReactNode } from 'react';

export type TabContentProps = {
    children: ReactNode;
};

export function TabContent(props: TabContentProps): ReactElement {
    const { children } = props;
    return <div className="tab-content">{children}</div>;
}
