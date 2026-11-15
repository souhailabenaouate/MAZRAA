export default function Logo({ size = 40, showName = true }: { size?: number; showName?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <img src="/assets/logo-mark.png" alt="MAZRA'A" style={{ height: size }} className="logo w-auto" />
      {showName && <span className="whitespace-nowrap text-sm font-extrabold tracking-wide text-brown min-[400px]:text-base sm:text-xl">MAZRA'A</span>}
    </div>
  )
}
