export type Session =
  | {
      id: string;
      cert: string;
      isAuthenticated: true;
    }
  | {
      isAuthenticated: false;
    };

export const Session = {
  guard: (v: any): v is Session => {
    return (
      v instanceof Object &&
      'id' in v &&
      'cert' in v &&
      'isAuthenticated' in v &&
      typeof v.id === 'string' &&
      typeof v.cert === 'string' &&
      typeof v.isAuthenticated === 'boolean'
    );
  }
};
