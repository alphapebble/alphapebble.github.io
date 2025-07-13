# AlphaPebble Logo Instructions

Since I can't directly create a PNG file, here are instructions to create a simple logo for AlphaPebble:

## Option 1: Use the SVG Logo

The SVG logo has already been created at `images/logo.svg`. You can use this directly in your HTML by updating the image references:

```html
<img src="./images/logo.svg" alt="AlphaPebble Logo" class="h-12 w-12">
```

## Option 2: Create a PNG Logo

1. Use an online SVG to PNG converter like [SVG2PNG](https://svgtopng.com/) or [Convertio](https://convertio.co/svg-png/)
2. Upload the `logo.svg` file
3. Convert to PNG at 512x512 pixels
4. Save the resulting file as `logo.png` in the `images` folder

## Option 3: Use a Logo Generator

You can create a custom logo using:
- [Looka](https://looka.com/)
- [Canva](https://www.canva.com/)
- [Hatchful by Shopify](https://hatchful.shopify.com/)

## Logo Design Specifications

The current placeholder logo design is:
- A blue circle with the AlphaPebble "AP" initials
- Primary color: #3B82F6 (bright blue)
- Simple, modern, and scalable
- Works well on dark backgrounds

## Implementation in the HTML

The HTML is currently set up to use a text-based logo with "AP" initials. To use an image-based logo instead, update these sections in the HTML:

1. In the header:
```html
<a href="#" class="flex items-center gap-3">
    <img src="./images/logo.png" alt="AlphaPebble Logo" class="h-12 w-12 rounded-full">
    <span class="text-2xl font-bold text-light">AlphaPebble</span>
</a>
```

2. In the footer:
```html
<a href="#" class="flex items-center gap-3">
    <img src="./images/logo.png" alt="AlphaPebble Logo" class="h-10 w-10 rounded-full">
    <span class="text-xl font-bold text-light">AlphaPebble</span>
</a>
```
