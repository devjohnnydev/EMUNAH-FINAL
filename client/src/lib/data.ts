import tShirtImg from '@assets/generated_images/t-shirt_mockup_with_logo.png';
import mugImg from '@assets/generated_images/mug_mockup_with_logo.png';

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: 'Roupas' | 'Acessórios';
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Camiseta EMUNAH Básica',
    slug: 'camiseta-emunah-basica',
    price: 89.90,
    description: 'Camiseta de algodão premium com o logo minimalista da EMUNAH. Conforto e propósito em uma peça única.',
    category: 'Roupas',
    image: tShirtImg
  },
  {
    id: 2,
    name: 'Caneca Fé Diária',
    slug: 'caneca-fe-diaria',
    price: 45.90,
    description: 'Caneca de cerâmica perfeita para seu café ou chá. Comece o dia lembrando do seu propósito.',
    category: 'Acessórios',
    image: mugImg
  },
  {
    id: 3,
    name: 'Camiseta Versículo',
    slug: 'camiseta-versiculo',
    price: 99.90,
    description: 'Camiseta com estampa tipográfica inspirada em versículos bíblicos. Design moderno e sóbrio.',
    category: 'Roupas',
    image: tShirtImg
  },
  {
    id: 4,
    name: 'Ecobag Propósito',
    slug: 'ecobag-proposito',
    price: 35.90,
    description: 'Sacola ecológica resistente para o dia a dia. Leve a mensagem por onde for.',
    category: 'Acessórios',
    image: mugImg // Using mug placeholder for now as I don't have an ecobag mockup
  }
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
