import { IdCard, LockKeyholeOpen } from "lucide-react";

export function DownloadButtons() {
  return (
    <section className="mt-10 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
      <h2 className="text-lg font-semibold text-green-500">Download</h2>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <a
          href="/downloads/exos.vcard"
          className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
        >
          <IdCard className="mr-1 inline h-4 w-4" />
          Download vCard
        </a>
        <a
          href="/downloads/exos.asc"
          className="rounded-md border border-green-500/10 bg-green-500/10 px-3 py-1.5 hover:border-green-300 hover:text-green-300"
        >
          <LockKeyholeOpen className="mr-1 inline h-4 w-4" />
          Download PGP
        </a>
      </div>
    </section>
  );
}
