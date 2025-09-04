import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import axios from "axios";
import Navbar from "../../components/Navbar";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("recommended");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    };
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    let updated = [...selectedCategories];

    if (checked) updated.push(value);
    else updated = updated.filter((c) => c !== value);

    setSelectedCategories(updated);

    if (updated.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => updated.includes(p.category)));
    }
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortOption(sort);

    let sorted = [...filteredProducts];
    if (sort === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <div className="text-sm text-stone-600 px-8 py-2">
        Home &gt; <span className="text-black font-medium">All Products</span>
      </div>

      <div className="flex px-8 py-6 gap-8">
        {/* Sidebar */}
        <aside className="w-64 space-y-8 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Browse by</h3>
            <ul className="space-y-1 underline text-stone-700">
              <li><a href="#">All Products</a></li>
              <li><a href="#">Men's Tees</a></li>
              <li><a href="#">Women's Tees</a></li>
              <li><a href="#">Youth Tees</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Filter by</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Product type</h4>
                <label><input type="checkbox" value="Men" onChange={handleCategoryChange} className="mr-2" /> Men's Tees</label><br />
                <label><input type="checkbox" value="Women" onChange={handleCategoryChange} className="mr-2" /> Women's Tees</label><br />
                <label><input type="checkbox" value="Youth" onChange={handleCategoryChange} className="mr-2" /> Youth Tees</label>
              </div>
              <div><h4 className="font-medium">Price</h4></div>
              <div><h4 className="font-medium">Color</h4></div>
              <div><h4 className="font-medium">Size</h4></div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <img
              src="src\assets\img\home\allProduct.png"
              alt="Category"
              className="w-full h-60 object-cover rounded"
            />
          </div>


          <div className="flex justify-between items-center mb-4 text-sm">
            <p>{filteredProducts.length} products</p>
            <select
              className="border border-stone-300 p-2 rounded"
              onChange={handleSortChange}
              value={sortOption}
            >
              <option value="recommended">Sort by: Recommended</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
