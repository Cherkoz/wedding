import { Calendar, Dear, Details, DressCode, Hero, Location, Program, QuestProfile, Taimer, We } from "./components";

export default function Home() {
  return (
    <main>
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
