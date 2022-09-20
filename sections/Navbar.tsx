import { Disclosure } from '@headlessui/react'
import { MagnifyingGlassIcon as SearchIcon, XCircleIcon, Bars3Icon as MenuIcon, XCircleIcon as XIcon } from '@heroicons/react/24/outline'

import { useState } from 'react'

const navigation = [
  { name: 'About', href: '#', current: true },
  { name: 'Experience', href: '#', current: false },
  { name: 'Education', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export interface NavbarProps {
  onFilterUpdate: (filter: string) => void,
  filterValue: string,
}

export const Navbar: React.FC<NavbarProps> = ({onFilterUpdate, filterValue}) => {

  const [filter, setFilterValue] = useState(filterValue)
  const [timeoutId, setTimeoutId] = useState(0)

  const blockEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      e.preventDefault()
    }
  };

  const clearSubmited = (e: React.FormEvent<HTMLButtonElement>) => {
    setFilterValue('')
    fireFilterChangeDelayed('', 0)
    e.preventDefault()
  };

  const onFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setFilterValue(value)
    fireFilterChangeDelayed(value, 200)
  };

  const fireFilterChangeDelayed = (value: string, delay: number, scrollId : string = '') => {
    if (timeoutId > 0) clearTimeout(timeoutId)
    setTimeoutId(window.setTimeout(() => { onFilterUpdate(value) }, delay))
    if (scrollId) {
      window.setTimeout(() => {
        const element = document.getElementById(scrollId);
        if (element) element.scrollIntoView();
      }, 50);
    }
  }


  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {/*input search */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <form method="GET">
                  <div className="relative text-gray-600 focus-within:text-gray-400">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <SearchIcon className="block h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="absolute inset-y-0 left-48 flex items-center pl-2">
                      <button type="submit" className="p-1 focus:outline-none focus:shadow-outline" onClick={clearSubmited}>
                        <XCircleIcon className="block h-5 w-5" aria-hidden="true" />
                      </button>
                    </span>
                    <input type="search" name="q" autoComplete='off' value={filter} onKeyPress={blockEnterPress} onChange={onFilterChange}
                      className="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Filter..." />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
