import { faker } from '@faker-js/faker';

export const generate = (Count = 15) => {
    return new Array(Count)
        .fill()
        .map(_ => faker.random.word())
        .join(' ');
};
