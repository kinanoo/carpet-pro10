import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Lock, LogOut, Package, Image, Video, 
  MessageSquare, Star, HelpCircle, Mail, Settings,
  Plus, Trash2, Edit, Eye, Save, X, Upload, Check,
  Loader2, RefreshCw, ChevronDown
} from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '../lib/supabase'

const ADMIN_EMAIL = 'httmth@gmail.com'
const ADMIN_PASSWORD = '1qaz1qazZ!'

type Tab = 'products' | 'gallery' | 'videos' | 'testimonials' | 'faq' | 'messages' | 'site-images' | 'settings'

interface Product {
  id: string
  name_ar: string
  name_en: string
  category: string
  is_active: boolean
  created_at: string
  images?: ProductImage[]
}

interface ProductImage {
  id: string
  product_id: string
  image_url: string
  is_primary: boolean
}

interface GalleryItem {
  id: string
  title_ar: string
  image_url: string
  category: string
  is_active: boolean
}

interface VideoItem {
  id: string
  title_ar: string
  url: string
  is_active: boolean
}

interface Testimonial {
  id: string
  customer_name: string
  customer_country: string
  content_ar: string
  rating: number
  is_active: boolean
}

interface FAQ {
  id: string
  question_ar: string
  answer_ar: string
  is_active: boolean
  sort_order: number
}

interface Message {
  id: string
  name: string
  email: string
  phone: string
  message: string
  is_read: boolean
  created_at: string
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('products')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const session = sessionStorage.getItem('admin_session')
    if (session === 'authenticated') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        setIsAuthenticated(true)
        sessionStorage.setItem('admin_session', 'authenticated')
        toast.success('تم تسجيل الدخول بنجاح')
      } else {
        toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      }
      setIsLoading(false)
    }, 500)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_session')
    toast.success('تم تسجيل الخروج')
  }

  const tabs = [
    { id: 'products', label: 'المنتجات', icon: Package },
    { id: 'gallery', label: 'المعرض', icon: Image },
    { id: 'videos', label: 'الفيديوهات', icon: Video },
    { id: 'testimonials', label: 'الشهادات', icon: Star },
    { id: 'faq', label: 'الأسئلة', icon: HelpCircle },
    { id: 'messages', label: 'الرسائل', icon: Mail },
    { id: 'site-images', label: 'صور الموقع', icon: Image },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-primary-dark to-navy flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-10 h-10 text-gold" />
              </div>
              <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
              <p className="text-gray-400 mt-2">كاربت هوم</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-gray-300 text-sm mb-2">البريد الإلكتروني</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold" placeholder="admin@example.com" required />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">كلمة المرور</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold" placeholder="••••••••" required />
              </div>
              <button type="submit" disabled={isLoading} className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-navy font-bold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all disabled:opacity-50">
                {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <a href="/" className="text-gray-400 hover:text-gold transition-colors text-sm">← العودة للموقع</a>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <aside className="fixed right-0 top-0 h-full w-64 bg-[#152238] border-l border-white/10 z-40">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="text-white font-bold">لوحة التحكم</h2>
              <p className="text-xs text-gray-400">كاربت هوم</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as Tab)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-gold text-navy font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 right-0 left-0 p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <main className="mr-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p className="text-gray-400 mt-1">إدارة محتوى الموقع</p>
          </div>
          <a href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
            <Eye className="w-5 h-5" />
            <span>معاينة الموقع</span>
          </a>
        </div>

        <div className="bg-[#152238] rounded-2xl p-6 border border-white/10 min-h-[600px]">
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'videos' && <VideosTab />}
          {activeTab === 'testimonials' && <TestimonialsTab />}
          {activeTab === 'faq' && <FAQTab />}
          {activeTab === 'messages' && <MessagesTab />}
          {activeTab === 'site-images' && <SiteImagesTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  )
}

