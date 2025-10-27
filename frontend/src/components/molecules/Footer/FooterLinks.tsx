interface FooterLink {
  href: string;
  label: string;
  onClick?: () => void;
}

interface FooterLinksProps {
  title: string;
  links: FooterLink[];
  twoColumns?: boolean;
}

export function FooterLinks({
  title,
  links,
  twoColumns = false,
}: FooterLinksProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: FooterLink
  ) => {
    e.preventDefault();

    // If onClick handler is provided, call it
    if (link.onClick) {
      link.onClick();
      return;
    }

    // Otherwise handle anchor links (starting with #)
    if (link.href.startsWith("#")) {
      const element = document.querySelector(link.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <ul className={`space-y-1 ${twoColumns ? "grid grid-cols-2 w-50" : ""}`}>
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => handleClick(e, link)}
              className="text-gray-400 hover:text-sky-400 transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
