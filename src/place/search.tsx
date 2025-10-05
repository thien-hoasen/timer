import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { Combobox } from '@base-ui-components/react'
import { getAllTimezones, getCountry, getTimezone } from 'countries-and-timezones'
import { ChevronDown, Search } from 'lucide-react'
import { useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { LOCAL_TIMEZONE } from './type'

export function PlaceSearch(props: {
  timezones: TimezoneName[]
  setTimezones: (timezones: TimezoneName[]) => void
}): ReactElement {
  const { timezones, setTimezones } = props

  const [search, setSearch] = useState('')

  const items = (Object.keys(getAllTimezones()) as TimezoneName[])
    .filter(timezone => !timezones.includes(timezone) && timezone !== LOCAL_TIMEZONE)
    .map(timezone => timezone)

  return (
    <Combobox.Root
      items={items}
      inputValue={search}
      onInputValueChange={setSearch}
      onValueChange={(value) => {
        setTimezones([...timezones, value as TimezoneName])
        setSearch('')
      }}
      limit={10}
    >
      <div className="relative flex items-center w-full gap-16 py-16">
        <Search size={20} color="var(--color-gray-10)" />
        <Combobox.Input
          placeholder="Search timezones"
          className="py-8 w-full focus:outline-none"
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <Combobox.Trigger aria-label="Open popup">
            <ChevronDown size={20} color="var(--color-gray-10)" />
          </Combobox.Trigger>
        </div>
      </div>
      <Combobox.Portal>
        <Combobox.Positioner className="outline-none" sideOffset={4}>
          <Combobox.Popup className={twJoin(
            'w-[var(--anchor-width)] max-w-[var(--available-width)]',
            'max-h-[min(var(--available-height),23rem)]',
            'origin-[var(--transform-origin)] overflow-y-auto',
            'scroll-pt-2 scroll-pb-2 overscroll-contain',
            'bg-gray-1 rounded-4',
            'transition-[transform,scale,opacity]',
            'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
            'data-[side=none]:data-[ending-style]:transition-none',
            'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            'data-[side=none]:data-[starting-style]:scale-100',
            'data-[side=none]:data-[starting-style]:opacity-100',
            'data-[side=none]:data-[starting-style]:transition-none',
            'shadow-4',
          )}
          >
            <Combobox.Empty className="p-8 text-gray-10 empty:m-0 empty:p-0">
              No timezones found.
            </Combobox.Empty>
            <Combobox.List>
              {(item: string) => {
                const timezone = getTimezone(item)
                if (!timezone || timezone.countries.length === 0)
                  return null
                const country = getCountry(timezone.countries[0])
                if (!country)
                  return null
                return (
                  <Combobox.Item
                    key={item}
                    value={item}
                    className="p-12 flex flex-col data-[highlighted]:bg-accent-4"
                  >
                    <div className="font-medium">
                      {item.split('/').pop()?.replaceAll('_', ' ')}
                    </div>
                    <div className="text-xs font-light text-gray-10">
                      {country.name}
                    </div>
                  </Combobox.Item>
                )
              }}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  )
}
