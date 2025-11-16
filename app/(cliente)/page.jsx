import HeroCarousel from '@/components/ui/HeroCarousel';
import Colecoes from '@/components/shop/Colecoes';
import styles from './Home.module.css';

export default function HomePage() {
  const slides = [
    {
      type: 'video',
      src: '/vídeos/Colecao_Cera_e_Frutas.mp4',
      alt: 'Vela Aromática',
      title: 'Nossas Velas',
      subtitle: 'Feitas com cera de coco e essências premium.',
    },
    {
      type: 'video',
      src: '/vídeos/Colecaoo_Mar.mp4',
      alt: 'Vela Aromática',
      title: 'Nossas Velas',
      subtitle: 'Feitas com cera de coco e essências premium.',
    },
  ];

  const collections = [
    {
      type: 'video',
      src: '/vídeos/Colecao_Cera_e_Frutas.mp4',
      title: 'Coleção 1',
    },
    {
      type: 'video',
      src: '/vídeos/Colecaoo_Mar.mp4',
      title: 'Coleção 2',
    },
  ];

  return (
    <>
      <HeroCarousel slides={slides} />
      <Colecoes collections={collections} />
    </>
  );
}
