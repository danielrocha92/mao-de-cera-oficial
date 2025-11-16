'use client';

import { useState, useEffect } from 'react';
import styles from './Carrinho.module.css';
import Button from '@/components/ui/Button';
import TrashIcon from '@/components/ui/icons/TrashIcon';

// Mock data to be used as a fallback
const mockItems = [
    { id: 1, name: 'Vela Aromática de Lavanda', price: 49.90, quantity: 1 },
    { id: 2, name: 'Sabonete Artesanal de Alecrim', price: 19.90, quantity: 2 },
];

export default function CarrinhoPage() {
    const [items, setItems] = useState([]);

    // Load cart from localStorage on component mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setItems(JSON.parse(storedCart));
        } else {
            setItems(mockItems);
            localStorage.setItem('cart', JSON.stringify(mockItems));
        }
    }, []);

    const updateCart = (newItems) => {
        setItems(newItems);
        localStorage.setItem('cart', JSON.stringify(newItems));
    };

    const handleRemoveItem = (idToRemove) => {
        const updatedItems = items.filter(item => item.id !== idToRemove);
        updateCart(updatedItems);
    };

    const increaseQuantity = (id) => {
        const updatedItems = items.map(item => 
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCart(updatedItems);
    };

    const decreaseQuantity = (id) => {
        const itemToDecrease = items.find(item => item.id === id);
        let updatedItems;

        if (itemToDecrease.quantity > 1) {
            updatedItems = items.map(item => 
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
        } else {
            // If quantity is 1, remove the item
            updatedItems = items.filter(item => item.id !== id);
        }
        updateCart(updatedItems);
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={styles.container}>
            <h1>Carrinho de Compras</h1>
            {items.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <>
                    <div className={styles.itemsList}>
                        {items.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemDetails}>
                                    <span className={styles.itemName}>{item.name}</span>
                                    <span className={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                                <div className={styles.quantityControls}>
                                    <button onClick={() => decreaseQuantity(item.id)} className={styles.quantityButton}>-</button>
                                    <span className={styles.quantityText}>{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(item.id)} className={styles.quantityButton}>+</button>
                                    <button onClick={() => handleRemoveItem(item.id)} className={styles.trashButton} aria-label={`Remover ${item.name}`}>
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.summary}>
                        <h3>Total: R$ {total.toFixed(2)}</h3>
                        <Button>Finalizar Compra</Button>
                    </div>
                </>
            )}
        </div>
    );
}
