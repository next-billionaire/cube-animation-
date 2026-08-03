export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between pointer-events-auto">
      <div className="font-space-grotesk text-xl tracking-tight text-white uppercase font-bold flex flex-col leading-none">
        <span>BRAND</span>
        <span className="text-[#DCA92A]">MASALA<span className="text-[#FF3B30]">.</span></span>
      </div>
      <div className="text-white/70 text-sm font-sans tracking-wide uppercase">
        Menu
      </div>
    </nav>
  );
}
