import { Suspense } from "react";
import { Calendar, Dear, Details, DressCode, FadeIn, Hero, Location, Program, QuestProfile, Taimer, VisitTracker, We } from "./components";

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
      {/* <FadeIn>
        <Location />
      </FadeIn> */}
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
