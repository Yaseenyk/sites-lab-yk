import { CLARITY_ID } from "./config";

/**
 * Microsoft Clarity (heatmaps and session recordings). Off until NEXT_PUBLIC_CLARITY_ID is set.
 * In the Clarity dashboard set Settings > Masking > Strict for these sites: they promise that what a visitor types
 * or drops into a tool stays on their device, and a recording of the screen must not capture it.
 */
export function ClarityScript() {
  if (!CLARITY_ID) {
    return null;
  }
  const code = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(CLARITY_ID)});`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
