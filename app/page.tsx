"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "@/redux/contactsOps";
import { selectFilteredContacts } from "@/redux/selectors";
import { RootState, AppDispatch } from "@/redux/store";

interface Contact {
  id: string;
  name: string;
  imageUrl: string;
}

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector<RootState, Contact[] | null>(
    selectFilteredContacts
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchContacts())
      .unwrap()
      .finally(() => setLoading(false));
  }, [dispatch]);
  const skeletonItems = Array.from({ length: 6 });

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-50">
      <h1 className="mb-10 text-center text-5xl font-bold tracking-tight">
        Character Queue
      </h1>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6">
        {loading
          ? skeletonItems.map((_, i) => (
              <div
                key={i}
                className="skeleton h-64 w-full overflow-hidden rounded-2xl"
              />
            ))
          : contacts?.map((c, index) => (
              <div
                key={c.id}
                className="group relative h-64 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={c.imageUrl}
                  alt={c.name}
                  className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/500?text=No+Image")
                  }
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-900/80 to-transparent p-4 text-center">
                  <h2 className="text-xl font-semibold tracking-tight">
                    {c.name}
                  </h2>
                  {index === 0 && (
                    <span className="mt-2 inline-block rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                      In progress
                    </span>
                  )}
                </div>
              </div>
            ))}
      </div>
    </main>
  );
}
