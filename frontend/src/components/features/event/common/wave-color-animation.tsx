"use client";

export default function WaveFooter() {
  return (
    <div className="sticky bottom-0 left-0 w-full">
      <svg
        className="color-changing-waves bottom-0 m-0 block h-12 max-h-screen w-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use
            xlinkHref="#gentle-wave"
            x="50"
            y="0"
            className="animate-wave wave-1"
          />
          <use
            xlinkHref="#gentle-wave"
            x="50"
            y="3"
            className="animate-wave-slow wave-2"
          />
          <use
            xlinkHref="#gentle-wave"
            x="50"
            y="6"
            className="animate-wave-slower wave-3"
          />
        </g>
      </svg>

      <style jsx>{`
        @keyframes colorCycle {
          0% {
            fill: #b9dfdb;
          }
          20% {
            fill: #ccdfb9;
          }
          40% {
            fill: #fff6b1;
          }
          60% {
            fill: #ffd3b1;
          }
          80% {
            fill: #c7b1ff;
          }
          100% {
            fill: #b9dfdb;
          }
        }

        :global(.wave-1) {
          opacity: 0.8;
          fill: #b9dfdb;
          animation:
            moveForever 12s linear infinite,
            colorCycle 15s infinite;
        }

        :global(.wave-2) {
          opacity: 0.5;
          fill: #b9dfdb;
          animation:
            moveForever 5s linear infinite -2s,
            colorCycle 15s infinite;
        }

        :global(.wave-3) {
          opacity: 0.2;
          fill: #b9dfdb;
          animation:
            moveForever 3s linear infinite -4s,
            colorCycle 15s infinite;
        }

        @keyframes moveForever {
          0% {
            transform: translate(-90px, 0%);
          }
          100% {
            transform: translate(85px, 0%);
          }
        }
      `}</style>
    </div>
  );
}
