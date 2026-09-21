import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUp,
  FileText,
  Github,
  GraduationCap,
  Mail,
  Menu,
  MessageCircle,
  Tv,
  X,
} from 'lucide-react';
import {
  awards,
  contactLinks,
  education,
  profile,
  projects,
  research,
} from './content';

const contactIcons = {
  email: Mail,
  github: Github,
  zhihu: MessageCircle,
  bilibili: Tv,
  scholar: GraduationCap,
  cv: FileText,
};

function ResourceLink({ href, children, className = '' }) {
  if (!href) return null;
  const isEmail = href.startsWith('mailto:');

  return (
    <a
      className={`text-link ${className}`.trim()}
      href={href}
      target={isEmail ? undefined : '_blank'}
      rel={isEmail ? undefined : 'noreferrer'}
    >
      {children}
    </a>
  );
}

function SectionHeading({ number, title, id }) {
  return (
    <div className="section-heading">
      <span className="section-number" aria-hidden="true">
        {String(number).padStart(2, '0')}
      </span>
      <h2 id={id}>{title}</h2>
      <span className="section-rule" aria-hidden="true" />
    </div>
  );
}

function ContactLinks() {
  const visibleLinks = contactLinks.filter(link => link.href);
  if (visibleLinks.length === 0) return null;

  return (
    <div className="socials" aria-label="Contact and profiles">
      {visibleLinks.map(link => {
        const Icon = contactIcons[link.id];
        return (
          <ResourceLink href={link.href} key={link.id}>
            {Icon && <Icon size={21} strokeWidth={1.6} aria-hidden="true" />}
            <span>{link.label}</span>
          </ResourceLink>
        );
      })}
    </div>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);

  const navigation = useMemo(
    () => [
      ...(research.length > 0 ? [{ label: 'Research', id: 'research' }] : []),
      ...(education.length > 0 || awards.length > 0
        ? [{ label: 'Background', id: 'background' }]
        : []),
      ...(projects.length > 0 ? [{ label: 'Projects', id: 'projects' }] : []),
    ],
    [],
  );

  const sectionNumber = id => navigation.findIndex(item => item.id === id) + 1;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 320);
      const visibleSections = navigation.filter(({ id }) => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= 180;
      });
      const atBottom =
        window.scrollY > 100 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      setActiveSection(
        atBottom ? navigation.at(-1)?.id ?? '' : visibleSections.at(-1)?.id ?? '',
      );
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    document.querySelectorAll('[data-reveal]').forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('reveal-ready');
      }
      observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [navigation]);

  useEffect(() => {
    const closeOnEscape = event => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="header">
        <div className="header-inner container">
          <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}>
            {profile.name}
            <span className="wordmark-dot">.</span>
          </a>
          <button
            ref={menuButton}
            className="menu-button icon-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen(value => !value)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
          <nav
            id="navigation"
            className={menuOpen ? 'navigation is-open' : 'navigation'}
            aria-label="Main navigation"
          >
            {navigation.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="container">
        <section id="top" className="intro" aria-labelledby="page-title">
          <div className="portrait">
            <img src={profile.image} alt={profile.imageAlt} />
          </div>
          <div className="identity">
            <h1 id="page-title">{profile.name}</h1>
            <p className="role">
              {profile.role}
              <span className="separator"> / </span>
              {profile.field}
            </p>
            <p className="affiliation">{profile.affiliation}</p>
            <p className="location">{profile.location}</p>
          </div>
          <div className="introduction">
            <p className="bio">{profile.introduction}</p>
            <ContactLinks />
          </div>
        </section>

        {research.length > 0 && (
          <section
            id="research"
            className="section research"
            aria-labelledby="research-heading"
            data-reveal
          >
            <SectionHeading
              number={sectionNumber('research')}
              title="Research"
              id="research-heading"
            />
            <div className="research-list">
              {research.map(item => (
                <article className="research-item" key={item.id ?? item.title}>
                  {item.category && <p className="eyebrow">{item.category}</p>}
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </div>
                  {item.links?.length > 0 && (
                    <div className="item-links">
                      {item.links.map(link => (
                        <ResourceLink href={link.href} key={link.label}>
                          {link.label} <ArrowRight size={18} aria-hidden="true" />
                        </ResourceLink>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {(education.length > 0 || awards.length > 0) && (
          <section
            id="background"
            className="section background"
            aria-labelledby="background-heading"
            data-reveal
          >
            <SectionHeading
              number={sectionNumber('background')}
              title="Background"
              id="background-heading"
            />
            <div className="background-grid">
              {education.length > 0 && (
                <div className="education">
                  <h3 className="subheading">Education</h3>
                  <ol className="education-list">
                    {education.map(item => (
                      <li key={item.id}>
                        <div className="education-top">
                          <h4>
                            {item.degree}
                            {item.status && <span> · {item.status}</span>}
                          </h4>
                          <span className="dates">{item.dates}</span>
                        </div>
                        <p className="field">{item.field}</p>
                        <p className="institution">{item.institution}</p>
                        <p>{item.location}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {awards.length > 0 && (
                <div className="awards">
                  <h3 className="subheading">Selected Awards</h3>
                  <ul className="awards-list">
                    {awards.map(award => (
                      <li key={`${award.name}-${award.context}`}>
                        <h4>{award.name}</h4>
                        <p>
                          <span className="award-detail">{award.detail}</span>
                          <span className="award-context">{award.context}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section
            id="projects"
            className="section projects"
            aria-labelledby="projects-heading"
            data-reveal
          >
            <SectionHeading
              number={sectionNumber('projects')}
              title="Projects"
              id="projects-heading"
            />
            {projects.map((project, index) => (
              <article className="project" key={project.name}>
                <span className="project-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="project-body">
                  <h3>
                    {project.name}
                    <span className="project-subtitle">{project.subtitle}</span>
                  </h3>
                  <p>{project.description}</p>
                </div>
                <div className="project-links">
                  <ResourceLink href={project.websiteUrl}>
                    Project website <ArrowRight size={18} aria-hidden="true" />
                  </ResourceLink>
                  <ResourceLink href={project.codeUrl}>
                    GitHub <ArrowRight size={18} aria-hidden="true" />
                  </ResourceLink>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <footer className="footer container">
        <p>
          {profile.name} <span aria-hidden="true">/</span> 3D Vision
        </p>
        <a href="#top">
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </footer>

      <a
        className={`back-top icon-button ${scrolled ? 'shown' : ''}`}
        href="#top"
        aria-label="Back to top"
        tabIndex={scrolled ? 0 : -1}
      >
        <ArrowUp size={21} aria-hidden="true" />
      </a>
    </>
  );
}
