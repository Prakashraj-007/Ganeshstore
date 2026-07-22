"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; 
import { useEffect, useState, useRef } from "react";
import { LogOut, LayoutDashboard, Users, Settings, Database, Plus, Trash2, Package, Upload, ShoppingBag, ChevronDown, ChevronUp, Check, CheckCircle, AlertCircle, Edit2, X, Save, Search, Printer, ArrowLeft } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [dbStatus, setDbStatus] = useState("Checking connection...");
  const [activeTab, setActiveTab] = useState("users"); // 'users' or 'products'
  
  // Data states
  const [businessUsers, setBusinessUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  // Product Edit State
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>("");
  const [productSearch, setProductSearch] = useState("");
  
  // User Edit State
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editUserBusinessName, setEditUserBusinessName] = useState("");
  const [editUserLoginId, setEditUserLoginId] = useState("");
  const [editUserPassword, setEditUserPassword] = useState("");
  
  // Notification State
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Hotel View State
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);

  // Bill Item Edit State
  const [editingBillItemId, setEditingBillItemId] = useState<{orderId: string, itemIdx: number} | null>(null);
  const [billItemEditPrice, setBillItemEditPrice] = useState<string>("");

  // User Form states
  const [newUserId, setNewUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newBusinessName, setNewBusinessName] = useState("");
  const [userFormMessage, setUserFormMessage] = useState({ text: "", type: "" });

  // Product Form states
  const [newProductName, setNewProductName] = useState("");
  const [newProductNameTamil, setNewProductNameTamil] = useState("");
  const [newProductNameTanglish, setNewProductNameTanglish] = useState("");
  const [newMrp, setNewMrp] = useState("");
  const [newSellingPrice, setNewSellingPrice] = useState("");
  const [productFormMessage, setProductFormMessage] = useState({ text: "", type: "" });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function init() {
      try {
        if (supabase) {
           setDbStatus("Connected to Supabase Client");
           fetchUsers();
           fetchProducts();
           fetchOrders();
        }
      } catch (err) {
        setDbStatus("Failed to connect to Supabase");
      }
    }
    init();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from("business_users").select("*").order("created_at", { ascending: false });
      if (error) {
        if (error.code === '42P01') setUserFormMessage({ text: "Please create the 'business_users' table in Supabase first.", type: "error" });
        return;
      }
      if (data) setBusinessUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) {
        if (error.code === '42P01') setProductFormMessage({ text: "Please create the 'products' table in Supabase first.", type: "error" });
        return;
      }
      if (data) setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) {
        if (error.code === '42P01') console.warn("Orders table not created yet");
        return;
      }
      if (data) setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  // --- USER HANDLERS ---
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUserFormMessage({ text: "", type: "" });

    try {
      const { error } = await supabase
        .from("business_users")
        .insert([{ user_id: newUserId, password: newPassword, business_name: newBusinessName }]);

      if (error) {
        setUserFormMessage({ text: error.message || "Failed to create user", type: "error" });
      } else {
        setNewUserId(""); setNewPassword(""); setNewBusinessName("");
        setNewPassword("");
        fetchUsers();
        setUserFormMessage({ type: "success", text: "User created successfully!" });
      }
    } catch (err: any) {
      setUserFormMessage({ text: err.message, type: "error" });
    } finally { setLoading(false); }
  };

  const handleEditUser = async (id: string) => {
    if (!editUserBusinessName || !editUserLoginId || !editUserPassword) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('business_users')
        .update({ 
          business_name: editUserBusinessName,
          user_id: editUserLoginId,
          password: editUserPassword
        })
        .eq('id', id)
        .select();
        
      if (error) {
        showToast("Error updating user: " + error.message, "error");
      } else if (!data || data.length === 0) {
        showToast("Update blocked! Add an UPDATE policy for business_users in Supabase.", "error");
      } else {
        setEditingUserId(null);
        fetchUsers();
        showToast("User updated successfully!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const { error } = await supabase.from("business_users").delete().eq("id", id);
    if (error) alert("Error deleting user: " + error.message);
    else fetchUsers();
  };

  // --- PRODUCT HANDLERS ---
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProductFormMessage({ text: "", type: "" });

    try {
      const { error } = await supabase
        .from("products")
        .insert([{ 
          name: newProductName, 
          name_tamil: newProductNameTamil || null,
          name_tanglish: newProductNameTanglish || null,
          mrp: parseFloat(newMrp), 
          selling_price: parseFloat(newSellingPrice) 
        }]);

      if (error) {
        setProductFormMessage({ text: error.message || "Failed to create product", type: "error" });
      } else {
        setProductFormMessage({ text: "Product added successfully!", type: "success" });
        setNewProductName(""); setNewProductNameTamil(""); setNewProductNameTanglish(""); setNewMrp(""); setNewSellingPrice("");
        fetchProducts();
      }
    } catch (err: any) {
      setProductFormMessage({ text: err.message, type: "error" });
    } finally { setLoading(false); }
  };

  const handleEditProductPrice = async (id: string) => {
    if (!editPrice) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ selling_price: parseFloat(editPrice) })
        .eq('id', id)
        .select();
        
      if (error) {
        showToast("Error updating price: " + error.message, "error");
      } else if (!data || data.length === 0) {
        showToast("Update blocked! Add an UPDATE policy for products in Supabase.", "error");
      } else {
        setEditingProductId(null);
        fetchProducts();
        showToast("Product price updated successfully!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) alert("Error deleting product: " + error.message);
    else fetchProducts();
  };

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("orders").update({ status }).eq("id", id).select();
      
      if (error) {
        showToast("Error updating order: " + error.message, "error");
      } else if (!data || data.length === 0) {
        showToast("Update blocked! Add an UPDATE policy in Supabase.", "error");
      } else {
        fetchOrders();
        if (status === 'completed') {
          showToast("Order completed! Customer has been notified.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditBillItemPrice = async (order: any, itemIdx: number, productId: string) => {
    if (!billItemEditPrice) return;
    setLoading(true);
    try {
      const newPrice = parseFloat(billItemEditPrice);
      if (isNaN(newPrice)) throw new Error("Invalid price");

      const updatedItems = [...order.items];
      updatedItems[itemIdx].product.selling_price = newPrice;
      
      let newTotal = 0;
      updatedItems.forEach(item => {
        newTotal += (Number(item.quantity) || 0) * item.product.selling_price;
      });

      const { error: orderError } = await supabase
        .from('orders')
        .update({ items: updatedItems, total_amount: newTotal })
        .eq('id', order.id);
        
      if (orderError) throw orderError;

      const { error: productError } = await supabase
        .from('products')
        .update({ selling_price: newPrice })
        .eq('id', productId);
        
      if (productError) throw productError;

      setEditingBillItemId(null);
      fetchOrders();
      fetchProducts();
      showToast("Price updated in bill and global catalog!");
    } catch (err: any) {
      showToast("Error updating price: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // --- CSV UPLOAD HANDLER ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setProductFormMessage({ text: "Reading CSV...", type: "info" });

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const newProducts = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const currentLine = lines[i].split(',').map(v => v.trim());
        
        let productData: any = {};
        headers.forEach((header, index) => {
          if (header.includes('name') && !header.includes('tamil') && !header.includes('tanglish')) productData.name = currentLine[index];
          if (header.includes('tamil')) productData.name_tamil = currentLine[index];
          if (header.includes('tanglish')) productData.name_tanglish = currentLine[index];
          if (header === 'mrp') productData.mrp = parseFloat(currentLine[index]);
          if (header === 'selling_price' || header === 'price' || header === 'rate') productData.selling_price = parseFloat(currentLine[index]);
        });
        
        if (productData.name && !isNaN(productData.mrp) && !isNaN(productData.selling_price)) {
          newProducts.push(productData);
        }
      }

      if (newProducts.length === 0) {
        setProductFormMessage({ text: "No valid products found in CSV. Check column names (name, mrp, selling_price).", type: "error" });
        setLoading(false);
        return;
      }

      try {
        setProductFormMessage({ text: `Inserting ${newProducts.length} products...`, type: "info" });
        const { error } = await supabase.from('products').insert(newProducts);
        
        if (error) {
          setProductFormMessage({ text: `Error importing: ${error.message}`, type: "error" });
        } else {
          setProductFormMessage({ text: `Successfully imported ${newProducts.length} products!`, type: "success" });
          fetchProducts();
        }
      } catch (err: any) {
        setProductFormMessage({ text: `Error: ${err.message}`, type: "error" });
      } finally {
        setLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const printThermalBill = (order: any) => {
    const dateObj = new Date(order.created_at);
    const dateStr = dateObj.toLocaleDateString('en-GB'); // DD/MM/YYYY
    const timeStr = dateObj.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
    const shortId = order.id ? order.id.substring(0, 8).toUpperCase() : '101';
    
    const itemsHtml = order.items.map((item: any) => {
      const name = item.product.name_tamil || item.product.name;
      const qty = item.quantity;
      const price = item.product.selling_price.toFixed(2);
      const total = (qty * item.product.selling_price).toFixed(2);
      return `
        <tr>
          <td class="item-col" style="padding: 4px 0; word-wrap: break-word;">${name}</td>
          <td class="qty-col" style="padding: 4px 0;">${qty}</td>
          <td class="rate-col" style="padding: 4px 0;">${price}</td>
          <td class="total-col" style="padding: 4px 0;">${total}</td>
        </tr>
      `;
    }).join('');

    const htmlContent = `
      <html>
        <head>
          <title>Print Bill - ${shortId}</title>
          <style>
            @page { 
              margin: 0; 
              size: 77mm auto; 
            }
            body { 
              font-family: 'Arial', sans-serif; 
              font-size: 12px; 
              margin: 0; 
              padding: 4mm; 
              width: 77mm; 
              box-sizing: border-box;
              color: #000;
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .dashed-line { border-top: 1px dashed #000; margin: 4px 0; }
            table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            th { padding: 4px 0; border-bottom: 1px dashed #000; font-size: 12px; }
            th.item-col { text-align: left; width: 45%; }
            th.qty-col { text-align: center; width: 15%; }
            th.rate-col { text-align: right; width: 18%; }
            th.total-col { text-align: right; width: 22%; }
            td { font-size: 12px; vertical-align: top; }
            .item-col { text-align: left; padding-right: 2px; }
            .qty-col { text-align: center; }
            .rate-col { text-align: right; }
            .total-col { text-align: right; }
          </style>
        </head>
        <body>
          <div class="center" style="font-size: 11px; margin-top: 2px;">ஸ்ரீ பத்ரகாளியம்மன் துணை</div>
          <div class="center bold" style="font-size: 16px; margin: 2px 0;">நியூ கணேஷ் ஸ்டோர்</div>
          <div class="center" style="font-size: 12px;">எண்.711, அகரம் மெயின் ரோடு</div>
          <div class="center" style="font-size: 12px;">திருவஞ்சேரி, சென்னை - 600126</div>
          <div class="center" style="font-size: 12px;">போன் : 9445236480, 7418146480</div>
          <div class="center" style="font-size: 12px;">GSTIN : 33BJQPR7834D1ZV</div>
          
          <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 12px;">
            <span>ID: ${shortId}</span>
            <span>${dateStr} ${timeStr}</span>
          </div>
          
          <div class="dashed-line" style="margin-top: 4px;"></div>
          
          <table>
            <thead>
              <tr>
                <th class="item-col">விபரங்கள்</th>
                <th class="qty-col">அளவு</th>
                <th class="rate-col">விலை</th>
                <th class="total-col">தொகை</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div class="dashed-line"></div>
          
          <div style="display: flex; justify-content: space-between; font-size: 14px;" class="bold">
            <span>எண் : ${order.items.length}</span>
            <span>மொத்தம் : ₹${parseFloat(order.total_amount).toFixed(2)}</span>
          </div>
          
          <div class="dashed-line"></div>
          
          <div class="center" style="font-size: 12px; margin-top: 6px;">பொருட்களை சரி பார்த்து எடுத்து செல்லவும்</div>
          <div class="center" style="font-size: 12px; margin-bottom: 10px;">நன்றி மீண்டும் வருக</div>
        </body>
      </html>
    `;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);
    
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();
      
      iframe.onload = () => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuth");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-neutral-900/50 border-r border-neutral-800 flex flex-col backdrop-blur-xl">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500">
              <Database size={18} />
            </div>
            Admin<span className="text-green-500">Panel</span>
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'users' ? 'bg-green-500/10 text-green-500' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
          >
            <Users size={20} /> Users
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'products' ? 'bg-green-500/10 text-green-500' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
          >
            <Package size={20} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'orders' ? 'bg-green-500/10 text-green-500' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
          >
            <ShoppingBag size={20} /> Orders
            {orders.filter(o => o.status === 'pending').length > 0 && (
              <span className="ml-auto bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {orders.filter(o => o.status === 'pending').length}
              </span>
            )}
          </button>
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl font-medium transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {activeTab === 'users' ? 'User Management' : activeTab === 'products' ? 'Product Management' : 'Order Management'}
          </h1>
          <p className="text-neutral-400 mt-2">
            {activeTab === 'users' ? 'Manage business portal access credentials.' : activeTab === 'products' ? 'Manage your wholesale product catalog.' : 'View and process wholesale orders.'}
          </p>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-neutral-400 text-sm font-medium mb-4 flex items-center gap-2">
              <Database size={16} /> Database Status
            </h3>
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <p className="text-white font-semibold text-lg">{dbStatus}</p>
            </div>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-neutral-400 text-sm font-medium mb-4 flex items-center gap-2">
              {activeTab === 'users' ? <Users size={16} /> : activeTab === 'products' ? <Package size={16} /> : <ShoppingBag size={16} />}
              Total {activeTab === 'users' ? 'Business Users' : activeTab === 'products' ? 'Products' : 'Orders'}
            </h3>
            <p className="text-4xl font-bold text-white">{activeTab === 'users' ? businessUsers.length : activeTab === 'products' ? products.length : orders.length}</p>
          </div>
        </div>

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl sticky top-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Plus className="text-green-500" /> Create Business User
                </h2>
                {userFormMessage.text && (
                  <div className={`p-3 rounded-xl mb-6 text-sm ${userFormMessage.type === "error" ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-green-500/10 text-green-500 border border-green-500/20"}`}>
                    {userFormMessage.text}
                  </div>
                )}
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1.5">Business Name</label>
                    <input required value={newBusinessName} onChange={e => setNewBusinessName(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all" placeholder="e.g. Royal Hotel" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1.5">User ID</label>
                    <input required value={newUserId} onChange={e => setNewUserId(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all" placeholder="e.g. 9445236480" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1.5">Password</label>
                    <input required value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all" placeholder="e.g. 2006" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full mt-4 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50">
                    {loading ? "Creating..." : "Create User"}
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Existing Users</h2>
                  <button onClick={fetchUsers} className="text-sm text-green-500 hover:text-green-400">Refresh List</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-neutral-400">
                    <thead className="bg-neutral-950 text-neutral-300">
                      <tr><th className="px-6 py-4">Business Name</th><th className="px-6 py-4">User ID</th><th className="px-6 py-4">Password</th><th className="px-6 py-4 text-right">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/50">
                      {businessUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-neutral-800/20 transition-colors">
                          <td className="px-6 py-4 text-white">
                            {editingUserId === user.id ? (
                              <input value={editUserBusinessName} onChange={e => setEditUserBusinessName(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded px-2 py-1 focus:outline-none focus:border-green-500" />
                            ) : user.business_name}
                          </td>
                          <td className="px-6 py-4 font-mono">
                            {editingUserId === user.id ? (
                              <input value={editUserLoginId} onChange={e => setEditUserLoginId(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded px-2 py-1 focus:outline-none focus:border-green-500" />
                            ) : user.user_id}
                          </td>
                          <td className="px-6 py-4 font-mono">
                            {editingUserId === user.id ? (
                              <input value={editUserPassword} onChange={e => setEditUserPassword(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded px-2 py-1 focus:outline-none focus:border-green-500" />
                            ) : user.password}
                          </td>
                          <td className="px-6 py-4 text-right flex justify-end gap-2">
                            {editingUserId === user.id ? (
                              <>
                                <button disabled={loading} onClick={() => handleEditUser(user.id)} className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg" title="Save"><Save size={16} /></button>
                                <button disabled={loading} onClick={() => setEditingUserId(null)} className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg" title="Cancel"><X size={16} /></button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => { setEditingUserId(user.id); setEditUserBusinessName(user.business_name); setEditUserLoginId(user.user_id); setEditUserPassword(user.password); }} className="p-2 text-neutral-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg" title="Edit User"><Edit2 size={16} /></button>
                                <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg" title="Delete User"><Trash2 size={16} /></button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              
              {/* Add Product Form */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Plus className="text-green-500" /> Add Single Product
                </h2>
                {productFormMessage.text && (
                  <div className={`p-3 rounded-xl mb-6 text-sm ${productFormMessage.type === "error" ? "bg-red-500/10 text-red-500 border border-red-500/20" : productFormMessage.type === "success" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-blue-500/10 text-blue-500 border border-blue-500/20"}`}>
                    {productFormMessage.text}
                  </div>
                )}
                <form onSubmit={handleCreateProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1.5">Product Name (English)</label>
                    <input required value={newProductName} onChange={e => setNewProductName(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all" placeholder="e.g. Premium Basmati Rice (25kg)" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1.5">Tamil Name (Optional)</label>
                    <input value={newProductNameTamil} onChange={e => setNewProductNameTamil(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all" placeholder="e.g. பாஸ்மதி அரிசி" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1.5">Tanglish Name (Optional)</label>
                    <input value={newProductNameTanglish} onChange={e => setNewProductNameTanglish(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all" placeholder="e.g. Basmati Arisi" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-1.5">MRP (₹)</label>
                      <input required type="number" step="0.01" value={newMrp} onChange={e => setNewMrp(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-1.5">Selling Price (₹)</label>
                      <input required type="number" step="0.01" value={newSellingPrice} onChange={e => setNewSellingPrice(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all" placeholder="0.00" />
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full mt-4 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50">
                    {loading ? "Adding..." : "Add Product"}
                  </button>
                </form>
              </div>

              {/* Bulk Upload Section */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Upload className="text-blue-500" /> Bulk Upload CSV
                </h2>
                <p className="text-sm text-neutral-400 mb-4">
                  Upload a CSV file to add multiple products. Required columns: <code className="text-neutral-300 bg-neutral-800 px-1 rounded">name</code>, <code className="text-neutral-300 bg-neutral-800 px-1 rounded">mrp</code>, <code className="text-neutral-300 bg-neutral-800 px-1 rounded">selling_price</code>. Optional: <code className="text-neutral-300 bg-neutral-800 px-1 rounded">name_tamil</code>, <code className="text-neutral-300 bg-neutral-800 px-1 rounded">name_tanglish</code>.
                </p>
                
                <input 
                  type="file" 
                  accept=".csv"
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="w-full bg-blue-600/20 border border-blue-500/50 text-blue-400 hover:bg-blue-600 hover:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Upload size={18} /> {loading ? "Processing..." : "Select CSV File"}
                </button>
              </div>

            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="p-6 border-b border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-xl font-bold text-white">Product Catalog</h2>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      />
                    </div>
                    <button onClick={fetchProducts} className="text-sm text-green-500 hover:text-green-400 whitespace-nowrap">Refresh</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-neutral-400">
                    <thead className="bg-neutral-950 text-neutral-300">
                      <tr><th className="px-6 py-4">Product Name</th><th className="px-6 py-4">MRP</th><th className="px-6 py-4">Selling Price</th><th className="px-6 py-4 text-right">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/50">
                      {products
                        .filter(p => {
                          const s = productSearch.toLowerCase();
                          return (p.name?.toLowerCase().includes(s) || p.name_tamil?.toLowerCase().includes(s) || p.name_tanglish?.toLowerCase().includes(s));
                        })
                        .map((product) => (
                        <tr key={product.id} className="hover:bg-neutral-800/20 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-white">{product.name}</div>
                            <div className="text-xs text-neutral-500">{product.name_tamil}</div>
                          </td>
                          <td className="px-6 py-4">₹{parseFloat(product.mrp).toFixed(2)}</td>
                          <td className="px-6 py-4 font-bold text-white">
                            {editingProductId === product.id ? (
                              <input 
                                type="number"
                                step="0.01"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className="w-24 bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-white focus:outline-none focus:border-green-500"
                                autoFocus
                              />
                            ) : (
                              `₹${parseFloat(product.selling_price).toFixed(2)}`
                            )}
                          </td>
                          <td className="px-6 py-4 text-right flex justify-end gap-2">
                            {editingProductId === product.id ? (
                              <>
                                <button disabled={loading} onClick={() => handleEditProductPrice(product.id)} className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg" title="Save"><Save size={16} /></button>
                                <button disabled={loading} onClick={() => setEditingProductId(null)} className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg" title="Cancel"><X size={16} /></button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => { setEditingProductId(product.id); setEditPrice(product.selling_price.toString()); }} className="p-2 text-neutral-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg" title="Edit Price"><Edit2 size={16} /></button>
                                <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg" title="Delete Product"><Trash2 size={16} /></button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  {selectedHotel ? (
                    <>
                      <button onClick={() => setSelectedHotel(null)} className="text-neutral-400 hover:text-white transition-colors mr-2">
                        <ArrowLeft size={24} />
                      </button>
                      {selectedHotel}'s Orders
                    </>
                  ) : (
                    "Incoming Orders"
                  )}
                </h2>
                <p className="text-neutral-400 mt-1">
                  {selectedHotel ? `Viewing all bills submitted by ${selectedHotel}.` : "Review and process your latest wholesale requests by hotel."}
                </p>
              </div>
              <button onClick={fetchOrders} className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-green-500/50 text-neutral-300 hover:text-white rounded-xl transition-all shadow-sm">
                <Database size={16} className="text-green-500" /> Refresh
              </button>
            </div>
            
            {!selectedHotel ? (
              // HOTELS LIST
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from(new Set(orders.map(o => o.business_name))).map(hotelName => {
                  const hotelOrders = orders.filter(o => o.business_name === hotelName);
                  const pendingCount = hotelOrders.filter(o => o.status === 'pending').length;
                  return (
                    <div 
                      key={hotelName}
                      onClick={() => setSelectedHotel(hotelName)}
                      className="bg-neutral-900/50 border border-neutral-800 hover:border-green-500/50 rounded-2xl p-6 cursor-pointer transition-all hover:bg-neutral-800 group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center text-white font-black text-xl border border-neutral-700 shadow-inner">
                          {hotelName.charAt(0).toUpperCase()}
                        </div>
                        {pendingCount > 0 && (
                          <span className="bg-yellow-500/20 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/30">
                            {pendingCount} Pending
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{hotelName}</h3>
                      <p className="text-neutral-500 text-sm">{hotelOrders.length} Total Bills</p>
                    </div>
                  );
                })}
                {orders.length === 0 && (
                  <div className="col-span-full bg-neutral-900/40 border border-neutral-800 rounded-3xl p-16 text-center backdrop-blur-xl">
                    <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-neutral-700">
                      <ShoppingBag size={40} className="text-neutral-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Hotels Yet</h3>
                    <p className="text-neutral-400">Waiting for first orders.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {orders.filter(o => o.business_name === selectedHotel).map((order) => {
                  const isExpanded = expandedOrder === order.id;
                  const date = new Date(order.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
                  
                  return (
                    <div key={order.id} className="relative group rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-900/60 border border-neutral-800 hover:border-neutral-700 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      {order.status === 'pending' && <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>}
                      {order.status === 'completed' && <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>}
                      
                      <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                        <div className="flex-1 cursor-pointer" onClick={() => setExpandedOrder(isExpanded ? null : order.id)}>
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center text-white font-black text-xl border border-neutral-700 shadow-inner">
                              {order.business_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                                {order.business_name}
                                <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${order.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/30' : order.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.1)]'}`}>
                                  {order.status}
                                </span>
                              </h3>
                              <div className="text-sm text-neutral-400 font-medium mt-1 flex items-center gap-4">
                                <span>{date}</span>
                                <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
                                <span>{order.items.length} items</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="text-right">
                            <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1">Total Amount</div>
                            <div className="text-2xl font-black text-white">₹{parseFloat(order.total_amount).toFixed(2)}</div>
                          </div>
                          
                            {/* The expand/collapse arrow was removed as requested. The tick button is moved to the bottom. */}
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6 pt-2">
                          <div className="bg-neutral-950/50 rounded-2xl border border-neutral-800 p-5 shadow-inner">
                            <h4 className="text-xs font-bold text-neutral-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                              <ShoppingBag size={14} /> Order Contents
                            </h4>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              {order.items.map((item: any, idx: number) => {
                                const isEditing = editingBillItemId?.orderId === order.id && editingBillItemId?.itemIdx === idx;
                                return (
                                <div key={idx} className="flex items-center justify-between bg-neutral-900/80 border border-neutral-800/80 hover:border-neutral-700 rounded-xl p-4 transition-colors">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-neutral-950 rounded-lg flex items-center justify-center text-white font-black border border-neutral-800 shadow-inner shrink-0">
                                      {item.quantity}<span className="text-[10px] text-neutral-500 ml-0.5">x</span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <h5 className="font-bold text-white text-base truncate pr-2">{item.product.name_tamil || item.product.name}</h5>
                                      
                                      <div className="flex items-center mt-1">
                                        {isEditing ? (
                                          <div className="flex items-center gap-2">
                                            <span className="text-neutral-500">₹</span>
                                            <input 
                                              type="number"
                                              step="0.01"
                                              value={billItemEditPrice}
                                              onChange={(e) => setBillItemEditPrice(e.target.value)}
                                              className="w-20 bg-neutral-950 border border-neutral-700 rounded px-2 py-0.5 text-sm text-white focus:outline-none focus:border-green-500"
                                              autoFocus
                                            />
                                            <button 
                                              disabled={loading} 
                                              onClick={(e) => { e.stopPropagation(); handleEditBillItemPrice(order, idx, item.product.id); }} 
                                              className="p-1 text-green-500 hover:bg-green-500/10 rounded" title="Save"
                                            >
                                              <Save size={14} />
                                            </button>
                                            <button 
                                              disabled={loading} 
                                              onClick={(e) => { e.stopPropagation(); setEditingBillItemId(null); }} 
                                              className="p-1 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded" title="Cancel"
                                            >
                                              <X size={14} />
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="flex items-center gap-2">
                                            <p className="text-sm text-neutral-500 font-medium">₹{item.product.selling_price.toFixed(2)} / item</p>
                                            <button 
                                              onClick={(e) => { e.stopPropagation(); setEditingBillItemId({ orderId: order.id, itemIdx: idx }); setBillItemEditPrice(item.product.selling_price.toString()); }}
                                              className="p-1.5 text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-all bg-neutral-800/50"
                                              title="Edit Price"
                                            >
                                              <Edit2 size={14} />
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="font-black text-lg text-neutral-300">
                                    ₹{Math.round((Number(item.quantity) || 0) * item.product.selling_price)}
                                  </div>
                                </div>
                              );
                              })}
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-neutral-800/80 flex justify-end gap-4">
                              <button 
                                onClick={(e) => { e.stopPropagation(); printThermalBill(order); }}
                                className="flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition-all border border-neutral-700"
                              >
                                <Printer size={20} /> Print Bill
                              </button>
                              
                              {order.status === 'pending' && (
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleUpdateOrderStatus(order.id, 'completed'); }}
                                  disabled={loading}
                                  className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-neutral-950 font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                                >
                                  <Check size={20} strokeWidth={3} /> Mark Order as Completed
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-8 right-8 z-50 px-5 py-4 rounded-2xl shadow-2xl border ${notification.type === 'success' ? 'bg-green-950/90 border-green-500/50 text-green-50' : 'bg-red-950/90 border-red-500/50 text-red-50'} backdrop-blur-xl max-w-sm transform transition-all duration-300 translate-y-0 opacity-100`}>
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? <CheckCircle size={22} className="text-green-400 shrink-0" /> : <AlertCircle size={22} className="text-red-400 shrink-0" />}
            <p className="text-sm font-medium leading-tight">{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
