
import { useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import "./App.css";

const categories = [
  { name: "All", slug: "all", symbol: "✳" },
  { name: "Clothing", slug: "clothing", symbol: "◈" },
  { name: "Indian Wear", slug: "indian-wear", symbol: "✿" },
  { name: "Tops", slug: "tops", symbol: "◇" },
  { name: "Denim", slug: "denim", symbol: "▤" },
  { name: "Dresses", slug: "dresses", symbol: "♧" },
  { name: "Footwear", slug: "footwear", symbol: "⌁" },
  { name: "Bags", slug: "bags", symbol: "▱" },
  { name: "Jewelry", slug: "jewelry", symbol: "✧" },
  { name: "Accessories", slug: "accessories", symbol: "❋" },
  { name: "Makeup", slug: "makeup", symbol: "◉" },
  { name: "Skincare", slug: "skincare", symbol: "❀" },
  { name: "Haircare", slug: "haircare", symbol: "〰" },
  { name: "Bodycare", slug: "bodycare", symbol: "♡" },
  { name: "Lifestyle", slug: "lifestyle", symbol: "⌂" },
  { name: "Electronics", slug: "electronics", symbol: "⌘" },
];

const products = [
  {
    id: 1,
    name: "The Everyday Linen Shirt",
    category: "Tops",
    slug: "tops",
    price: 1299,
    oldPrice: 1799,
    tag: "BESTSELLER",
    color: "Ivory",
    image:
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Soft Sculpt Straight Jeans",
    category: "Denim",
    slug: "denim",
    price: 1699,
    oldPrice: 2199,
    tag: "TRENDING",
    color: "Classic blue",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Rose Garden Midi Dress",
    category: "Dresses",
    slug: "dresses",
    price: 2199,
    oldPrice: 2799,
    tag: "NEW IN",
    color: "Rose",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Everyday Gold Hoops",
    category: "Jewelry",
    slug: "jewelry",
    price: 499,
    oldPrice: 799,
    tag: "UNDER ₹500",
    color: "Gold",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "The Mini Shoulder Bag",
    category: "Bags",
    slug: "bags",
    price: 1499,
    oldPrice: 1999,
    tag: "MOST LOVED",
    color: "Chocolate",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Cloud Nine Everyday Flats",
    category: "Footwear",
    slug: "footwear",
    price: 1199,
    oldPrice: 1599,
    tag: "COMFORT PICK",
    color: "Cream",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Rosewater Lip Tint",
    category: "Makeup",
    slug: "makeup",
    price: 599,
    oldPrice: 799,
    tag: "BEAUTY PICK",
    color: "Rose pink",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    name: "Daily Dew Hydration Serum",
    category: "Skincare",
    slug: "skincare",
    price: 749,
    oldPrice: 999,
    tag: "SKIN ESSENTIAL",
    color: "Hydration",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 9,
    name: "The Modern Kurti",
    category: "Indian Wear",
    slug: "indian-wear",
    price: 1399,
    oldPrice: 1899,
    tag: "NEW IN",
    color: "Sage green",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 10,
    name: "Satin Scrunchie Set",
    category: "Accessories",
    slug: "accessories",
    price: 299,
    oldPrice: 399,
    tag: "CUTE FINDS",
    color: "Pastel mix",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 11,
    name: "Silky Smooth Hair Mask",
    category: "Haircare",
    slug: "haircare",
    price: 649,
    oldPrice: 849,
    tag: "SELF-CARE",
    color: "Nourishing",
    image:
      "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 12,
    name: "Vanilla Body Butter",
    category: "Bodycare",
    slug: "bodycare",
    price: 549,
    oldPrice: 699,
    tag: "SOFT SKIN",
    color: "Vanilla",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 13,
    name: "Minimal Everyday Watch",
    category: "Accessories",
    slug: "accessories",
    price: 1799,
    oldPrice: 2499,
    tag: "TIMELESS",
    color: "Silver",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 14,
    name: "Wireless Everyday Earbuds",
    category: "Electronics",
    slug: "electronics",
    price: 1999,
    oldPrice: 2999,
    tag: "TECH EDIT",
    color: "White",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 15,
    name: "The Weekend Tote",
    category: "Bags",
    slug: "bags",
    price: 1099,
    oldPrice: 1499,
    tag: "EVERYDAY",
    color: "Natural",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 16,
    name: "Cozy Home Candle",
    category: "Lifestyle",
    slug: "lifestyle",
    price: 399,
    oldPrice: 549,
    tag: "LITTLE LUXURY",
    color: "Warm vanilla",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 17,
    name: "The Weekend Co-ord",
    category: "Clothing",
    slug: "clothing",
    price: 1899,
    oldPrice: 2499,
    tag: "TRENDING",
    color: "Sand",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 18,
    name: "Pearl Detail Hair Clip",
    category: "Accessories",
    slug: "accessories",
    price: 249,
    oldPrice: 349,
    tag: "CUTE FINDS",
    color: "Pearl",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
];

const formatPrice = (price) =>
  `₹${price.toLocaleString("en-IN")}`;

function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAdd(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45 }}
    >
      <div className="product-image-wrap">
        <Link
          to={`/shop/${product.slug}`}
          className="product-image-link"
          aria-label={`Browse ${product.category}`}
        >
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </Link>

        <span className="product-tag">{product.tag}</span>

        <button
          className="quick-add"
          type="button"
          onClick={handleAdd}
          aria-label={`Add ${product.name} to bag`}
        >
          {added ? "Added ✓" : "+ Add to bag"}
        </button>
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3>{product.name}</h3>
        <p className="product-color">{product.color}</p>
        <div className="product-pricing">
          <strong>{formatPrice(product.price)}</strong>
          <del>{formatPrice(product.oldPrice)}</del>
          <span>
            {Math.round(
              (1 - product.price / product.oldPrice) * 100
            )}% off
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function CategoryStrip() {
  return (
    <section className="category-section" id="categories">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A LITTLE SOMETHING FOR EVERY YOU</p>
          <h2>Find your <em>kind of lovely.</em></h2>
        </div>
        <span className="heading-aside">THE CATEGORY EDIT / 01</span>
      </div>

      <div className="category-grid">
        {categories.slice(1).map((category, index) => (
          <Link
            to={`/shop/${category.slug}`}
            className={`category-tile category-tone-${index % 4}`}
            key={category.slug}
          >
            <span className="category-symbol">{category.symbol}</span>
            <span>{category.name}</span>
            <span className="category-arrow">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProductSection({
  title,
  eyebrow,
  items,
  onAdd,
  linkTo = "/shop/all",
  linkLabel = "View all",
}) {
  return (
    <section className="product-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <Link className="text-link" to={linkTo}>
          {linkLabel} ↗
        </Link>
      </div>

      <div className="product-grid">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAdd}
          />
        ))}
      </div>
    </section>
  );
}

function HomePage({ onAdd }) {
  const featured = products.slice(0, 4);
  const beauty = products.filter((p) =>
    ["makeup", "skincare", "haircare", "bodycare"].includes(p.slug)
  );

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="hero-eyebrow">
              <span className="tiny-star">✳</span>
              YOUR EVERYDAY, A LITTLE MORE EXTRA
            </p>

            <h1>
              Dress like
              <br />
              <em>you mean it.</em>
            </h1>

            <p className="hero-description">
              Fashion, beauty, little luxuries, and all the
              things that make you feel a little more you.
            </p>

            <div className="hero-buttons">
              <Link to="/shop/all" className="button button-dark">
                Shop the collection <span>↗</span>
              </Link>
              <Link to="/shop/clothing" className="button button-light">
                Explore fashion
              </Link>
            </div>

            <div className="hero-footnote">
              <span>CURATED WITH LOVE</span>
              <span>MADE FOR YOUR EVERYDAY</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=90"
            alt="Women's fashion editorial"
          />
          <div className="hero-image-label">
            <span>THE NEW SEASON</span>
            <strong>Wear what feels like you.</strong>
            <Link to="/shop/clothing">Discover the edit ↗</Link>
          </div>
          <div className="hero-round-note">A GOOD<br />DAY TO<br />FEEL GOOD.</div>
        </motion.div>
      </section>

      <div className="announcement-strip">
        <span>GOOD FINDS, BETTER FEELINGS</span>
        <span>✳</span>
        <span>YOUR NEXT FAVOURITE THING IS HERE</span>
        <span>✳</span>
        <span>STYLE YOUR OWN STORY</span>
      </div>

      <CategoryStrip />

      <ProductSection
        eyebrow="THE PIECES EVERYONE LOVES"
        title={<>Your new <em>favourites.</em></>}
        items={featured}
        onAdd={onAdd}
        linkTo="/shop/all"
      />

      <section className="beauty-banner">
        <div className="beauty-banner-image">
          <img
            src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85"
            alt="Beauty and skincare products"
            loading="lazy"
          />
        </div>
        <div className="beauty-banner-copy">
          <p className="eyebrow">YOUR LITTLE SELF-CARE RITUAL</p>
          <h2>
            Glow at
            <br />
            <em>your own pace.</em>
          </h2>
          <p>
            Skincare, makeup, haircare, and bodycare essentials
            for your own version of a feel-good day.
          </p>
          <Link to="/shop/skincare" className="button button-dark">
            Explore beauty <span>↗</span>
          </Link>
        </div>
      </section>

      <ProductSection
        eyebrow="A MOMENT FOR YOURSELF"
        title={<>The self-care <em>shelf.</em></>}
        items={beauty}
        onAdd={onAdd}
        linkTo="/shop/skincare"
        linkLabel="Shop skincare"
      />

      <section className="closing-banner">
        <span className="closing-symbol">✳</span>
        <p className="eyebrow">YOUR STYLE, YOUR RULES</p>
        <h2>Little things.<br /><em>Big main-character energy.</em></h2>
        <Link to="/shop/accessories" className="button button-dark">
          Find your little extras <span>↗</span>
        </Link>
      </section>
    </main>
  );
}

function ShopPage({ onAdd, searchQuery }) {
  const { slug = "all" } = useParams();

  const category = categories.find((item) => item.slug === slug);
  const categoryName =
    slug === "all" ? "Everything lovely" : category?.name || "Shop";

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        slug === "all" ||
        product.slug === slug ||
        (slug === "clothing" &&
          ["Tops", "Denim", "Dresses", "Indian Wear", "Clothing"].includes(
            product.category
          ));

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${product.name} ${product.category} ${product.color}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [slug, searchQuery]);

  return (
    <main className="shop-page">
      <div className="shop-intro">
        <p className="eyebrow">THE LUNE & LACE COLLECTION</p>
        <h1>{categoryName}<em>.</em></h1>
        <p>
          Good things to wear, use, gift, and keep.
          Find your next favourite here.
        </p>
      </div>

      <div className="shop-categories">
        {categories.map((item) => (
          <Link
            key={item.slug}
            className={slug === item.slug ? "shop-filter active" : "shop-filter"}
            to={`/shop/${item.slug}`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="shop-results-heading">
        <span>{filteredProducts.length} pieces to discover</span>
        <span>CURATED FOR YOU</span>
      </div>

      {filteredProducts.length ? (
        <div className="product-grid shop-product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={onAdd}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>✳</span>
          <h2>No pieces found just yet.</h2>
          <p>Try another search or explore all our collections.</p>
          <Link to="/shop/all" className="button button-dark">
            Browse everything
          </Link>
        </div>
      )}
    </main>
  );
}

function BagPage({ bag, setBag }) {
  const navigate = useNavigate();

  const bagItems = Object.values(bag);
  const subtotal = bagItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function updateQuantity(id, amount) {
    setBag((current) => {
      const next = { ...current };
      if (!next[id]) return current;

      const quantity = next[id].quantity + amount;
      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = { ...next[id], quantity };
      }
      return next;
    });
  }

  return (
    <main className="bag-page">
      <p className="eyebrow">A FEW GOOD CHOICES</p>
      <h1>Your bag<em>.</em></h1>

      {!bagItems.length ? (
        <div className="empty-state">
          <span>♡</span>
          <h2>Your bag is waiting for something lovely.</h2>
          <p>Take a look around and find something that feels like you.</p>
          <button
            className="button button-dark"
            onClick={() => navigate("/shop/all")}
          >
            Start exploring ↗
          </button>
        </div>
      ) : (
        <div className="bag-layout">
          <div className="bag-items">
            {bagItems.map((item) => (
              <article className="bag-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="bag-item-info">
                  <p className="product-category">{item.category}</p>
                  <h3>{item.name}</h3>
                  <p>{item.color}</p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, -1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </article>
            ))}
          </div>

          <aside className="bag-summary">
            <p className="eyebrow">YOUR ORDER</p>
            <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div><span>Shipping</span><span>Calculated at checkout</span></div>
            <div className="bag-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
            <button
              className="button button-dark checkout-button"
              onClick={() =>
                window.alert(
                  "This is a frontend demo. Connect a backend and payment provider to enable checkout."
                )
              }
            >
              Continue to checkout ↗
            </button>
            <p className="bag-disclaimer">
              Checkout is a demo and does not process payments.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

function NotFound() {
  return (
    <main className="empty-state not-found">
      <p className="eyebrow">A LITTLE DETOUR</p>
      <h1>This page wandered off.</h1>
      <Link className="button button-dark" to="/">
        Back to the homepage
      </Link>
    </main>
  );
}

function Storefront() {
  const [bag, setBag] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const bagCount = Object.values(bag).reduce(
    (total, item) => total + item.quantity,
    0
  );

  function addToBag(product) {
    setBag((current) => ({
      ...current,
      [product.id]: current[product.id]
        ? {
            ...current[product.id],
            quantity: current[product.id].quantity + 1,
          }
        : { ...product, quantity: 1 },
    }));
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="store-shell">
      <div className="top-promo">
        A LITTLE TREAT FOR YOUR EVERYDAY
        <span>Explore the latest collection ↗</span>
      </div>

      <header className="store-header">
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <Link to="/" className="store-logo" onClick={closeMenu}>
           <span>Velvet</span>
          <small>THE EVERYDAY EDIT</small>
        </Link>

        <nav className={menuOpen ? "store-nav nav-open" : "store-nav"}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/shop/clothing" onClick={closeMenu}>Fashion</Link>
          <Link to="/shop/indian-wear" onClick={closeMenu}>Indian wear</Link>
          <Link to="/shop/beauty" onClick={closeMenu}>Beauty</Link>
          <Link to="/shop/accessories" onClick={closeMenu}>Accessories</Link>
          <Link to="/shop/all" onClick={closeMenu}>Shop all</Link>
        </nav>

        <div className="header-actions">
          <button
            className="icon-action"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle product search"
          >
            <span>⌕</span>
          </button>
          <Link to="/bag" className="bag-action" aria-label={`Shopping bag, ${bagCount} items`}>
            <span className="bag-icon">♧</span>
            <span className="bag-label">Bag</span>
            <span className="bag-count">{bagCount}</span>
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="search-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label htmlFor="product-search">WHAT ARE YOU LOOKING FOR?</label>
            <div className="search-input-row">
              <input
                id="product-search"
                type="search"
                autoFocus
                placeholder="Try jeans, skincare, jewelry..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setSearchOpen(false);
                    window.location.hash = "";
                    window.location.pathname = "/shop/all";
                  }
                }}
              />
              <button onClick={() => setSearchQuery("")}>Clear</button>
              <button onClick={() => setSearchOpen(false)}>Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<HomePage onAdd={addToBag} />} />
        <Route
          path="/shop/:slug"
          element={
            <ShopPage
              onAdd={addToBag}
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/bag"
          element={<BagPage bag={bag} setBag={setBag} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="store-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="store-logo">
               <span>Velvet</span> 
              <small>THE EVERYDAY EDIT</small>
            </Link>
            <p>Little luxuries for the life you're making.</p>
          </div>

          <div className="footer-column">
            <h3>DISCOVER</h3>
            <Link to="/shop/all">Shop all</Link>
            <Link to="/shop/clothing">Fashion</Link>
            <Link to="/shop/indian-wear">Indian wear</Link>
            <Link to="/shop/accessories">Accessories</Link>
          </div>

          <div className="footer-column">
            <h3>BEAUTY & MORE</h3>
            <Link to="/shop/makeup">Makeup</Link>
            <Link to="/shop/skincare">Skincare</Link>
            <Link to="/shop/haircare">Haircare</Link>
            <Link to="/shop/electronics">Electronics</Link>
          </div>

          <div className="footer-column">
            <h3>THE LITTLE DETAILS</h3>
            <p>Thoughtfully curated. Made for your everyday.</p>
            <a href="mailto:velvet@gmail.com">Get in touch ↗</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span> Velvet</span>
          <span>MADE FOR YOUR EVERYDAY.</span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Storefront />
    </BrowserRouter>
  );
}

export default App;
