import { useEffect, useState } from 'react'
import { get, put } from '@/app/utils/http'

interface IContacts {
  current_page: number;
  last_page: number;
  per_page: number;
  to: number;
  from: number;
  total: number;
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

export function useContacts(notified: string, page: number) {
  const [contactsLoading, setContactsLoading] = useState<boolean>(false)
  const [contacts, setContacts] = useState<IContacts | null>(null)

  useEffect(() => {
    setContactsLoading(true)
    const request = async () => {
      const response = await get<IContacts>('/contacts', {
        params: {
          notified,
          page
        }
      }) as IContacts

      setContactsLoading(false)
      setContacts(response)
    }

    request()
  }, [notified, page])

  return {
    contactsLoading,
    contacts
  }
}

export function useChangeSchedule(id: number, scheduledAt: string) {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const onClick = async () => {
    setLoading(true)

    try {
      await put(`/contacts/${id}`, { scheduled_at: scheduledAt })
      setLoading(false)
      setSuccess(true)
    } catch (e) {
      setLoading(false)
    }
  }

  return { loading, success, onClick }
}