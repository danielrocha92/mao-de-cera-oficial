import HeroCarousel from '@/components/ui/HeroCarousel';

import OffersCarousel from '@/components/shop/OffersCarousel';
import CategoriesCarousel from '@/components/shop/CategoriesCarousel';
import InfoCards from '@/components/shop/InfoCards';
import PromotionalCards from '@/components/shop/PromotionalCards'; // New import
import styles from './Home.module.css';

export default function HomePage() {
  const slides = [
    {
      type: 'video',
      src: '/videos/Colecao_Cera_e_Frutas.mp4',
      alt: 'Vela Aromática',
      title: 'Nossas Velas',
      subtitle: 'Feitas com cera de coco e essências premium.',
    },
    {
      type: 'video',
      src: '/videos/Colecaoo_Mar.mp4',
      alt: 'Vela Aromática',
      title: 'Nossas Velas',
      subtitle: 'Feitas com cera de coco e essências premium.',
    },
  ];

  return (
    <>
      <HeroCarousel slides={slides} />

      <OffersCarousel />
      <CategoriesCarousel />
      <InfoCards />
      <PromotionalCards /> {/* New component */}
    </>
  );
}
