import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'heroSlide',
  title: 'Hero slide',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Background image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'position',
      title: 'Focal position',
      type: 'string',
      description: 'CSS object-position, e.g. "center center" or "70% 50%".',
      initialValue: 'center center',
    }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body text', type: 'text', rows: 3 }),
    defineField({ name: 'cta', title: 'Button label', type: 'string' }),
    defineField({
      name: 'href',
      title: 'Button link',
      type: 'string',
      description: 'e.g. #products or /oil-finder',
    }),
    defineField({ name: 'order', title: 'Sort order', type: 'number' }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'heading', subtitle: 'eyebrow', media: 'image' },
  },
});
