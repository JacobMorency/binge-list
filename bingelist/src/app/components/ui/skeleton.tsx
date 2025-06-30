type SkeletonProps = {
  className?: string;
};
const defaultStyles = "w-full h-24 bg-bg-light rounded-md";

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div className="animate-pulse">
      <div className={className ? className : defaultStyles}></div>
    </div>
  );
}
