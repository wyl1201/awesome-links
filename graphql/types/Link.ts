import prisma from '../../lib/prisma'
import { builder } from '../builder'

builder.prismaObject('Link', {
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    url: t.exposeString('url'),
    description: t.exposeString('description'),
    imageUrl: t.exposeString('imageUrl'),
    category: t.exposeString('category'),
    users: t.relation('users'),
  }),
})

builder.queryField('links', (t) =>
  t.prismaConnection({
    type: 'Link',
    cursor: 'id',
    resolve: (query, _parent, _args, _ctx, _info) => {
      console.log(`🚀 ~ query:`, query)
      return prisma.link.findMany({ ...query })
    },
  })
)
