import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsItem',
  title: 'News item',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
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
          { title: 'Wrench', value: 'wrench' },
          { title: 'Droplet', value: 'droplet' },
          { title: 'Newspaper', value: 'newspaper' },
        ],
      },
      initialValue: 'newspaper',
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
  preview: { select: { title: 'title', subtitle: 'category', media: 'image' } },
});
