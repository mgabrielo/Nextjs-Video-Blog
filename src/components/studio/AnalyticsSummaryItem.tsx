"use client";
interface IAnalyticsSummaryItem {
  value?: string | number;
  subtitle?: string | number;
  className?: string;
}
const AnalyticsSummaryItem = ({
  subtitle,
  value,
  className,
}: IAnalyticsSummaryItem) => {
  return (
    <div
      className={`h-full flex flex-col justify-between p-5 rounded-lg bg-neutral-800 ${className}`}
    >
      <h1 className="text-2xl lg:text-3xl">{value}</h1>
      <p className="font-medium text-stone-500 text-md lg:text-xl break-words">
        {subtitle}
      </p>
    </div>
  );
};

export default AnalyticsSummaryItem;
