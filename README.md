# Foundation — Bootstrap website starter

A responsive, plain HTML component showcase built with Bootstrap 5.3.8. No package installation or build step is required.

## Run

Open `index.html` directly in a modern browser. An internet connection is required to load Bootstrap CSS and JavaScript from jsDelivr. Alternatively, run `python3 -m http.server 8080` in this directory and visit `http://localhost:8080`.

## Customize

- `index.html`: semantic page layout and live, reusable component examples. Copy the relevant markup, retaining unique IDs and matching `data-bs-target` / ARIA references.
- `assets/css/styles.css`: design tokens, component overrides, and responsive layout.
- `assets/js/main.js`: tooltip/popover initialization, Scrollspy, toast trigger, local form validation, and demo pagination.
- `assets/landscape.svg`: local responsive illustration with no external image dependency.

Bootstrap's pinned CDN links include integrity hashes and `crossorigin`. Update both URLs and hashes together when upgrading. The bundle includes Popper. For offline use, download the same Bootstrap CSS and bundle and replace the CDN URLs with local paths.

## Examples included

Accordion, alerts, badges, breadcrumb, buttons, button groups, cards, carousel, collapse, dropdowns, list groups, modal, navbar, tabs, pills, offcanvas, pagination, placeholders, popovers, progress, Scrollspy, spinners, toasts, and tooltips. The section sidebar demonstrates pills and Scrollspy on desktop. The top navbar collapses on smaller screens.

Also includes form controls, validation, selects, checks, radios, switches, range and file inputs, input groups, floating labels, grids, typography, responsive images, figures, tables, and spacing/color/display/flex utilities.

Forms are demos: nothing is submitted, uploaded, or stored. Buttons in the variants section only demonstrate styling. Pagination updates sample text locally. The carousel advances manually to avoid automatic motion.

## Quick verification

Check desktop, tablet, and mobile widths. Exercise tabs, dropdown, accordion, collapse, carousel arrows, modal and offcanvas (including Escape and focus return), toast, tooltip hover/focus, and popover toggling. Submit an empty form, then a valid form, and reset it. Verify the range label and pagination update. Tab through the page and check browser console/network errors.

Bootstrap documentation: https://getbootstrap.com/docs/5.3/

## Table gallery

Open `tables.html` directly, or choose **Tables** in the main navigation, to explore 24 static table examples. A linked index makes every format easy to find. Examples include Bootstrap variants, status badges, a directory, progress tracking, invoice totals, plan comparison, grouped headers, a key-value record, sticky headers and columns, a capacity heatmap, and a leaderboard.

Copy an example's semantic table markup and responsive wrapper. Custom formats also need their corresponding rules from `assets/css/tables.css`, loaded after the shared stylesheet. Every table has a caption and scoped headers. Wide tables scroll inside keyboard-focusable regions. This gallery needs no JavaScript; all example data is illustrative.

## Plotly chart gallery

Open `charts.html` or choose **Charts** in the navigation to explore **54 interactive examples** in six collections: Trends, Comparison, Distribution, Relationships, Composition, and Specialized. Search by title or description, filter by collection, and expand **View chart definition** to reuse an example's data, layout, and configuration with `Plotly.newPlot()`.

- `assets/js/charts-data.js` contains deterministic, local sample datasets and figure definitions.
- `assets/js/charts.js` handles filtering, lazy rendering, responsive sizing, deep links, and load-error messages.
- `assets/css/charts.css` styles the gallery independently of the table page.

The page pins Plotly.js **4.1.1** from its official CDN. An internet connection is required for Plotly and Bootstrap; no API key, server, or build step is needed. For offline use, download the pinned libraries and update the script/link paths. Charts render serially as they approach the viewport. These examples use SVG-based charts, avoiding WebGL context limits in a large gallery. Plotly provides hover details, supported zoom/pan controls, and PNG exports. Each chart also includes a text description and its raw definition. The data is illustrative, not live reporting.

Examples cover line/area/step charts, bar variants, lollipop/dumbbell/dot plots, histograms, box/violin plots, scatter/bubbles/error bars, pie/donut, treemap/sunburst/icicle, Sankey, heatmaps/contours, radar/polar bars, waterfall/funnels, gauges, and candlestick/OHLC charts.

Reference: https://plotly.com/javascript/ and https://github.com/plotly/plotly.js

## Tanner color theme

`assets/css/tanner.css` overrides Bootstrap colors using `paleta.md` and is loaded last on all three pages. Keep this order when reusing it: Bootstrap → shared/page CSS → `tanner.css`.

Primary maps to corporate blue (`#0014A7`), secondary to medium blue (`#2D4BFF`), success to financial green (`#00B250`), info to cyan (`#00C2FF`), warning to amber (`#FFB000`), and danger to red (`#E53935`). All palette colors are also exposed as `--tanner-*` variables. Subtle backgrounds, borders, hover, and active shades are derived from those colors; bright buttons and badges use dark text for legibility.

The light theme covers Bootstrap utilities, button variants, alerts, contextual tables/list groups, navigation, forms, progress, and overlay surfaces. It also updates the starter's main accents. Plotly series colors and decorative illustrations remain defined in their own assets. No Sass build is required.
