/**
 * Chrome's Google Translate replaces text nodes with <font> elements. React still holds the old nodes, so its next
 * removeChild/insertBefore throws ("The node to be removed is not a child of this node") and the tool stops updating.
 * This patch, run in <head> before hydration, turns those two calls into no-ops when the node has been moved.
 */
export const TRANSLATE_GUARD_JS =
  "(function(){if(typeof Node!=='function'||!Node.prototype)return;var r=Node.prototype.removeChild;Node.prototype.removeChild=function(c){if(c.parentNode!==this){return c;}return r.apply(this,arguments);};var i=Node.prototype.insertBefore;Node.prototype.insertBefore=function(n,ref){if(ref&&ref.parentNode!==this){return i.call(this,n,null);}return i.apply(this,arguments);};})();";

export function TranslateGuard() {
  return <script dangerouslySetInnerHTML={{ __html: TRANSLATE_GUARD_JS }} />;
}
