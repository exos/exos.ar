import { RoundLogo } from "./roundlogo";

export interface ExosHeaderProperties {
  section?: string;
}

function HeaderLink({
  active,
  href,
  name,
}: {
  active?: boolean;
  href: string;
  name: string;
}) {
  console.log("Active why", active);

  return (
    <a
      href={href}
      className={"hover:text-green-300" + (active ? " text-green-300" : "")}
    >
      {name}
    </a>
  );
}

export function ExosHeader(pros: ExosHeaderProperties) {
  const { section } = pros;

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-center gap-4">
        <RoundLogo />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Exos homepage
          </h1>
          <p className="mt-1 text-green-400/80">
            Software Engineer • Buenos Aires, Argentina
          </p>
        </div>
      </div>
      <nav className="flex gap-4 text-sm">
        <HeaderLink href="/" name="About" active={section === "about"} />
        <HeaderLink
          href="/contact"
          name="Contact"
          active={section === "contact"}
        />
      </nav>
    </header>
  );
}
