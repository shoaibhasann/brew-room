# The Brew Room — AI Image Generation Prompts

Generate each image with ChatGPT (GPT-4o / DALL·E), save with the **exact filename** shown,
drop the files into `public/images/`, then update the matching slot in `src/data/images.js`
(replace the Unsplash URL with `/images/<filename>`).

> **Consistency rule:** paste the STYLE BLOCK at the end of every prompt so all images feel
> like one photoshoot.

---

## STYLE BLOCK (append to every prompt)

```
Photorealistic editorial photography, shot on a 35mm full-frame camera, shallow depth of
field, warm golden-hour light, palette of deep espresso brown, warm cream and burnished
gold, dark moody-luxury mood, high-end restaurant magazine aesthetic (Kinfolk / Condé Nast
Traveller), natural soft shadows, subtle film grain. No text, no logos, no watermarks,
no faces looking at the camera.
```

---

## 1. Hero

**`hero-main.webp` — 16:9 landscape, largest/most important image**

```
A serene luxury garden cafe in Chennai at dusk, seen from a wide cinematic angle: a
white gazebo draped with warm string lights, rattan chairs and marble-top tables set
among lush tropical plants and old trees, a softly lit heritage hotel facade in the
background, steam rising from a coffee cup on the nearest table, gentle bokeh of
lanterns. Wide 16:9 composition with clear space in the lower-left for headline text.
```

## 2. Story / About

**`about-garden.webp` — 4:5 portrait**

```
Daylight at an elegant garden cafe: a gazebo seating nook surrounded by dense green
foliage and dappled sunlight, a wooden table set with a cafetière, two ceramic cups
and a small vase of flowers, empty rattan chairs inviting the viewer in. Vertical 4:5.
```

**`about-barista.webp` — 3:4 portrait**

```
Close-up of a barista's hands pouring latte art into a warm cream ceramic cup on a
dark walnut counter, velvety milk stream mid-pour forming a rosetta, espresso machine
softly blurred behind, steam catching a shaft of window light. Vertical 3:4.
```

**`about-interior.webp` — square**

```
Rustic-modern cafe interior: exposed brick and warm wood, brass pendant lamps glowing
over a marble counter, shelves of coffee jars and dried flowers, morning light raking
across the floor. Square 1:1.
```

## 3. Signature dishes (also reused as menu thumbnails)

**`signature-coldbrew.webp` — 3:4 portrait** *(reuse as `menu-coldbrew.webp`)*

```
A tall glass of artisan cold brew coffee over one large clear ice sphere on a dark
marble table, tiny vanilla pod beside it, condensation on the glass, single beam of
warm light from the left, dark moody background. Vertical 3:4.
```

**`signature-flatwhite.webp` — 3:4 portrait** *(reuse as `menu-flatwhite.webp`)*

```
A perfect flat white in a handmade warm-cream ceramic cup on a walnut table, delicate
tulip latte art, one biscotti on a small brass plate beside it, soft window light,
dark elegant background. Vertical 3:4.
```

**`signature-benedict.webp` — 3:4 portrait** *(reuse as `menu-benedict.webp`)*

```
Eggs Benedict on toasted brioche with glossy hollandaise just starting to run, crispy
pancetta and micro herbs, served on a dark ceramic plate on a linen napkin, garden
greenery softly blurred behind. Vertical 3:4.
```

## 4. Remaining menu thumbnails — all square 1:1

**`menu-caramelshake.webp`**

```
A salted caramel espresso shake in a tall glass, caramel drizzle inside the glass
walls, topped with a thin caramel shard and flaky salt, on a dark marble surface with
scattered coffee beans. Square 1:1.
```

**`menu-waffles.webp`**

```
Golden Belgian waffles stacked on a ceramic plate with fresh berries, a quenelle of
clotted cream and honey being drizzled from a wooden dipper, warm morning light on a
garden table. Square 1:1.
```

**`menu-alfredo.webp`**

```
Chicken penne alfredo in a rich parmesan cream sauce with cracked black pepper and
fresh basil, in a wide dark ceramic bowl, parmesan shavings mid-fall, rustic wooden
table, moody warm light. Square 1:1.
```

**`menu-caesar.webp`**

```
An elegant Caesar salad: crisp romaine leaves, golden garlic croutons, parmesan
ribbons and creamy dressing in a dark stone bowl, linen napkin and vintage fork
beside it, soft directional light. Square 1:1.
```

**`menu-chocolatecake.webp`**

```
A slice of dark chocolate layer cake with glossy ganache and a swirl of chantilly
cream on a small brass-rimmed plate, one fork resting beside it, crumbs artfully
scattered, dark moody background with warm highlight. Square 1:1.
```

## 5. Gallery — six images

**`gallery-01-interior.webp` — landscape**

```
Wide shot of a rustic-luxury cafe interior in the evening: warm brass lighting,
leather and rattan seating, exposed brick, a long marble coffee bar with glowing
back-shelf, unhurried atmosphere, a few guests softly blurred in the background.
Landscape 3:2.
```

**`gallery-02-coffeebar.webp` — portrait**

```
The coffee bar station: a gleaming espresso machine pulling a double shot into twin
cups, tamper and scales arranged neatly, jars of single-origin beans behind, moody
warm light. Vertical 3:4.
```

**`gallery-03-garden.webp` — portrait**

```
A quiet corner of a tropical garden cafe: a single table under a leafy canopy,
sunlight filtering through leaves onto a white tablecloth, a folded newspaper and
cappuccino waiting. Vertical 3:4.
```

**`gallery-04-latteart.webp` — square**

```
Overhead shot of four coffees on a dark tray: flat white, cappuccino, cortado and
espresso, each with distinct latte art, on a textured stone surface with scattered
roasted beans. Square 1:1.
```

**`gallery-05-pastries.webp` — square**

```
A display of fresh artisan pastries: croissants, pain au chocolat and a berry danish
on brass cake stands under warm cafe light, shallow depth of field. Square 1:1.
```

**`gallery-06-evening.webp` — landscape**

```
The garden cafe at blue hour: string lights glowing between trees, candles on tables,
the warm glow of the cafe interior spilling into the garden, inviting and calm.
Landscape 3:2.
```

## 6. Testimonials background

**`experience-bg.webp` — 16:9 landscape, will sit under a dark overlay**

```
Atmospheric close view across a dark cafe table at night: a candle flame, two coffee
cups, soft golden bokeh of string lights and foliage in the deep background, very
moody and dark with warm highlights. Wide 16:9. Intentionally dim — this image sits
behind text.
```

## 7. Reservation

**`reservation-table.webp` — 4:5 portrait**

```
An elegantly set table for two at a garden cafe in the evening: linen napkins, brass
cutlery, a small candle and a single stem flower, empty chairs angled invitingly,
lush dark garden and fairy lights softly blurred behind. Vertical 4:5.
```

---

### After generating

1. Save each file into `public/images/` with the exact name above (WebP or JPG is fine —
   if JPG, keep the `.jpg` extension and use that in the manifest).
2. Open `src/data/images.js` and replace each slot's Unsplash URL with `/images/<filename>`.
3. The signature images double as menu thumbnails — point both slots at the same file.
