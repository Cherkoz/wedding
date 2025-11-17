import { Details, DressCode, Hero, Program, QuestProfile, Taimer, We } from "./components";

export default function Home() {
  return (
    <main>
      <Hero />
      <We />
      <Program />
      <DressCode />
      <QuestProfile />
      <Details />
      <Taimer />
    </main>
  );
}
