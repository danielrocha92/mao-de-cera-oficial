'use client';

import { useState, useContext, useRef } from 'react';
import Image from 'next/image';
import styles from './ProdutoDetalhe.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { CartAnimationContext } from '@/app/context/CartAnimationContext';

// Mock data
const mockProduct = { 
    id: 1, 
    slug: 'vela-lavanda', 
    nome: 'Vela Aromática de Lavanda', 
    descricao: 'Relaxe com nossa vela artesanal de cera de soja e óleo essencial de lavanda.',
    preco: 49.90, 
    imagens: ['/placeholder.jpg', '/placeholder-2.jpg'],
    peso_kg: 0.3,
    dimensoes_cm: { comprimento: 8, largura: 8, altura: 10 }
};

export default function ProdutoDetalhePage({ params }) {
    const { slug } = params;
    const [shippingCost, setShippingCost] = useState(null);
    const [cep, setCep] = useState('');
    
    const { triggerAnimation } = useContext(CartAnimationContext);
    const addToCartButtonRef = useRef(null);

    // TODO: Fetch product data from Firestore using the slug
    const product = mockProduct;

    const handleAddToCart = (e) => {
        // 1. Add product to cart (localStorage)
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ 
                id: product.id, 
                name: product.nome, 
                price: product.preco, 
                quantity: 1,
                image: product.imagens[0] // Save image for cart display
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));

        // 2. Trigger animation
        if (addToCartButtonRef.current) {
            const rect = addToCartButtonRef.current.getBoundingClientRect();
            triggerAnimation(rect, product.imagens[0]);
        }
        
        console.log(`Added ${product.nome} to cart.`);
    };

    const handleCalculateShipping = async (e) => {
        e.preventDefault();
        // TODO: Call the /api/frete/calcular endpoint
        const res = await fetch('/api/frete/calcular', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                cep_destino: cep, 
                peso_kg: product.peso_kg, 
                dimensoes_cm: product.dimensoes_cm 
            })
        });
        const data = await res.json();
        setShippingCost(data);
    };

    if (!product) {
        return <div>Produto não encontrado.</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageGallery}>
                {product.imagens.map((imageSrc, index) => (
                    <Image 
                        key={index} 
                        src={imageSrc} 
                        alt={`${product.nome} - Imagem ${index + 1}`} 
                        width={500} 
                        height={500} 
                        className={styles.productImage}
                    />
                ))}
            </div>
            <div className={styles.details}>
                <h1>{product.nome}</h1>
                <p className={styles.price}>R$ {product.preco.toFixed(2)}</p>
                
                <div className={styles.actions}>
                    <div ref={addToCartButtonRef}>
                        <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
                    </div>
                </div>

                <div className={styles.descriptionSection}>
                    <h3>Descrição</h3>
                    <p>{product.descricao}</p>
                </div>

                <div className={styles.specifications}>
                    <h3>Especificações Técnicas</h3>
                    <ul>
                        <li>Peso: {product.peso_kg} kg</li>
                        <li>Dimensões: {product.dimensoes_cm.comprimento}x{product.dimensoes_cm.largura}x{product.dimensoes_cm.altura} cm</li>
                    </ul>
                </div>

                <div className={styles.shippingCalculator}>
                    <h3>Calcular Frete</h3>
                    <form onSubmit={handleCalculateShipping} className={styles.shippingForm}>
                        <Input 
                            name="cep"
                            placeholder="Seu CEP"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        />
                        <Button type="submit">Calcular</Button>
                    </form>
                    {shippingCost && (
                        <div className={styles.shippingResults}>
                            {shippingCost.map(option => (
                                <div key={option.name}>
                                    {option.name}: R$ {option.cost.toFixed(2)} ({option.deadline})
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
