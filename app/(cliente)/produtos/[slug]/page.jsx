'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProdutoDetalhe.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

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

    // TODO: Fetch product data from Firestore using the slug
    const product = mockProduct;

    const handleAddToCart = () => {
        // TODO: Add product to cart (localStorage or global state)
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
                <Image src={product.imagens[0]} alt={product.nome} width={500} height={500} />
            </div>
            <div className={styles.details}>
                <h1>{product.nome}</h1>
                <p className={styles.price}>R$ {product.preco.toFixed(2)}</p>
                <p className={styles.description}>{product.descricao}</p>
                <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>

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
