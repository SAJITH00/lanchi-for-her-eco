import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Amira Embroidered Linen Abaya',
    price: 1849,
    oldPrice: 2499,
    discount: '26% off',
    category: 'Silk abayas',
    tag: 'New season',
    rating: 5.0,
    reviewsCount: 38,
    fabric: 'Breathable Belgian linen blend',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKQUP0mS3fgYLgNb9MnhJYaqEmyt2ACGqF_xC5HUEwWU4r3xU0-tRdsb-IkSO2dw-OltJ6jyUMxKFnj3JcmDpWihCD6bED6pl8y3dUcF0WENL4ny-1eytJAq9vw0Msmxdjm5MmmdTX-bKZkUNZWtR5tPPUx2o_xZF1cZL5rn_Lr_obZPT50wDv-KnE9CDxdEcYpQJokAj7pfCunnhlQIsBjzTqfjXKoBu5nZeLZ_9A',
    colors: ['#8B5037', '#E5D7C5', '#2A2928']
  },
  {
    id: 2,
    name: 'Terra Fluid Co-ord Set',
    price: 1599,
    oldPrice: 2199,
    discount: '27% off',
    category: 'Co-ord sets',
    tag: 'Bestseller',
    rating: 4.9,
    reviewsCount: 64,
    fabric: 'Silky liquid viscose modal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeMp58vz5fYhtL_wI8Lk5agCzXw1pkr1gZ_FYPWqsfYLiLpllZf-H-YQnx0sC9jIGbsiBFaeBhkpG25feV95PQ1d8YaAyFgoJlsAGaFhIXV6Bp94oPtaKZo0asjw1ZGNjPZuY_mAYbb011OPTM5vzO7leSF5mucFvlD3j3OUZXC32XMI7Oafp5FkOzDac0mGPkH08lxe41YYlRLO7iQQjcf-MDE-DiYNo7xE9Trhbn',
    colors: ['#8B5037', '#9C7A5B', '#483C32']
  },
  {
    id: 3,
    name: 'Mulberry Silk Chiffon Hijab',
    price: 649,
    oldPrice: 899,
    discount: '28% off',
    category: 'Silk abayas',
    tag: 'Pure Silk',
    rating: 5.0,
    reviewsCount: 120,
    fabric: '100% pure mulberry silk',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMOjHzYjeGd0KhQGzRTFsL2QBeCB1mnxq5b8nKfj8p-cBn5DEfb0hgg3jeG5G1IXh3FJdEFifRY6lgleRvZLJnmjtVX7aqRN0b9fYM1zpseFI__jcJivrJzRXTrN5edd_fO7vGfwuAvN-6RaaRWGknve6vZIKg6Zc5W0i7eh-pLl_GFRqxXYtfvp1TwSoEFiGAyMIuopg55BDG79Z0CQaZetY1FC7sn6hr5ahja1Lp',
    colors: ['#C49A6C', '#8B5037', '#D1C2B4']
  },
  {
    id: 4,
    name: 'Zahra Tiered Ceremony Gown',
    price: 2799,
    oldPrice: 3899,
    discount: '28% off',
    category: 'Festive edit',
    tag: 'Limited Edition',
    rating: 4.9,
    reviewsCount: 42,
    fabric: 'Hand-finished zari border silk',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdYNKz2D9cBM6G6VBPddeJrtukGbBrrXHP1o0uv24EaGSCJ-6F3sCykpwjHp688fL4tnDdNQp3zepZllVvvr0jNcSPzNzxHvC9MUlyZwAO01o2EeAfDzRD4O8LQiW1fXDraW2Rk3hdQc2GDxbPyxoFEqwdXQvN1FOKu0wK2OGKa-SG6Y_dg4bYj51DhDu_BGt7molckAvtsxXxurs-el_vIpl-Md-FmuONzcpOY6OP',
    colors: ['#EBBB83', '#7C5728', '#2A2928']
  },
  {
    id: 5,
    name: 'Elegant Korean Top',
    price: 799,
    oldPrice: 1199,
    discount: '33% off',
    category: 'Summer tunics',
    tag: 'Trending',
    rating: 4.9,
    reviewsCount: 112,
    fabric: 'Lightweight modest crepe',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNBlpEg3Y63rysjYR_zAWEY2Qyif-1F82zY1TJl5xZu26wcMUvUwXqZdmufuYlYelhFK2u2c-V0AmjkXqDHdXVk5z9A6YCmafo2zpW8EegP30RtmAP7YnbbwrwnvAkZdAvsY42iFoP4AkqFh-OTJRDF62BniT9fXLMFu8vOBrO5MjFHojrATZ5T9cmbkvwZc-7YHrmYzDvMCnwLZVKUH0Ixox6Qda8DXkeLHVgq5CN',
    colors: ['#D6A98F', '#8B5037', '#FAF7F2']
  },
  {
    id: 6,
    name: 'Premium Modest Abaya',
    price: 1499,
    oldPrice: 2299,
    discount: '35% off',
    category: 'Silk abayas',
    tag: 'Bestseller',
    rating: 5.0,
    reviewsCount: 248,
    fabric: 'High-grade nida fabric',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAftReVaGQ5jQEP5zod3uogtK-DbdT30k9KYSLSsuoLrgY9aHwjbOtX0vcRUE-rXmrUONbDBFrG_VpGlR2qG2Y8pVC_Bt2WaNjIz5hropeHM6ah-dzihHAVp91q64WNK1tPPhrF9YJnaw_LX7eMV34zdYRl6wuV4fTl5MCz_aOg7sbC0cRzuI48H1c39ptAHgPIisN_rWmk0MWmFCc8dZGzEAvAILOZXv6ctT2rrUid',
    colors: ['#5E473E', '#8B5037', '#1E1B18']
  },
  {
    id: 7,
    name: 'Casual Women\'s Shirt',
    price: 899,
    oldPrice: 1299,
    discount: '30% off',
    category: 'Summer tunics',
    tag: 'Everyday',
    rating: 4.8,
    reviewsCount: 94,
    fabric: '100% breathable cotton linen',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0F15x1PAnNuKU2SA5YcThlxJXpozoBnOr_1cR2gVN_MmFotSi8lzn3pTb3ulLAbdpOZX6DkuyCE3VHj1qkWMEBjs_wWUhWhfgERcTLedPlm7wC6IShqtZrynEbPvxJN2vLBcb93d7EDVa0PLERhcEaIs7dmXIMWRlTMGdKiHjE_If528DFA8G2SEg0XrUT3ehB0smh2fj3vh_fbKjWDBXzoxktP-6vEOZETWujn1l',
    colors: ['#EADCC9', '#7C5728', '#FFFFFF']
  },
  {
    id: 8,
    name: 'Floral Long Dress',
    price: 1299,
    oldPrice: 1999,
    discount: '35% off',
    category: 'Festive edit',
    tag: 'Summer Flora',
    rating: 4.9,
    reviewsCount: 175,
    fabric: 'Lined georgette silk',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiz4XRJoxVHrlkDReHx6-LD2pHZRVe4QUoIGdKYDTaj1o5CBUHJwkZp8rmzhVF3k6cMvwbuhdMrquC3shaS2fcqw0AZrNOu41HMIahq1E-RU0kOyUzLMIlhCo55pSlo6gtaId6v_7rPNj2yS-EisGH-MsAWlSoZA2gaAxq28uWmqIRUzGM5MMAMHxsm5u6WL8WrCSUDPd5EXTmYuo6squoveLTemwoSI03cSJynaeL',
    colors: ['#C4836B', '#5A3D31', '#F4EDE2']
  }
];

