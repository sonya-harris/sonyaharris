# Performance Optimization TODO

## Completed
- [ ] (planned) inspect relevant routes/components (done)

## To do
- [x] Update `src/components/artwork-tile.tsx` to avoid mounting all images on first render (reduce TBT)
- [ ] Make first visible grid tile image load eagerly (LCP)

- [ ] Add `decoding="async"` and `sizes` to thumbnail images
- [ ] Update `src/routes/index.tsx` to mark the first homepage tile as `eager`
- [ ] Switch fonts to Inter in `src/routes/__root.tsx` head links
- [ ] Update `src/styles.css` `--font-sans` and `--font-display` to Inter
- [ ] Run `npm run dev` + production `npm run build`
- [ ] Produce final summary of LCP/TBT causes + exact changes + estimated improvement

