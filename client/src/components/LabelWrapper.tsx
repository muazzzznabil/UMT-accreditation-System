/* eslint-disable @typescript-eslint/no-explicit-any */

interface LabelWrapperProps {
  children: React.ReactNode;
  label: string;
  labelId: string;
  className?: string;
  containerClass?: string;
}

const LabelWrapper: React.FC<LabelWrapperProps> = ({
  children,
  label,
  labelId,
  className,
  containerClass,
}) => {
  return (
    <div className={`flex  items-center w-full ${containerClass}`}>
      <label htmlFor={labelId} className={`label-input-msa ${className}`}>
        {label}
      </label>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default LabelWrapper;
