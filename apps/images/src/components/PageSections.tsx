import Link from "next/link";
import { CHECKED, SOURCES, type SourceId } from "@/lib/sources";

export interface Section {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
}

/** Headed text blocks, with an optional list and table, from page data. */
export function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          {s.paragraphs?.map((t) => (
            <p key={t}>{t}</p>
          ))}
          {s.list && (
            <ul>
              {s.list.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          {s.table && (
            <table>
              <thead>
                <tr>
                  {s.table.head.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.table.rows.map((r) => (
                  <tr key={r.join("|")}>
                    {r.map((c, i) =>
                      i === 0 ? (
                        <th key={`${i}-${c}`} scope="row">
                          {c}
                        </th>
                      ) : (
                        <td key={`${i}-${c}`}>{c}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ))}
    </>
  );
}

/** Links to the two guides, shown at the end of every tool page. */
export function GuideLinks() {
  return (
    <>
      <h2>Guides</h2>
      <ul>
        <li>
          <Link href="/guides/reduce-image-size">How to reduce image file size without ruining quality</Link>:
          dimensions, format, quality and metadata, in the order that matters.
        </li>
        <li>
          <Link href="/guides/image-size-limits-on-forms">
            Photo upload rejected? How to hit a 20 KB, 50 KB or 100 KB limit
          </Link>
          : why forms reject photos and how to check the real requirements.
        </li>
      </ul>
    </>
  );
}

/** The sources a page relied on, with the date they were read. */
export function Sources({ ids }: { ids: SourceId[] }) {
  return (
    <>
      <h2>Sources</h2>
      <ul>
        {ids.map((id) => {
          const s = SOURCES[id];
          return (
            <li key={id}>
              <a href={s.url} rel="noopener noreferrer">
                {s.label}
              </a>{" "}
              ({s.for}), checked {CHECKED}.
            </li>
          );
        })}
      </ul>
    </>
  );
}
