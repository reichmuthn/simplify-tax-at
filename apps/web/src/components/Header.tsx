"use client";
import {Disclosure, Popover} from "@headlessui/react";
import {Bars, ChevronDown, Envelope, Phone, Xmark} from "@ui/components/icons/ClassicRegularIcons";
import {Link} from "./localeConfig";
import React from "react";
import {coreCompetences, services} from "@/assets/data/messages/home";
import {aboutUsLinks, resourcesLinks} from "@/assets/data/messages/navigation";
import {appConfig} from "@/assets/data/appConfig";
import {LogoFull} from "@ui/components/icons/Logos";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type LinkConfig = {
  title: string;
  items: {
    title: string;
    description?: string;
    href: string;
    messageKey: string;
    moreLink?: string;
  }[];
  actions: {
    title: string;
    href: string;
    messageKey: string;
  }[]
}

export default function Header({
                                 children,
                                 serviceLinkConfig,
                                 coreCompetenceLinkConfig,
                                 aboutUsLinkConfig,
                                 resourcesLinkConfig,
                                 contactLinkConfig
                               }: {
  children: React.ReactNode;
  serviceLinkConfig: LinkConfig;
  coreCompetenceLinkConfig: LinkConfig;
  aboutUsLinkConfig: LinkConfig;
  resourcesLinkConfig: LinkConfig;
  contactLinkConfig: LinkConfig;
}) {

  const renderServiceIcon = (messageKey: string) => {
    const Icon = services.find(x => x.messageKey === messageKey)?.Icon;

    if (Icon) {
      return <Icon className="h-[18px] w-[18px] fill-current"/>
    }
  }

  const renderCoreCompetenceIcon = (messageKey: string) => {
    const Icon = coreCompetences.find(x => x.messageKey === messageKey)?.Icon;

    if (Icon) {
      return <Icon className="h-[18px] w-[18px] fill-current"/>
    }
  }

  const renderAboutUsIcon = (messageKey: string) => {
    const Icon = aboutUsLinks.find(x => x.messageKey === messageKey)?.Icon;

    if (Icon) {
      return <Icon className="h-[18px] w-[18px] fill-current"/>
    }
  }

  const renderResourcesIcon = (messageKey: string) => {
    const Icon = resourcesLinks.find(x => x.messageKey === messageKey)?.Icon;

    if (Icon) {
      return <Icon className="h-[18px] w-[18px] fill-current"/>
    }
  }

  return (
    <>
      <Popover className="fixed w-full bg-white z-50">
        <div className="bg-appPrimary hidden md:block">
          <div
            className="mx-auto text-sm flex flex-row items-center justify-between max-w-content px-4 md:px-8 text-onPrimary py-2">
            <div className="flex gap-2 items-center">
              <Envelope className={"w-4 h-4 fill-current"}/><a
              href={`mailto:${appConfig.site.eMail}`}>{appConfig.site.eMail}</a>
            </div>
            <div className="flex gap-2 items-center">
              <Phone className={"w-4 h-4 fill-current"}/><a
              href={`tel:${appConfig.site.phone}`}>{appConfig.site.phone}</a>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-30 shadow"
          aria-hidden="true"
        />
        <div className="relative z-20">
          <div
            className="max-w-content mx-auto px-4 md:px-8 flex items-center justify-between py-3 md:py-4 md:space-x-10">
            <div>
              <Link href="/" className="flex" aria-label="Simplify Tax Home">
                <LogoFull className="h-6 md:h-8 lg:h-10 w-auto "/>
              </Link>
            </div>
            <div className="-my-2 -mr-2 lg:hidden flex gap-2">
              <Popover.Button
                className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <span className="sr-only">Open Menu</span>
                <Bars className="h-4 w-4" aria-hidden="true"/>
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden lg:flex space-x-8">
              <Popover>
                {({open, close}) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-appPrimary" : "text-display",
                        "group inline-flex items-center bg-white text-base font-medium tracking-tighthover:text-appPrimary outline-none",
                      )}
                    >
                      <span>{coreCompetenceLinkConfig.title}</span>
                      <ChevronDown
                        className={classNames(
                          open ? "text-appPrimary" : "text-display",
                          "ml-2 h-3 w-3 group-hover:text-appPrimary fill-current",
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Popover.Panel
                      className="absolute inset-x-0 top-full z-10 hidden transform bg-white shadow-lg md:block">
                      <div
                        className="mx-auto grid max-w-7xl gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-3 lg:px-8 lg:py-12 xl:py-16">
                        {coreCompetenceLinkConfig.items.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="-m-3 flex flex-col justify-between rounded-lg p-3 hover:bg-surface-2"
                            onClick={() => close()}
                          >
                            <div className="flex md:h-full lg:flex-row items-center gap-4">
                              <div className="flex-shrink-0">
                                <span
                                  className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-[10px] bg-appPrimary text-onPrimary">
                                  {renderCoreCompetenceIcon(item.messageKey)}
                                </span>
                              </div>
                              <div className="ml-4 md:flex md:flex-1 md:flex-col md:justify-between lg:ml-0">
                                <div>
                                  <p className="text-base font-medium text-display">
                                    {item.title}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
              <Popover>
                {({open, close}) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-appPrimary" : "text-display",
                        "group inline-flex items-center bg-white text-base font-medium tracking-tighthover:text-appPrimary outline-none",
                      )}
                    >
                      <span>{serviceLinkConfig.title}</span>
                      <ChevronDown
                        className={classNames(
                          open ? "text-appPrimary" : "text-display",
                          "ml-2 h-3 w-3 group-hover:text-appPrimary fill-current",
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Popover.Panel
                      className="absolute inset-x-0 top-full z-10 hidden transform bg-white shadow-lg md:block">
                      <div
                        className="mx-auto grid max-w-7xl gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-3 lg:px-8 lg:py-12 xl:py-16">
                        {serviceLinkConfig.items.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="-m-3 flex flex-col justify-between rounded-lg p-3 hover:bg-surface-2"
                            onClick={() => close()}
                          >
                            <div className="flex md:h-full lg:flex-row items-center gap-4">
                              <div className="flex-shrink-0">
                                <span
                                  className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-[10px] bg-appPrimary text-onPrimary">
                                  {renderServiceIcon(item.messageKey)}
                                </span>
                              </div>
                              <div className="ml-4 md:flex md:flex-1 md:flex-col md:justify-between lg:ml-0">
                                <div>
                                  <p className="text-base font-medium text-display">
                                    {item.title}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
              <Popover>
                {({open, close}) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-appPrimary" : "text-display",
                        "group inline-flex items-center bg-white text-base font-medium tracking-tighthover:text-appPrimary outline-none",
                      )}
                    >
                      <span>{aboutUsLinkConfig.title}</span>
                      <ChevronDown
                        className={classNames(
                          open ? "text-appPrimary" : "text-display",
                          "ml-2 h-3 w-3 group-hover:text-appPrimary fill-current",
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>
                    <Popover.Panel
                      className="absolute inset-x-0 top-full z-10 hidden transform bg-white shadow-lg md:block">
                      <div
                        className="mx-auto grid max-w-7xl gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                        {aboutUsLinkConfig.items.map((item) => (
                          <Link
                            key={item.messageKey}
                            href={item.href}
                            className="-m-3 flex flex-col justify-between rounded-lg p-3 hover:bg-surface-2"
                            onClick={() => close()}
                          >
                            <div className="flex md:h-full lg:flex-col gap-4">
                              <div className="flex-shrink-0">
                                <span
                                  className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-[10px] bg-appPrimary text-onPrimary">
                                  {renderAboutUsIcon(item.messageKey)}
                                </span>
                              </div>
                              <div className="ml-4 md:flex md:flex-1 md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                <div>
                                  <p className="text-base font-medium text-display">
                                    {item.title}
                                  </p>
                                  <p className="mt-1 text-sm text-appSecondary">
                                    {item?.description}
                                  </p>
                                </div>
                                <p className="mt-2 text-sm font-medium text-appPrimary lg:mt-4">
                                  {item?.moreLink}
                                  <span aria-hidden="true"> &rarr;</span>
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
              <Popover>
                {({open, close}) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-appPrimary" : "text-display",
                        "group inline-flex items-center bg-white text-base font-medium tracking-tighthover:text-appPrimary outline-none",
                      )}
                    >
                      <span>{resourcesLinkConfig.title}</span>
                      <ChevronDown
                        className={classNames(
                          open ? "text-appPrimary" : "text-display",
                          "ml-2 h-3 w-3 group-hover:text-appPrimary fill-current",
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Popover.Panel
                      className="absolute inset-x-0 top-full z-10 hidden transform bg-white shadow-lg md:block">
                      <div
                        className="mx-auto grid max-w-7xl gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                        {resourcesLinkConfig.items.map((item) => (
                          <Link
                            key={item.messageKey}
                            href={item.href}
                            className="-m-3 flex flex-col justify-between rounded-lg p-3 hover:bg-surface-2"
                            onClick={() => close()}
                          >
                            <div className="flex md:h-full lg:flex-col gap-4">
                              <div className="flex-shrink-0">
                                <span
                                  className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-[10px] bg-appPrimary text-onPrimary">
                                  {renderResourcesIcon(item.messageKey)}
                                </span>
                              </div>
                              <div className="ml-4 md:flex md:flex-1 md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                <div>
                                  <p className="text-base font-medium text-display">
                                    {item.title}
                                  </p>
                                  <p className="mt-1 text-sm text-appSecondary">
                                    {item?.description}
                                  </p>
                                </div>
                                <p className="mt-2 text-sm font-medium text-appPrimary lg:mt-4">
                                  {item?.moreLink}
                                  <span aria-hidden="true"> &rarr;</span>
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
              <Link
                href={"https://simplifytax.iurio.com"}
                target={"_blank"}
                className="tracking-tight text-base font-medium text-display hover:text-appPrimary"
              >
                IURIO
              </Link>
              <Link
                href={"/kontakt"}
                className="tracking-tight text-base font-medium text-display hover:text-appPrimary"
              >
                {contactLinkConfig.title}
              </Link>
              <div className="flex gap-2 items-center">
                {children}
              </div>
            </Popover.Group>
          </div>
        </div>

        <Popover.Panel className="absolute inset-x-0 top-0 z-30 origin-top-right transform transition lg:hidden">
          {({close}) => (
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg">
              <div className="px-4 py-3 md:py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Link
                      href="/"
                      className="flex"
                      onClick={() => close()}
                      aria-label="LawFinder Home"
                    >
                      <LogoFull className="h-6 md:h-8 w-auto"/>
                    </Link>
                  </div>
                  <div className="-my-2 -mr-2">
                    <Popover.Button
                      className="inline-flex items-center justify-center rounded-md bg-white p-2 text-display hover:bg-gray-100 hover:text-display">
                      <span className="sr-only">Close menu</span>
                      <Xmark className="h-4 w-4" aria-hidden="true"/>
                    </Popover.Button>
                  </div>
                </div>
              </div>

              <div className="px-4 py-4">
                <Disclosure>
                  {({open}) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          open ? "text-appPrimary" : "text-display",
                          "group flex items-center justify-center gap-2 w-full rounded-md bg-white text-base font-medium hover:text-appPrimary",
                        )}
                      >
                        <span>{coreCompetenceLinkConfig.title}</span>
                        <ChevronDown
                          className={classNames(
                            open ? "text-appPrimary" : "text-display",
                            "h-3 w-3 group-hover:text-appPrimary fill-current",
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <div className="grid grid-cols-1 gap-4 text-center mt-6">
                          {coreCompetenceLinkConfig.items.map(item => (
                            <Link
                              key={item.messageKey}
                              href={item.href}
                              className="rounded-md text-sm font-medium text-appSecondary hover:text-appPrimary"
                              onClick={() => close()}
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="px-4 py-4">
                <Disclosure>
                  {({open}) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          open ? "text-appPrimary" : "text-display",
                          "group flex items-center justify-center gap-2 w-full rounded-md bg-white text-base font-medium hover:text-appPrimary",
                        )}
                      >
                        <span>{serviceLinkConfig.title}</span>
                        <ChevronDown
                          className={classNames(
                            open ? "text-appPrimary" : "text-display",
                            "h-3 w-3 group-hover:text-appPrimary fill-current",
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <div className="grid grid-cols-1 gap-4 text-center mt-6">
                          {serviceLinkConfig.items.map(item => (
                            <Link
                              key={item.messageKey}
                              href={item.href}
                              className="rounded-md text-sm font-medium text-appSecondary hover:text-appPrimary"
                              onClick={() => close()}
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="py-4 px-4">
                <Disclosure>
                  {({open}) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          open ? "text-appPrimary" : "text-display",
                          "group flex items-center justify-center gap-2 w-full rounded-md bg-white text-base font-medium hover:text-appPrimary",
                        )}
                      >
                        <span>{aboutUsLinkConfig.title}</span>
                        <ChevronDown
                          className={classNames(
                            open ? "text-appPrimary" : "text-display",
                            "h-3 w-3 group-hover:text-appPrimary fill-current",
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <div className="grid grid-cols-1 gap-4 text-center mt-6">
                          {aboutUsLinkConfig.items.map(item => (
                            <Link
                              key={item.messageKey}
                              href={item.href}
                              className="rounded-md text-sm font-medium text-appSecondary hover:text-appPrimary"
                              onClick={() => close()}
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="py-4 px-4">
                <Disclosure>
                  {({open}) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          open ? "text-appPrimary" : "text-display",
                          "group flex items-center justify-center gap-2 w-full outline-0 bg-white text-base font-medium hover:text-appPrimary",
                        )}
                      >
                        <span>{resourcesLinkConfig.title}</span>
                        <ChevronDown
                          className={classNames(
                            open ? "text-appPrimary" : "text-display",
                            "h-3 w-3 group-hover:text-appPrimary fill-current",
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <div className="grid grid-cols-1 gap-4 text-center mt-6">
                          {resourcesLinkConfig.items.map(item => (
                            <Link
                              key={item.messageKey}
                              href={item.href}
                              className="rounded-md text-sm font-medium text-appSecondary hover:text-appPrimary"
                              onClick={() => close()}
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="py-4 px-4">
                <div className="grid grid-cols-1 gap-4 text-center">
                  <a
                    href={"https://simplifytax.iurio.com"}
                    target="_blank"
                    className="rounded-md text-base font-medium text-display hover:text-appPrimary"
                    onClick={() => close()}
                  >
                    IURIO
                  </a>
                </div>
              </div>
              <div className="py-4 px-4">
                <div className="grid grid-cols-1 gap-4 text-center">
                  <Link
                    href={"/kontakt"}
                    className="rounded-md text-base font-medium text-display hover:text-appPrimary"
                    onClick={() => close()}
                  >
                    {contactLinkConfig.title}
                  </Link>
                </div>
              </div>
              <div className="py-4 px-4">
                <div className="grid grid-cols-1 gap-4 text-center">
                  {children}
                </div>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Popover>
    </>
  );
};
