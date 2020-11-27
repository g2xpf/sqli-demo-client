export function unimplemented(): never {
  throw new Error('unimplemented');
}

export function unreachable(): never {
  throw new Error('unreachable');
}

export class Initialization {
  private initializer: ((value?: unknown) => void) | null = null;
  private initialized: Promise<unknown>;

  constructor() {
    this.initialized = new Promise(resolve => {
      this.initializer = resolve;
    });
  }

  async wait() {
    await this.initialized;
  }

  async ready() {
    if (this.initializer) {
      this.initializer();
      this.initializer = null;
    } else {
      throw new Error('multiple initializations detected');
    }
  }
}
