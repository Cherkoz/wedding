import { Calendar, Details, DressCode, Hero, Program, QuestProfile, Taimer, We } from "./components";

export default function Home() {
  return (
    <main>
      <Hero />
      <We />
      <Calendar />
      <Program />
      <DressCode />
      <QuestProfile />
      <Details />
      <Taimer />
    </main>
  );
}
