'use client';

import { useState, useEffect, useMemo } from 'react';
import styles from './VariationsManager.module.css';

export default function VariationsManager({ initialVariations = [], onChange, onSkuChange }) {
    const [variationTypes, setVariationTypes] = useState(initialVariations);
    const [newVariationType, setNewVariationType] = useState('');
    const [newValues, setNewValues] = useState({});
    const [skus, setSkus] = useState({});

    const getSkuCombinations = useMemo(() => {
        if (variationTypes.length === 0) return [];
    
        const combinations = variationTypes.reduce((acc, curr) => {
            if (acc.length === 0) {
                return curr.values.map(v => [{ type: curr.name, value: v }]);
            }
            const next = [];
            acc.forEach(c => {
                curr.values.forEach(v => {
                    next.push([...c, { type: curr.name, value: v }]);
                });
            });
            return next;
        }, []);
        
        return combinations;
    }, [variationTypes]);

    useEffect(() => {
        onChange(variationTypes);
    }, [variationTypes, onChange]);

    useEffect(() => {
        onSkuChange(skus);
    }, [skus, onSkuChange]);

    const addVariationType = () => {
        if (newVariationType && !variationTypes.find(vt => vt.name === newVariationType)) {
            setVariationTypes([...variationTypes, { name: newVariationType, values: [] }]);
            setNewVariationType('');
        }
    };

    const removeVariationType = (typeName) => {
        setVariationTypes(variationTypes.filter(vt => vt.name !== typeName));
    };

    const handleValueChange = (typeName, value) => {
        setNewValues({ ...newValues, [typeName]: value });
    };

    const addVariationValue = (typeName) => {
        const value = newValues[typeName];
        if (value) {
            setVariationTypes(variationTypes.map(vt => {
                if (vt.name === typeName && !vt.values.includes(value)) {
                    return { ...vt, values: [...vt.values, value] };
                }
                return vt;
            }));
            setNewValues({ ...newValues, [typeName]: '' });
        }
    };
    
    const removeVariationValue = (typeName, valueToRemove) => {
        setVariationTypes(variationTypes.map(vt => {
            if (vt.name === typeName) {
                return { ...vt, values: vt.values.filter(v => v !== valueToRemove) };
            }
            return vt;
        }));
    };

    const handleSkuChange = (key, field, value) => {
        setSkus(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                [field]: value
            }
        }))
    }

    return (
        <div className={styles.container}>
            <h2>Variações</h2>
            
            <div className={styles.addTypeContainer}>
                <input
                    type="text"
                    id="newVariationType"
                    name="newVariationType"
                    value={newVariationType}
                    onChange={(e) => setNewVariationType(e.target.value)}
                    placeholder="Ex: Cor"
                    autoComplete="off"
                />
                <button type="button" onClick={addVariationType}>Adicionar</button>
            </div>

            {variationTypes.map(vt => (
                <div key={vt.name} className={styles.variationType}>
                    <div className={styles.variationTypeHeader}>
                        <h3>{vt.name}</h3>
                        <button type="button" onClick={() => removeVariationType(vt.name)} className={styles.removeButton}>Remover</button>
                    </div>
                    <div className={styles.addValueContainer}>
                        <input
                            type="text"
                            id={`new-value-${vt.name}`}
                            name={`new-value-${vt.name}`}
                            value={newValues[vt.name] || ''}
                            onChange={(e) => handleValueChange(vt.name, e.target.value)}
                            placeholder={`Ex: Azul, Verde, etc.`}
                            onKeyDown={(e) => e.key === 'Enter' && addVariationValue(vt.name)}
                            autoComplete="off"
                        />
                        <button type="button" onClick={() => addVariationValue(vt.name)}>Adicionar Valor</button>
                    </div>
                    <div className={styles.valuesContainer}>
                        {vt.values.map(val => (
                            <span key={val} className={styles.valueTag}>
                                {val}
                                <button type="button" onClick={() => removeVariationValue(vt.name, val)}>&times;</button>
                            </span>
                        ))}
                    </div>
                </div>
            ))}

            {getSkuCombinations.length > 0 && (
                <div className={styles.skuTableContainer}>
                    <table className={styles.skuTable}>
                        <thead>
                            <tr>
                                {variationTypes.map(vt => <th key={vt.name}>{vt.name}</th>)}
                                <th>Preço</th>
                                <th>Estoque</th>
                                <th>SKU</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getSkuCombinations.map((combo) => {
                                const key = combo.map(c => c.value).join('-');
                                return (
                                    <tr key={key}>
                                        {combo.map(c => <td key={c.value}>{c.value}</td>)}
                                        <td><input type="number" id={`price-${key}`} name={`price-${key}`} value={skus[key]?.price || ''} onChange={(e) => handleSkuChange(key, 'price', e.target.value)} autoComplete="off" /></td>
                                        <td><input type="number" id={`stock-${key}`} name={`stock-${key}`} value={skus[key]?.stock || ''} onChange={(e) => handleSkuChange(key, 'stock', e.target.value)} autoComplete="off" /></td>
                                        <td><input type="text" id={`sku-${key}`} name={`sku-${key}`} value={skus[key]?.sku || ''} onChange={(e) => handleSkuChange(key, 'sku', e.target.value)} autoComplete="off" /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
