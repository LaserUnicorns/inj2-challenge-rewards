import * as React from 'react';
import * as cn from 'classnames';
import './Times.css';

export interface TimesOptions {
    value?: number;
    onChange(value: number): void;
}

export function Times({ value = 0, onChange }: TimesOptions) {
    // const changeHandler: React.ChangeEventHandler<HTMLInputElement> = e => onChange(parseInt(e.target.value, 10));

    const values = [0, 2, 4, 6, 8];

    return (
        <div className="Times">
            {
                values.map((val, idx) => (
                    <button
                        className={cn('Times-option', { 'Times-option_active': val === value })}
                        key={idx}
                        onClick={() => onChange(val)}
                    >
                        {val}
                    </button>
                ))
            }
            {/* <label>
                <input type="radio" value={0} checked={value === 0} onChange={changeHandler} />
                0
            </label>
            <label>
                <input type="radio" value={2} checked={value === 2} onChange={changeHandler} />
                2
            </label>
            <label>
                <input type="radio" value={4} checked={value === 4} onChange={changeHandler} />
                4
            </label>
            <label>
                <input type="radio" value={6} checked={value === 6} onChange={changeHandler} />
                6
            </label>
            <label>
                <input type="radio" value={8} checked={value === 8} onChange={changeHandler} />
                8
            </label> */}
        </div>
    );
}