export function AppProvider({ children }) {
  // Initial cart with 2 default items matching cart.html
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Amira Embroidered Linen Abaya',
      price: 1849,
      oldPrice: 2499,
      size: 'M',
      color: 'Terracotta',
      quantity: 1,
      image: INITIAL_PRODUCTS[0].image
    },
    {
      id: 2,
      name: 'Terra Fluid Co-ord Set',
      price: 1599,
      oldPrice: 2199,
      size: 'S',
      color: 'Taupe',
      quantity: 1,
      image: INITIAL_PRODUCTS[1].image
    }
  ]);

  // Initial wishlist with 4 items matching wishlist.html
  const [wishlist, setWishlist] = useState([
    INITIAL_PRODUCTS[0],
    INITIAL_PRODUCTS[1],
    INITIAL_PRODUCTS[2],
    INITIAL_PRODUCTS[3]
  ]);

  const [toast, setToast] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [coupon, setCoupon] = useState('LANCHI10');
  const [discountPercent, setDiscountPercent] = useState(10);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (product, size = 'M', color = 'Terracotta', quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice,
          size,
          color,
          quantity,
          image: product.image
        }
      ];
    });
    showToast(`Added "${product.name}" to shopping bag!`, 'success');
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
    showToast('Item removed from shopping bag', 'info');
  };

  const updateCartQuantity = (id, size, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Added "${product.name}" to wishlist`, 'success');
    }
  };

  const isInWishlist = (id) => wishlist.some(item => item.id === id);

  const moveWishlistToBag = (product, size = 'M') => {
    addToCart(product, size);
    setWishlist(prev => prev.filter(item => item.id !== product.id));
  };

  const moveAllWishlistToBag = () => {
    wishlist.forEach(item => {
      addToCart(item, 'M');
    });
    setWishlist([]);
    showToast('All items moved to shopping bag!', 'success');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <AppContext.Provider
      value={{
        products: INITIAL_PRODUCTS,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartCount,
        cartSubtotal,
        discountAmount,
        cartTotal,
        coupon,
        setCoupon,
        discountPercent,
        setDiscountPercent,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToBag,
        moveAllWishlistToBag,
        wishlistCount: wishlist.length,
        toast,
        showToast,
        searchOpen,
        setSearchOpen,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
