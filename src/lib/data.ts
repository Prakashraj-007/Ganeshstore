import {
  Apple,
  Box,
  Building2,
  Carrot,
  ChefHat,
  Clock,
  Coffee,
  CookingPot,
  Croissant,
  Droplets,
  Flame,
  Handshake,
  Heart,
  Home,
  Hotel,
  Leaf,
  Milk,
  Nut,
  Package,
  PackageCheck,
  Receipt,
  Repeat,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Store,
  Truck,
  UtensilsCrossed,
  Users,
  Warehouse,
  Wheat,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Business info                                                       */
/* ------------------------------------------------------------------ */

export const BUSINESS = {
  name: "Sri Ganesh Store",
  tagline: "Wholesale & Retail Provisions",
  phone: "9445236480, 7418146480",
  whatsapp: "9445236480",
  whatsappLink: "https://wa.me/919445236480",
  email: "ganeshstorethiruvancherry@gmail.com",
  address: "No.711, Agaram Main Road, Thiruvancherry, Chennai-600126",
  hours: [
    { days: "Wed – Mon", time: "9:00 AM – 10:30 PM (Break: 3:00 PM – 4:45 PM)" },
    { days: "Tuesday", time: "9:00 AM – 3:00 PM" },
  ],
  mapEmbed:
    "https://www.google.com/maps?q=Agaram+Main+Road+Thiruvancherry+Chennai&output=embed",
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Our Services", href: "/#services" },
  { label: "Product Categories", href: "/#categories" },
  { label: "Hotels & Restaurants", href: "/#hotels-restaurants" },
  { label: "Contact Us", href: "/#contact" },
];

/* ------------------------------------------------------------------ */
/* Hero stats                                                          */
/* ------------------------------------------------------------------ */

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
}

export const HERO_STATS: Stat[] = [
  { value: 25, suffix: "+", label: "Years of Experience", icon: Clock },
  { value: 10000, suffix: "+", label: "Customers Served", icon: Users },
  { value: 10, suffix: "+", label: "Hotels & Restaurants", icon: Hotel },
];

export const ACHIEVEMENTS: Stat[] = [
  { value: 10000, suffix: "+", label: "Customers Served", icon: Users },
  { value: 10, suffix: "+", label: "Hotels & Restaurants", icon: Hotel },
  { value: 1500, suffix: "+", label: "Products Available", icon: Package },
  { value: 25, suffix: "+", label: "Years in Business", icon: Clock },
];

