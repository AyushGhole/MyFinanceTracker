// src/components/CategorySelect.jsx

import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function CategorySelect({ selected, setSelected }) {
  const categories = [
    { name: "🥗 Food" },
    { name: "🚗 Transport" },
    { name: "🏠 Housing" },
    { name: "🎉 Entertainment" },
    { name: "📚 Education" },
    { name: "🛍️ Shopping" },
    { name: "💊 Health" },
    { name: "🧾 Other" },
  ];

  return (
    <div className="w-full relative">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="w-full rounded bg-white/80 px-4 py-2 text-left">
            {selected?.name || "Select category"}
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1">
            <Listbox.Options
              className="
                absolute bottom-full mb-2 w-full rounded bg-white/90 shadow-lg z-10
              ">
              {categories.map((cat) => (
                <Listbox.Option
                  key={cat.name}
                  value={cat}
                  className="px-4 py-2 hover:bg-purple-200 cursor-pointer">
                  {cat.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
