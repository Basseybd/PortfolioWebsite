import type React from "react";

type Props = {
  title: string;
  intro?: React.ReactNode;
  dark?: boolean;
  id?: string;
};

export default function SectionHead({ title, intro, dark, id }: Props) {
  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-x-12">
      <h2
        id={id}
        className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.015em] sm:text-[3.25rem] lg:col-span-4"
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`max-w-[34rem] text-[1.125rem] leading-relaxed lg:col-span-7 lg:col-start-6 lg:pt-3 ${
            dark ? "text-smoke" : "text-stone"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
