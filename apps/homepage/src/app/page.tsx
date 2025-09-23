
import { ExosHeader } from '@/components/header';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-green-500">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <ExosHeader section='about' />
        {/* Intro / Hero */}
        <section className="mt-10 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
          <p className="text-lg leading-relaxed text-green-100/90">
            Software developer and general IT enthusiast. Passionate about
            Software Libre and a GNU/Linux user. Skilled at learning new
            technologies and always seeking constant challenges. Currently,
            I have a Backend Developer profile specializing in Node.js,
            focused on scalable software development and deploying 
            cloud-based architectures.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              href="/contact"
              className="rounded-md border border-green-500/40 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
            >
              Contact
            </a>
            <a
              href="https://github.com/exos"
              className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ogexos/"
              className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
            >
              LinkedIn
            </a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mt-14">
          <h2 className="text-xl font-medium">About</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <p className="text-green-100/90">
                Follower of the bit and byte, old school hakcer (like GNU definition)
                Libre Software and open source enthusiast. I love to learn new technologies and
                always looking for constant challenges. I have a Backend Developer profile
                specialized in Node.js but with dragged knowledge in other tecnologies like 
                Python, PHP, Java and some others. I like to work with scalable software with
                challanged architectures.
            </p>
            <p className="text-green-100/90">
                With other skills, I have experience in Linux server administration,
                databases (MySQL, PostgreSQL, MongoDB), CI/CD pipelines, and cloud platforms
                (AWS, DigitalOcean). I am a proactive person, with a strong commitment to
                quality and continuous improvement. In my free time, I enjoy contributing to
                open source projects and staying updated with the latest trends in technology.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mt-14">
          <h2 className="text-xl font-medium">Skills</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-green-500/20 p-4">
              <h3 className="text-green-300">Backend</h3>
              <p className="mt-2 text-sm text-green-100/80">
                Node.js, Express, Async architectures, relational and !relational 
                databases, REST, RPC, etc. 
              </p>
            </div>
            <div className="rounded-lg border border-green-500/20 p-4">
              <h3 className="text-green-300">GNU/Linux</h3>
              <p className="mt-2 text-sm text-green-100/80">
                GNU/Linux enthusiast, user and administrator. Son of the command line,
                shell scripting, server maintenance, and virtualization.
              </p>
            </div>
            <div className="rounded-lg border border-green-500/20 p-4">
              <h3 className="text-green-300">Cryptography</h3>
              <p className="mt-2 text-sm text-green-100/80">
                I love cryptography, I have experience with encryption algorithms,
                hashing functions, digital signatures, and secure communication protocols.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-green-500/20 pt-6 text-sm text-green-400/70">
          <p>© {new Date().getFullYear()} Exos</p>
        </footer>
      </div>
    </main>
  );
}
