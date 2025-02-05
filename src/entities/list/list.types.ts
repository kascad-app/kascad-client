export type Column<T> = {
  title: string;
  key: keyof T;
};

export type ListProps<T> = {
  title: string;
  items: T[];
  columns: Column<T>[];
  growing?: boolean;
  threshold?: number;
};