// ==================== PRODUCTS TAB ====================
function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({ name_ar: '', name_en: '', category: '', is_active: true })
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('products').select('*, images:product_images(*)').order('created_at', { ascending: false })
    if (error) toast.error('خطأ في جلب المنتجات')
    else setProducts(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      let productId = editingProduct?.id

      if (editingProduct) {
        const { error } = await supabase.from('products').update(formData).eq('id', editingProduct.id)
        if (error) throw error
        toast.success('تم تحديث المنتج')
      } else {
        const { data, error } = await supabase.from('products').insert(formData).select().single()
        if (error) throw error
        productId = data.id
        toast.success('تم إضافة المنتج')
      }

      // Upload images
      if (selectedImages.length > 0 && productId) {
        for (const file of selectedImages) {
          const fileName = `${productId}/${Date.now()}-${file.name}`
          const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file)
          if (uploadError) {
            console.error('Upload error:', uploadError)
            continue
          }
          const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName)
          await supabase.from('product_images').insert({ product_id: productId, image_url: publicUrl, is_primary: false })
        }
      }

      setShowModal(false)
      setEditingProduct(null)
      setFormData({ name_ar: '', name_en: '', category: '', is_active: true })
      setSelectedImages([])
      fetchProducts()
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ')
    }
    setUploading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) toast.error('خطأ في الحذف')
    else { toast.success('تم الحذف'); fetchProducts() }
  }

  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    const path = imageUrl.split('/product-images/')[1]
    if (path) await supabase.storage.from('product-images').remove([path])
    await supabase.from('product_images').delete().eq('id', imageId)
    fetchProducts()
    toast.success('تم حذف الصورة')
  }

  const openEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({ name_ar: product.name_ar, name_en: product.name_en, category: product.category, is_active: product.is_active })
    setShowModal(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">قائمة المنتجات ({products.length})</h3>
        <div className="flex gap-2">
          <button onClick={fetchProducts} className="p-2 bg-white/10 rounded-lg hover:bg-white/20"><RefreshCw className="w-5 h-5 text-gray-400" /></button>
          <button onClick={() => { setEditingProduct(null); setFormData({ name_ar: '', name_en: '', category: '', is_active: true }); setSelectedImages([]); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-gold text-navy rounded-xl font-semibold hover:bg-gold-light transition-colors">
            <Plus className="w-5 h-5" />إضافة منتج
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">لا توجد منتجات. أضف منتجاً جديداً!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white/5 rounded-xl overflow-hidden">
              <div className="h-48 bg-navy-light relative">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0].image_url} alt={product.name_ar} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">لا توجد صورة</div>
                )}
                {product.images && product.images.length > 1 && (
                  <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">{product.images.length} صور</span>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-white font-semibold">{product.name_ar}</h4>
                    <p className="text-gray-500 text-sm">{product.name_en}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${product.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {product.is_active ? 'نشط' : 'متوقف'}
                  </span>
                </div>
                <p className="text-gold text-sm mb-3">{product.category}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(product)} className="flex-1 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 text-sm">تعديل</button>
                  <button onClick={() => handleDelete(product.id)} className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="bg-[#152238] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">اسم المنتج (عربي) *</label>
                  <input type="text" value={formData.name_ar} onChange={e => setFormData({ ...formData, name_ar: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold" required />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">اسم المنتج (إنجليزي)</label>
                  <input type="text" value={formData.name_en} onChange={e => setFormData({ ...formData, name_en: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">الفئة</label>
                  <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold" placeholder="كلاسيك، مودرن، هندسي..." />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="is_active" checked={formData.is_active} onChange={e => setFormData({ ...formData, is_active: e.target.checked })} className="w-5 h-5 rounded" />
                  <label htmlFor="is_active" className="text-gray-300">نشط</label>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-gray-300 text-sm mb-2">صور المنتج</label>
                  
                  {/* Existing Images */}
                  {editingProduct?.images && editingProduct.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {editingProduct.images.map(img => (
                        <div key={img.id} className="relative group">
                          <img src={img.image_url} alt="" className="w-full h-20 object-cover rounded-lg" />
                          <button type="button" onClick={() => handleDeleteImage(img.id, img.image_url)} className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                            <Trash2 className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* New Images Preview */}
                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {selectedImages.map((file, i) => (
                        <div key={i} className="relative">
                          <img src={URL.createObjectURL(file)} alt="" className="w-full h-20 object-cover rounded-lg" />
                          <button type="button" onClick={() => setSelectedImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={e => setSelectedImages(prev => [...prev, ...Array.from(e.target.files || [])])} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    اختر صوراً للرفع
                  </button>
                </div>

                <button type="submit" disabled={uploading} className="w-full py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {uploading ? <><Loader2 className="w-5 h-5 animate-spin" />جاري الحفظ...</> : <><Save className="w-5 h-5" />حفظ</>}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==================== GALLERY TAB ====================
function GalleryTab() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })
    if (error) toast.error('خطأ في جلب الصور')
    else setItems(data || [])
    setLoading(false)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)

    try {
      for (const file of Array.from(files)) {
        const fileName = `${Date.now()}-${file.name}`
        const { error: uploadError } = await supabase.storage.from('gallery').upload(fileName, file)
        if (uploadError) throw uploadError
        const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(fileName)
        await supabase.from('gallery').insert({ title_ar: file.name.split('.')[0], image_url: publicUrl, category: 'عام', is_active: true })
      }
      toast.success('تم رفع الصور بنجاح')
      fetchItems()
    } catch (error: any) {
      toast.error(error.message || 'خطأ في الرفع')
    }
    setUploading(false)
  }

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm('هل أنت متأكد؟')) return
    const path = item.image_url.split('/gallery/')[1]
    if (path) await supabase.storage.from('gallery').remove([path])
    await supabase.from('gallery').delete().eq('id', item.id)
    toast.success('تم الحذف')
    fetchItems()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">صور المعرض ({items.length})</h3>
        <div className="flex gap-2">
          <button onClick={fetchItems} className="p-2 bg-white/10 rounded-lg hover:bg-white/20"><RefreshCw className="w-5 h-5 text-gray-400" /></button>
          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-4 py-2 bg-gold text-navy rounded-xl font-semibold hover:bg-gold-light transition-colors disabled:opacity-50">
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            رفع صور
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">لا توجد صور. ارفع صوراً جديدة!</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="relative group">
              <img src={item.image_url} alt={item.title_ar} className="w-full h-48 object-cover rounded-xl" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                <a href={item.image_url} target="_blank" className="p-2 bg-white/20 rounded-lg hover:bg-white/30"><Eye className="w-5 h-5 text-white" /></a>
                <button onClick={() => handleDelete(item)} className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30"><Trash2 className="w-5 h-5 text-red-400" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ==================== VIDEOS TAB ====================
function VideosTab() {
  const [items, setItems] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ title_ar: '', url: '', is_active: true })

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false })
    if (error) toast.error('خطأ في جلب الفيديوهات')
    else setItems(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('videos').insert(formData)
    if (error) toast.error('خطأ في الإضافة')
    else { toast.success('تم الإضافة'); setShowModal(false); setFormData({ title_ar: '', url: '', is_active: true }); fetchItems() }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد؟')) return
    await supabase.from('videos').delete().eq('id', id)
    toast.success('تم الحذف')
    fetchItems()
  }

  const getEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([^&\s]+)/)
    return match ? `https://www.youtube.com/embed/${match[1]}` : url
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">الفيديوهات ({items.length})</h3>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gold text-navy rounded-xl font-semibold hover:bg-gold-light transition-colors">
          <Plus className="w-5 h-5" />إضافة فيديو
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">لا توجد فيديوهات</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white/5 rounded-xl overflow-hidden">
              <div className="aspect-video">
                <iframe src={getEmbedUrl(item.url)} className="w-full h-full" allowFullScreen />
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-white font-medium">{item.title_ar}</span>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="bg-[#152238] rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-6">إضافة فيديو</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="عنوان الفيديو" value={formData.title_ar} onChange={e => setFormData({ ...formData, title_ar: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold" required />
                <input type="url" placeholder="رابط اليوتيوب" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold" required />
                <button type="submit" className="w-full py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light">حفظ</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==================== TESTIMONIALS TAB ====================
function TestimonialsTab() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ customer_name: '', customer_country: '', content_ar: '', rating: 5, is_active: true })

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    if (error) toast.error('خطأ')
    else setItems(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('testimonials').insert(formData)
    if (error) toast.error('خطأ')
    else { toast.success('تم الإضافة'); setShowModal(false); setFormData({ customer_name: '', customer_country: '', content_ar: '', rating: 5, is_active: true }); fetchItems() }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد؟')) return
    await supabase.from('testimonials').delete().eq('id', id)
    toast.success('تم الحذف')
    fetchItems()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">آراء العملاء ({items.length})</h3>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gold text-navy rounded-xl font-semibold hover:bg-gold-light transition-colors">
          <Plus className="w-5 h-5" />إضافة رأي
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">لا توجد شهادات</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white/5 rounded-xl p-6">
              <div className="flex gap-1 mb-3">{[...Array(item.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}</div>
              <p className="text-gray-300 mb-4">"{item.content_ar}"</p>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white font-medium">{item.customer_name}</div>
                  <div className="text-gray-500 text-sm">{item.customer_country}</div>
                </div>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="bg-[#152238] rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-6">إضافة رأي عميل</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="اسم العميل" value={formData.customer_name} onChange={e => setFormData({ ...formData, customer_name: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold" required />
                <input type="text" placeholder="الدولة" value={formData.customer_country} onChange={e => setFormData({ ...formData, customer_country: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold" />
                <textarea placeholder="الرأي" value={formData.content_ar} onChange={e => setFormData({ ...formData, content_ar: e.target.value })} rows={3} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold resize-none" required />
                <div>
                  <label className="text-gray-300 text-sm">التقييم</label>
                  <div className="flex gap-2 mt-2">{[1,2,3,4,5].map(n => <button key={n} type="button" onClick={() => setFormData({ ...formData, rating: n })} className={`p-2 rounded ${formData.rating >= n ? 'text-gold' : 'text-gray-600'}`}><Star className={`w-6 h-6 ${formData.rating >= n ? 'fill-gold' : ''}`} /></button>)}</div>
                </div>
                <button type="submit" className="w-full py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light">حفظ</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==================== FAQ TAB ====================
function FAQTab() {
  const [items, setItems] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ question_ar: '', answer_ar: '', is_active: true, sort_order: 0 })

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('faq').select('*').order('sort_order')
    if (error) toast.error('خطأ')
    else setItems(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('faq').insert({ ...formData, sort_order: items.length })
    if (error) toast.error('خطأ')
    else { toast.success('تم الإضافة'); setShowModal(false); setFormData({ question_ar: '', answer_ar: '', is_active: true, sort_order: 0 }); fetchItems() }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد؟')) return
    await supabase.from('faq').delete().eq('id', id)
    toast.success('تم الحذف')
    fetchItems()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">الأسئلة الشائعة ({items.length})</h3>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gold text-navy rounded-xl font-semibold hover:bg-gold-light transition-colors">
          <Plus className="w-5 h-5" />إضافة سؤال
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">لا توجد أسئلة</div>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white/5 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-medium mb-2">{item.question_ar}</h4>
                  <p className="text-gray-400">{item.answer_ar}</p>
                </div>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="bg-[#152238] rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-6">إضافة سؤال</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="السؤال" value={formData.question_ar} onChange={e => setFormData({ ...formData, question_ar: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold" required />
                <textarea placeholder="الإجابة" value={formData.answer_ar} onChange={e => setFormData({ ...formData, answer_ar: e.target.value })} rows={3} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold resize-none" required />
                <button type="submit" className="w-full py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light">حفظ</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==================== MESSAGES TAB ====================
function MessagesTab() {
  const [items, setItems] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
    if (error) toast.error('خطأ')
    else setItems(data || [])
    setLoading(false)
  }

  const markAsRead = async (id: string) => {
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id)
    fetchItems()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد؟')) return
    await supabase.from('contact_messages').delete().eq('id', id)
    toast.success('تم الحذف')
    fetchItems()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">رسائل التواصل</h3>
        <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm">{items.filter(m => !m.is_read).length} جديدة</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">لا توجد رسائل</div>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className={`bg-white/5 rounded-xl p-6 border-r-4 ${item.is_read ? 'border-gray-600' : 'border-gold'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-white font-medium">{item.name}</h4>
                  <p className="text-gray-500 text-sm">{item.email} | {item.phone}</p>
                </div>
                <span className="text-gray-500 text-sm">{new Date(item.created_at).toLocaleDateString('ar')}</span>
              </div>
              <p className="text-gray-300 mb-4">{item.message}</p>
              <div className="flex justify-end gap-2">
                {!item.is_read && <button onClick={() => markAsRead(item.id)} className="px-3 py-1 bg-gold/20 text-gold rounded-lg text-sm hover:bg-gold/30">تعليم كمقروءة</button>}
                <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30">حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ==================== SETTINGS TAB ====================
function SettingsTab() {
  const [settings, setSettings] = useState({ site_name: 'كاربت هوم', phone: '+90 555 020 09 11', email: 'carpethome10@gmail.com', address: 'BAŞPINAR OSB MAH. 3.BÖLGE 83318 NOLU CAD. NO: 22, GAZİANTEP' })

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-6">إعدادات الموقع</h3>
      <div className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-gray-300 mb-2">اسم الموقع</label>
          <input type="text" value={settings.site_name} onChange={e => setSettings({ ...settings, site_name: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold" />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">رقم الهاتف</label>
          <input type="text" value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold" />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">البريد الإلكتروني</label>
          <input type="email" value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold" />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">العنوان</label>
          <textarea rows={3} value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold resize-none" />
        </div>
        <button onClick={() => toast.success('تم حفظ الإعدادات')} className="flex items-center gap-2 px-6 py-3 bg-gold text-navy rounded-xl font-semibold hover:bg-gold-light transition-colors">
          <Save className="w-5 h-5" />حفظ التغييرات
        </button>
      </div>
    </div>
  )
}

// ==================== SITE IMAGES TAB ====================
function SiteImagesTab() {
  const [images, setImages] = useState<{[key: string]: string}>({})
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const fileInputRefs = {
    hero_main: useRef<HTMLInputElement>(null),
    hero_floating_1: useRef<HTMLInputElement>(null),
    hero_floating_2: useRef<HTMLInputElement>(null),
    about_main: useRef<HTMLInputElement>(null),
    about_badge: useRef<HTMLInputElement>(null),
  }

  const imageSlots = [
    { key: 'hero_main', label: 'صورة الهيرو الرئيسية', description: 'الصورة الكبيرة في أعلى الصفحة' },
    { key: 'hero_floating_1', label: 'صورة عائمة 1', description: 'الصورة العائمة الأولى في الهيرو' },
    { key: 'hero_floating_2', label: 'صورة عائمة 2', description: 'الصورة العائمة الثانية في الهيرو' },
    { key: 'about_main', label: 'صورة قسم من نحن', description: 'الصورة الرئيسية في قسم من نحن' },
  ]

  useEffect(() => { fetchImages() }, [])

  const fetchImages = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('site_settings').select('*').in('key', imageSlots.map(s => s.key))
    if (data) {
      const imgs: {[key: string]: string} = {}
      data.forEach(item => { imgs[item.key] = item.value })
      setImages(imgs)
    }
    setLoading(false)
  }

  const handleUpload = async (key: string, file: File) => {
    setUploading(key)
    try {
      // Delete old image if exists
      if (images[key]) {
        const oldPath = images[key].split('/site-images/')[1]
        if (oldPath) await supabase.storage.from('site-images').remove([oldPath])
      }

      // Upload new image
      const fileName = `${key}-${Date.now()}.${file.name.split('.').pop()}`
      const { error: uploadError } = await supabase.storage.from('site-images').upload(fileName, file)
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('site-images').getPublicUrl(fileName)

      // Save to settings
      const { error: upsertError } = await supabase.from('site_settings').upsert({ key, value: publicUrl, updated_at: new Date().toISOString() }, { onConflict: 'key' })
      if (upsertError) throw upsertError

      toast.success('تم رفع الصورة بنجاح')
      fetchImages()
    } catch (error: any) {
      toast.error(error.message || 'خطأ في الرفع')
    }
    setUploading(null)
  }

  const handleDelete = async (key: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الصورة؟')) return
    try {
      if (images[key]) {
        const path = images[key].split('/site-images/')[1]
        if (path) await supabase.storage.from('site-images').remove([path])
      }
      await supabase.from('site_settings').delete().eq('key', key)
      toast.success('تم حذف الصورة')
      fetchImages()
    } catch (error: any) {
      toast.error(error.message || 'خطأ في الحذف')
    }
  }

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">صور الموقع الثابتة</h3>
          <p className="text-gray-400 text-sm mt-1">تحكم في الصور الرئيسية والخلفيات في الموقع</p>
        </div>
        <button onClick={fetchImages} className="p-2 bg-white/10 rounded-lg hover:bg-white/20"><RefreshCw className="w-5 h-5 text-gray-400" /></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {imageSlots.map(slot => (
          <div key={slot.key} className="bg-white/5 rounded-xl p-6">
            <h4 className="text-white font-semibold mb-1">{slot.label}</h4>
            <p className="text-gray-500 text-sm mb-4">{slot.description}</p>
            
            <div className="aspect-video bg-navy-light rounded-xl overflow-hidden mb-4 relative">
              {images[slot.key] ? (
                <>
                  <img src={images[slot.key]} alt={slot.label} className="w-full h-full object-cover" />
                  <button onClick={() => handleDelete(slot.key)} className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-lg hover:bg-red-500">
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>لا توجد صورة</p>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRefs[slot.key as keyof typeof fileInputRefs]}
              type="file"
              accept="image/*"
              onChange={e => e.target.files?.[0] && handleUpload(slot.key, e.target.files[0])}
              className="hidden"
            />
            <button
              onClick={() => fileInputRefs[slot.key as keyof typeof fileInputRefs]?.current?.click()}
              disabled={uploading === slot.key}
              className="w-full py-3 bg-gold/20 text-gold rounded-xl font-semibold hover:bg-gold/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploading === slot.key ? <><Loader2 className="w-5 h-5 animate-spin" />جاري الرفع...</> : <><Upload className="w-5 h-5" />{images[slot.key] ? 'تغيير الصورة' : 'رفع صورة'}</>}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gold/10 rounded-xl border border-gold/30">
        <p className="text-gold text-sm">
          💡 <strong>ملاحظة:</strong> تأكد من إنشاء bucket باسم <code className="bg-black/30 px-2 py-1 rounded">site-images</code> في Supabase Storage وجعله Public.
        </p>
      </div>
    </div>
  )
}
