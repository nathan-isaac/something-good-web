
export class LocalStorageSpy implements Storage {

  protected items:any = {};

  [name: string]: any;
  length: number = 0;

  clear(): void {
    this.items = {};
  }

  getItem(key: string): string | null {
    if (!this.items[key]) {
      return null;
    }

    return this.items[key];
  }

  key(index: number): string | null {
    throw new Error("Method not implemented.");
  }
  removeItem(key: string): void {
    throw new Error("Method not implemented.");
  }
  setItem(key: string, value: string): void {
    this.items[key] = value;
  }
}
