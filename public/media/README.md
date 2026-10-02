The site's photos and video. Paths are listed in src/lib/media.ts.

polaroids/  show.jpg, meadow.jpg, rink.jpg, merch.jpg, sweaters.jpg
            (order, captions and cropping are set in polaroidPhotos in src/routes/index.tsx)
targets/    the 12 clown targets (WebP with transparency)
tv/         adventureland-loop.mp4 + .webm (band video, no audio; the WebM is a fallback copy), adventureland-loop-poster.jpg (still shown while it loads),
            tv.webp (TV frame with a see-through screen; video position is set in .retro-tv video in src/styles.css)

Photos are resized for the web before adding (about 900px on the short side for polaroids,
about 670px tall for clowns) so the page stays fast.
