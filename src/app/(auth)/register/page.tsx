import { RegisterView as Register } from '@/features/register/components/register';
import { Suspense } from 'react';

const RegisterPage = () => (
  <Suspense>
    <Register />
  </Suspense>
);

export default RegisterPage;
