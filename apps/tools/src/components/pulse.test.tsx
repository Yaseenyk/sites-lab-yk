import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PulseScript } from "../../../../packages/shell/src/PulseScript";

describe("PulseScript", () => {
  it("renders one deferred tracker script tagged with the site host", () => {
    const { container } = render(<PulseScript host="tools.streamerosai.com" />);
    const scripts = container.querySelectorAll("script");
    expect(scripts).toHaveLength(1);
    const script = scripts[0];
    expect(script?.getAttribute("src")).toBe("https://pulse.yaseenyk.workers.dev/p.js");
    expect(script?.hasAttribute("defer")).toBe(true);
    expect(script?.getAttribute("data-site")).toBe("tools.streamerosai.com");
  });
});
