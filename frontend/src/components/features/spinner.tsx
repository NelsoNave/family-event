type SpinnerProps = {
  color: string;
};

export default function Spinner({ color }: SpinnerProps) {
  return (
    <div className="flex w-full h-20 justify-center items-center">
      <div>
        <div
          className={`animate-spinner h-3 w-3 rounded-full border-t-transparent text-[10px] ${color} will-change-transform`}
        ></div>
      </div>
    </div>
  );
}
