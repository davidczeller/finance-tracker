export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      {children}
      <style jsx>{`
        .container {
          display: grid;
          place-items: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}

export function InnerContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="inner-container">
      {children}
      <style jsx>{`
        .inner-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 400px;
          margin: 2rem auto;
          padding: 1rem;
          min-height: 240px;
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input className="input" {...props} />
      <style jsx>{`
        .input {
          flex: 1;
          height: 40px;
          padding: 0.5rem 0.75rem;
          background-color: white;
          border: 1px solid hsl(240 6% 90%);
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-family: system-ui;
          transition: all 150ms;
          color: hsl(240 10% 3.9%);
        }
        .input:focus {
          outline: none;
          border-color: hsl(240 5.9% 50%);
          ring: 2px hsl(240 5% 64.9%);
          ring-offset: 2px;
        }
        .input::placeholder {
          color: hsl(240 4.8% 45.9%);
        }
        .input:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}</style>
    </>
  );
}

export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <button className="button" {...props}>
        {children}
      </button>
      <style jsx>{`
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          padding: 0 1rem;
          background-color: hsl(240 5.9% 10%);
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
          transition: all 150ms;
          cursor: pointer;
          border: none;
          position: relative;
        }
        .button:hover {
          background-color: hsl(240 5.9% 20%);
        }
        .button:focus {
          outline: none;
          box-shadow: 0 0 0 2px hsl(240 5% 64.9%);
        }
        .button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}</style>
    </>
  );
}
