'use client';
import * as React from 'react';
import { Card } from '../../@shared/components/card';
import { ChevronDownIcon } from '../../@shared/components/icon';
import { Quotations } from '../constants/data';
import { format } from 'date-fns';
import { cn } from '@/features/@shared/utils/cn';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/features/@shared/components/headers';
import { Button } from '@/features/@shared/components/button';
import { useFetchSaldo } from '../utils/queries';
import { encrypt, toRupiah } from '@/features/@shared/utils/formatter';
import { deleteCookie, setCookie } from 'cookies-next';
import { useUserId } from '@/features/@shared/utils/use-userid';
import { Skeleton } from '@/features/@shared/components/skeleton';
import { useLogout, useLogoutExternal } from '@/features/login/utils/query';

const DashboardView = () => {
  const params = useSearchParams();
  const [isVerified, setIsVerified] = React.useState<boolean>(
    !(params.get('status') === 'unverified'),
  );
  // if (isVerified) return <DashboardVerifyView />;
  return <DashboardVerifyView />;
};

const DashboardVerifyView = () => {
  const { data } = useFetchSaldo();
  // const { mutateAsync } = useLogout();
  const { mutateAsync } = useLogoutExternal();

  const logout = async () => {
    const userId = await useUserId();
    try {
      await mutateAsync({ email: encrypt(userId) });
      deleteCookie('token');
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    // setCookie(
    //   'token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzcwODQ1MzMsImV4cCI6MTczNzA4ODEzMywidXNlcklkIjoiOWI4ZmE0YmQtNjU3YS00MGU4LTk5NWMtNDljYjM4MGZkNTc2In0.-9-7IwmZ8xGgJCVKezWhCU7ByySxR22c5yiilnnxj4I',
    // );
    logout();
    // deleteCookie('token');
  }, []);

  if (data)
    return (
      <>
        <Header />
        <div
          className="rounded- grid grid-cols-[40%_40%_calc(20%-48px)] gap-6"
          // style={{ overflowY: "scroll" }}
        >
          <Card
            isHomepage
            className="flex flex-col space-y-6 break-words text-base"
          >
            <div className="flex flex-col space-y-2 text-white">
              <p>Limit sisa</p>
              <p className="text-2xl font-bold">
                {toRupiah(+data?.data.remaining_plafon)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2 text-white">
                <p>Limit Terpakai</p>
                <p className="text-xl font-bold">
                  {' '}
                  {toRupiah(+data?.data.used_plafon)}
                </p>
              </div>
              <div className="flex flex-col space-y-2 text-white">
                <p>Limit Awal</p>
                <p className="text-xl font-bold">
                  {toRupiah(+data?.data.limit_plafon)}
                </p>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col space-y-8 break-words text-base">
            <div className="grid grid-cols-2 items-center gap-8">
              <div className="flex flex-col space-y-2">
                <p className="text-[#636466]">Cicilan per bulan</p>
                <p className="text-2xl font-bold">Rp10,000,000</p>
              </div>
              <Button color="primary-orange">Bayar Tagihan</Button>
            </div>
            <div className="grid grid-cols-2 items-center gap-8">
              <div className="flex flex-col space-y-2">
                <p className="text-[#636466]">Bayar sebelum</p>
                <p className="text-2xl font-bold">26 Nov 2022</p>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-2xl font-bold">4/12</p>
                <p className="text-[#636466]">Cicilan sudah terbayar</p>
              </div>
            </div>
          </Card>
          <Card className="space-y-8 break-words p-8">
            <p className="text-xl font-semibold text-[#636466]">
              Cek Order Baru
            </p>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7b392]/25"
            >
              <i className="-rotate-90">
                <ChevronDownIcon color="#f06726" fontSize={24} />
              </i>
            </button>
          </Card>
        </div>

        {/* ----- LAST TRANSACTION ----- */}
        <div className="mt-8 flex flex-col space-y-ml">
          <h2 className="text-2xl font-semibold text-[#333]">
            Transaksi Terakhir
          </h2>
          <div className="grid grid-cols-2 gap-m">
            <QuotationList />
            <ShippedItemList />
          </div>
        </div>
      </>
    );
  return (
    <>
      {/* <p>{userId}</p> */}
      <DashboardSkeleton />
    </>
  );
};

const DashboardUnverifyView = () => (
  <>
    <div className="grid grid-cols-[40%_calc(20%-48px)_40%] gap-6">
      <Card
        isHomepage
        className="flex flex-col space-y-6 break-words text-base"
      >
        <div className="flex flex-col space-y-2 text-white">
          <p>Hai reseller,</p>
          <p className="text-2xl font-bold">Kania Salsabila</p>
        </div>
        <div className="flex flex-col space-y-2 text-white">
          <p>Anda belum memiliki limit kredit</p>
          <p className="text-xl font-bold">Yuk, verifikasi sekarang!</p>
        </div>
      </Card>
      <Card className="space-y-8 break-words p-8">
        <p className="text-xl font-semibold text-[#636466]">Verifikasi akun</p>
        <Link
          href="verify-account"
          className="flex h-12 w-12 items-center justify-center rounded-[32px] bg-[#f7b392]/25"
        >
          <i className="-rotate-90">
            <ChevronDownIcon color="#f06726" fontSize={24} />{' '}
          </i>
        </Link>
      </Card>
      <Card className="flex flex-col space-y-8 break-words text-base">
        <p className="text-[#636466]">Belum ada Tagihan</p>
      </Card>
    </div>

    {/* ----- LAST TRANSACTION ----- */}

    <div className="mt-8 flex w-full flex-col space-y-ml">
      <h2 className="text-2xl font-semibold text-[#333]">Transaksi Terakhir</h2>
      <Card className="flex h-[234px] flex-col items-center justify-center space-y-m">
        <Image
          src="./homepage-forbidden.svg"
          width={140}
          height={140}
          alt="home forbidden access"
        />
        <p className="text-xl font-semibold text-[#636466]">
          Belum Ada Transaksi Terakhir
        </p>
      </Card>
    </div>
  </>
);

