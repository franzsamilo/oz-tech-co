import type { PortableTextBlock } from "@portabletext/types";
import type { BlogAuthor, BlogPost } from "@/lib/sanity/types";
import { teamMembers } from "@/data/teamMembers";

/**
 * Sample Field Notes content.
 *
 * Renders the full blog UI before a Sanity project is connected. Once
 * NEXT_PUBLIC_SANITY_PROJECT_ID is set and posts are published, real Sanity
 * content takes over automatically (see lib/blog/data.ts).
 */

export const sampleAuthors: BlogAuthor[] = teamMembers.map((m) => ({
  _id: `author-${m.slug}`,
  name: m.name,
  slug: m.slug,
  role: m.title,
  bio: m.bio,
  motto: m.motto,
  photo: null,
  photoUrl: m.image,
}));

function authorBySlug(slug: string): BlogAuthor {
  const found = sampleAuthors.find((a) => a.slug === slug);
  if (!found) throw new Error(`Unknown sample author slug: ${slug}`);
  return found;
}

// ---- Portable Text helpers -------------------------------------------------

let keyCounter = 0;
const nextKey = () => `k${(keyCounter += 1)}`;

function p(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: nextKey(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: nextKey(), text, marks: [] }],
  } as PortableTextBlock;
}

/** Paragraph with mixed inline marks (bold / italic / link). */
function pMix(
  parts: Array<{ text: string; bold?: boolean; italic?: boolean; href?: string; code?: boolean }>
): PortableTextBlock {
  const markDefs: Array<{ _key: string; _type: string; href: string }> = [];
  const children = parts.map((part) => {
    const marks: string[] = [];
    if (part.bold) marks.push("strong");
    if (part.italic) marks.push("em");
    if (part.code) marks.push("code");
    if (part.href) {
      const k = nextKey();
      markDefs.push({ _key: k, _type: "link", href: part.href });
      marks.push(k);
    }
    return {
      _type: "span",
      _key: nextKey(),
      text: part.text,
      marks,
    };
  });
  return {
    _type: "block",
    _key: nextKey(),
    style: "normal",
    markDefs,
    children,
  } as PortableTextBlock;
}

function h2(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: nextKey(),
    style: "h2",
    markDefs: [],
    children: [{ _type: "span", _key: nextKey(), text, marks: [] }],
  } as PortableTextBlock;
}

function quote(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: nextKey(),
    style: "blockquote",
    markDefs: [],
    children: [{ _type: "span", _key: nextKey(), text, marks: [] }],
  } as PortableTextBlock;
}

function code(language: string, codeStr: string): PortableTextBlock {
  return {
    _type: "code",
    _key: nextKey(),
    language,
    code: codeStr,
  } as unknown as PortableTextBlock;
}

type ImgOpts = {
  caption?: string;
  ratio?: "wide" | "tall" | "square" | "auto";
  frame?: "photo" | "screenshot";
};

function img(url: string, alt: string, opts: ImgOpts = {}): PortableTextBlock {
  return {
    _type: "urlImage",
    _key: nextKey(),
    url,
    alt,
    caption: opts.caption,
    ratio: opts.ratio ?? "wide",
    frame: opts.frame ?? "photo",
  } as unknown as PortableTextBlock;
}

// ---- Posts -----------------------------------------------------------------

