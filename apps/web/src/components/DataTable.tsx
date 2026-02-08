import { Table, TableProps } from "antd";

export const DataTable = <T extends object>(props: TableProps<T>) => {
  return <Table {...props} pagination={false} />;
};
