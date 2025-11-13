// This page would be very similar to the 'novo' page.
// It would fetch the product data based on the `id` param,
// populate the form, and on submit, make a PUT request
// to `/api/produtos/[id]`.

export default function EditarProdutoPage({ params }) {
  const { id } = params;
  // TODO: Fetch product data for this ID
  return (
    <div>
      <h1>Editar Produto: {id}</h1>
      {/* TODO: Render a form similar to NovoProdutoPage, pre-filled with data */}
      <p>Formulário de edição do produto aqui...</p>
    </div>
  );
}
