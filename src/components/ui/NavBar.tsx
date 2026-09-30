export type NavItem = {
  label: string;
  href: string;
};

type NavBarProps = {
  brand: string;
  brandHref?: string;
  items?: NavItem[];
};

export function NavBar({
  brand,
  brandHref = '#main-content',
  items = [],
}: NavBarProps) {
  return (
    <header className="nav-bar">
      <a className="nav-bar__brand" href={brandHref}>
        {brand}
      </a>
      {items.length > 0 && (
        <nav className="nav-bar__links" aria-label="Main navigation">
          {items.map((item) => (
            <a className="nav-bar__link" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
