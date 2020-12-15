import { inspect } from "util";

type Angles = 90 | 180 | 270;

class Waypoint {
  public N = 1;
  public E = 10;

  private _180 = () => {
    this.E = -this.E;
    this.N = -this.N;
  };

  private _right: Record<Angles, () => void> = {
    90: () => {
      Object.assign(this, {
        N: -this.E,
        E: this.N,
      });
    },
    270: () => {
      Object.assign(this, {
        N: this.E,
        E: -this.N,
      });
    },
    180: this._180,
  };

  private _left: Record<Angles, () => void> = {
    90: this._right[270],
    270: this._right[90],
    180: this._180,
  };

  public rotate = {
    R: this._right,
    L: this._left,
  };

  public valueOf() {
    return {
      E: this.E,
      N: this.N,
    };
  }

  public [inspect.custom]() {
    return this.valueOf();
  }
}

export const waypoint = new Waypoint();
