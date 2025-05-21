import { schema, normalize } from 'normalizr';

const questionSetSchema = new schema.Entity('questionSets', {});

export const normalizedQuestionSetData = (data) => (
  normalize(data, [questionSetSchema])
);
