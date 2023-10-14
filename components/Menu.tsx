import classNames from 'classnames'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useAuth, useHass } from '@/hooks';

export default function Menu({className = ''}) {
  const { logout } = useAuth();
  const { connection } = useHass();
  return (
    <div className={classNames('pb-12 space-y-4 px-3 py-6 flex-col', className)}>
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu</h2>
      <div className="space-y-1 grow flex flex-col">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/">Log</Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/medications">Medications</Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/calendar">History</Link>
        </Button>
        <div className="grow flex place-items-end">
          <Button className="" onClick={() => logout(connection)}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
