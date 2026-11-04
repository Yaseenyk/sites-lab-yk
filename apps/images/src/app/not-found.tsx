import Link from "next/link";
import { tools } from "@/site";

export default function NotFound() {
  return (
    <div className="py-20">
      <p className="eyebrow mb-3">404</p>
      <h1 className="page-h1">That page does not exist</h1>
      <p className="lede">The link may be old or mistyped. These tools are one click away:</p>
      <div className="related">
        {tools.slice(0, 4).map((t) => (
          <Link key={t.slug} href={t.path}>
            {t.h1}
          </Link>
        ))}
      </div>
    </div>
  );
}
