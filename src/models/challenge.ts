import { interval } from './interval';

export const DAYS = 4;

export const shards = {
    tier1: interval(1, 4),
    tier2: interval(2, 6),
    tier3: interval(4, 8),
};

export const energy = {
    tier1: 6,
    tier2: 9,
    tier3: 12,
};

const refreshCost = [0, 50, 100, 200];

export function gemsCost(times: number) {
    times = Math.ceil(times / 2);
    const refreshes = refreshCost.slice(0, times);
    return refreshes.reduce((sum, val) => sum + val, 0);
}