/* ------------------------------------------------------------------ */
/* Why choose us                                                       */
/* ------------------------------------------------------------------ */

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const WHY_CHOOSE_US: Feature[] = [
  {
    title: "Fresh Products",
    description:
      "Daily-sourced provisions and produce, stored and handled with care so freshness reaches your kitchen.",
    icon: Leaf,
  },
  {
    title: "Best Quality",
    description:
      "Every product is quality-checked before it reaches our shelves. We stock only trusted brands and grades.",
    icon: ShieldCheck,
  },
  {
    title: "Wholesale Pricing",
    description:
      "Direct sourcing and bulk purchasing let us offer genuinely competitive wholesale rates.",
    icon: Receipt,
  },
  {
    title: "Fast Delivery",
    description:
      "Prompt doorstep delivery for retail and bulk orders — on time, every time.",
    icon: Truck,
  },
  {
    title: "Trusted by Hotels",
    description:
      "Over a hundred hotels and restaurants rely on us for their daily kitchen supplies.",
    icon: Hotel,
  },
  {
    title: "Experienced Team",
    description:
      "A knowledgeable team with decades of provisioning experience to guide your purchases.",
    icon: Users,
  },
  {
    title: "Customer Satisfaction",
    description:
      "Long-standing relationships built on honest service, fair pricing and consistent quality.",
    icon: Heart,
  },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const SERVICES: Feature[] = [
  {
    title: "Retail Supply",
    description:
      "A complete range of daily provisions for families and households, all under one roof.",
    icon: Store,
  },
  {
    title: "Wholesale Supply",
    description:
      "Bulk quantities at wholesale rates for shops, resellers and institutions.",
    icon: Warehouse,
  },
  {
    title: "Hotel Supply",
    description:
      "Dedicated, scheduled provisioning for hotel kitchens with consistent quality.",
    icon: Hotel,
  },
  {
    title: "Restaurant Supply",
    description:
      "Reliable daily supply of ingredients and essentials for restaurants of every size.",
    icon: UtensilsCrossed,
  },
  {
    title: "Catering Supply",
    description:
      "Event-ready bulk supplies for catering services — planned, packed and delivered on schedule.",
    icon: ChefHat,
  },
  {
    title: "Bulk Orders",
    description:
      "Large-quantity orders handled with accurate weighing, careful packing and fair pricing.",
    icon: Box,
  },
  {
    title: "Door Delivery",
    description:
      "Convenient doorstep delivery for both retail customers and business clients.",
    icon: Truck,
  },
  {
    title: "Monthly Supply",
    description:
      "Standing monthly provision arrangements with consolidated billing for regular clients.",
    icon: Repeat,
  },
];

/* ------------------------------------------------------------------ */
/* Product categories                                                  */
/* ------------------------------------------------------------------ */

export interface Category {
  title: string;
  description: string;
  icon: LucideIcon;
  tint: string; // tailwind bg tint class for the icon chip
}

export const CATEGORIES: Category[] = [
  { title: "Rice", description: "Premium varieties for homes & kitchens", icon: Wheat, tint: "bg-amber-50 text-amber-600" },
  { title: "Pulses", description: "Dals, grams & lentils of every grade", icon: ShoppingBasket, tint: "bg-orange-50 text-orange-600" },
  { title: "Cooking Oil", description: "Refined, cold-pressed & bulk oils", icon: Droplets, tint: "bg-yellow-50 text-yellow-600" },
  { title: "Spices", description: "Whole & ground spices, farm fresh", icon: Flame, tint: "bg-red-50 text-red-600" },
  { title: "Vegetables", description: "Fresh daily-market vegetables", icon: Carrot, tint: "bg-green-50 text-green-600" },
  { title: "Fruits", description: "Seasonal & everyday fresh fruits", icon: Apple, tint: "bg-rose-50 text-rose-600" },
  { title: "Dry Fruits", description: "Nuts, raisins & premium dry fruits", icon: Nut, tint: "bg-amber-50 text-amber-700" },
  { title: "Cleaning Products", description: "Detergents, cleaners & supplies", icon: Sparkles, tint: "bg-sky-50 text-sky-600" },
  { title: "Bakery", description: "Flours, baking needs & essentials", icon: Croissant, tint: "bg-orange-50 text-orange-500" },
  { title: "Household Essentials", description: "Everyday needs for every home", icon: Home, tint: "bg-violet-50 text-violet-600" },
];

/* ------------------------------------------------------------------ */
/* Hotels & Restaurants                                                */
/* ------------------------------------------------------------------ */

export const B2B_SEGMENTS: Feature[] = [
  {
    title: "Hotels",
    description:
      "Scheduled provisioning for hotel kitchens — from rice and oils to fresh produce — with consistent grades your chefs can count on.",
    icon: Hotel,
  },
  {
    title: "Restaurants",
    description:
      "Daily and weekly ingredient supply tailored to your menu, portioned and delivered before your kitchen opens.",
    icon: UtensilsCrossed,
  },
  {
    title: "Catering Services",
    description:
      "Event-scale bulk supplies planned in advance — accurate quantities, careful packing and on-schedule delivery.",
    icon: ChefHat,
  },
  {
    title: "Corporate Kitchens",
    description:
      "Reliable monthly provisioning for office canteens and institutional kitchens with consolidated billing.",
    icon: Building2,
  },
  {
    title: "Wholesale Buyers",
    description:
      "Competitive trade pricing for retailers and resellers, with flexible order sizes and dependable stock.",
    icon: Warehouse,
  },
];

export const B2B_BENEFITS: Feature[] = [
  {
    title: "Dedicated Supply",
    description: "A dedicated account contact and reserved stock for your regular requirements.",
    icon: PackageCheck,
  },
  {
    title: "Competitive Pricing",
    description: "Direct-sourced wholesale rates that protect your margins.",
    icon: Receipt,
  },
  {
    title: "Bulk Orders",
    description: "Any quantity, accurately weighed and packed for commercial kitchens.",
    icon: Box,
  },
  {
    title: "Reliable Delivery",
    description: "On-time doorstep delivery, scheduled around your kitchen hours.",
    icon: Truck,
  },
  {
    title: "Professional Service",
    description: "Decades of provisioning experience behind every order.",
    icon: Handshake,
  },
];

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

export const TIMELINE = [
  {
    year: "2000",
    title: "Humble Beginnings",
    description:
      "Sri Ganesh Store opens as a small family-run provision shop serving the local neighbourhood.",
  },
  {
    year: "2006",
    title: "Wholesale Expansion",
    description:
      "Growing demand leads us into wholesale supply, serving local shops and small businesses.",
  },
  {
    year: "2012",
    title: "First Hotel Partnerships",
    description:
      "We begin dedicated supply arrangements with hotels and restaurants across the city.",
  },
  {
    year: "2018",
    title: "Warehouse & Delivery Fleet",
    description:
      "A dedicated warehouse and delivery vehicles enable faster, larger and more reliable deliveries.",
  },
  {
    year: "2024",
    title: "Serving 500+ Businesses",
    description:
      "Today we proudly supply hundreds of hotels, restaurants, caterers and wholesale clients.",
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We have sourced our entire kitchen supply from Sri Ganesh Store for over eight years. Quality is consistent, deliveries are always on time, and the monthly billing makes our accounts effortless.",
    name: "Rajesh Kumar",
    role: "Purchase Manager, Grand Palace Hotel",
  },
  {
    quote:
      "Running three restaurant branches means we cannot afford supply delays. Their team understands our needs and the produce is always fresh. Truly a dependable partner.",
    name: "Anita Sharma",
    role: "Owner, Spice Garden Restaurants",
  },
  {
    quote:
      "For large catering events, accurate quantities and timely delivery are everything. Sri Ganesh Store has never let us down — even on last-minute orders.",
    name: "Mohammed Farooq",
    role: "Director, Royal Feast Caterers",
  },
  {
    quote:
      "As a small retailer, their wholesale pricing helps me stay competitive. Honest weighing, fair rates and friendly service — exactly what a supplier should be.",
    name: "Lakshmi Venkatesan",
    role: "Proprietor, LV Mini Mart",
  },
];

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export interface GalleryImage {
  src: string;
  alt: string;
  category: "Shop" | "Warehouse" | "Delivery" | "Shelves";
  aspect: string; // tailwind aspect class for masonry variation
}

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: u("photo-1542838132-92c53300491e"), alt: "Our provision store front with fresh produce", category: "Shop", aspect: "aspect-[3/4]" },
  { src: u("photo-1578916171728-46686eac8d58"), alt: "Fresh vegetables arranged in the shop", category: "Shop", aspect: "aspect-[4/3]" },
  { src: u("photo-1553413077-190dd305871c"), alt: "Warehouse racks stocked with provisions", category: "Warehouse", aspect: "aspect-[4/3]" },
  { src: u("photo-1566576912321-d58ddd7a6088"), alt: "Packed cartons ready for dispatch", category: "Warehouse", aspect: "aspect-[3/4]" },
  { src: u("photo-1601598851547-4302969d0614"), alt: "Delivery vehicle loaded for the day", category: "Delivery", aspect: "aspect-[4/3]" },
  { src: u("photo-1580913428023-02c695666d61"), alt: "Doorstep delivery to a business customer", category: "Delivery", aspect: "aspect-[3/4]" },
  { src: u("photo-1604719312566-8912e9227c6a"), alt: "Neatly stocked product shelves", category: "Shelves", aspect: "aspect-[3/4]" },
  { src: u("photo-1588964895597-cfccd6e2dbf9"), alt: "Bulk storage section of our warehouse", category: "Warehouse", aspect: "aspect-[4/3]" },
  { src: u("photo-1506617564039-2f3b650b7010"), alt: "Fresh provisions packed for a customer", category: "Shop", aspect: "aspect-[4/3]" },
  { src: u("photo-1573246123716-6b1782bfc499"), alt: "Fresh produce display", category: "Shop", aspect: "aspect-[4/3]" },
  { src: u("photo-1488459716781-31db52582fe9"), alt: "Colourful vegetable section", category: "Shelves", aspect: "aspect-[3/4]" },
  { src: u("photo-1596040033229-a9821ebd058d"), alt: "Whole spices on display", category: "Shelves", aspect: "aspect-[4/3]" },
];

