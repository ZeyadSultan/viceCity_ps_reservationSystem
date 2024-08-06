export type MainNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

// modify tanstack table table.options.meta type
declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    refetchData: (() => void) | undefined;
  }
}
