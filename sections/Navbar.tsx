import { Disclosure } from "@headlessui/react"
import { MagnifyingGlassIcon, XCircleIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { off } from "process"

import { useState, useEffect } from "react"
import { isNotBlank } from "../lib/filter"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export interface NavbarProps {
  onFilterUpdate: (filter: string) => void,
  filterValue: string,
  navigation: NavigationItem[]
}

export interface NavigationItem {
  name: string,
  href: string,
}

export const Navbar: React.FC<NavbarProps> = (props => {

  const [filter, setFilterValue] = useState(props.filterValue)
  const [timeoutId, setTimeoutId] = useState(0)
  const [currentPageName, setCurrentPageName] = useState(props.navigation[0].name)
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (filter != props.filterValue) {
      setFilterValue(props.filterValue)
      if (isNotBlank(props.filterValue)) {
        setCurrentPageName("Projects")
      }
    }
  }, [props.filterValue])

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const findNearestPage = (pageOffset: number, items: NavigationItem[]): NavigationItem => {
    return items.reduce((first, second) => {
      if (typeof document !== "undefined") {
        const firstOffset = document.getElementById(first.href.substring(1))?.offsetTop ?? Number.MAX_SAFE_INTEGER
        const secondOffset = document.getElementById(second.href.substring(1))?.offsetTop ?? Number.MAX_SAFE_INTEGER
        const firstDist = Math.abs(firstOffset - pageOffset)
        const secondDist = Math.abs(secondOffset - pageOffset)
        return firstDist < secondDist ? first : second
      }
      return first
    })
  }

  const updateCurrent = () => {
    var nearestPageName = isNotBlank(filter)
      ? "Projects"
      : findNearestPage(offset, props.navigation).name
    if (nearestPageName !== currentPageName) {
      setCurrentPageName(nearestPageName)
    }
  }
  updateCurrent()

  const blockEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      e.preventDefault()
    }
  };

  const clearSubmited = (e: React.FormEvent<HTMLButtonElement>) => {
    setFilterValue("")
    fireFilterChangeDelayed("", 200, "About")
    e.preventDefault()
  };

  const onFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setFilterValue(value)
    fireFilterChangeDelayed(value, 200)
  };

  const fireFilterChangeDelayed = (value: string, delay: number, page?: string) => {
    if (timeoutId > 0) {
      clearTimeout(timeoutId)
    }
    setTimeoutId(window.setTimeout(() => { 
      props.onFilterUpdate(value)
      if (page || !isNotBlank(value)) {
        window.setTimeout(() => setCurrentPageName(page ?? "About"), 500)
      }
    }, delay))
  }

  const { navigation } = props

  const isCurrent = (item: NavigationItem): boolean => {
    return item.name === currentPageName
  }

  return (
    <Disclosure as="nav" className="bg-gray-200">
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto px-1">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XCircleIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block">
                  <div className="flex space-x-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          isCurrent(item) ? "bg-gray-400 text-gray-900" : "text-gray-900 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={isCurrent(item) ? "page" : undefined}
                        onClick={() => {
                          setCurrentPageName(item.name)
                          if (item.name !== "Skills" && item.name !== "Projects") {
                            fireFilterChangeDelayed("", 200, item.name)
                          }
                        }}
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
                        <MagnifyingGlassIcon className="block h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="absolute inset-y-0 left-48 flex items-center pl-2">
                      <button type="submit" className="p-1 focus:outline-none focus:shadow-outline" onClick={clearSubmited}>
                        <XCircleIcon className="block h-5 w-5" aria-hidden="true" />
                      </button>
                    </span>
                    <input type="text" autoComplete="off" value={filter} onKeyPress={blockEnterPress} onChange={onFilterChange}
                      className="py-2 text-sm rounded-md pl-10 focus:outline-none bg-gray-50 focus:bg-white text-gray-900" 
                      placeholder="Filter..." />
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
                    isCurrent(item) ? "bg-gray-400 text-gray-900" : "text-gray-900 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={isCurrent(item) ? "page" : undefined}
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
})
