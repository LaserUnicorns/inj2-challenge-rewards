export interface Interval {
    from: number;
    to: number;
    bind(fn: (value: number) => number | Interval): Interval;
}

export function interval(from: number, to: number): Interval {
    return {
        from,
        to,
        bind(fn: (value: number) => number | Interval) { 
            return bind(this, fn);
        },
    };
}

function isInterval(value: number | Interval): value is Interval {
    return typeof value !== 'number';
}

export function unit(value: number): Interval {
    return interval(value, value);
}

export function bind({ from, to }: Interval, fn: (value: number) => number | Interval) {
    const values = [fn(from), fn(to)]
        .map(x => isInterval(x) ? x : unit(x))
        .map(x => [x.from, x.to])
        .reduce((acc, val) => acc.concat(val));

    return interval(
        Math.min(...values),
        Math.max(...values),
    );
}

export function lift1(fn: (value: number) => number) {
    return function lifted1(value: Interval) {
        return bind(value, fn);
    };
}

export function lift2(fn: (a: number, b: number) => number) {
    return function lifted2(arg1: Interval, arg2: Interval) {
        return bind(arg1, a1 => bind(arg2, a2 => fn(a1, a2)));
    };
}

// export function applyOpFactory(fn: (a: number, b: number) => number) {
//     function applyOp(i1: Interval, i2: Interval): Interval {

//         const values = [
//             fn(i1.from, i2.from),
//             fn(i1.from, i2.to),
//             fn(i1.to, i2.from),
//             fn(i1.to, i2.to),
//         ];

//         return interval(
//             Math.min(...values),
//             Math.max(...values),
//         );
//     }

//     function applyOpToMany(...intervals: (number | Interval)[]): Interval {
//         return intervals.map(x => isInterval(x) ? x : unit(x)).reduce((result, value) => applyOp(result, value));
//     }

//     return applyOpToMany;
// }

// export function fmap(fn: (value: number) => number) {
//     return function applyFn({ from, to }: Interval): Interval {
//         const values = [
//             fn(from),
//             fn(to),
//         ];

//         return interval(
//             Math.min(...values),
//             Math.max(...values)
//         );
//     };
// }

// export const add = applyOpFactory((a, b) => a + b);
// export const mul = applyOpFactory((a, b) => a * b);
// export const div = applyOpFactory((a, b) => a / b);