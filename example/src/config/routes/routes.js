import Image from '../../app/components/pages/Image';
import Video from '../../app/components/pages/Video';
import StartAt from '../../app/components/pages/StartAt';

export default [
  {
    title: 'Image unique',
    url: '/',
    component: Image,
  },
  {
    title: 'Image et Video',
    url: '/video',
    component: Video,
  },
  {
    title: ' Ouvrir une slide spécifique',
    url: '/start-at',
    component: StartAt,
  },
];