export const HERO_IMAGE = u("photo-1604719312566-8912e9227c6a", 1800);
export const ABOUT_IMAGE = u("photo-1578916171728-46686eac8d58", 1200);
export const B2B_IMAGE = u("photo-1414235077428-338989a2e8c0", 1400);

/* ------------------------------------------------------------------ */
/* Products                                                           */
/* ------------------------------------------------------------------ */

export interface Product {
  sNo: number;
  nameTamil: string;
  nameEnglish: string;
  tanglish: string;
  sellingPrice: number;
}

export const PRODUCTS: Product[] = [
  {
    sNo: 1,
    nameTamil: "முட்டை அட்டை",
    nameEnglish: "Egg Tray",
    tanglish: "Muttai Attai",
    sellingPrice: 222
  },
  {
    sNo: 2,
    nameTamil: "டீ.கப்பு",
    nameEnglish: "Tea Cup",
    tanglish: "Tea Kappu",
    sellingPrice: 30
  },
  {
    sNo: 3,
    nameTamil: "நீ மிளகாய்",
    nameEnglish: "Green Chilli",
    tanglish: "Nee Milagai",
    sellingPrice: 290
  },
  {
    sNo: 4,
    nameTamil: "ஆச்சி குழம்பு மிளகாய் தூள் 1/2 கி",
    nameEnglish: "Aachi Kulambu Chilli Powder 1/2 kg",
    tanglish: "Aachi Kulambu Milagai Thool 1/2 KG",
    sellingPrice: 167
  },
  {
    sNo: 5,
    nameTamil: "500 கி சக்தி குழம்பு மிளகாய் தூள்",
    nameEnglish: "Sakthi Kulambu Chilli Powder 500g",
    tanglish: "Sakthi Kulambu Milagai Thool 500 KG",
    sellingPrice: 130
  },
  {
    sNo: 6,
    nameTamil: "பூண்டு பெரியது",
    nameEnglish: "Garlic (Big)",
    tanglish: "Poondu Periyathu",
    sellingPrice: 290
  },
  {
    sNo: 7,
    nameTamil: "பூண்டு சிறியது",
    nameEnglish: "Garlic (Small)",
    tanglish: "Poondu Siriyathu",
    sellingPrice: 220
  },
  {
    sNo: 8,
    nameTamil: "மிளகு லூஸ் நெ.1",
    nameEnglish: "Pepper Loose No.1",
    tanglish: "Milagu Loose No.1",
    sellingPrice: 820
  },
  {
    sNo: 9,
    nameTamil: "சீரகம் லூஸ் நெ.1",
    nameEnglish: "Cumin Loose No.1",
    tanglish: "Seeragam Loose No.1",
    sellingPrice: 310
  },
  {
    sNo: 10,
    nameTamil: "கடுகு",
    nameEnglish: "Mustard Seeds",
    tanglish: "Kadugu",
    sellingPrice: 110
  },
  {
    sNo: 11,
    nameTamil: "துவரம் பருப்பு நெ.1",
    nameEnglish: "Thuvaram Paruppu No.1",
    tanglish: "Thuvaram Paruppu No.1",
    sellingPrice: 135
  },
  {
    sNo: 12,
    nameTamil: "கடலை பருப்பு நெ.1",
    nameEnglish: "Kadalai Paruppu No.1",
    tanglish: "Kadalai Paruppu No.1",
    sellingPrice: 84
  },
  {
    sNo: 13,
    nameTamil: "பாசி பருப்பு நெ.1",
    nameEnglish: "Pasi Paruppu No.1",
    tanglish: "Pasi Paruppu No.1",
    sellingPrice: 115
  },
  {
    sNo: 14,
    nameTamil: "பட்டாணி பருப்பு",
    nameEnglish: "Dried Peas Dal",
    tanglish: "Pattani Paruppu",
    sellingPrice: 52
  },
  {
    sNo: 15,
    nameTamil: "உளுந்து பருப்பு 1",
    nameEnglish: "Ulundu Paruppu 1",
    tanglish: "Ulundu Paruppu 1",
    sellingPrice: 145
  },
  {
    sNo: 16,
    nameTamil: "பிரியாணி அரிசி",
    nameEnglish: "Biryani Rice",
    tanglish: "Biryani Arisi",
    sellingPrice: 105
  },
  {
    sNo: 17,
    nameTamil: "பிரியாணி அரிசி சாப்பி",
    nameEnglish: "Biryani Rice (Chappi variety)",
    tanglish: "Biryani Arisi Sappi",
    sellingPrice: 80
  },
  {
    sNo: 18,
    nameTamil: "யுனிட் அரிசி",
    nameEnglish: "Unit Rice (Brand)",
    tanglish: "Unit Arisi",
    sellingPrice: 130
  },
  {
    sNo: 19,
    nameTamil: "எல்.ஜி கட்டி",
    nameEnglish: "LG Asafoetida Bar",
    tanglish: "L.G. Katti",
    sellingPrice: 75
  },
  {
    sNo: 20,
    nameTamil: "எல்.ஜி தூள்",
    nameEnglish: "LG Asafoetida Powder",
    tanglish: "L.G. Thool",
    sellingPrice: 75
  },
  {
    sNo: 21,
    nameTamil: "டுமேடோ சாஸ்",
    nameEnglish: "Tomato Sauce",
    tanglish: "Tomato Sauce",
    sellingPrice: 65
  },
  {
    sNo: 22,
    nameTamil: "ஆர்.கே.ஜி நெய் 1கி",
    nameEnglish: "RKG Ghee 1kg",
    tanglish: "R.K.G. Nei 1 KG",
    sellingPrice: 840
  },
  {
    sNo: 23,
    nameTamil: "உதைய கிருஷ்ணா நெய் 1கி",
    nameEnglish: "Udaiya Krishna Ghee 1kg",
    tanglish: "Udaiya Krishna Nei 1 KG",
    sellingPrice: 845
  },
  {
    sNo: 24,
    nameTamil: "உதைய கிருஷ்ணா நெய் 1/2கி",
    nameEnglish: "Udaiya Krishna Ghee 1/2kg",
    tanglish: "Udaiya Krishna Nei 1/2 KG",
    sellingPrice: 425
  },
  {
    sNo: 25,
    nameTamil: "உதைய கிருஷ்ணா நெய் 200கி",
    nameEnglish: "Udaiya Krishna Ghee 200g",
    tanglish: "Udaiya Krishna Nei 200 KG",
    sellingPrice: 179
  },
  {
    sNo: 26,
    nameTamil: "உதைய கிருஷ்ணா நெய் 100கி",
    nameEnglish: "Udaiya Krishna Ghee 100g",
    tanglish: "Udaiya Krishna Nei 100 KG",
    sellingPrice: 91
  },
  {
    sNo: 27,
    nameTamil: "உதைய கிருஷ்ணா நெய் 50கி",
    nameEnglish: "Udaiya Krishna Ghee 50g",
    tanglish: "Udaiya Krishna Nei 50 KG",
    sellingPrice: 48
  },
  {
    sNo: 28,
    nameTamil: "ஜிஆர்பி நெய் 1/2லி",
    nameEnglish: "GRB Ghee 1/2 Litre",
    tanglish: "G.R.B. Nei 1/2 Li",
    sellingPrice: 453
  },
  {
    sNo: 29,
    nameTamil: "ஜிஆர்பி 100மி",
    nameEnglish: "GRB Oil 100ml",
    tanglish: "G.R.B. 100 Mi",
    sellingPrice: 94
  },
  {
    sNo: 30,
    nameTamil: "ஜிஆர்பி நெய் 200கி",
    nameEnglish: "GRB Ghee 200g",
    tanglish: "G.R.B. Nei 200 KG",
    sellingPrice: 184
  },
  {
    sNo: 31,
    nameTamil: "ஜிஆர்பி 50மி",
    nameEnglish: "GRB Oil 50ml",
    tanglish: "G.R.B. 50 Mi",
    sellingPrice: 47
  },
  {
    sNo: 32,
    nameTamil: "கடல் பாசி",
    nameEnglish: "Sea Moss (Agar)",
    tanglish: "Kadal Paasi",
    sellingPrice: 700
  },
  {
    sNo: 33,
    nameTamil: "பிரிஞ்சி இலை",
    nameEnglish: "Bay Leaf",
    tanglish: "Birinji Elai",
    sellingPrice: 150
  },
  {
    sNo: 34,
    nameTamil: "ஜாதி பத்திரி",
    nameEnglish: "Mace (Javitri)",
    tanglish: "Jathi Pathiri",
    sellingPrice: 3200
  },
  {
    sNo: 35,
    nameTamil: "ஜாதிக்காய்",
    nameEnglish: "Nutmeg",
    tanglish: "Jathikkai",
    sellingPrice: 960
  },
  {
    sNo: 36,
    nameTamil: "ம.தூள் 1/2கி",
    nameEnglish: "Turmeric Powder 1/2kg",
    tanglish: "Ma.Thool 1/2 KG",
    sellingPrice: 130
  },
  {
    sNo: 37,
    nameTamil: "500 கி சிக்கன் மசாலா",
    nameEnglish: "Chicken Masala 500g",
    tanglish: "500 KG Chicken Masala",
    sellingPrice: 165
  },
  {
    sNo: 38,
    nameTamil: "அஜினா 500கிராம்",
    nameEnglish: "Ajinomoto 500g",
    tanglish: "Ajina 500 Gram",
    sellingPrice: 85
  },
  {
    sNo: 39,
    nameTamil: "சோம்பு தூள் 50கி",
    nameEnglish: "Fennel Powder 50g",
    tanglish: "Sombu Thool 50 KG",
    sellingPrice: 15
  },
  {
    sNo: 40,
    nameTamil: "கார்ன் மாவு 1/2கி",
    nameEnglish: "Corn Flour 1/2kg",
    tanglish: "Corn Maavu 1/2 KG",
    sellingPrice: 28
  },
  {
    sNo: 41,
    nameTamil: "500 அரிசி மாவு",
    nameEnglish: "Rice Flour 500g",
    tanglish: "500 Arisi Maavu",
    sellingPrice: 33
  },
  {
    sNo: 42,
    nameTamil: "கவர் மீடியம்",
    nameEnglish: "Cover Medium (Bag)",
    tanglish: "Cover Medium",
    sellingPrice: 35
  },
  {
    sNo: 43,
    nameTamil: "சோயா சாஸ்",
    nameEnglish: "Soy Sauce",
    tanglish: "Soya Sauce",
    sellingPrice: 28
  },
  {
    sNo: 44,
    nameTamil: "சில்லி சாஸ்",
    nameEnglish: "Chilli Sauce",
    tanglish: "Chilli Sauce",
    sellingPrice: 28
  },
  {
    sNo: 45,
    nameTamil: "1 தக்காளி சாஸ்",
    nameEnglish: "Tomato Sauce (Unit)",
    tanglish: "1 Thakkali Sauce",
    sellingPrice: 60
  },
  {
    sNo: 46,
    nameTamil: "1 சில்லி சாஸ்",
    nameEnglish: "Chilli Sauce (Unit)",
    tanglish: "1 Chilli Sauce",
    sellingPrice: 60
  },
  {
    sNo: 47,
    nameTamil: "வினிகர்",
    nameEnglish: "Vinegar",
    tanglish: "Vinegar",
    sellingPrice: 25
  },
  {
    sNo: 48,
    nameTamil: "பட்டை பெரிசு",
    nameEnglish: "Cinnamon (Big)",
    tanglish: "Pattai Perisu",
    sellingPrice: 310
  },
  {
    sNo: 49,
    nameTamil: "அன்னாசி பூ",
    nameEnglish: "Star Anise",
    tanglish: "Annachi Poo",
    sellingPrice: 700
  },
  {
    sNo: 50,
    nameTamil: "லவங்கம்",
    nameEnglish: "Cloves",
    tanglish: "Lavangam",
    sellingPrice: 1200
  },
  {
    sNo: 51,
    nameTamil: "ஏலம் 1",
    nameEnglish: "Cardamom No.1",
    tanglish: "Yelam 1",
    sellingPrice: 3600
  },
  {
    sNo: 52,
    nameTamil: "இட்லி டால்டா 1/2கி",
    nameEnglish: "Eata Dalda 1/2kg",
    tanglish: "Eata Dalda 1/2 KG",
    sellingPrice: 70
  },
  {
    sNo: 53,
    nameTamil: "இட்லி டால்டா 1கி",
    nameEnglish: "Eata Dalda 1kg",
    tanglish: "Eata Dalda 1 KG",
    sellingPrice: 139
  },
  {
    sNo: 54,
    nameTamil: "கோல்ட் வின்னர் டால்டா 100கி",
    nameEnglish: "Gold Winner Dalda 100g",
    tanglish: "Gold Winner Dalda 100 KG",
    sellingPrice: 16.5
  },
  {
    sNo: 55,
    nameTamil: "கோல்ட் வின்னர் டால்டா 50கி",
    nameEnglish: "Gold Winner Dalda 50g",
    tanglish: "Gold Winner Dalda 50 KG",
    sellingPrice: 8.4
  },
  {
    sNo: 56,
    nameTamil: "க.மிளகு தூள் 999",
    nameEnglish: "Black Pepper Powder 999",
    tanglish: "Ka. Milagu Thool 999",
    sellingPrice: 60
  },
  {
    sNo: 57,
    nameTamil: "ஓயிட் பெப்பர் 500கி",
    nameEnglish: "White Pepper 500g",
    tanglish: "White Pepper 500 KG",
    sellingPrice: 45
  },
  {
    sNo: 58,
    nameTamil: "க.மெதி 100கி",
    nameEnglish: "Kasthuri Methi 100g",
    tanglish: "Kasthuri Methi 100 KG",
    sellingPrice: 45
  },
  {
    sNo: 59,
    nameTamil: "வர்ஷா ரெட் 30கி",
    nameEnglish: "Varsha Red Rice 30kg",
    tanglish: "Varsha Red 30 KG",
    sellingPrice: 3050
  },
  {
    sNo: 60,
    nameTamil: "டெக்ஸ லா பாஸ்மதி 30கி",
    nameEnglish: "Texla Basmati Rice 30kg",
    tanglish: "Texla Basmathi 30 KG",
    sellingPrice: 2800
  },
  {
    sNo: 61,
    nameTamil: "30கி கோல்டன் கிரேன் பாஸ்மதி",
    nameEnglish: "Golden Grain Basmati Rice 30kg",
    tanglish: "30 KG Golden Grain Basmathi",
    sellingPrice: 3800
  },
  {
    sNo: 62,
    nameTamil: "50கி கறி மசாலா",
    nameEnglish: "Curry Masala 50g",
    tanglish: "50 KG Kari Masala",
    sellingPrice: 23
  },
  {
    sNo: 63,
    nameTamil: "50கிராம் மசாலா",
    nameEnglish: "Masala 50g",
    tanglish: "50 Gram Masala",
    sellingPrice: 24.5
  },
  {
    sNo: 64,
    nameTamil: "ரூபிணி பெட்டி 1லி",
    nameEnglish: "Rupini Oil Box 1 Litre",
    tanglish: "Rupini Petti 1 Li",
    sellingPrice: 1395
  },
  {
    sNo: 65,
    nameTamil: "ரூபிணி 1லி",
    nameEnglish: "Rupini Oil 1 Litre",
    tanglish: "Rupini 1 Li",
    sellingPrice: 140
  },
  {
    sNo: 66,
    nameTamil: "கல் உப்பு 1 கிலோ",
    nameEnglish: "Rock Salt 1kg",
    tanglish: "Kal Uppu 1 Kilo",
    sellingPrice: 14
  },
  {
    sNo: 67,
    nameTamil: "டாட்டா சால்ட்",
    nameEnglish: "Tata Salt",
    tanglish: "Tata Salt",
    sellingPrice: 29
  },
  {
    sNo: 68,
    nameTamil: "14+14 சில்வர்",
    nameEnglish: "14+14 Silver Foil",
    tanglish: "14+14 Silver",
    sellingPrice: 65
  },
  {
    sNo: 69,
    nameTamil: "சாம் கவர் 4★6 500கி",
    nameEnglish: "Sample Cover 4x6, 500g",
    tanglish: "Sample Cover 4 Star 6 500 KG",
    sellingPrice: 125
  },
  {
    sNo: 70,
    nameTamil: "4★5 சட்னி கவர்",
    nameEnglish: "Chutney Cover 4x5",
    tanglish: "4 Star 5 Chutney Cover",
    sellingPrice: 120
  },
  {
    sNo: 71,
    nameTamil: "கவர் சிறியது",
    nameEnglish: "Cover (Small)",
    tanglish: "Cover Siriyathu",
    sellingPrice: 16
  },
  {
    sNo: 72,
    nameTamil: "ஆர்.கே.ஜி நெய் 1கி",
    nameEnglish: "RKG Ghee 1kg",
    tanglish: "R.K.G. Nei 1 KG",
    sellingPrice: 840
  },
  {
    sNo: 73,
    nameTamil: "உதைய கிருஷ்ணா நெய் 1கி",
    nameEnglish: "Udaiya Krishna Ghee 1kg",
    tanglish: "Udaiya Krishna Nei 1 KG",
    sellingPrice: 845
  },
  {
    sNo: 74,
    nameTamil: "உதைய கிருஷ்ணா நெய் 1/2கி",
    nameEnglish: "Udaiya Krishna Ghee 1/2kg",
    tanglish: "Udaiya Krishna Nei 1/2 KG",
    sellingPrice: 425
  },
  {
    sNo: 75,
    nameTamil: "உதைய கிருஷ்ணா நெய் 200கி",
    nameEnglish: "Udaiya Krishna Ghee 200g",
    tanglish: "Udaiya Krishna Nei 200 KG",
    sellingPrice: 179
  },
  {
    sNo: 76,
    nameTamil: "உதைய கிருஷ்ணா நெய் 100கி",
    nameEnglish: "Udaiya Krishna Ghee 100g",
    tanglish: "Udaiya Krishna Nei 100 KG",
    sellingPrice: 91
  },
  {
    sNo: 77,
    nameTamil: "உதைய கிருஷ்ணா நெய் 50கி",
    nameEnglish: "Udaiya Krishna Ghee 50g",
    tanglish: "Udaiya Krishna Nei 50 KG",
    sellingPrice: 48
  },
  {
    sNo: 78,
    nameTamil: "ஜிஆர்பி நெய் 1/2லி",
    nameEnglish: "GRB Ghee 1/2 Litre",
    tanglish: "G.R.B. Nei 1/2 Li",
    sellingPrice: 453
  },
  {
    sNo: 79,
    nameTamil: "ஜிஆர்பி 100மி",
    nameEnglish: "GRB Oil 100ml",
    tanglish: "G.R.B. 100 Mi",
    sellingPrice: 94
  },
  {
    sNo: 80,
    nameTamil: "ஜிஆர்பி நெய் 200கி",
    nameEnglish: "GRB Ghee 200g",
    tanglish: "G.R.B. Nei 200 KG",
    sellingPrice: 184
  },
  {
    sNo: 81,
    nameTamil: "ஜிஆர்பி 50மி",
    nameEnglish: "GRB Oil 50ml",
    tanglish: "G.R.B. 50 Mi",
    sellingPrice: 47
  },
  {
    sNo: 82,
    nameTamil: "உ.கடலை",
    nameEnglish: "Groundnut (Uppu Kadalai)",
    tanglish: "U.Kadalai",
    sellingPrice: 102
  },
  {
    sNo: 83,
    nameTamil: "வேர்கடலை",
    nameEnglish: "Groundnut (Peanut)",
    tanglish: "Ver Kadalai",
    sellingPrice: 185
  },
  {
    sNo: 84,
    nameTamil: "கேசரி ரெட் 100கி",
    nameEnglish: "Kesari Red 100g",
    tanglish: "Kesari Red 100 KG",
    sellingPrice: 44
  },
  {
    sNo: 85,
    nameTamil: "50கரம் மசாலா",
    nameEnglish: "Garam Masala 50g",
    tanglish: "50 Karam Masala",
    sellingPrice: 24.5
  },
  {
    sNo: 86,
    nameTamil: "50 சிக்கன் மசாலா",
    nameEnglish: "Chicken Masala 50g",
    tanglish: "50 Chicken Masala",
    sellingPrice: 17.5
  },
  {
    sNo: 87,
    nameTamil: "சமையல் மிளகாய் தூள் 50கிராம்",
    nameEnglish: "Cooking Chilli Powder 50g",
    tanglish: "Samayal Milagai Thool 50 Gram",
    sellingPrice: 16
  },
  {
    sNo: 88,
    nameTamil: "சக்தி மி.தூள் 1/2",
    nameEnglish: "Sakthi Chilli Powder 1/2kg",
    tanglish: "Sakthi Mi.Thool 1/2",
    sellingPrice: 160
  },
  {
    sNo: 89,
    nameTamil: "தனியா தூள் 1/2 கி",
    nameEnglish: "Coriander Powder 1/2kg",
    tanglish: "Thaniya Thool 1/2 KG",
    sellingPrice: 130
  },
  {
    sNo: 90,
    nameTamil: "50 சாம்பார் தூள்",
    nameEnglish: "Sambar Powder 50g",
    tanglish: "50 Sambar Thool",
    sellingPrice: 18.75
  },
  {
    sNo: 91,
    nameTamil: "சீரகம் தூள் 50கி",
    nameEnglish: "Cumin Powder 50g",
    tanglish: "Seeragam Thool 50 KG",
    sellingPrice: 23.5
  },
  {
    sNo: 92,
    nameTamil: "வின்னர் 1கி",
    nameEnglish: "Winner Oil 1kg",
    tanglish: "Winner 1 KG",
    sellingPrice: 175
  },
  {
    sNo: 93,
    nameTamil: "1 வின்னர் பெட்டி",
    nameEnglish: "Winner Oil Box",
    tanglish: "1 Winner Petti",
    sellingPrice: 1750
  },
  {
    sNo: 94,
    nameTamil: "சர்க்கரை நெ.1",
    nameEnglish: "Sugar No.1",
    tanglish: "Sarkkarai No.1",
    sellingPrice: 52
  },
  {
    sNo: 95,
    nameTamil: "மைதா நெ.1",
    nameEnglish: "Maida (Refined Flour) No.1",
    tanglish: "Maida No.1",
    sellingPrice: 40
  },
  {
    sNo: 96,
    nameTamil: "மைதா 10கி அம்மன்",
    nameEnglish: "Maida 10kg (Amman Brand)",
    tanglish: "Maida 10 KG Amman",
    sellingPrice: 475
  },
  {
    sNo: 97,
    nameTamil: "ஆசிர்வாத் 1கி",
    nameEnglish: "Aashirvaad Atta 1kg",
    tanglish: "Aashirvaad 1 KG",
    sellingPrice: 63
  },
  {
    sNo: 98,
    nameTamil: "5கி மலை ஆட்டா",
    nameEnglish: "Malai Atta 5kg",
    tanglish: "5 KG Malai Atta",
    sellingPrice: 195
  },
  {
    sNo: 99,
    nameTamil: "10கி மலை ஆட்டா",
    nameEnglish: "Malai Atta 10kg",
    tanglish: "10 KG Malai Atta",
    sellingPrice: 395
  },
  {
    sNo: 100,
    nameTamil: "ஆசிர்வாத் 10கி",
    nameEnglish: "Aashirvaad Atta 10kg",
    tanglish: "Aashirvaad 10 KG",
    sellingPrice: 550
  },
  {
    sNo: 101,
    nameTamil: "ஆசிர்வாத் 5கி",
    nameEnglish: "Aashirvaad Atta 5kg",
    tanglish: "Aashirvaad 5 KG",
    sellingPrice: 310
  },
];
