type ProfileStatBoxProps = {
  stat: number;
  label: string;
};

export default function ProfileStatBox({ stat, label }: ProfileStatBoxProps) {
  return (
    <div className="bg-bg-light py-4 px-12 rounded-md shadow-xl flex flex-col items-center justify-center border border-border-muted">
      <h2 className="font-bold text-primary text-2xl">{stat}</h2>
      <p className="text-text-muted">{label}</p>
    </div>
  );
}
