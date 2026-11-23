import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'Becomes /products/<slug>. Change this and the product URL changes.',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Shown above the product name (e.g. Diesel Engine Oil).',
    }),
    defineField({
      name: 'image',
      title: 'Product photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
      description: 'Transparent PNG works best. Crop with the hotspot tool.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'applications',
      title: 'Applications',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'features',
      title: 'Key features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specs',
      title: 'Specs table',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'spec',
          fields: [
            defineField({ name: 'parameter', title: 'Parameter', type: 'string' }),
            defineField({ name: 'unit', title: 'Unit', type: 'string' }),
            defineField({ name: 'method', title: 'Test method', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: {
            select: { title: 'parameter', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'pdf',
      title: 'PDS (PDF)',
      type: 'file',
      options: { accept: 'application/pdf' },
      description: 'Optional. Adds a download button on the card and detail page.',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first in the grid.',
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' },
  },
});
