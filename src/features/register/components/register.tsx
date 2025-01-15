'use client';
import { Button } from '@/features/@shared/components/button';
import { EyeIcon } from '@/features/@shared/components/icon';
import { InputGroup } from '@/features/@shared/components/input-group';
import { TextInput } from '@/features/@shared/components/text-input';
import {
  passwordWithCapitalRegex,
  passwordWithSymbolRegex,
} from '@/features/@shared/constants/regex';
import { buildHref } from '@/features/@shared/utils/route-helper';
import { yupResolver } from '@hookform/resolvers/yup';
import { Carousel, Checkbox } from 'flowbite-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useRegister } from '../utils/query';

const RegisterSchemas = Yup.object({
  fullname: Yup.string()
    .required('Nama lengkap wajib diisi')
    .min(4, 'Nama lengkap minimal 4 huruf'),
  email: Yup.string().required('Email wajib diisi').email('Email tidak valid'),
  password: Yup.string()
    .required('Password wajib diisi')
    .min(8, 'Password minimal 8 karakter')
    .matches(passwordWithCapitalRegex, 'Format tidak valid')
    .matches(passwordWithSymbolRegex, 'Format tidak valid'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Password tidak sesuai'),
});
type Register = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const carouselContentStyle = {
  height: '208px',
  color: '#fff',
  lineHeight: '160px',
  // background: "#364d79",
};

/* ----- FIRST STEP ----- */
const FirstStepRegister = ({ next }: { next: () => void }) => {
  return (
    <>
      {/* carousel */}
      <Carousel style={{ height: 208 }}>
        <div>
          <h3 style={{ ...carouselContentStyle, textAlign: 'center' }}>1</h3>
        </div>
        <div>
          <h3 style={{ ...carouselContentStyle, textAlign: 'center' }}>2</h3>
        </div>
        <div>
          <h3 style={{ ...carouselContentStyle, textAlign: 'center' }}>3</h3>
        </div>
      </Carousel>

      {/* button */}
      <div className="flex flex-col space-y-4 font-semibold">
        <Button
          className="rounded-[24px] bg-b2b-primary p-3 capitalize text-white"
          onClick={next}
        >
          buat akun
        </Button>
        <Button className="rounded-[24px] border border-b2b-primary p-3 capitalize text-b2b-primary">
          sudah punya akun
        </Button>
      </div>
    </>
  );
};

/* ----- SECOND STEP ----- */
type SecondStepRegisterType = {
  businessType: string | number;
  onSelectBusinessType: (type: string | number) => void;
  next: () => void;
};
const SecondStepRegister = ({
  businessType,
  onSelectBusinessType,
  next,
}: SecondStepRegisterType) => {
  const [businessEntity, setBusinessEntity] = React.useState<string | number>(
    '',
  );
  const [showBusinessEntity, setShowBusinessEntity] = React.useState(false);
  const onSelectBusinessEntity = () => {
    if (!businessEntity) {
      next();
      onSelectBusinessType(1);
    } else {
      onSelectBusinessType(2);
      setShowBusinessEntity((prev) => !prev);
    }
  };

  return (
    <>
      {!showBusinessEntity ? (
        <>
          <div className="flex flex-col space-y-3 text-sm">
            <h5 className="font-semibold">Pilih jenis reseler Anda</h5>

            <p className="text-[#838484]">
              Sebelum Anda mendaftar menjadi reseller Blicicil, silakan pilih
              tipe bisnis untuk melanjutkan
            </p>

            {/* option */}
            <div className="grid grid-cols-2 gap-3 text-center">
              {/* pribadi */}
              <div
                className={`flex flex-col items-center justify-center gap-3 space-y-3 border py-3 ${
                  businessType !== 1 ? 'border-[#D0D0D0]' : 'border-b2b-primary'
                } cursor-pointer rounded-2xl font-semibold`}
                onClick={() => onSelectBusinessType(1)}
              >
                <h5>Pribadi</h5>
                <Image
                  src="./reseller-pribadi.svg"
                  alt="icon reseller pribadi"
                  width={84}
                  height={75}
                />
                <p className="text-[10px] text-[#838484]">
                  perusahaan yang dipunyai oleh seorang pengusaha
                </p>
              </div>

              {/* badan usaha */}
              <div
                className={`flex flex-col items-center justify-center gap-3 space-y-3 border text-center ${
                  businessEntity !== 1
                    ? 'border-[#D0D0D0]'
                    : 'border-b2b-primary'
                } w-full cursor-pointer rounded-2xl font-semibold`}
                onClick={() => setBusinessEntity(1)}
              >
                <h5>Badan Usaha</h5>
                <div className="flex items-center justify-center">
                  <Image
                    src="./reseller-company.svg"
                    className="flex items-center justify-center"
                    alt="icon reseller pribadi"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    width={102}
                    height={72}
                  />
                </div>
                <p className="mt-[3px] text-[10px] text-[#838484]">
                  perusahaan dengan status perusahaan dagang
                </p>
              </div>
            </div>
          </div>
          {/* button next */}
          {(businessEntity || businessType === 1) && (
            <Button
              className="w-full rounded-3xl bg-b2b-primary p-3 text-white"
              onClick={onSelectBusinessEntity}
            >
              Selanjutnya
            </Button>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col space-y-3 text-sm">
            <h5 className="font-semibold">Pilih jenis reseler Anda</h5>

            <p className="text-[#838484]">
              Sebelum Anda mendaftar menjadi reseller Blicicil, silakan pilih
              tipe bisnis untuk melanjutkan
            </p>

            {/* option */}
            <div className="grid grid-cols-2 gap-3 text-center">
              {/* cv */}
              <div
                className={`flex flex-col items-center justify-center gap-3 space-y-3 border py-3 ${
                  businessType !== 3 ? 'border-[#D0D0D0]' : 'border-b2b-primary'
                } cursor-pointer rounded-2xl font-semibold`}
                onClick={() => onSelectBusinessType(3)}
              >
                <h5>CV</h5>
                <Image
                  src="./reseller-pribadi.svg"
                  alt="icon reseller pribadi"
                  width={84}
                  height={75}
                />
                <p className="text-[10px] text-[#838484]">
                  badan usaha yang didirikan antara dua pihak yang terbagi atas
                  sekutu aktif dan juga sekutu pasif
                </p>
              </div>

              {/* firma */}
              <div
                className={`flex flex-col items-center justify-center gap-3 space-y-3 border ${
                  businessType !== 4 ? 'border-[#D0D0D0]' : 'border-b2b-primary'
                } cursor-pointer rounded-2xl font-semibold`}
                onClick={() => onSelectBusinessType(4)}
              >
                <h5>Firma</h5>
                <Image
                  src="./reseller-company.svg"
                  className="items-center justify-center"
                  alt="icon reseller pribadi"
                  width={102}
                  height={72}
                />
                <p className="mt-[3px] text-[10px] text-[#838484]">
                  badan usaha yang didirikan oleh beberapa orang dengan memakai
                  satu nama untuk kepentingan bersama
                </p>
              </div>
            </div>
          </div>
          {/* button next */}
          {+businessType > 2 && (
            <Button
              className="w-full rounded-3xl bg-b2b-primary p-3 text-white"
              onClick={next}
            >
              Selanjutnya
            </Button>
          )}
        </>
      )}
    </>
  );
};

/* ----- THIRD STEP ------ */
const ThirdStepRegister = ({
  register,
}: {
  register: (data: Register) => void;
}) => {
  const [type, setType] = React.useState<string>('password');
  const [typeConfPass, setTypeConfPass] = React.useState<string>('password');
  const formControl = useForm<Register>({
    resolver: yupResolver(RegisterSchemas),
    mode: 'onBlur',
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutateAsync, isPending } = useRegister();
  return (
    <form onSubmit={formControl.handleSubmit(register)} className="space-y-6">
      <div className="flex flex-col space-y-3 text-sm">
        {/* input nama lengkap */}
        <InputGroup id="fullname" label="Nama Lengkap">
          <Controller
            control={formControl.control}
            name="fullname"
            render={({ field: { value, ...field }, fieldState: { error } }) => (
              <TextInput
                placeholder="Masukkan nama lengkap"
                color={error ? 'failure' : 'gray'}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </InputGroup>

        {/* input email */}
        <InputGroup id="email" label="Email">
          <Controller
            control={formControl.control}
            name="email"
            render={({ field: { value, ...field }, fieldState: { error } }) => (
              <TextInput
                placeholder="Masukkan email"
                color={error ? 'failure' : 'gray'}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </InputGroup>

        {/* input password */}
        <InputGroup id="password" label="Password">
          <div className="relative">
            <Controller
              control={formControl.control}
              name="password"
              render={({
                field: { value, ...field },
                fieldState: { error },
              }) => (
                <TextInput
                  type={type}
                  placeholder="Masukkan password"
                  color={error ? 'failure' : 'gray'}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />
            <button
              className="absolute right-4 top-[22px]"
              type="button"
              onClick={() => setType(type === 'password' ? 'text' : 'password')}
            >
              <EyeIcon />
            </button>
          </div>
        </InputGroup>

        {/* input ulangi password */}
        <InputGroup id="confirmPassword" label="Ulangi Password">
          <div className="relative">
            <Controller
              control={formControl.control}
              name="confirmPassword"
              render={({
                field: { value, ...field },
                fieldState: { error },
              }) => (
                <TextInput
                  type={typeConfPass}
                  placeholder="Masukkan ulang password"
                  color={error ? 'failure' : 'gray'}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />

            <button
              className="absolute right-4 top-[22px]"
              type="button"
              onClick={() =>
                setTypeConfPass(
                  typeConfPass === 'password' ? 'text' : 'confirmPassword',
                )
              }
            >
              <EyeIcon />
            </button>
          </div>
        </InputGroup>
      </div>
      {/* check term & condition */}
      <div className="flex space-x-2 text-sm font-normal">
        <Checkbox
          name="checkTnc"
          className="blicicil-input-checkbox"
          id="checkTnc"
        />
        <label htmlFor="checkTnc">
          Saya menyetujui Syarat dan Ketentuan serta  Kebijakan Privasi yang
          berlaku.
        </label>
      </div>

      {formControl.formState.isValid && !formControl.formState.isDirty && (
        <Button
          className="w-full rounded-3xl bg-b2b-primary p-3 text-white"
          type="submit"
          color="primary-orange"
          isProcessing={isPending}
          disabled={isPending}
        >
          Daftar
        </Button>
      )}
    </form>
  );
};

const RegisterView = () => {
  const [step, setStep] = React.useState(0);
  const [businessType, setBusinessType] = React.useState<string | number>('');
  const router = useRouter();
  const params = useSearchParams();
  const currentRoute = { params, path: usePathname() };

  const { mutateAsync } = useRegister();

  const onSelectBusinessType = (type: string | number) => {
    setBusinessType(type);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    if (params.get('businessType')) setStep(2);
  }, []);

  const onRegister = async (data: Register) => {
    const body = {
      full_name: data.fullname,
      username: data.email,
      email: data.email,
      password: btoa(data.password),
      role_id: 'reseller',
      business_type: params.get('businessType') ?? '',
    };
    try {
      await mutateAsync(body);
    } catch (error) {
      console.error(error);
    }
  };

  const goToForm = () => {
    setStep(2);
    router.replace(
      buildHref(
        {
          businessType:
            businessType === 1
              ? 'pribadi'
              : businessType === 3
                ? 'cv'
                : 'firma',
        },
        currentRoute,
      ),
      { scroll: false },
    );
  };

  return (
    <>
      <div
        className={`flex flex-col space-y-6 rounded-3xl bg-white px-10 py-[38px] shadow-card ${
          step > 1 ? 'w-[446px]' : 'w-[390px]'
        }`}
      >
        {/* title wording */}
        <div className="flex flex-col space-y-2 font-semibold">
          <p className="text-xl">Blicicil for Business</p>
          <p className="text-2xl">
            {!step
              ? 'Selamat datang!'
              : step > 1
                ? 'Daftar menjadi reseller'
                : +businessType > 1
                  ? 'Tipe Badan Usaha'
                  : 'Tipe Reseller'}
          </p>
        </div>
        {!step ? (
          <FirstStepRegister next={() => setStep(1)} />
        ) : step > 1 ? (
          <ThirdStepRegister register={onRegister} />
        ) : (
          <SecondStepRegister
            businessType={businessType}
            onSelectBusinessType={onSelectBusinessType}
            next={goToForm}
          />
        )}
      </div>
    </>
  );
};

export { RegisterView };
