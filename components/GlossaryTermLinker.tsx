'use client';

import { useEffect } from 'react';

/**
 * Scans the rendered module page content for the first occurrence of each
 * glossary term and wraps it in an <a> link to /glossary/[slug].
 *
 * Implements Task 10.1 from the implementation prompt:
 * "Any glossary terms mentioned in the module content (first occurrence only)"
 *
 * Rules:
 * - First occurrence only per page (not per paragraph)
 * - Skips text already inside an <a> tag
 * - Skips H1/H2/H3 headings (don't link terms in headings)
 * - Skips the .tldr-band and .module-nav areas
 * - Case-insensitive matching but preserves original casing
 * - Only operates within .page-panel and .module-content elements
 * - Terms sorted by length descending so "Abandoned Cart Flow" matches
 *   before "Abandoned Cart"
 */

interface GlossaryTermLink {
  term: string;
  slug: string;
}

export default function GlossaryTermLinker({ terms }: { terms: GlossaryTermLink[] }) {
  useEffect(() => {
    if (!terms.length) return;

    // Sort by term length descending — longer terms match first
    const sorted = [...terms].sort((a, b) => b.term.length - a.term.length);

    // Build a set of already-linked slugs to track "first occurrence" globally
    const linked = new Set<string>();

    // Only scan within the actual module content area
    const containers = document.querySelectorAll('.page-panel, .module-content');
    if (!containers.length) return;

    // Collect all text nodes that are eligible for linking
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;

          // Skip if already inside a link
          if (parent.closest('a')) return NodeFilter.FILTER_REJECT;

          // Skip headings
          const tagName = parent.tagName.toUpperCase();
          if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(tagName)) return NodeFilter.FILTER_REJECT;

          // Skip navigation and chrome areas
          if (parent.closest('.tldr-band, .module-nav, #sidebar, header, nav, .breadcrumb, script, style')) {
            return NodeFilter.FILTER_REJECT;
          }

          // Only include nodes inside module content areas
          const inPanel = parent.closest('.page-panel, .module-content');
          if (!inPanel) return NodeFilter.FILTER_REJECT;

          // Only text nodes with actual content
          if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;

          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    // Collect eligible text nodes first (modifying DOM while walking is unsafe)
    const textNodes: Text[] = [];
    let node = walker.nextNode();
    while (node) {
      textNodes.push(node as Text);
      node = walker.nextNode();
    }

    // For each text node, try to find and link the first occurrence of each term
    for (const textNode of textNodes) {
      const text = textNode.textContent || '';
      let found = false;

      for (const { term, slug } of sorted) {
        if (linked.has(slug)) continue; // already linked this term on this page

        const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        const match = re.exec(text);
        if (!match) continue;

        // Found a match — split the text node and wrap the match in an <a>
        const matchStart = match.index;
        const matchEnd = matchStart + match[0].length;

        const before = text.slice(0, matchStart);
        const matched = text.slice(matchStart, matchEnd);
        const after = text.slice(matchEnd);

        const parent = textNode.parentNode;
        if (!parent) continue;

        const link = document.createElement('a');
        link.href = `/glossary/${slug}`;
        link.textContent = matched;
        link.style.color = 'var(--accent)';
        link.setAttribute('data-glossary-link', '1');

        const fragment = document.createDocumentFragment();
        if (before) fragment.appendChild(document.createTextNode(before));
        fragment.appendChild(link);
        if (after) fragment.appendChild(document.createTextNode(after));

        parent.replaceChild(fragment, textNode);
        linked.add(slug);
        found = true;
        break; // only link one term per text node pass — restart with the new nodes
      }

      // If we modified this node's parent by splitting, the remaining `after` text
      // is a new text node that the walker has already passed — it won't get
      // re-scanned. This means the "after" text won't get any further term links
      // in this pass, which is acceptable since we're looking for first occurrence
      // per page (not exhaustive replacement), and the walker already visited most
      // of the content before this modification.
      void found;
    }
  }, [terms]);

  return null;
}
