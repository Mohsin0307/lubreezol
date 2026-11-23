import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutCard',
  title: 'About card',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'e.g. /oil-finder or /solutions',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Droplet', value: 'droplet' },
          { title: 'Wrench', value: 'wrench' },
          { title: 'Newspaper', value: 'newspaper' },
          { title: 'Search', value: 'search' },
        ],
      },
      initialValue: 'droplet',
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
  preview: { select: { title: 'title', subtitle: 'href', media: 'image' } },
});
