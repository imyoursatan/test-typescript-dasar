import React, { useState } from 'react';

interface Product {
	id: number;
	name: string;
	price: number;
}

const ProductComponent: React.FC<{
	product: Product;
	onDelete: (id: number) => void;
}> = ({ product, onDelete }) => {
	return (
		<div>
			<p>
				{product.name} - ${product.price}
			</p>
			<button onClick={() => onDelete(product.id)}>Delete</button>
		</div>
	);
};

const App: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);

	const [newProduct, setNewProduct] = useState<Product>({
		id: 0,
		name: '',
		price: 0,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setProducts([...products, newProduct]);
		setNewProduct({ id: 0, name: '', price: 0 });
	};

	const handleDelete = (id: number) => {
		setProducts(products.filter((product) => product.id !== id));
	};

	return (
		<div>
			<h1>listt produk</h1>

			{products.map((product) => (
				<ProductComponent
					key={product.id}
					product={product}
					onDelete={handleDelete}
				/>
			))}

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="nama produk"
					value={newProduct.name}
					onChange={(e) =>
						setNewProduct({ ...newProduct, name: e.target.value })
					}
				/>
				<input
					type="number"
					placeholder="hagra"
					value={newProduct.price}
					onChange={(e) =>
						setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
					}
				/>
				<button type="submit">tambah produk</button>
			</form>
		</div>
	);
};

export default App;
