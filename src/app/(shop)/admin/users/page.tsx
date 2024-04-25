export const revalidate = 0;

import { getPaginatedUsers } from '@/actions';
import { Title } from '@/components';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function OrdersPage() {
  const { users, ok } = await getPaginatedUsers();

  if (!ok) {
    redirect('/auth/login');
  }

  if (!users) return <>No users</>;

  return (
    <>
      <Title title='Users Maintenance' />

      <div className='mb-10'>
        <UsersTable users={users} />
      </div>
    </>
  );
}
