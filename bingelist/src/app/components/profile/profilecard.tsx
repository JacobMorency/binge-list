type ProfileCardProps = {
  title: string;
  content: string;
  subcontent?: string;
};

export default function ProfileCard({
  title,
  content,
  subcontent,
}: ProfileCardProps) {
  return (
    <div className="bg-bg-light p-4 rounded-md shadow-xl border border-border-muted">
      <h2 className="font-bold text-text text-2xl">{title}</h2>
      <div className="flex justify-between mt-2">
        <p className="text-text">{content}</p>
        <p className="text-text-muted">{subcontent}</p>
      </div>
    </div>
  );
}
