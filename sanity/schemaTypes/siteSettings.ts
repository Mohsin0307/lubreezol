import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: false },
      description: 'Transparent PNG. Used in the navbar and footer.',
    }),
    defineField({
      name: 'tagline',
      title: 'Navbar tagline',
      type: 'string',
      description: 'Two lines separated by a newline: "Lubricants." + "Technology. People."',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
