import * as React from 'react';
import { Interval } from '../../models/interval';
import './Interval.css';

export interface IntervalOptions {
    interval: Interval;
}

export function Interval({ interval }: IntervalOptions) {
    return (
        <div className="Interval">
            {
                interval.from === interval.to
                    ? (
                        <span className="Interval-value">{interval.from}</span>
                    )
                    : (
                        <span>
                            <span className="Interval-value">{interval.from}</span>
                            {' '} &ndash; {' '}
                            <span className="Interval-value">{interval.to}</span>
                        </span>
                    )
            }
        </div>
    );
}