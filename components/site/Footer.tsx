import { CookieSettingsLink } from './CookieSettingsLink'

export const Footer = () => (
  <footer className="relative">
    <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent)/0.4) 35%, hsl(var(--accent)/0.2) 65%, transparent)' }} />
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 45% at 50% 0%, hsl(var(--accent)/0.07), transparent 65%)' }} />
    <div className="container mx-auto px-5 sm:px-8 py-16 sm:py-20 relative">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="text-[14px] font-semibold tracking-tight">
              Delko
            </span>
          </div>
          <p className="text-[15px] text-muted-foreground max-w-sm leading-relaxed">
            Google profiles, websites, reviews, lead capture, and text/email follow-up for local businesses across the North Shore and Berkshire County, MA.
          </p>
        </div>

        <div className="lg:col-span-3">
          <div className="text-[10px] font-bold font-mono uppercase tracking-[0.22em] text-muted-foreground mb-5">Explore</div>
          <ul className="space-y-3 text-[14px]">
            {[
              { label: 'Services', href: '/services' },
              { label: 'Projects', href: '/projects' },
              { label: 'About', href: '/about' },
              { label: 'Packages', href: '/#packages' },
              { label: 'Free Visibility Audit', href: '/#audit' },
              { label: 'Client Portal', href: '/portal/login' },
            ].map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="text-muted-foreground hover:text-accent transition-colors duration-200">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <div className="text-[10px] font-bold font-mono uppercase tracking-[0.22em] text-muted-foreground mb-5">We Serve</div>
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            Pittsfield, Lenox, Stockbridge, Great Barrington, Williamstown, North Adams, Marblehead, Salem, Gloucester, Beverly & everywhere in between.
          </p>
        </div>
      </div>

      <div className="hairline mt-14 mb-6" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-muted-foreground">
        <div>© {new Date().getFullYear()} Delko. All rights reserved.</div>
        <div className="flex items-center gap-5">
          <CookieSettingsLink />
          <span className="font-mono tracking-wider">42.5584° N — 70.8800° W</span>
        </div>
      </div>
    </div>
  </footer>
)
