const initialState = {
  memberList: [
    {
      lastName: 'Blatter',
      firstName: 'Sepp',
      picture: 'https://randomuser.me/api/portraits/med/men/80.jpg'
    },
    {
      lastName: 'Bieri',
      firstName: 'Livio',
      picture: 'https://randomuser.me/api/portraits/med/men/80.jpg'
    },
    {
      lastName: 'Brunner',
      firstName: 'Raphi',
      picture: 'https://randomuser.me/api/portraits/med/men/80.jpg'
    },
  ]
};

export default function memberList(state = initialState, action) {
  return state;
}
