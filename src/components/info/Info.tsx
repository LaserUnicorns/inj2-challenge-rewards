import * as React from 'react';
import './Info.css';

export interface InfoOptions {
    label: string;
}

export function Info({ label, children }: InfoOptions & React.Props<void>) {
    return (
        <div className="Info">
            <div className="Info-label">{label}</div>
            <div className="Info-value">{children}</div>
        </div>
    );
}