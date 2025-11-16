'use client';

import { useState, useContext, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './ProdutoDetalhe.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import CustomLink from '@/components/ui/CustomLink'; // Adicionado import para CustomLink
import { CartAnimationContext } from '@/app/context/CartAnimationContext';

// Mock data
const mockProduct = { 
    id: 1, 
    slug: 'vela-lavanda', 
    nome: 'Vela Aromática de Lavanda', 
    descricao: 'Relaxe com nossa vela artesanal de cera de soja e óleo essencial de lavanda. Perfeita para criar um ambiente tranquilo e acolhedor em qualquer espaço.',
    preco: 49.90, 
    preco_antigo: 59.90, // Adicionado para simular desconto
    preco_pix: 47.40, // Adicionado para simular preço Pix
    marca: 'Mão de Cera', // Adicionado
    avaliacao: 4.8, // Adicionado
    numAvaliacoes: 120, // Adicionado
    categoria: 'Velas Aromáticas', // Adicionado para breadcrumbs
    imagens: ['/imagens/produtos/vela-lavanda-1.jpg', '/imagens/produtos/vela-lavanda-2.jpg', '/imagens/produtos/vela-lavanda-3.jpg'], // Atualizado para imagens mais realistas
    peso_kg: 0.3,
    dimensoes_cm: { comprimento: 8, largura: 8, altura: 10 }
};

export default function ProdutoDetalhePage({ params }) {
    const { slug } = params;
    const [shippingCost, setShippingCost] = useState(null);
    const [cep, setCep] = useState('');
    const [selectedImage, setSelectedImage] = useState(''); // Novo estado para a imagem selecionada
    const [quantity, setQuantity] = useState(1); // Novo estado para a quantidade
    
    const { triggerAnimation } = useContext(CartAnimationContext);
    const addToCartButtonRef = useRef(null);

    // TODO: Fetch product data from Firestore using the slug
    const product = mockProduct;

    useEffect(() => {
        if (product && product.imagens.length > 0) {
            setSelectedImage(product.imagens[0]); // Define a primeira imagem como selecionada ao carregar o produto
        }
    }, [product]);

    const handleAddToCart = (e) => {
        // 1. Add product to cart (localStorage)
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity; // Usa o estado quantity
        } else {
            cart.push({ 
                id: product.id, 
                name: product.nome, 
                price: product.preco, 
                quantity: quantity, // Usa o estado quantity
                image: product.imagens[0] // Save image for cart display
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));

        // 2. Trigger animation
        if (addToCartButtonRef.current) {
            const rect = addToCartButtonRef.current.getBoundingClientRect();
            triggerAnimation(rect, product.imagens[0]);
        }
        
        console.log(`Added ${quantity} of ${product.nome} to cart.`);
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
        <div className={styles.pageWrapper}> {/* New wrapper for breadcrumbs and main content */}
            {/* Breadcrumbs Placeholder */}
            <div className={styles.breadcrumbs}>
                <CustomLink href="/">Home</CustomLink> &gt; 
                <CustomLink href="/produtos">Produtos</CustomLink> &gt; 
                {product.categoria && (
                    <>
                        <CustomLink href={`/produtos?categoria=${product.categoria.toLowerCase()}`}>{product.categoria}</CustomLink> &gt; 
                    </>
                )}
                <span>{product.nome}</span>
            </div>

            <div className={styles.container}>
                <div className={styles.imageGallery}>
                    <div className={styles.mainImageContainer}>
                        <Image 
                            src={selectedImage} 
                            alt={`${product.nome} - Imagem principal`} 
                            width={600} 
                            height={600} 
                            className={styles.mainProductImage}
                        />
                    </div>
                    <div className={styles.thumbnailContainer}>
                        {product.imagens.map((imageSrc, index) => (
                            <Image 
                                key={index} 
                                src={imageSrc} 
                                alt={`${product.nome} - Miniatura ${index + 1}`} 
                                width={100} 
                                height={100} 
                                className={`${styles.thumbnailImage} ${selectedImage === imageSrc ? styles.selectedThumbnail : ''}`}
                                onClick={() => setSelectedImage(imageSrc)}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.details}>
                    <p className={styles.brand}>{product.marca}</p>
                    <h1>{product.nome}</h1>
                    <div className={styles.ratings}>
                        {/* Star ratings placeholder */}
                        <span>{'⭐'.repeat(Math.floor(product.avaliacao))}</span>
                        <span>({product.numAvaliacoes} avaliações)</span>
                    </div>
                    
                    <div className={styles.priceInfo}>
                        {product.preco_antigo && <p className={styles.oldPrice}>De: R$ {product.preco_antigo.toFixed(2)}</p>}
                        <p className={styles.currentPrice}>Por: R$ {product.preco.toFixed(2)}</p>
                        {product.preco_pix && <p className={styles.pixPrice}>Ou R$ {product.preco_pix.toFixed(2)} no Pix</p>}
                    </div>
                    
                    <div className={styles.actions}>
                        <div className={styles.quantitySelector}>
                            <Button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</Button>
                            <Input 
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className={styles.quantityInput}
                            />
                            <Button onClick={() => setQuantity(prev => prev + 1)}>+</Button>
                        </div>
                        <div ref={addToCartButtonRef}>
                            <Button onClick={handleAddToCart} className={styles.addToCartButton}>Adicionar ao Carrinho</Button>
                        </div>
                    </div>

                    {/* Placeholder for Delivery/Service Info */}
                    <div className={styles.deliveryInfo}>
                        <p>🚚 Frete grátis para compras acima de R$ 199!</p>
                        <p>📦 Entrega rápida para todo o Brasil.</p>
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
        </div>
    );
}
