import * as React from 'react';
import { Header } from './components/header/Header';
import './App.css';
import { Times } from './components/times/Times';
import { lift2, unit, Interval as IInterval } from './models/interval';
import { shards, DAYS, gemsCost, energy } from './models/challenge';
import { Interval } from './components/interval/Interval';
import { Info } from './components/info/Info';

// const logo = require('./logo.svg');

const intDiv = (a: number) => (b: number): number => {
  if (a === 0 || b === 0) {
    return 0;
  }

  return Math.ceil(a / b);
};

const mul = (a: number) => (b: number): number => {
  return a * b;
};

function add(a: number, b: number): number {
  return a + b;
}

function sum(...array: number[]): number {
  return array.reduce(add, 0);
}

const madd = lift2(add);

function msum(...array: IInterval[]): IInterval {
  return array.reduce(madd, unit(0));
}

interface AppState {
  times: {
    tier1: number;
    tier2: number;
    tier3: number;
  };
  totalShardsNeeded: number;
  shardsReceived: number;
}

class App extends React.Component<{}, AppState> {
  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h1 className="App-title">Welcome to React</h1>
  //       </header>
  //       <p className="App-intro">
  //         To get started, edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //     </div>
  //   );
  // }

  constructor(props: {}) {
    super(props);

    this.state = {
      times: {
        tier1: 2,
        tier2: 4,
        tier3: 6,
      },
      totalShardsNeeded: 440,
      shardsReceived: 0,
    };
  }

  handleTierTimesChange = (tier: number) => (value: number) => {
    this.setState({
      times: {
        ...this.state.times,
        ...{ ['tier' + tier]: value }
      }
    });
  }

  handleShardsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value: number | string = e.target.value;
    if (e.target.type === 'number') {
      if (e.target.value === '') {
        value = '';
      } else {
        value = parseInt(e.target.value, 10);
      }
    }

    this.setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  render() {

    const { times, shardsReceived, totalShardsNeeded } = this.state;
    const shardsNeeded = totalShardsNeeded - shardsReceived;

    // const dayShards = msum(
    //   bind(shards.tier1, mul(times.tier1)),
    //   bind(shards.tier2, mul(times.tier2)),
    //   bind(shards.tier3, mul(times.tier3)),
    // );
    const dayShards = msum(
      shards.tier1.bind(mul(times.tier1)),
      shards.tier2.bind(mul(times.tier2)),
      shards.tier3.bind(mul(times.tier3)),
    );

    const dayGems = sum(
      gemsCost(times.tier1),
      gemsCost(times.tier2),
      gemsCost(times.tier3),
    );

    const dayEnergy = sum(
      times.tier1 * energy.tier1,
      times.tier2 * energy.tier2,
      times.tier3 * energy.tier3,
    );

    // const gemsPerShard = bind(dayShards, intDiv(dayGems));
    const gemsPerShard = dayShards.bind(intDiv(dayGems));

    // const challengeShards = bind(dayShards, mul(DAYS));
    const challengeShards = dayShards.bind(mul(DAYS));
    const challengeGems = dayGems * DAYS;

    // const daysNeeded = bind(dayShards, intDiv(shardsNeeded));
    // const gemsNeeded = bind(daysNeeded, mul(dayGems));
    const daysNeeded = dayShards.bind(intDiv(shardsNeeded));
    const gemsNeeded = daysNeeded.bind(mul(dayGems));

    return (
      <div className="App">
        <Header />

        <div className="App-content">

          <div className="App-times">
            <Info label="Tier 1">
              <Times value={times.tier1} onChange={this.handleTierTimesChange(1)} />
            </Info>

            <Info label="Tier 2">
              <Times value={times.tier2} onChange={this.handleTierTimesChange(2)} />
            </Info>

            <Info label="Tier 3">
              <Times value={times.tier3} onChange={this.handleTierTimesChange(3)} />
            </Info>

          </div>

          <hr className="App-separator" />

          <div className="App-info">
            <Info label="Shards">
              <Interval interval={dayShards} />
            </Info>

            <Info label="Energy">
              {dayEnergy}
            </Info>

            <Info label="Gems">
              {dayGems}
            </Info>

            <Info label="Gems per shard">
              <Interval interval={gemsPerShard} />
            </Info>

          </div>

          <hr className="App-separator" />

          <div className="App-info">

            <Info label="Shards">
              <Interval interval={challengeShards} />
            </Info>

            <Info label="Gems">
              {challengeGems}
            </Info>

          </div>

          <hr className="App-separator" />

          <div className="App-info">
            <Info label="Shards">
              <input
                type="number"
                value={this.state.shardsReceived}
                onChange={this.handleShardsChange}
                className="input"
                name="shardsReceived"
              />
              {' / '}
              <input
                type="number"
                value={this.state.totalShardsNeeded}
                onChange={this.handleShardsChange}
                className="input"
                name="totalShardsNeeded"
              />
            </Info>

            <Info label="Days needed">
              <Interval interval={daysNeeded} />
            </Info>

            <Info label="Gems needed">
              <Interval interval={gemsNeeded} />
            </Info>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
