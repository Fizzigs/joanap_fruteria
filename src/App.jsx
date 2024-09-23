import { useState } from 'react';
import './App.css';

function App() {
  const [products] = useState([
    //Definimos el array de productos con sus valores
    {
      id: 1,
      nom: 'Plàtan',
      preu: 0.5
    },

    {
      id: 2,
      nom: 'Poma',
      preu: 0.8
    },
    {
      id: 3,
      nom: 'Pinya',
      preu: 5
    },
    {
      id: 4,
      nom: 'Meló',
      preu: 6
    },
  ]);

  const [selectedProducts, setSelectedProduct] = useState([]);
  //Lógica para añadir productos y sumarse en caso de que ya exista
  const addProduct = (product) => {
    setSelectedProduct((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeSingleProduct = (product) => {
    setSelectedProduct((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          // Reducir la cantidad si hay más de uno
          return prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          // Eliminar completamente el producto si solo queda uno
          return prev.filter((item) => item.id !== product.id);
        }
      }
      return prev;
    });
  };

  const totalPrice = selectedProducts.reduce(
    (total, product) => total + product.preu * product.quantity,
    0
  );
  //Estructura: con apartado productos con sus características y con boton para añadir al .map
    return (
        <div className="contenedor-productos">
        <div className="estructura-productos">
        <h1>Productos</h1>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.nom} - ${product.preu}
                <button onClick={() => addProduct(product)}>Añadir</button>
              </li>
            ))}
          </ul>
        </div>
        
      <div className="estructura-seleccionados">
        <h2>Productos Seleccionados</h2>
        <ul>
          {selectedProducts.map((product) => (
            <li key={product.id}>
              {product.nom} - ${product.preu} x {product.quantity}
              <button onClick={() => removeSingleProduct(product)} className="remove-button">
                Eliminar producto
              </button>
            </li>
          ))}
        </ul>
        <h2 className="total-price">Total: ${totalPrice.toFixed(2)}</h2>
      </div>
    </div>
    );
  }

export default App;
