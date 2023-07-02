import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

const now = new Date();

export const employees = [
  {
    id: 1,
    avatar: '/assets/avatars/avatar_1.jpg',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    address: '123 Main St, City, Country',
    gender: 'male',
    birthday: '1990-01-01',
    role: 'admin'
  },
  {
    id: 2,
    avatar: '/assets/avatars/avatar_2.jpg',
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    phone: '0987654321',
    address: '456 Park Ave, City, Country',
    gender: 'female',
    birthday: '1995-02-15',
    role: 'caring'
  },
  {
    id: 3,
    avatar: '/assets/avatars/avatar_3.jpg',
    name: 'Bob Johnson',
    email: 'bjohnson@example.com',
    phone: '9876543210',
    address: '789 Elm St, City, Country',
    gender: 'male',
    birthday: '1985-06-20',
    role: 'coach'
  },
  {
    id: 4,
    avatar: '/assets/avatars/avatar_4.jpg',
    name: 'Alice Brown',
    email: 'alicebrown@example.com',
    phone: '0123456789',
    address: '321 Oak St, City, Country',
    gender: 'female',
    birthday: '1992-09-10',
    role: 'sale'
  },
  {
    id: 5,
    avatar: '/assets/avatars/avatar_5.jpg',
    name: 'Mike Wilson',
    email: 'mikewilson@example.com',
    phone: '5678901234',
    address: '987 Maple Ave, City, Country',
    gender: 'male',
    birthday: '1998-04-25',
    role: 'member'
  },
  {
    id: 6,
    avatar: '/assets/avatars/avatar_6.jpg',
    name: 'Sarah Davis',
    email: 'sarahdavis@example.com',
    phone: '4567890123',
    address: '654 Pine St, City, Country',
    gender: 'female',
    birthday: '1993-12-05',
    role: 'user'
  },
  {
    id: 7,
    avatar: '/assets/avatars/avatar_7.jpg',
    name: 'David Lee',
    email: 'davidlee@example.com',
    phone: '7890123456',
    address: '321 Elm St, City, Country',
    gender: 'male',
    birthday: '1991-08-15',
    role: 'admin'
  },
  {
    id: 8,
    avatar: '/assets/avatars/avatar_8.jpg',
    name: 'Emily Johnson',
    email: 'emilyjohnson@example.com',
    phone: '2345678901',
    address: '567 Oak St, City, Country',
    gender: 'female',
    birthday: '1994-03-10',
    role: 'caring'
  },
  {
    id: 9,
    avatar: '/assets/avatars/avatar_9.jpg',
    name: 'Tom Wilson',
    email: 'tomwilson@example.com',
    phone: '9012345678',
    address: '789 Maple Ave, City, Country',
    gender: 'male',
    birthday: '1989-11-20',
    role: 'coach'
  },
  {
    id: 10,
    avatar: '/assets/avatars/avatar_10.jpg',
    name: 'Linda Brown',
    email: 'lindabrown@example.com',
    phone: '3456789012',
    address: '987 Pine St, City, Country',
    gender: 'female',
    birthday: '1997-07-05',
    role: 'sale'
  }
];



