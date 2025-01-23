'use client';

import { Button } from '@/features/@shared/components/button';
import { EyeIcon } from '@/features/@shared/components/icon';
import { InputGroup } from '@/features/@shared/components/input-group';
import { TextInput } from '@/features/@shared/components/text-input';
import {
  passwordRegex,
  usernameRegex,
} from '@/features/@shared/constants/regex';
import { encrypt } from '@/features/@shared/utils/formatter';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCookie, setCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { LoginRequest, useLogin, useLoginExternal } from '../utils/query';
import { useSpinner } from '@/features/@shared/context/spinner';

const LoginSchemas = Yup.object({
  user_id: Yup.string()
    .required('Username wajib diisi')
    .matches(usernameRegex, 'Username tidak valid'),
  password: Yup.string()
    .required('Password wajib diisi')
    .required('Password wajib diisi')
    .min(8, 'Password minimal 8 karakter')
    .matches(passwordRegex, 'Format tidak valid'),
});

function Login() {
  const [type, setType] = React.useState<string>('password');
  const { setActiveSpinner } = useSpinner();
  const router = useRouter();
  const pathname = usePathname();

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<LoginRequest>({
    resolver: yupResolver(LoginSchemas),
    mode: 'onChange',
    defaultValues: {
      user_id: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (getCookie('token')) {
      router.push('/');
    }
  }, []);

  const { mutateAsync, isPending } = useLogin();
  const { mutateAsync: loginExternal, isPending: isPendingExternal } =
    useLoginExternal();

  const login = async (values: LoginRequest) => {
    setActiveSpinner(true);
    const body = {
      user_id: encrypt(values.user_id),
      password: encrypt(values.password),
    };
    const bodyExternal = {
      email: encrypt(values.user_id),
      password: encrypt(values.password),
    };
    try {
      const response = pathname.includes('login-internal')
        ? await mutateAsync(body)
        : await loginExternal(bodyExternal);
      if (response.token) {
        setCookie('token', response.token);
      }
      router.push('/');
      setTimeout(() => {
        setActiveSpinner(false);
      }, 4000);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(login)}
      className="flex w-full flex-col space-y-6 rounded-3xl bg-white px-6 py-[38px] shadow-card md:w-[446px] md:px-10"
    >
      <div className="space-y-xs font-semibold">
        <h4 className="text-xl">Blicicil for Business</h4>
        <h3 className="text-2xl">Masuk</h3>
      </div>
      <div className="flex flex-col space-y-3 text-sm">
        {/* input user_id */}
        <div className="flex flex-col space-y-0.5">
          <InputGroup
            id="user_id"
            label={pathname.includes('login-internal') ? 'NIK' : 'Email'}
          >
            <Controller
              control={control}
              name="user_id"
              render={({ field: { ...field }, fieldState: { error } }) => (
                <TextInput
                  placeholder={`Masukkan ${pathname.includes('login-internal') ? 'nik' : 'email'}`}
                  color={error ? 'failure' : 'gray'}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />
          </InputGroup>
        </div>

        {/* input password */}
        <div className="flex flex-col space-y-0.5">
          <InputGroup id="password" label="Password">
            <div className="relative">
              <Controller
                control={control}
                name="password"
                render={({ field: { ...field }, fieldState: { error } }) => (
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
                onClick={() =>
                  setType(type === 'password' ? 'text' : 'password')
                }
              >
                <EyeIcon />
              </button>
            </div>
          </InputGroup>
        </div>
      </div>
      {/* check term & condition */}

      <Button
        type="submit"
        disabled={!isValid || isPending || isPendingExternal}
        color="primary-orange"
        isProcessing={isPending || isPendingExternal}
      >
        Masuk
      </Button>
    </form>
  );
}

export { Login };
