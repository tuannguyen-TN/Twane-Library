import { Book } from '../types/Book'

export const booksData: Book[] = [
  {
    _id: '655d13daf50dd1ceca878b43',
    ISBN: '0756603390',
    title: 'Conan',
    edition: '1',
    category: [
      {
        _id: '656ea29060a0da45f1752146',
        name: 'Fiction',
      },
    ],
    description: 'not really something',
    publisher: 'Japan',
    author: [
      {
        _id: '6546a7febac08f6bd30c0505',
        fullName: 'Leo Tolstoy',
      },
    ],
    img: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Doraemon_volume_1_cover.jpg',
    availableCopies: [
      {
        total: 2,
      },
    ],
  },
  {
    _id: '655ec8104202fd2aa0055472',
    ISBN: '099777035X',
    title: 'Doremon 1',
    edition: '1',
    category: [
      {
        _id: '656ea29060a0da45f1752146',
        name: 'Fiction',
      },
    ],
    description: 'something',
    publisher: 'Fukushima',
    author: [
      {
        _id: '6546a7febac08f6bd30c0505',
        fullName: 'Leo Tolstoy',
      },
    ],
    img: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Doraemon_volume_1_cover.jpg',
    availableCopies: [
      {
        total: 4,
      },
    ],
  },
  {
    _id: '657373d24a28e2a9af4a4268',
    ISBN: '1514640376',
    title: 'Oliver Twist',
    edition: '1',
    category: [
      {
        _id: '656ea26860a0da45f1752145',
        name: 'Historical',
      },
    ],
    description: 'A book by Charles Dickens',
    publisher: 'Kindle',
    img: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/614WeIHGwRL._SY466_.jpg',
    author: [
      {
        _id: '65476d49bcb0ab378893f206',
        fullName: 'Charles Dickens',
      },
    ],
    availableCopies: [
      {
        total: 1,
      },
    ],
  },
]
