# AlphaPebble Website Redesign

This is a modern, responsive redesign for the AlphaPebble website, inspired by Moative.com's aesthetic. The redesign uses Tailwind CSS for styling and is optimized for GitHub Pages deployment.

## Features

- **Modern Dark Theme**: Professional dark color scheme with blue accents
- **Responsive Design**: Fully responsive layout that works on all devices
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Mobile-Friendly Navigation**: Collapsible mobile menu
- **Optimized for GitHub Pages**: Ready to deploy directly to GitHub Pages

## How to Use

1. **Preview the Design**: Open `index-redesign.html` in your browser to preview the new design

2. **Deploy to GitHub Pages**:
   - Rename `index-redesign.html` to `index.html` (replacing your current index.html)
   - Commit and push to your GitHub repository
   - Your new design will be live at `https://alphapebble.github.io/`

3. **Customize Content**:
   - Update text content to match your specific offerings
   - Replace placeholder links with actual URLs
   - Add your own images and assets

## Logo

A custom SVG logo has been created for AlphaPebble and is located at `images/logo.svg`. The logo features:

- A blue background (using the primary brand color #3B82F6)
- A minimalist geometric design with a triangle and circle
- Clean, scalable vector format that looks good at any size

If you want to customize the logo:
1. Edit the SVG file directly using a vector editor like Adobe Illustrator, Figma, or Inkscape
2. Or replace it with your own logo file (maintaining the same filename)
3. If you change the filename, update all references in the HTML

## Customization

### Colors

The primary colors used in this design are:
- Dark background: `#0F172A`
- Darker sections: `#080D1B`
- Primary blue: `#3B82F6`
- Secondary blue: `#60A5FA`
- Accent blue: `#2563EB`
- Light text: `#F6F6F7`

You can modify these in the Tailwind configuration at the top of the HTML file.

### Fonts

The design uses the Inter font family from Google Fonts. You can replace it with any other font by updating the font import and the Tailwind configuration.

### Sections

The landing page includes the following sections:
- Header with navigation
- Hero section
- Value propositions
- Why Us
- Services
- How We Work
- Call to Action
- Contact form
- Footer

Each section is clearly commented in the HTML for easy identification and modification.

## Technical Details

- The design uses Tailwind CSS via CDN for simplicity
- Simple JavaScript is included for the mobile menu toggle
- SVG elements are used for the background shapes and icons
- CSS custom properties are used for consistent styling

## Next Steps

1. **Add Real Content**: Replace all placeholder text with your actual content
2. **Add Analytics**: Integrate Google Analytics or similar tracking
3. **Form Handling**: Connect the contact form to a form handling service
4. **SEO Optimization**: Add meta tags and structured data
5. **Performance Optimization**: Optimize images and lazy-load content

## Credits

- Design inspired by Moative.com
- Icons from Heroicons
- Font from Google Fonts (Inter)
