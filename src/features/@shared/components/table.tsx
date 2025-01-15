import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowData,
  type Row,
} from '@tanstack/react-table';
import { cn } from '../utils/cn';
import { Skeleton } from './skeleton';
import { type Virtualizer } from '@tanstack/react-virtual';
import { BaseResponse } from '../utils/query-helper';
import { Table } from 'flowbite-react';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    headerClassName?: string;
    size?: number;
  }
}

type ControlledTableProps<T> = {
  data: Array<T>;
  columns: Array<ColumnDef<T>>;
  isLoading?: boolean;
  emptyLayout?: React.ReactNode;
  virtualizer?: Virtualizer<HTMLDivElement, Element>;
  slot?: React.ReactNode;
};

function useTablePagination(
  page: number,
  metadata?: BaseResponse<unknown>['metadata'],
  limit?: number,
) {
  const count = metadata?.count ?? 0;
  const offset = metadata?.offset ?? 0;
  return {
    page,
    totalPage: Math.ceil(count / (limit ?? 10) || 0),
    start: offset + 1,
    end: Math.min((limit ?? 10) + offset, count),
    count: count,
  };
}

function ControlledTable<T>({
  isLoading,
  virtualizer,
  columns,
  emptyLayout,
  data,
  slot,
}: ControlledTableProps<T>) {
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const head = (
    <Table.Head>
      {table.getFlatHeaders().map((header) => (
        <Table.HeadCell
          key={header.id}
          className={header.column.columnDef.meta?.headerClassName}
          style={{ width: header.column.columnDef.meta?.size ?? 'auto' }}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </Table.HeadCell>
      ))}
    </Table.Head>
  );

  if (isLoading) {
    return (
      <Table>
        {head}
        <Table.Body>
          <Table.Row>
            {Array(columns.length)
              .fill('')
              .map((_, index) => index + 1)
              .map((item) => (
                <Table.Cell key={`shimmer-cell-${item}`}>
                  <Skeleton />
                </Table.Cell>
              ))}
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  if (data.length === 0 && !!emptyLayout) {
    return (
      <Table>
        {head}
        <Table.Body>
          {slot ? (
            <Table.Row>
              <Table.Cell colSpan={columns.length}>{slot}</Table.Cell>
            </Table.Row>
          ) : null}
          <Table.Row>
            <Table.Cell colSpan={columns.length}>{emptyLayout}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  if (virtualizer) {
    return (
      <Table>
        <thead
          className="group/head grid text-xs uppercase text-gray-500"
          style={{ zIndex: 1 }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="flex bg-gray-50 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={cn(
                      'flex shrink-0 items-center py-4 pl-4 last:pr-4',
                      header.column.columnDef.meta?.headerClassName,
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <Table.Body
          className="relative grid"
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {/* TODO: add slot */}
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<T>;
            return (
              <tr
                className="group/row absolute flex w-full border-t"
                data-index={virtualRow.index}
                ref={(node) => virtualizer.measureElement(node)}
                key={row.id}
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Table.Cell
                      key={cell.id}
                      className={cn(
                        'flex w-full shrink-0 items-center',
                        cell.column.columnDef.meta?.className,
                      )}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Table.Cell>
                  );
                })}
              </tr>
            );
          })}
        </Table.Body>
      </Table>
    );
  }

  return (
    <Table>
      {head}
      <Table.Body>
        {slot ? (
          <Table.Row>
            <Table.Cell colSpan={columns.length}>{slot}</Table.Cell>
          </Table.Row>
        ) : null}
        {rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell
                key={cell.id}
                className={cell.column.columnDef.meta?.className}
                style={{ width: cell.column.columnDef.meta?.size ?? 'auto' }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export { ControlledTable };
