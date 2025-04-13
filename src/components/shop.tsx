"use client";

import { cn } from "@/utils";
import { useState } from "react";

interface Product {
	id: number;
	name: string;
	description: string;
	publicationDate: Date;
}

export function Shop() {
	const [products, setProducts] = useState<Product[]>([]);

	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddProduct = () => {
		if (!newProduct.name || !newProduct.description) {
			alert("Please fill in all fields.");
			return;
		}

		const product: Product = {
			id: products.length + 1,
			name: newProduct.name,
			description: newProduct.description,
			publicationDate: new Date(),
		};

		setProducts((prev) => [...prev, product]);
		setNewProduct({ name: "", description: "" });
	};

	const handleDeleteProduct = (id: number) => {
		setProducts((prev) => prev.filter((product) => product.id !== id));
	};

	return (
		<div className="font-sans">
			<header
				className={cn(
					"w-full bg-[rgb(var(--foreground),0.03)] border-b",
					"dark:border-[rgb(var(--foreground),0.1)] p-10 pt-20"
				)}
			>
				<h1 className="text-4xl font-bold">MyShop</h1>
			</header>

			<main className="flex flex-col gap-8 p-10">
				{/* Product Creation Form */}
				<section
					className={cn(
						"p-4 border dark:border-[rgb(var(--foreground),0.1)] rounded-lg",
						"pt-8 shadow-md relative"
					)}
				>
					<h2
						className={cn(
							"font-bold px-3 absolute -top-5 h-10 left-5 flex items-center justify-center",
							"rounded-md bg-sky-700 text-white dark:bg-slate-700"
						)}
					>
						Add New Product
					</h2>
					<div className="flex flex-col gap-4">
						<input
							type="text"
							name="name"
							placeholder="Enter product name here"
							value={newProduct.name}
							onChange={handleInputChange}
							className="h-10 w-full font-bold text-lg"
						/>
						<textarea
							name="description"
							placeholder="Describe the product here"
							value={newProduct.description}
							onChange={handleInputChange}
							rows={2}
							className="w-full resize-none"
						/>
						<button
							onClick={handleAddProduct}
							className={cn(
								"p-2 rounded-md bg-[rgb(var(--foreground),0.05)] hover:bg-[rgb(var(--foreground),0.07)]"
							)}
						>
							Add Product
						</button>
					</div>
				</section>

				{/* Product Listing */}
				<section
					className={cn(
						"p-4 border rounded-lg shadow-md",
						"dark:border-[rgb(var(--foreground),0.1)]"
					)}
				>
					<h2 className="text-xl font-semibold mb-4">Product List</h2>
					{products.length === 0 ? (
						<p className="text-gray-500">
							No products available. Add some products to get started.
						</p>
					) : (
						<ul className="space-y-4">
							{products.map((product) => (
								<li
									key={product.id}
									className={cn(
										"p-4 border rounded-lg flex justify-between items-center",
										"dark:border-[rgb(var(--foreground),0.1)]"
									)}
								>
									<div>
										<h3 className="text-lg font-bold">{product.name}</h3>
										<p className="opacity-80">{product.description}</p>
										<p className="text-sm opacity-70">
											Published on:{" "}
											{product.publicationDate.toLocaleDateString()}
										</p>
									</div>
									<button
										onClick={() => handleDeleteProduct(product.id)}
										className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
									>
										Delete
									</button>
								</li>
							))}
						</ul>
					)}
				</section>
			</main>
		</div>
	);
}
