"use client";

import { useState } from "react";
import { fmt, num, percentOf, whatPercent, wholeFromPart } from "@/lib/percent";
import { Block, Field, Hint, Tile } from "./ui";

/** Simplified Chinese version of the three percentage questions. Same maths as the English one (lib/percent.ts). */
export default function PercentCalculatorZh() {
  const [a1, setA1] = useState("15");
  const [b1, setB1] = useState("80");
  const [a2, setA2] = useState("12");
  const [b2, setB2] = useState("80");
  const [a3, setA3] = useState("12");
  const [b3, setB3] = useState("15");

  const r1 = percentOf(num(a1), num(b1));
  const r2 = whatPercent(num(a2), num(b2));
  const r3 = wholeFromPart(num(a3), num(b3));

  return (
    <div className="tool" lang="zh-CN">
      <Block title="求 X 的 Y% 是多少？">
        <div className="fields">
          <Field id="z1a" label="百分比（%）" value={a1} onChange={setA1} />
          <Field id="z1b" label="数字" value={b1} onChange={setB1} />
          <div className="fld">
            {Number.isFinite(r1) ? (
              <Tile hero label={`${fmt(num(b1))} 的 ${fmt(num(a1))}% 是`} value={fmt(r1)} />
            ) : (
              <Hint>请输入两个数字。</Hint>
            )}
          </div>
        </div>
      </Block>
      <Block title="X 占 Y 的百分之几？">
        <div className="fields">
          <Field id="z2a" label="数字（X）" value={a2} onChange={setA2} />
          <Field id="z2b" label="总数（Y）" value={b2} onChange={setB2} />
          <div className="fld">
            {Number.isFinite(r2) ? (
              <Tile hero label={`${fmt(num(a2))} 占 ${fmt(num(b2))} 的`} value={`${fmt(r2, 4)}%`} />
            ) : (
              <Hint>请输入两个数字，Y 不能为 0。</Hint>
            )}
          </div>
        </div>
      </Block>
      <Block title="X 是总数的 Y%，总数是多少？">
        <div className="fields">
          <Field id="z3a" label="数字（X）" value={a3} onChange={setA3} />
          <Field id="z3b" label="百分比（Y%）" value={b3} onChange={setB3} />
          <div className="fld">
            {Number.isFinite(r3) ? (
              <Tile hero label={`${fmt(num(a3))} 是总数的 ${fmt(num(b3))}%，总数为`} value={fmt(r3)} />
            ) : (
              <Hint>请输入两个数字，百分比不能为 0。</Hint>
            )}
          </div>
        </div>
      </Block>
    </div>
  );
}
