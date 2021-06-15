import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';

@model({
  settings: {
    strict: true,
  },
})
export class Category extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  // Define well-known properties here
  @property({type: 'string'})
  name?: string;

  @hasMany(() => Category, {keyTo: 'parentId'})
  categories?: Category[];

  @belongsTo(() => Category)
  parentId?: number;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