const QuotationList = () => {
  return (
    <Card className="flex flex-col break-words px-6 py-8 text-base text-[#636466]">
      <div className="flex flex-col space-y-m">
        <h3 className="text-xl font-semibold">Receive Quotation</h3>
        {/* LIST */}
        <div className="flex flex-col">
          {Quotations.map((quotation, idx) => (
            <div
              className="flex justify-between border-b border-[#d9d9d9] p-m"
              key={`quotation-${idx + 1}`}
            >
              {/* left */}
              <div className="flex items-center space-x-3">
                {/* box */}
                <div className="h-12 w-12 rounded-lg bg-[#d9d9d9]" />
                <div className="space-y-1">
                  <p className="text-xl font-semibold">
                    {quotation.vendor_name}
                  </p>
                  <p className="font-normal">
                    {`${format(
                      quotation.quotation_date,
                      'dd MMM yyyy',
                    )} jam ${format(quotation.quotation_date, 'HH:mm')}`}
                  </p>
                </div>
              </div>

              {/* right */}
              <div className="flex items-center space-x-3">
                {/* box */}
                <div className="space-y-1 text-right">
                  <p className="text-xl font-semibold">
                    {quotation.total_transaction}
                  </p>
                  <p
                    className={cn(
                      'font-normal',
                      quotation.status ? 'text-[#00ba88]' : 'text-[#e25764]',
                    )}
                  >
                    {quotation.status ? 'Confirmed' : 'Not Confirmed'}
                  </p>
                </div>
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-[32px]"
                >
                  <i className="-rotate-90">
                    <ChevronDownIcon color="#f06726" fontSize={24} />{' '}
                  </i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end space-x-3">
          <p className="text-[#f06726]">Tampilkan Lebih Banyak</p>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-[32px] bg-[#f7b392]/25"
          >
            <i className="-rotate-90">
              <ChevronDownIcon color="#f06726" fontSize={24} />{' '}
            </i>
          </button>
        </div>
      </div>
    </Card>
  );
};

const ShippedItemList = () => {
  return (
    <Card className="flex flex-col break-words px-6 py-8 text-base text-[#636466]">
      <div className="flex flex-col space-y-m">
        <h3 className="text-xl font-semibold">Barang Dikirim</h3>
        {/* LIST */}
        <div className="flex flex-col">
          {Quotations.map((quotation, idx) => (
            <div
              className="flex justify-between border-b border-[#d9d9d9] p-m"
              key={`shipping-${idx + 1}`}
            >
              {/* left */}
              <div className="flex items-center space-x-3">
                {/* box */}
                <div className="h-12 w-12 rounded-lg bg-[#d9d9d9]" />
                <div className="space-y-1">
                  <p className="text-xl font-semibold">
                    {quotation.vendor_name}
                  </p>
                  <p className="font-normal">
                    {`${format(
                      quotation.quotation_date,
                      'dd MMM yyyy',
                    )} jam ${format(quotation.quotation_date, 'HH:mm')}`}
                  </p>
                </div>
              </div>

              {/* right */}
              <div className="flex items-center space-x-3">
                {/* box */}
                <div className="space-y-1 text-right">
                  <p className="text-xl font-semibold">
                    {quotation.total_transaction}
                  </p>
                  <p
                    className={cn(
                      'font-normal',
                      quotation.status ? 'text-[#00ba88]' : 'text-[#e25764]',
                    )}
                  >
                    {quotation.status ? 'Confirmed' : 'Not Confirmed'}
                  </p>
                </div>
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-[32px]"
                >
                  <i className="-rotate-90">
                    <ChevronDownIcon color="#f06726" fontSize={24} />{' '}
                  </i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end space-x-3">
          <p className="text-[#f06726]">Tampilkan Lebih Banyak</p>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-[32px] bg-[#f7b392]/25"
          >
            <i className="-rotate-90">
              <ChevronDownIcon color="#f06726" fontSize={24} />{' '}
            </i>
          </button>
        </div>
      </div>
    </Card>
  );
};

const DashboardSkeleton = () => (
  <div className="grid grid-cols-[40%_calc(20%-48px)_40%] gap-6">
    <Card isHomepage className="flex flex-col space-y-6 break-words text-base">
      <div className="flex flex-col space-y-2 text-white">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-1/2" />
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2 text-white">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="flex flex-col space-y-2 text-white">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </Card>
  </div>
);

export { DashboardView };
