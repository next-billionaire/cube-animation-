export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between pointer-events-auto mix-blend-difference">
      <div className="font-mono text-xl tracking-tight text-white uppercase font-bold">
        Brand
      </div>
      <div className="text-white/70 text-sm font-sans tracking-wide uppercase">
        Menu
      </div>
    </nav>
  );
}
