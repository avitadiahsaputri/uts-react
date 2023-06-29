import { useState } from "react";
import Product from "../components/Product";
import Button from "../components/Button";
import {
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { MdClose} from "react-icons/md";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "MacBook Air 15”",
      image: "/macbook_air_15.jpg",
      price: 26999999,
      kategori: "Laptop",
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      price: 19999999,
      kategori: "Smartphone",
    },
    {
      id: 3,
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      price: 15999999,
      kategori: "SmartPhone",
    },
    {
      id: 4,
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      price: 66999999,
      kategori: "Headset",
    },
    {
      id: 5,
      name: "Apple Watch Series 8",
      image: "apple_watch_series_8.jpg",
      price: 7999999,
      kategori: "jam Tangan",
    },
    {
      id: 6,
      name: "iPad Pro",
      image: "/ipad_pro.jpg",
      price: 15999999,
      kategori: "Ipad",
    },
    {
      id: 7,
      name: "MacBook Air 15”",
      image: "/macbook_air_15.jpg",
      price: 26999999,
      kategori: "Laptop",
    },
    {
      id: 8,
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      price: 19999999,
      kategori: "Smartphone",
    },
    {
      id: 9,
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      price: 15999999,
      kategori: "Smartphone",
    },
    {
      id: 10,
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      price: 66999999,
      kategori: "Headset",
    },
    {
      id: 11,
      name: "Apple Watch Series 8",
      image: "apple_watch_series_8.jpg",
      price: 7999999,
      kategori: "Headset",
    },
    {
      id: 12,
      name: "iPad Pro",
      image: "/ipad_pro.jpg",
      price: 15999999,
      kategori: "Ipad",
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [idSquence, setIdSequence] = useState(products.length);
  const [newProduk, setNewProduk] = useState(); 
  const [cart, setCart] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sort, setSort] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [editedProduct, setEditedProduct] = useState();

  const filteredSortedProducts = products
    .toSorted((a, b) => {
      if (sortOrder === "asc") {
        return a[sort] < b[sort] ? -1 : 1;
      } else {
        return a[sort] > b[sort] ? -1 : 1;
      }
    })
    .filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    );

  return (
    <div className="products">
      <header>
        <Button onClick={() => setNewProduk({ id: idSquence })}>
          {" "}
          <AiOutlinePlus size={21} /> Tambah
        </Button>
        <label>
          Cari:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <section>
          Harga:
          <label>
            Minimal:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label>
            Maksimal:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value || Infinity)}
            />
          </label>
        </section>
        <section>
          Urutkan:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="id">Normal</option>
            <option value="name">Nama</option>
            <option value="price">Harga</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Naik</option>
            <option value="desc">Turun</option>
          </select>
        </section>
        <Button onClick={() => setIsCartOpen(true)}>
          <AiOutlineShoppingCart size={21} /> Keranjang:{" "}
          {cart.reduce((a, p) => a + p.count, 0)}
        </Button>
      </header>
      <main>
        {filteredSortedProducts.length > 0
          ? filteredSortedProducts
              .filter((_product, i) => i >= 4 * page - 4 && i < 4 * page)
              .map((product) => (
                <Product
                  key={product.id}
                  {...product}
                  setEditedProduct={setEditedProduct}
                />
              ))
          : "Tidak ada produk ditemukan."}
      </main>
      <footer>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Sebelumnya
        </Button>
        {filteredSortedProducts
          .filter((_product, i) => i % 4 === 0)
          .map((_product, i) => (
            <button
              key={i}
              className="page-number"
              onClick={() => setPage(i + 1)}
              disabled={i + 1 === page}
            >
              {i + 1}
            </button>
          ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(filteredSortedProducts.length / 4)}
        >
          Berikutnya
        </Button>
      </footer>
      {/* TAMBAH PRODUK */}
      {newProduk && (
        <form
          className="card dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts([...products, newProduk]);
            setNewProduk();
            setIdSequence(idSquence + 1);
          }}
        >
          <h1>Tambah Produk</h1>
          <label>
            ID
            <input type="text" value={newProduk.id} readOnly />
          </label>
          <label>
            Name
            <input
              type="text"
              onChange={(e) =>
                setNewProduk({ ...newProduk, name: e.target.value })
              }
              required
              autoFocus
            />
          </label>
          <label>
            Image
            <input
              type="url"
              onChange={(e) =>
                setNewProduk({ ...newProduk, image: e.target.value })
              }
              required
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              onChange={(e) =>
                setNewProduk({ ...newProduk, price: e.target.value })
              }
              required
            />
          </label>
          <label>
            kategori
            <select
              onChange={(e) =>
                setNewProduk({ ...newProduk, image: e.target.value })
              }
            >
              <option value="kategori">Semua</option>
              <option value="kategori">Laptop</option>
              <option value="kategori">Smartphone</option>
              <option value="kategori">Headset</option>
              <option value="kategori">Ipad</option>
              required autoFocus
            </select>
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setNewProduk(undefined)}
            >
              Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
      )}
      {editedProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts(
              products.map((product) =>
                product.id === editedProduct.id ? editedProduct : product
              )
            );
            setEditedProduct(undefined);
          }}
        >
          <h1>Edit Produk</h1>
          <label>
            Nama
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
              autoFocus
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label>
            Gambar
            <input
              type="url"
              value={editedProduct.image}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  image: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label>
            Kategori
            <select onChange={(e) => setSort(e.target.value)}>
              <option value="kategori">Semua</option>
              <option value="kategori">Laptop</option>
              <option value="kategori">Smartphone</option>
              <option value="kategori">Headset</option>
              <option value="kategori">Ipad</option>
              required autoFocus
            </select>
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setEditedProduct(undefined)}
            >
              Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
        // keranjang
        )}
        {isCartOpen && (
        <div className="card dialog">
          <Button onClick={() => setIsCartOpen(false)}>
            <MdClose />
          </Button>
          <h1>Keranjang</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Jumlah</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.count.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        if (product.count > 1) {
                          // menggunakan indeks:
                          // setCart(
                          //   cart.with(i, { ...planet, count: planet.count - 1 })
                          // );
                          // menggunakan ID planet:
                          setCart(
                            cart.map((p) =>
                              p.id === product.id
                                ? { ...p, count: p.count - 1 }
                                : p
                            )
                          );
                        } else {
                          setCart(cart.filter((p) => p.id !== product.id));
                        }
                      }}
                      title="Kurangi"
                    >
                      <AiOutlineMinusCircle />
                    </button>
                    <button
                      onClick={() => {
                        setCart(
                          cart.map((p) =>
                            p.id === product.id
                              ? { ...p, count: p.count + 1 }
                              : p
                          )
                        );
                      }}
                      title="Tambah"
                    >
                      <AiOutlinePlusCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
    </div>
    
  );
}
