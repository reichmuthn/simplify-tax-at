'use client';
import React, {useEffect, useState, useTransition} from 'react'
import {Disclosure} from '@headlessui/react'
import {usePathname, useRouter} from './localeConfig';
import {Germany, Russia, UnitedKingdom} from "@/assets/languageFlags/LanguageFlags";
import {ChevronDown} from "@ui/components/icons/ClassicRegularIcons";

type Props = {
  defaultValue: string;
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const languages = [
  {id: 1, name: 'DE', flag: Germany},
  {id: 2, name: 'EN', flag: UnitedKingdom},
  {id: 3, name: 'RU', flag: Russia},
]
export default function LocaleSwitcherSelect({
                                               defaultValue,
                                             }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const [selectedLanguage, setSelectedLanguage] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue)
      setSelectedLanguage(defaultValue);
  }, [defaultValue])

  function onSelectChange(locale: string) {
    startTransition(() => {
      router.replace(
        pathname,
        {locale}
      );
    });
  }

  const renderCurrentLanguage = () => {
    const language = languages.find(x => x.name === selectedLanguage?.toUpperCase());

    if (language)
      return <language.flag className={"w-auto h-3.5"}/>;
      //return language.name;
  }

  return (
    <Disclosure >
      {({open, close}) => (
        <div className="lg:relative space-y-6">
          <Disclosure.Button className={classNames(
            open ? "text-appPrimary" : "text-display",
            "group flex items-center justify-center gap-2 w-full rounded-md bg-surface-1 text-base font-medium hover:text-appPrimary",
          )}>
            {renderCurrentLanguage()}
            <ChevronDown
              className={classNames(
                open ? "text-appPrimary" : "text-display",
                "h-3 w-3 group-hover:text-appPrimary fill-current",
              )}
              aria-hidden="true"
            />
          </Disclosure.Button>
          <Disclosure.Panel
            className={"mt-4 lg:absolute lg:top-5 lg:bg-surface-1 lg:p-4 lg:rounded-md lg:shadow space-y-4"}>
            {languages.map((language) => (
              <div
                key={language.id}
                className="text-sm text-secondary hover:text-appPrimary font-medium lg:text-display lg:text-base cursor-pointer items-center"
                onClick={() => {
                  onSelectChange(language.name?.toLowerCase())
                }}
              >
                <language.flag className={"h-3.5 inline-flex"}/>
              </div>
            ))}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}