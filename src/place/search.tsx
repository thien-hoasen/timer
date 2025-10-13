import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import type { TimezoneWithCountry } from '../util/datetime'
import { Input } from '@base-ui-components/react'
import { Dialog } from '@base-ui-components/react/dialog'
import { Check, Home, Plus, Search, Star } from 'lucide-react'
import { useRef, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { LOCAL_TIMEZONE_DATA, OTHER_TIMEZONES_DATA } from '../util/datetime'

function normalizeSearchString(name: string): string {
  return name.toLowerCase().replaceAll(' ', '').trim()
}

export function PlaceSearch(props: {
  timezones: TimezoneName[]
  setTimezones: (timezones: TimezoneName[]) => void
}): ReactElement {
  const { timezones, setTimezones } = props

  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  if (!LOCAL_TIMEZONE_DATA)
    throw new Error('Local timezone is not found')

  const addTimezone = (timezone: TimezoneName) => {
    if (timezones.length > 4)
      // TODO: show error toast
      return
    setTimezones([...timezones, timezone])
  }

  const removeTimezone = (timezone: TimezoneName) => {
    setTimezones(timezones.filter(tz => tz !== timezone))
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div className="bg-gray-3 rounded-half p-8 shadow-6">
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
            'fixed bottom-0 left-0 w-full h-11/12 p-16 rounded-t-16 bg-gray-1',
            'transition-all duration-150 translate-y-0',
            'data-[ending-style]:translate-y-full',
            'data-[starting-style]:translate-y-full',
            'flex flex-col gap-16 shadow-6',
          )}
        >
          <div className="h-4 w-36 mx-auto bg-gray-4 rounded-full" />
          <div className="flex items-center gap-16">
            <div className={twJoin(
              'relative flex items-center w-full gap-16 px-8',
              'rounded-8 bg-gray-3',
            )}
            >
              <Search size={20} color="var(--gray-10)" />
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
              className="bg-gray-4 rounded-half p-8 shadow-6"
              onClick={() => {
                setOpen(false)
                setSearch('')
              }}
            >
              <Check size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            <button
              type="button"
              className={twJoin(
                'w-full h-max text-left',
                'flex items-center gap-16 py-16 px-8',
                'border-b border-gray-3',
              )}
              disabled
            >
              <PlaceSearchItem {...LOCAL_TIMEZONE_DATA} />
              <Home
                size={20}
                fill="var(--accent-10)"
                color="var(--accent-10)"
              />
            </button>
            {OTHER_TIMEZONES_DATA
              .filter(({ timezoneName, countryName }) => {
                const normalizedSearch = normalizeSearchString(search)
                const normalizedTimezoneName = normalizeSearchString(timezoneName)
                const normalizedCountryName = normalizeSearchString(countryName)
                return normalizedTimezoneName.includes(normalizedSearch)
                  || normalizedCountryName.includes(normalizedSearch)
              })
              .map(({ id, timezoneName, countryName, flagEmoji }) => {
                const isSelected = timezones.includes(id)
                return (
                  <button
                    key={id}
                    type="button"
                    className={twJoin(
                      'w-full h-max text-left',
                      'flex items-center gap-16 py-16 px-8',
                    )}
                    onClick={() => {
                      if (isSelected)
                        removeTimezone(id)
                      else
                        addTimezone(id)
                      setSearch('')
                      inputRef.current?.focus()
                    }}
                  >
                    <PlaceSearchItem
                      id={id}
                      timezoneName={timezoneName}
                      countryName={countryName}
                      flagEmoji={flagEmoji}
                    />
                    {isSelected && (
                      <Star
                        size={24}
                        fill="var(--accent-9)"
                        color="var(--accent-9)"
                      />
                    )}
                  </button>

                )
              })}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function PlaceSearchItem(props: TimezoneWithCountry): ReactElement {
  const { timezoneName, countryName, flagEmoji } = props
  return (
    <>
      <div className="text-3xl">
        {flagEmoji}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="font-medium">
          {timezoneName}
        </div>
        <div className="text-xs font-light text-gray-10">
          {countryName}
        </div>
      </div>
    </>
  )
}
