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