export const samplePosts: BlogPost[] = [
  {
    _id: "post-design-soul",
    title: "Basic design isn't a taste problem. It's a writing problem.",
    slug: "basic-design-is-a-writing-problem",
    excerpt:
      "Why some builds come out feeling like themselves and others come out basic. It was never taste — it was whether I'd written the soul of the thing down before I touched a pixel.",
    publishedAt: "2026-06-02T09:00:00.000Z",
    featured: true,
    tags: ["Design", "Process", "Frontend"],
    coverImage: null,
    coverImageUrl: "/blog1/cover-soul.jpg",
    author: authorBySlug("franz-samilo"),
    body: [
      p(
        "I've shipped a fair number of sites I'm proud of, and a handful that came out basic — and for years I couldn't have told you the difference in advance. Same stack, same care, same component library. One would feel like itself. The next would feel like a nice template with the client's logo dropped on top."
      ),
      p(
        "It took shipping enough of the second kind to see the pattern. The basic ones were always the projects where I went straight to the screen — opened the file, picked a font and a palette, dropped in some cards, and arranged things until they looked tidy. The good ones had a boring artifact in common: somewhere at the start, before any pixels, I'd opened a plain doc and written out what the thing actually was. Who it's for. What they should feel walking in. What would be embarrassing to ship. I'd been doing the real design work in a text file and not clocking it as design work."
      ),
      p(
        "The shorthand I tell myself now is short enough to be useful: if I can't name in one sentence what this product should feel like to its first user, anything I draw after that is decoration. The design isn't waiting on tools. It's waiting on a sentence."
      ),
      h2("Write the soul down before you design a thing"),
      p(
        "Mentoria is the cleanest example I've got. It's an AI mentor for curious 8-to-11-year-olds, and the whole promise is that it pays attention instead of trying to entertain — no streaks, no leaderboards, a quiet Sunday letter to the parent instead of a dashboard of metrics. Before I touched a single color I wrote a page: arrives skeptical (another screen-time app?), should leave trusting (these people actually thought about my kid), and a blunt list of what it must NOT be — not a cartoon kids' app, not clinical edtech, not surveillance wearing a parent-dashboard costume."
      ),
      p(
        "That page wasn't a strategy doc — it was the shortest thing I could write that would still embarrass me later if I betrayed it. Who walks in, carrying what. Who walks out, carrying what. Three or four adjacent products this is NOT, named explicitly so the design has something to push against. One sentence on what the product is for, in user words, not founder words. Half a page total, and every design decision after it had a sentence to answer to."
      ),
      p(
        "That page is the soul, and once it exists every design decision is downstream of a sentence in it. “Not a cartoon kids' app” is why the display face is an editorial serif and the background is warm paper instead of candy. “Not surveillance” is why the parent email stayed a short letter instead of a dashboard. None of that was taste — it was answering lines I'd already written down."
      ),
      img(
        "/blog1/Screenshot 2026-06-02 201149.png",
        "Mentoria homepage hero with the headline 'Where kids meet themselves' over a warm cream background, with a scrapbook-style screenshot of an AI chat session and a weekly digest card.",
        {
          frame: "screenshot",
          ratio: "wide",
          caption:
            "Mentoria homepage. “Arrives skeptical, leaves trusting” — rendered into pixels.",
        }
      ),
      code(
        "css",
        `/* Before — defaults. Tidy. Also indistinguishable from everyone else. */
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* After — every line answers a sentence in the brief.
   "considered, hand-made, NOT clinical" becomes: */
.card {
  background: #FBF7F0;             /* warm paper, never plain white */
  border: 1.5px solid #1A1A17;     /* drawn on, not floating */
  box-shadow: 4px 4px 0 #1A1A17;   /* taped down — hard offset, no blur */
  border-radius: 4px;              /* barely rounded, made by hand */
  transform: rotate(-0.6deg);      /* placed, not auto-laid-out */
}`
      ),
      p(
        "The basic card and the soul card up there cost the same effort. The only difference is whether a sentence existed to aim each property at. And once a value can name the line it came from, design review stops being a fight about taste — “should the accent be brighter?” turns into “does brighter still read as calm-and-growing, or does it tip into fun?” — and the page answers it."
      ),
      img(
        "/blog1/Screenshot 2026-06-02 201203.png",
        "Mentoria chat interface styled like a paper card, with a green 'live' indicator, monospace header reading MENTORIA · PLAZA · L9, and warm taped-down message bubbles between Sage and Alex.",
        {
          frame: "screenshot",
          ratio: "square",
          caption:
            "Inside a Plaza session. The card has a hard ink border, an offset shadow, and zero plastic.",
        }
      ),
      h2("The brief makes design reviews boring (which is the point)"),
      p(
        "The hidden tax of working without a brief is that every review becomes a vibe argument. The client says the accent should pop more. You say it shouldn't. Neither of you can produce the underlying reason, so whoever cares most that day wins. That's how a calm product gets a louder homepage every quarter for two years and ends up looking like the thing it was trying not to be."
      ),
      p(
        "When the brief exists, the same conversation has somewhere to land. Brighter accent — does this still read as attention without entertainment, or does it tip into fun, which we said we weren't? Bigger headline — does it still feel like a real person wrote it, or does it shout? The disagreement gets specific. Often it ends with the brief being wrong rather than the client being wrong, which is its own kind of useful — the soul gets sharper because someone tested it."
      ),
      img(
        "/blog1/Screenshot 2026-06-02 201214.png",
        "Mentoria 'six months in' stats section showing 87% of parents heard a quest at the dinner table, 2.3× more real-world action by week six, 14 minutes median session length, and 0 leaderboards or streaks.",
        {
          frame: "screenshot",
          ratio: "wide",
          caption:
            "The numbers we picked to watch were picked by the brief, not by what was easy to measure.",
        }
      ),
      h2("The brief is also how you say no without sounding precious"),
      p(
        "There's a second job the brief does that I didn't see for years: it's how you say no."
      ),
      p(
        "Every product has a moment around week three where someone asks for something that breaks the soul. A streak system. An animated mascot. A live counter on the homepage. The asker is usually right that the feature would lift a number — they're optimizing one thing. The brief is the thing they're optimizing against, even if nobody in the meeting has named it that way."
      ),
      p(
        "Without a brief, “no” sounds like taste. You can hear yourself sounding precious — “I just don't think it fits” — and precious is hard to defend, so the streak system goes in. Six months later the product feels like the thing the brief was written to avoid, and nobody can point at the meeting where it started becoming that."
      ),
      p(
        "With a brief, “no” is a contract. “We said attention without entertainment. Streaks are entertainment optimizing for return visits — we're not adding streaks. If we want return visits we need a different mechanism. What's a Mentoria-shaped way to do that?” That last sentence is the actual move. You're not blocking the feature, you're handing the problem back as a constraint: solve this within the brief, not around it. Almost every time, the answer that comes back is better than the original ask."
      ),
      p(
        "It's also how the brief gets sharper instead of staler. Every time the soul is tested and survives, it earns its rent. Every time it gets tested and breaks, you find out where the line was wrong and you move it on purpose, in daylight, with a reason. The brief that survived eight rounds of pushback is the one you can hand to the next designer with a straight face."
      ),
      h2("Without a brief, every choice is a vibe — and vibes drift"),
      p(
        "I've watched myself ship the basic version of the same project enough times to know how it happens. You open Figma. You pick a font that feels nice. You pick a palette that doesn't fight. You drop in your usual cards because they work. You arrange things. And nothing in that process makes you choose anything brave, because nothing in that process forces you to defend a choice."
      ),
      p(
        "Eight hours later the work is tidy and competent and could be for any product. That's the basic. It's not ugly. It's the absence of a thesis the design could disagree with — and design that can't be disagreed with also can't be remembered."
      ),
      img(
        "/blog1/Screenshot 2026-06-02 201226.png",
        "Mentoria's 'A short letter, not a dashboard' section with handwritten-style 'every sunday at 3pm' label and an example weekly digest written as a short personal note from the AI mentor Sage to the parent.",
        {
          frame: "screenshot",
          ratio: "wide",
          caption:
            "“A short letter, not a dashboard” was a line in the brief. Then it was a feature.",
        }
      ),
      h2("The shape of the brief, in case you want to try it tonight"),
      p(
        "The whole thing fits on half a page. Four lines, plus whatever you want to add. If you have a product open in another tab right now, you can write yours before this paragraph ends:"
      ),
      pMix([
        { text: "They arrive carrying ___. ", bold: true },
        {
          text: "The skepticism, the exhaustion, the half-broken thing they tried last year, the suspicion that this is just the last app with a new logo. Whatever they actually walked in with. Write it in their language, not yours.",
        },
      ]),
      pMix([
        { text: "They leave carrying ___. ", bold: true },
        {
          text: "The one feeling, belief, or small capability they have on the way out that they didn't have on the way in. One. If you write three you don't have a brief, you have a wishlist — and wishlists don't help you choose a font.",
        },
      ]),
      pMix([
        { text: "It is NOT a ___. Or a ___. Or a ___. ", bold: true },
        {
          text: "Three or four adjacent products you keep getting compared to and refuse to become. Be specific. “Not Duolingo” tells the design something. “Not gamified” is too soft. Name the actual thing the design has to push against — by name, with no euphemism.",
        },
      ]),
      pMix([
        { text: "In one sentence, what is this for — in user words. ", bold: true },
        {
          text: "Not the founder pitch. Not the investor sentence. The thing the user would say to a friend if the friend asked what this is. If you can't write that sentence, that's information too — sometimes the design block is a strategy hole, and naming it is the most useful thing the brief ever does.",
        },
      ]),
      pMix([
        { text: "An off-screen reference — not from tech. ", bold: true },
        {
          text: "A magazine, a building, a record sleeve, a recipe book, a hand tool. Mentoria's was a Montessori wooden toy and a thoughtful parent's recipe journal. That single reference does more work for the look of the product than any color palette ever will. Once you have one, every later decision has a place to phone home to.",
        },
      ]),
      p(
        "That's the foundation. The full version of the brief has a couple more moves — six vibe axes you put a dot on (warm↔cold, playful↔serious, dense↔airy, indie↔institutional, analog↔futurist, loud↔quiet — half the work is being honest about which side you actually want), and five keywords that have to fight clichés (“warm” alone isn't enough; “considered” or “patient” or “low-stakes” starts to be). But the five lines above are what I'd write tonight if I only had ten minutes."
      ),
      p(
        "Try it on a product you already shipped if you want to feel something uncomfortable: write the brief for it now, then audit the live site against it. Every place the design drifted, there's a line in the after-the-fact brief that nobody was answering to."
      ),
      quote("You can't weave in a soul you never typed out."),
      p(
        "Here's the part that eventually got to me, though. I was hand-writing that page on every single project. Same shape every time — who walks in, what they feel, what NOT — and then starting from an empty doc again on the next one. It was the single highest-leverage half hour of every build, and I was retyping it from scratch like it was new each time."
      ),
      h2("Turning the half-hour into a skill"),
      p(
        "So I stopped retyping it. The articulation is a Claude skill now — app-context-to-design-system — and it does the boring part on its own. The pipeline is three steps. The blog above is mostly about the first one. The other two are where the tokens actually come from."
      ),
      pMix([
        { text: "Extract. ", bold: true },
        {
          text: "Point the skill at the project — a README, the landing copy, the pricing page, a paragraph in Slack about who it's for — and it pulls out the brief in the shape I'd hand-write anyway. Plus the moves the recipe above doesn't squeeze in: the vibe axes, the keywords that aren't clichés, the off-screen reference. It also writes the brief down as a real file in the repo, so the next person on the project (or future-you, six weeks in) starts from the same sentence everyone else is answering to.",
        },
      ]),
      pMix([
        { text: "Match. ", bold: true },
        {
          text: "Then it picks an archetype — a packaged set of decisions that hang together aesthetically. Right now the catalog has two. Warm Editorial Scrapbook is for products that need to feel considered and hand-made — Mentoria lives there. Cold Precision Grotesk is for products that need to feel surgical and fast — ",
        },
        {
          text: "Omniscient",
          href: "https://omniscient-gamma.vercel.app/",
          bold: true,
        },
        {
          text: ", a smart-campus energy management dashboard whose whole promise is “nothing goes unmeasured,” lives there, and so does ",
        },
        {
          text: "my own personal site",
          href: "https://www.franz-k.dev/",
          bold: true,
        },
        {
          text: ", which reads closer to a Unix manpage than a portfolio. Briefs that hover at the middle of the axes get sent back with “pick a side.” That's the move I undervalued for years. Picking the archetype is the choice that stops every later decision from being a vibe argument — once you've committed to warm-and-considered, you're not re-litigating warm-vs-cold on every card.",
        },
      ]),
      pMix([
        { text: "Apply. ", bold: true },
        {
          text: "Then the tokens fall out the far end. The archetype gives you the spine: a role system for typography, a primitive system for surfaces, a motion personality. The brief drives six bindings that bolt onto that spine — color tokens, the specific font picks within the role system, copy voice register, information density, photography or illustration style, and motion easing. The Mentoria cards in this post — hard border, offset shadow, warm paper, half a degree of rotation — are the Warm Editorial Scrapbook spine plus Mentoria's specific bindings. Run the same archetype against a brief for a different product and you'd get the same spine carrying different bindings. Different product, recognizably related, still itself.",
        },
      ]),
      pMix([
        {
          text: "Each archetype is itself a pair of implementation skills the orchestrator calls. Warm Editorial Scrapbook is ",
        },
        { text: "editorial-scrapbook-typography", code: true },
        {
          text: " (italic serif display + sans body + handwritten marginalia + mono micro-labels — four voices used for four jobs) and ",
        },
        { text: "scrapbook-neobrutalist-cards", code: true },
        {
          text: " (1.5px ink borders, hard offset shadows with zero blur, a half-degree of rotation per card, dashed inner dividers, stickers that hang over the card edge). Cold Precision Grotesk is ",
        },
        { text: "precision-grotesk-typography", code: true },
        {
          text: " (a single grotesk doing both display and body, sized small, plus mono for anything the system says — no serif, no handwriting, no second display font) and ",
        },
        { text: "precision-monochrome-surfaces", code: true },
        {
          text: " (hairline 1px borders, micro-radii capped at 16px, no offset shadows, one accent color, gradient-mesh backdrops, an optional grain overlay at 4% opacity). The two pairs are designed against each other on purpose — you can't blend a 5px hard offset shadow into a precision-monochrome surface without breaking both, and that constraint is the whole reason either of them stays coherent.",
        },
      ]),
      p(
        "Mentoria became the reference build for the warm archetype. The cards exist the way they do because a sentence in the brief asked for them — I didn't pick them, the brief did, and the archetype gave the brief a place to land."
      ),
      img(
        "/blog1/Screenshot 2026-06-02 201237.png",
        "Mentoria pricing section showing three plans (Try it, Together, Up to 3 kids) styled as taped-down paper cards with hand-drawn checkmarks and warm typography.",
        {
          frame: "screenshot",
          ratio: "wide",
          caption:
            "Pricing as a scrapbook page. Same brief drives the homepage, the chat UI, and the checkout.",
        }
      ),
      h2("The same method, very different output"),
      p(
        "Mentoria is the obvious worked example in this post because warm is photogenic — cream paper, hand-drawn marginalia, the kind of design photos love. The harder claim is that the same pipeline produces something that looks completely unrelated when the brief points the other way. I've shipped two of those, and they're the better proof the method isn't just a Mentoria-shaped trick."
      ),
      pMix([
        {
          text: "Omniscient",
          href: "https://omniscient-gamma.vercel.app/",
          bold: true,
        },
        {
          text: " is the one I keep going back to. It's a smart-campus energy management system, and the brief sits at the far cold end of every axis. Arrives carrying skepticism that any dashboard tells the truth. Leaves carrying the feeling that nothing on this campus is going unmeasured. NOT a friendly-helper assistant. NOT a glossy marketing dashboard. NOT a default-bootstrapped admin page. One-sentence purpose, in user words: “I want to see all of it, right now, with the timestamps.” Off-screen reference: a NASA mission-control board.",
        },
      ]),
      p(
        "Run that brief through Match and you commit to Cold Precision Grotesk before you've picked a single color. Run it through Apply and the tokens fall out — mono everywhere, near-black background, a single accent color, hairline borders, no rotation, no offset shadows, no warmth. The headline reads “Nothing goes unmeasured.” — declarative, no exclamation, no marketing buildup, exactly what the cold-precision copy-voice register asks for. It looks nothing like Mentoria. It came out of the same three-step process."
      ),
      pMix([
        {
          text: "My own site",
          href: "https://www.franz-k.dev/",
          bold: true,
        },
        {
          text: " is the third proof. The brief: arrives a recruiter or another engineer carrying skepticism (one more design-engineer portfolio); leaves carrying “this person thinks in systems, not in CSS demos.” NOT flashy-animated, NOT generic agency template. One-sentence purpose: “show me what you can actually build, no theatrics.” Off-screen reference: a Unix manual page. Same Match — Cold Precision Grotesk — but a different brief produces different bindings on the same spine. The dashboard and the portfolio share an archetype, and neither one tries to look like the other, because the bindings each needs come from different briefs.",
        },
      ]),
      p(
        "That's the whole quiet payoff of doing the brief first and the archetype second. Two cold-precision products by the same hand, both surgical, neither one a copy of the other. Two warm-editorial products by the same hand would be the same story in the other key. The system doesn't make everything look the same — it makes everything look like itself."
      ),
      p(
        "I still write the soul down before I design anything. I just don't start from an empty page to do it. That half-hour used to be the difference between work I'd put my name on and work I'd quietly wish had been someone else's. Now it's a step in the build, like running migrations. It's also the step I'd hand to a junior designer before I'd hand them a color palette — because the palette is downstream of the archetype, the archetype is downstream of the brief, and the brief is downstream of paying attention to who's about to walk in."
      ),
      img(
        "/blog1/notebook-end.jpg",
        "An open notebook with a pen resting on top, on a warm wooden table, soft natural light.",
        {
          ratio: "wide",
          caption: "Still the highest-leverage half hour of any build.",
        }
      ),
    ],
  },
];

export function sampleAuthorBySlug(slug: string): BlogAuthor | null {
  return sampleAuthors.find((a) => a.slug === slug) ?? null;
}
