export function Spinner() {
  return (
    <>
      <div className="spinner" />
      <style jsx>{`
        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid #ffffff;
          border-bottom-color: transparent;
          border-radius: 50%;
          display: inline-block;
          animation: rotation 1s linear infinite;
          position: absolute;
          left: 1rem;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
} 