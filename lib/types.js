/**
 * @typedef {Object} Usuario
 * @property {string} uid - ID do Firebase Auth
 * @property {string} email
 * @property {string} nome
 * @property {string} cpf
 * @property {string} telefone
 * @property {Endereco} endereco
 * @property {boolean} isAdmin - Para acesso ao /admin
 */

/**
 * @typedef {Object} Produto
 * @property {string} nome
 * @property {string} slug - Gerado a partir do nome para a URL
 * @property {string} descricao
 * @property {string[]} imagens - URLs do Cloudinary
 * @property {number} preco
 * @property {number} [preco_promocional]
 * @property {number} custo
 * @property {string} sku
 * @property {number} estoque - Usar -1 para infinito
 * @property {number} peso_kg
 * @property {Dimensoes} dimensoes_cm - { comprimento, largura, altura }
 * @property {string[]} categorias
 * @property {string[]} tags_busca
 * @property {SEO} seo - { titulo, meta_descricao }
 */

/**
 * @typedef {Object} Pedido
 * @property {string} clienteId
 * @property {ItemPedido[]} itens
 * @property {string} status - ex: "processando", "pago", "enviado"
 * @property {number} total
 * @property {string} id_pagamento - ID do Mercado Pago
 * @property {string} [id_nfe] - ID do Bling
 * @property {string} [id_envio] - Rastreio
 */

/**
 * @typedef {Object} ConfiguracoesLoja
 * @property {string} nome_loja
 * @property {string} cnpj
 * @property {string} email_contato
 * @property {string} telefone_contato
 * @property {Endereco} endereco_loja
 * @property {CodigosExternos} codigos_externos - { gtm_id, ga4_id, fb_pixel_id }
 * @property {MeiosPagamento} meios_pagamento - { mercado_pago_keys }
 */

/**
 * @typedef {Object} Endereco
 * @property {string} rua
 * @property {string} numero
 * @property {string} [complemento]
 * @property {string} bairro
 * @property {string} cidade
 * @property {string} estado
 * @property {string} cep
 */

/**
 * @typedef {Object} Dimensoes
 * @property {number} comprimento
 * @property {number} largura
 * @property {number} altura
 */

/**
 * @typedef {Object} SEO
 * @property {string} titulo
 * @property {string} meta_descricao
 */

/**
 * @typedef {Object} ItemPedido
 * @property {string} produtoId
 * @property {string} nome
 * @property {number} quantidade
 * @property {number} preco_unitario
 */

/**
 * @typedef {Object} CodigosExternos
 * @property {string} [gtm_id]
 * @property {string} [ga4_id]
 * @property {string} [fb_pixel_id]
 */

/**
 * @typedef {Object} MeiosPagamento
 * @property {Object} mercado_pago_keys
 * @property {string} mercado_pago_keys.public_key
 * @property {string} mercado_pago_keys.access_token
 */
