"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; 
import { LogOut, Search, PackageOpen, ShoppingCart, Plus, Minus, X, CheckCircle, History, FileText, Delete } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { SPLIT_PRODUCTS } from "@/lib/split_products";

export default function PortalDashboard() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("Loading...");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Cart State
  const [cart, setCart] = useState<{product: any, quantity: number | string}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlacing, setOrderPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Numpad State
  const [numpadState, setNumpadState] = useState<{isOpen: boolean, product: any, value: string}>({ isOpen: false, product: null, value: "0" });

  const handleNumpadInput = (key: string) => {
    setNumpadState(prev => {
      let newValue = prev.value;
      if (key === 'backspace') {
        newValue = newValue.slice(0, -1);
        if (newValue === "") newValue = "0";
      } else if (key === '.') {
        if (!newValue.includes('.')) newValue = newValue + '.';
      } else {
        if (newValue === "0") newValue = key;
        else newValue = newValue + key;
      }
      return { ...prev, value: newValue };
    });
  };

  const handleNumpadConfirm = () => {
    const val = parseFloat(numpadState.value);
    setQuantityDirectly(numpadState.product, isNaN(val) ? 0 : val);
    setNumpadState({ isOpen: false, product: null, value: "0" });
  };

  // Previous Bills State
  const [showBills, setShowBills] = useState(false);
  const [previousBills, setPreviousBills] = useState<any[]>([]);
  const [loadingBills, setLoadingBills] = useState(false);
  const [ordersTab, setOrdersTab] = useState<'pending' | 'completed'>('pending');

  useEffect(() => {
    const userStr = localStorage.getItem("businessUser");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setBusinessName(user.business_name);
      } catch (e) {
        console.error(e);
      }
    } else {
      router.push("/portal/login");
    }

    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*").order("name", { ascending: true });
      if (data) {
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPreviousBills = async () => {
    setLoadingBills(true);
    try {
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('business_name', businessName)
        .gte('created_at', fourteenDaysAgo.toISOString())
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      if (data) setPreviousBills(data);
    } catch (err: any) {
      console.error("Error fetching bills:", err);
      alert("Failed to load previous bills. Check permissions.");
    } finally {
      setLoadingBills(false);
    }
  };

  useEffect(() => {
    let channel: any = null;

    if (showBills && businessName) {
      fetchPreviousBills();
      
      // Setup Realtime subscription
      channel = supabase.channel('portal-orders')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'orders' },
          (payload) => {
            // When ANY change happens to orders, refetch to keep UI perfectly in sync
            fetchPreviousBills();
          }
        )
        .subscribe();
    }

    return () => {
      if (channel) supabase.removeChannel(channel);
    }
  }, [showBills, businessName]);

  const handleLogout = () => {
    localStorage.removeItem("isBusinessAuth");
    localStorage.removeItem("businessUser");
    router.push("/portal/login");
  };

  // Cart Functions
  const getProductQuantity = (productId: string) => {
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const setQuantityDirectly = (product: any, value: number | string) => {
    setCart(prev => {
      const numValue = typeof value === 'string' && value === "" ? -1 : Number(value);
      if (isNaN(numValue) || numValue <= 0) {
        return prev.filter(item => item.product.id !== product.id);
      }
      
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: value } : item);
      }
      return [...prev, { product, quantity: value }];
    });
  };

  const updateQuantity = (product: any, delta: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const currentQty = Number(existing.quantity) || 0;
        const newQuantity = Math.max(0, Math.round((currentQty + delta) * 100) / 100);
        if (newQuantity === 0) {
          return prev.filter(item => item.product.id !== product.id);
        }
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: newQuantity } : item);
      } else if (delta > 0) {
        return [...prev, { product, quantity: delta }];
      }
      return prev;
    });
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setOrderPlacing(true);
    
    try {
      const orderData = {
        business_name: businessName,
        items: cart,
        total_amount: cartTotal,
        status: 'pending'
      };
      
      const { error } = await supabase.from('orders').insert([orderData]);
      if (error) throw error;
      
      setCart([]);
      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false);
        setIsCartOpen(false);
      }, 3000);
      
    } catch (err: any) {
      console.error("Failed to place order:", err);
      const errorMessage = err?.message || err?.details || err?.hint || JSON.stringify(err);
      alert(`Failed to place order: ${errorMessage}\n\nPlease ensure your Supabase permissions (RLS) are set correctly.`);
    } finally {
      setOrderPlacing(false);
    }
  };

  const renderCartContent = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
          <ShoppingCart className="text-accent" /> Your Cart
        </h2>
        <button onClick={() => setIsCartOpen(false)} className="lg:hidden p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-neutral-400 space-y-4">
            <ShoppingCart size={48} className="text-neutral-200" />
            <p className="font-medium text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <div className="w-16 h-16 bg-neutral-50 rounded-xl flex items-center justify-center border border-neutral-100 shrink-0">
                  <PackageOpen size={24} className="text-neutral-400" />
                </div>
                <div className="flex-1 flex flex-col">
                  <h4 className="font-bold text-neutral-900 leading-tight mb-1">
                    {item.product.name_tamil || item.product.name}
                  </h4>
                  <div className="text-sm text-neutral-500 font-medium mb-2">₹{item.product.selling_price.toFixed(2)} / item</div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center bg-neutral-100 rounded-lg border border-neutral-200 overflow-hidden">
                      {SPLIT_PRODUCTS.has(item.product.name) ? (
                        <>
                          <button 
                            onClick={() => setNumpadState({ isOpen: true, product: item.product, value: String(item.quantity || "0") })}
                            className="w-16 text-center text-sm font-bold text-neutral-900 bg-transparent border-none py-1.5 focus:outline-none hover:bg-neutral-200 transition-colors"
                          >
                            {item.quantity === "" ? "Qty" : item.quantity}
                          </button>
                          <button onClick={() => setQuantityDirectly(item.product, -1)} className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors border-l border-neutral-200">
                            <X size={14} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => updateQuantity(item.product, -1)} className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-colors">
                            <Minus size={14} />
                          </button>
                          <button 
                            onClick={() => setNumpadState({ isOpen: true, product: item.product, value: String(item.quantity || "0") })}
                            className="w-12 text-center text-sm font-bold text-neutral-900 hover:bg-neutral-200 py-1.5 transition-colors"
                          >
                            {item.quantity}
                          </button>
                          <button onClick={() => updateQuantity(item.product, 1)} className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-colors">
                            <Plus size={14} />
                          </button>
                        </>
                      )}
                    </div>
                    <div className="font-bold text-neutral-900">
                      ₹{Math.round((Number(item.quantity) || 0) * item.product.selling_price)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-6 border-t border-neutral-100 bg-neutral-50">
          <div className="flex justify-between items-center mb-6">
            <span className="text-neutral-500 font-medium">Total Amount</span>
            <span className="text-2xl font-black text-neutral-900">₹{Math.round(cartTotal)}</span>
          </div>
          <button 
            onClick={handlePlaceOrder}
            disabled={orderPlacing || orderSuccess}
            className={`w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all ${orderSuccess ? 'bg-accent/80' : 'bg-green-600 hover:bg-green-700 shadow-green-600/20 hover:scale-[1.02]'} disabled:opacity-80 disabled:hover:scale-100`}
          >
            <CheckCircle size={20} /> 
            {orderPlacing ? 'Placing Order...' : orderSuccess ? 'Order Placed!' : 'Place Order'}
          </button>
        </div>
      )}
    </div>
  );

  const filteredProducts = products.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.name_tamil && p.name_tamil.toLowerCase().includes(q)) ||
      (p.name_tanglish && p.name_tanglish.toLowerCase().includes(q))
    );
  });
  const cartTotal = cart.reduce((total, item) => total + ((Number(item.quantity) || 0) * item.product.selling_price), 0);
  const cartCount = cart.length;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent font-bold text-2xl border border-accent/20">
              {businessName.charAt(0)}
            </div>
            <div>
              <h1 className="font-bold text-neutral-900 leading-tight text-lg">Wholesale Portal</h1>
              <p className="text-sm text-neutral-500 font-medium">{businessName}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowBills(true)}
              className="text-sm font-bold text-neutral-600 hover:text-accent bg-neutral-100 hover:bg-accent/10 px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
            >
              <History size={18} /> <span className="hidden sm:inline">My Orders</span>
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-neutral-600 hover:text-accent hover:bg-accent/10 rounded-xl transition-all lg:hidden"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content & Persistent Cart */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row relative">
        <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 w-full">
        <Reveal>
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-primary-dark to-primary rounded-3xl p-8 mb-10 text-white relative overflow-hidden shadow-lg">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, {businessName}</h2>
            <p className="text-white/80 max-w-2xl text-lg">
              Browse our exclusive wholesale catalog below. Add products to your cart and place an order directly.
            </p>
          </div>

          {/* Catalog Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h3 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
              <PackageOpen className="text-accent" /> Product Catalog
            </h3>
            
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm animate-pulse">
                  <div className="h-4 bg-neutral-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/2 mb-8"></div>
                  <div className="h-8 bg-neutral-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-neutral-200 border-dashed">
              <PackageOpen className="mx-auto h-16 w-16 text-neutral-300 mb-4" />
              <h3 className="text-xl font-bold text-neutral-900 mb-2">No products found</h3>
              <p className="text-neutral-500">
                {searchQuery ? `No results for "${searchQuery}".` : "The wholesale catalog is currently empty."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const mrp = parseFloat(product.mrp);
                const sellingPrice = parseFloat(product.selling_price);
                const discount = Math.round(((mrp - sellingPrice) / mrp) * 100);
                const quantity = getProductQuantity(product.id);

                return (
                  <div key={product.id} className="bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col relative overflow-hidden">
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center mb-4 text-neutral-400 group-hover:scale-110 group-hover:text-accent transition-all duration-300">
                        <PackageOpen size={24} />
                      </div>
                      
                      {/* Multilingual Names if available */}
                      {product.name_tamil ? (
                        <>
                          <h4 className="font-bold text-neutral-900 text-xl leading-tight mb-1 group-hover:text-accent transition-colors">
                            {product.name_tamil}
                          </h4>
                          <div className="text-sm text-neutral-500 font-medium mb-auto flex flex-col gap-0.5">
                            <span>{product.name}</span>
                            {product.name_tanglish && <span>{product.name_tanglish}</span>}
                          </div>
                        </>
                      ) : (
                        <h4 className="font-bold text-neutral-900 text-lg leading-tight mb-auto group-hover:text-accent transition-colors">
                          {product.name}
                        </h4>
                      )}
                      
                      <div className={`mt-4 pt-4 border-t border-neutral-100 ${!(product.name_tamil || product.name_tanglish) && 'mt-auto'}`}>
                        <div className="flex flex-col mb-4">
                          <div className="flex items-end gap-2">
                            <span className="text-2xl font-black text-neutral-900 tracking-tight">
                              ₹{sellingPrice.toFixed(2)}
                            </span>
                            <span className="text-xs text-green-600 font-bold mb-1.5">
                              Wholesale
                            </span>
                          </div>
                        </div>

                        {/* Cart Controls */}
                        {cart.some(item => item.product.id === product.id) ? (
                          SPLIT_PRODUCTS.has(product.name) ? (
                            <div className="flex items-center justify-between bg-accent/5 rounded-xl border border-accent/20 overflow-hidden">
                              <button 
                                onClick={() => setNumpadState({ isOpen: true, product: product, value: String(quantity === "" ? "0" : quantity) })}
                                className="font-bold text-neutral-900 w-full px-4 py-3 text-center bg-transparent border-none focus:outline-none hover:bg-accent/10 transition-colors"
                              >
                                {quantity === "" ? "Enter Qty" : quantity}
                              </button>
                              <button onClick={() => setQuantityDirectly(product, -1)} className="p-3 text-red-500 hover:bg-red-50 transition-colors border-l border-accent/20">
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between bg-accent/5 rounded-xl border border-accent/20 overflow-hidden">
                              <button onClick={() => updateQuantity(product, -1)} className="p-3 text-accent hover:bg-accent/10 transition-colors">
                                <Minus size={18} />
                              </button>
                              <button 
                                onClick={() => setNumpadState({ isOpen: true, product: product, value: String(quantity || "0") })}
                                className="font-bold text-neutral-900 w-full text-center hover:bg-accent/10 py-3 transition-colors"
                              >
                                {quantity}
                              </button>
                              <button onClick={() => updateQuantity(product, 1)} className="p-3 text-accent hover:bg-accent/10 transition-colors">
                                <Plus size={18} />
                              </button>
                            </div>
                          )
                        ) : (
                          <button onClick={() => {
                            if (SPLIT_PRODUCTS.has(product.name)) {
                              setNumpadState({ isOpen: true, product: product, value: "0" });
                            } else {
                              updateQuantity(product, 1);
                            }
                          }} className="w-full bg-neutral-900 hover:bg-accent text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                            <ShoppingCart size={18} /> Add to Cart
                          </button>
                        )}
                        {cart.some(item => item.product.id === product.id) && quantity !== "" && Number(quantity) > 0 && (
                          <div className="text-sm font-bold text-accent mt-3 text-center bg-accent/10 py-1.5 rounded-lg border border-accent/20">
                            Est. Total: ₹{Math.round((Number(quantity) || 0) * sellingPrice)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Reveal>
        </main>
        
        {/* Desktop Sticky Cart */}
        <aside className="hidden lg:block w-[400px] shrink-0 border-l border-neutral-200 sticky top-20 h-[calc(100vh-5rem)] overflow-hidden shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)]">
          {renderCartContent()}
        </aside>
      </div>

      {/* Cart Sidebar Mobile */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300">
            {renderCartContent()}
          </div>
        </div>
      )}

      {/* Floating Mobile Cart Summary */}
      {!isCartOpen && cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-4 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full pointer-events-auto bg-neutral-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between hover:bg-accent transition-all active:scale-[0.98] border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-neutral-900">
                  {cartCount}
                </span>
              </div>
              <span className="font-bold">View Cart</span>
            </div>
            <div className="font-black text-lg text-accent">₹{Math.round(cartTotal)}</div>
          </button>
        </div>
      )}

      {/* Numpad Modal */}
      {numpadState.isOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity" onClick={() => setNumpadState(prev => ({ ...prev, isOpen: false }))}></div>
          <div className="relative w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col transform transition-all animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-8 duration-300">
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50 rounded-t-3xl sm:rounded-t-3xl">
              <h2 className="text-lg font-bold text-neutral-900 truncate pr-4">
                {numpadState.product?.name_tamil || numpadState.product?.name}
              </h2>
              <button onClick={() => setNumpadState(prev => ({ ...prev, isOpen: false }))} className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-full transition-colors shrink-0">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-2">Enter Quantity</div>
                <div className="text-5xl font-black text-neutral-900 tracking-tight h-14">{numpadState.value || "0"}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <button 
                    key={num} 
                    onClick={() => handleNumpadInput(String(num))}
                    className="h-14 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-2xl text-2xl font-bold text-neutral-800 transition-colors active:scale-95"
                  >
                    {num}
                  </button>
                ))}
                <button 
                  onClick={() => handleNumpadInput('.')}
                  className="h-14 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-2xl text-2xl font-bold text-neutral-800 transition-colors active:scale-95 flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full"></div>
                </button>
                <button 
                  onClick={() => handleNumpadInput('0')}
                  className="h-14 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-2xl text-2xl font-bold text-neutral-800 transition-colors active:scale-95"
                >
                  0
                </button>
                <button 
                  onClick={() => handleNumpadInput('backspace')}
                  className="h-14 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-2xl text-neutral-600 transition-colors active:scale-95 flex items-center justify-center"
                >
                  <Delete size={24} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-4">
                {[10, 25, 50, 100].map(qty => (
                  <button 
                    key={qty}
                    onClick={() => setNumpadState(prev => ({ ...prev, value: String(parseFloat(prev.value || "0") + qty) }))}
                    className="py-2 bg-accent/10 hover:bg-accent/20 text-accent font-bold rounded-xl text-sm transition-colors active:scale-95"
                  >
                    +{qty}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleNumpadConfirm}
                className="w-full bg-accent hover:bg-accent-dark text-white font-bold h-14 rounded-2xl shadow-lg shadow-accent/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
              >
                <CheckCircle size={22} /> Confirm Quantity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* My Orders Modal */}
      {showBills && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowBills(false)}></div>
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden transform transition-all">
            <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <History className="text-accent" /> My Orders <span className="text-sm text-neutral-400 font-normal ml-2">(Last 14 Days)</span>
              </h2>
              <button onClick={() => setShowBills(false)} className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex border-b border-neutral-200 bg-white sticky top-0 z-10">
              <button 
                onClick={() => setOrdersTab('pending')}
                className={`flex-1 py-4 text-sm font-bold transition-all relative ${ordersTab === 'pending' ? 'text-accent' : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'}`}
              >
                Pending Orders
                {ordersTab === 'pending' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"></div>}
              </button>
              <button 
                onClick={() => setOrdersTab('completed')}
                className={`flex-1 py-4 text-sm font-bold transition-all relative ${ordersTab === 'completed' ? 'text-green-600' : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'}`}
              >
                Completed Bills
                {ordersTab === 'completed' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"></div>}
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-neutral-50/50">
              {loadingBills ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              ) : previousBills.filter(b => b.status === ordersTab).length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-neutral-200">
                  <FileText size={48} className="mx-auto text-neutral-300 mb-4" />
                  <p className="text-lg font-medium text-neutral-500">No {ordersTab} orders found.</p>
                  <p className="text-sm text-neutral-400 mt-1">Check back later for updates.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {previousBills.filter(b => b.status === ordersTab).map(bill => {
                    const date = new Date(bill.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
                    return (
                      <div key={bill.id} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                        {bill.status === 'completed' && <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>}
                        {bill.status === 'pending' && <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>}
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-neutral-100">
                          <div>
                            <div className="flex items-center gap-3 mb-1.5">
                              <span className="font-black text-neutral-900 text-lg">{date}</span>
                              <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${bill.status === 'completed' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-accent/10 text-accent border-accent/20'}`}>
                                {bill.status}
                              </span>
                            </div>
                            <div className="text-sm font-medium text-neutral-500">{bill.items.length} wholesale items</div>
                          </div>
                          <div className="text-left sm:text-right bg-neutral-50 px-4 py-2.5 rounded-xl border border-neutral-100">
                            <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-0.5">Total Amount</div>
                            <div className="text-2xl font-black text-neutral-900">₹{parseFloat(bill.total_amount).toFixed(2)}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {bill.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 rounded-xl p-3 border border-neutral-100 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-sm font-black text-neutral-700 shadow-sm border border-neutral-200">
                                  {item.quantity}x
                                </div>
                                <div className="text-sm font-bold text-neutral-800 line-clamp-1">
                                  {item.product.name_tamil || item.product.name}
                                </div>
                              </div>
                              <div className="font-black text-neutral-900 text-sm">
                                ₹{Math.round((Number(item.quantity) || 0) * item.product.selling_price)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
