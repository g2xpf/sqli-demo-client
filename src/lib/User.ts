export interface User {
  name: string;
}

export const User = {
  guard: (v: any): v is User => {
    return (
      typeof v === 'object' &&
      v !== null &&
      'name' in v &&
      typeof v.name === 'string'
    );
  }
};
