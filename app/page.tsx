import { Suspense } from "react";
import { Calendar, Dear, Details, DressCode, Hero, Location, Program, QuestProfile, Taimer, VisitTracker, We } from "./components";

export default function Home() {
  return (
    <main className="max-w-[100vw] overflow-hidden">
      <Suspense fallback={null}>
        <VisitTracker />
      </Suspense>
      <Hero />
      <We />
      <Dear />
      <Calendar />
      <Location />
      <Program />
      <DressCode />
      <QuestProfile />
      <Details />
      <Taimer />
    </main>
  );
}
