import {
  Braces,
  Check,
  Database,
  Layers3,
  Sparkles,
  Terminal,
} from "lucide-react";

export function SystemArt() {
  return (
    <div
      className="system-art"
      role="img"
      aria-label="An abstract product architecture connecting frontend, backend, and AI, with a Next.js and TypeScript code card"
    >
      <div className="art-grid" />
      <div className="art-cross cross-one">+</div>
      <div className="art-cross cross-two">+</div>
      <div className="art-coordinates">23.0225° N / 72.5714° E</div>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="floating-tag tag-top">
        <span className="tiny-dot" /> FROM IDEA TO IMPACT
      </div>
      <div className="architecture">
        <div className="architecture-layer layer-top">
          <div>
            <Layers3 size={22} />
            <span>THE EXPERIENCE</span>
          </div>
          <strong>
            Thoughtful frontend<span>01</span>
          </strong>
          <i />
        </div>
        <div className="layer-connector">
          <span />
          <span />
          <span />
        </div>
        <div className="architecture-layer layer-middle">
          <div>
            <Database size={22} />
            <span>THE FOUNDATION</span>
          </div>
          <strong>
            Reliable backend<span>02</span>
          </strong>
          <i />
        </div>
        <div className="layer-connector">
          <span />
          <span />
          <span />
        </div>
        <div className="architecture-layer layer-bottom">
          <div>
            <Sparkles size={22} />
            <span>THE POSSIBILITIES</span>
          </div>
          <strong>
            Practical AI<span>03</span>
          </strong>
          <i />
        </div>
      </div>
      <div className="floating-code">
        <div className="code-title">
          <Terminal size={13} />
          <span>build-something-great.ts</span>
          <span className="code-dots">•••</span>
        </div>
        <div className="code-body">
          <p>
            <span className="line-number">01</span>
            <em>const</em> yourNextIdea = &#123;
          </p>
          <p>
            <span className="line-number">02</span>&nbsp; vision:{" "}
            <span className="code-string">&quot;Something great&quot;</span>,
          </p>
          <p>
            <span className="line-number">03</span>&nbsp; builtWith:{" "}
            <span className="code-string">&quot;Purpose&quot;</span>
          </p>
          <p>
            <span className="line-number">04</span>&#125;;
          </p>
        </div>
        <div className="code-status">
          <Check size={12} />
          <span>Ready to build.</span>
          <Braces size={14} />
        </div>
      </div>
      <div className="art-footnote">
        <span className="tiny-dot" /> FULL STACK. FULL PICTURE.
      </div>
    </div>
  );
}
