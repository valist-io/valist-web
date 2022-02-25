import LicenseItem from "./LicenseItem";

type License = {
  image: string,
  team: string,
  project: string,
  name: string,
  description: string,
}

const mockLicenses:License[] = [
  {
    image: '/images/vCentered.png',
    team: 'area51',
    project: 'FPSGame',
    name: 'SeasonPass',
    description: 'An fps game where the goal of the game is to win the game!',
  },
  {
    image: '/images/vCentered.png',
    team: 'test1',
    project: 'TheGame',
    name: 'GoldPass',
    description: "If you're reading this then you just lost the game.",
  },
  {
    image: '/images/vCentered.png',
    team: 'area51',
    project: 'RPGGame',
    name: 'SeasonPass',
    description: 'An RPG game where you can do RPG stuff!',
  },
  {
    image: '/images/vCentered.png',
    team: 'test1',
    project: 'TheGame',
    name: 'GoldPass',
    description: "If you're reading this then you just lost the game.",
  },
  {
    image: '/images/vCentered.png',
    team: 'area51',
    project: 'RPGGame',
    name: 'SeasonPass',
    description: 'An RPG game where you can do RPG stuff!',
  },
  {
    image: '/images/vCentered.png',
    team: 'area51',
    project: 'FPSGame',
    name: 'SeasonPass',
    description: 'An fps game where the goal of the game is to win the game!',
  },
];

export default function LicenseList() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
      {mockLicenses.map((license: License) => (
        <LicenseItem
          key={license.team + license.project + license.name}
          imgUrl={license.image} 
          name={license.name} 
          team={license.team} 
          project={license.project} 
          description={license.description} 
        />
      ))}
    </div>
  );
};