import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { Input } from '@base-ui-components/react'
import { Dialog } from '@base-ui-components/react/dialog'
import { Check, Home, Plus, Search, Star } from 'lucide-react'
import { useRef, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { ALL_TIMEZONES_DATA, LOCAL_TIMEZONE, LOCAL_TIMEZONE_DATA } from '../util/datetime'

export function PlaceSearch(props: {
  timezones: TimezoneName[]
  setTimezones: (timezones: TimezoneName[]) => void
}): ReactElement {
  const { timezones, setTimezones } = props

  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const filteredTimezones = [LOCAL_TIMEZONE_DATA, ...ALL_TIMEZONES_DATA]
    .filter(({ timezone, country }) => {
      const formattedSearch = formatName(search)
      return false
        || formatName(timezone).includes(formattedSearch)
        || formatName(country).includes(formattedSearch)
    })

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div className="bg-gray-3 rounded-half p-8">
          <Plus size={20} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={twJoin(
            'fixed inset-0 min-h-dvh bg-black-a12 opacity-20 dark:opacity-50',
            'transition-all duration-150',
            'data-[starting-style]:h-0 data-[ending-style]:h-0',
            'supports-[-webkit-touch-callout:none]:absolute',
          )}
        />
        <Dialog.Popup
          className={twJoin(
            'fixed bottom-0 left-0 w-full h-11/12 p-16 rounded-t-8 bg-gray-1',
            'transition-all duration-150 translate-y-0',
            'data-[ending-style]:translate-y-full',
            'data-[starting-style]:translate-y-full',
            'flex flex-col gap-16',
          )}
        >
          <div className="flex items-center gap-16">
            <div className={twJoin(
              'relative flex items-center w-full gap-16 px-8',
              'rounded-8 bg-gray-3',
            )}
            >
              <Search size={20} color="var(--color-gray-10)" />
              <Input
                ref={inputRef}
                placeholder="Search timezones"
                className="py-8 w-full focus:outline-none"
                value={search}
                onValueChange={setSearch}
              />
            </div>
            <button
              type="button"
              className="bg-accent-4 rounded-half p-8"
              onClick={() => {
                setOpen(false)
                setSearch('')
              }}
            >
              <Check size={20} color="var(--color-accent-10)" />
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            {filteredTimezones.map(({ id, timezone, country, flag }) => {
              const isSelected = timezones.includes(id)
              const isLocalTimezone = id === LOCAL_TIMEZONE
              return (
                <button
                  key={timezone}
                  type="button"
                  className={twJoin(
                    'w-full h-max text-left',
                    'flex items-center gap-16 py-16',
                    isLocalTimezone && 'border-b border-gray-3',
                  )}
                  onClick={() => {
                    if (isSelected)
                      setTimezones(timezones.filter(tz => tz !== id))
                    else
                      setTimezones([...timezones, id])
                    setSearch('')
                    inputRef.current?.focus()
                  }}
                  disabled={isLocalTimezone}
                >
                  <div className="text-3xl">
                    {flag}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="font-medium">
                      {timezone}
                    </div>
                    <div className="text-xs font-light text-gray-10">
                      {country}
                    </div>
                  </div>
                  {isLocalTimezone
                    ? (
                        <Home
                          size={20}
                          fill="var(--color-accent-10)"
                          color="var(--color-accent-10)"
                        />
                      )
                    : isSelected
                      ? (
                          <Star
                            size={24}
                            fill="var(--color-accent-9)"
                            color="var(--color-accent-9)"
                          />
                        )
                      : null}
                </button>
              )
            })}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function formatName(name: string): string {
  return name.toLowerCase().replaceAll(' ', '').trim()
}
