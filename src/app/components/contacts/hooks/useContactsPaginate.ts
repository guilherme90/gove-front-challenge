import { useEffect, useState } from 'react'
import { get } from '@/app/utils/http'

interface IContacts {
  current_page: number;
  from: number;
  per_page: number;
  to: number;
  data: {
    id: number;
    contact_id: number;
    scheduled_at: string;
    notified: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    contact: {
      id: number;
      name: string;
      email: string;
      updated_at: string;
      deleted_at: string | null;
    }
  }[]
}

export default function useContactsPaginate() {
  const [contactsLoading, setContactsLoading] = useState<boolean>(false)
  const [contacts, setContacts] = useState<IContacts | null>(null)

  useEffect(() => {
    setContactsLoading(true)

    const request = async () => {
      const response = await get<IContacts>('/contacts', {
        params: {
          notified: 'on'
        }
      }) as IContacts

      setContactsLoading(false)
      setContacts(response)
    }

    request()
  }, [])

  return {
    contactsLoading,
    contacts
  }
}