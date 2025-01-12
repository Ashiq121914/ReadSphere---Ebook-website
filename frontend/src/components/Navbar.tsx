import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b px-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center flex-col sm:flex-row sm:justify-between justify-center py-4 gap-2">
        <div>
          <Link href={"/"}>
            <div className="flex items-center gap-1">
              <div className="relative ">
                <Hexagon />
                <BookIcon />
              </div>
              <span className="text-xl font-bold uppercase tracking-tight text-primary-500">
                ReadSphere
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={`http://localhost:5173/auth/login`}
            target="_blank"
            className="h-10 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600 active:bg-primary-700"
          >
            Author Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Hexagon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="45"
    height="45"
    viewBox="0 0 24 24"
    fill="#ce7041"
    stroke="#ce7041"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-hexagon"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#ce7041"
    className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
    />
  </svg>
);

export default Navbar;
