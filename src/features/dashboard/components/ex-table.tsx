'use client';
import { ControlledTable } from '@/features/@shared/components/table';
import {
  LabelItemsResponse,
  useFetchLabelItems,
} from '@/features/dashboard/utils/queries';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Suspense } from 'react';

type LabelBook = LabelItemsResponse[number];

const HomePage = () => {
  const { data, isLoading } = useFetchLabelItems();
  const items = data?.data ?? [];

  /* handle table data */
  const tableData = React.useMemo(() => items, [items]);
  const tableColumns = React.useMemo<Array<ColumnDef<LabelBook>>>(
    () => [
      {
        accessorKey: 'id',
        header: 'no',
        meta: { size: 57, className: 'text-xs' },
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: 'image',
        header: 'gambar',
        meta: { size: 100, className: 'text-xs' },
        cell: (props) => {
          const { item_thumb_highres, name } = props.row.original;
          return (
            <Image src={item_thumb_highres} width={40} height={40} alt={name} />
          );
        },
      },
      {
        accessorKey: 'name',
        header: 'nama buku',
        meta: { className: 'text-xs' },
        cell: (props) => {
          const { name, id } = props.row.original;
          return (
            <Link
              href={`/library/contents/${id}`}
              className="text-blue-500 underline"
            >
              {name}
            </Link>
          );
        },
      },
      {
        accessorKey: 'item_type',
        header: 'kategori',
        meta: { size: 200 },
        cell: (props) => props.renderValue(),
      },
      {
        accessorKey: 'status',
        header: 'status',
        meta: { size: 140 },
        cell: (props) => {
          const { status } = props.row.original;
          if (!status) return null;
          return status.toLowerCase() === 'aktif' ? (
            <div className="flex w-full items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Aktif</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-red-600" />
              <span>Arsip</span>
            </div>
          );
        },
      },
    ],
    [],
  );
  return (
    <Suspense>
      <ControlledTable
        data={tableData}
        columns={tableColumns}
        isLoading={isLoading}
      />
      {/* <DashboardView /> */}
    </Suspense>
  );
};

export default HomePage;
