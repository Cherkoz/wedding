import { Suspense } from "react";
import { Calendar, Dear, Details, DressCode, FadeIn, Hero, Location, Program, QuestProfile, Taimer, VisitTracker, We } from "./components";
import type { Metadata } from "next";
import guestsData from '@/guests.json';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const familyId = params.familyId as string | undefined;

  let title = "Приглашение на свадьбу";
  let description = "Приглашаем вас разделить с нами радость нашего особенного дня!";

  if (familyId) {
    const family = guestsData.families.find((f) => f.id === familyId);
    if (family) {
      title = `Приглашение на свадьбу для ${family.title}`;

      const familyTitle = family.members.join(", ");
      description = `${familyTitle} приглашаем вас разделить с нами радость нашего особенного дня!`;
    }
  }

  return {
    title,
    description,
    // openGraph: {
    //   title,
    //   description,
    //   images: [
    //     {
    //       url: `https://wedding-silk-ten.vercel.app/assets/images/og-image.jpg`,
    //       width: 1200,
    //       height: 630,
    //     },
    //   ],
    // },
    openGraph: {
      title,
      description,
      images: [
        {
          url: `https://wedding-silk-ten.vercel.app/images/og-image-tg.jpg`,
          width: 800,
          height: 800,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["https://wedding-silk-ten.vercel.app/images/og-image-tg.jpg"],
    },
  };
}

export default function Home() {
  return (
    <main className="max-w-[100vw] overflow-hidden">
      <Suspense fallback={null}>
        <VisitTracker />
      </Suspense>
      <FadeIn>
        <Hero />
      </FadeIn>
      <FadeIn>
        <We />
      </FadeIn>
      <FadeIn>
        <Dear />
      </FadeIn>
      <FadeIn>
        <Calendar />
      </FadeIn>
      <FadeIn>
        <Location />
      </FadeIn>
      <FadeIn className="-z-10 relative">
        <Program />
      </FadeIn>
      <FadeIn>
        <DressCode />
      </FadeIn>
      <FadeIn>
        <Suspense fallback={null}>
          <QuestProfile />
        </Suspense>
      </FadeIn>
      <FadeIn>
        <Details />
      </FadeIn>
      <FadeIn>
        <Taimer />
      </FadeIn>
    </main>
  );
}
