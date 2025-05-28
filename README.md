
# Dynamic Form Builder Frontend

Bu proje **Angular 15** ve **Bootstrap** kullanılarak geliştirilmiş bir dinamik form builder uygulamasıdır.  
Backend’te tanımlanan form JSON’una göre dinamik olarak form oluşturur ve **validasyonları** Angular tarafında da uygular.

---

## 🚀 Kurulum ve Çalıştırma

✅ **Gerekli Sürümler:**  
- **Node.js:** 20.x  
- **NPM:** 10.x  
- **Angular CLI:** 15.x

✅ **Adımlar:**  
1. Proje dizinine gir:
   ```bash
   cd dynamic-form-frontend
   ```

2. Gerekli paketleri yükle:
   ```bash
   npm install
   ```

3. Angular uygulamasını başlat:
   ```bash
   ng serve
   ```
   ve tarayıcıda `http://localhost:4200` adresinden eriş.

---

## 🟡 Kullandığımız Teknolojiler

✅ **Angular 15** – Modern, bileşen tabanlı frontend framework.  
✅ **Bootstrap 5** – Şık ve responsive tasarım için CSS framework.  
✅ **Reactive Forms** – Dinamik form yapısı ve validasyon.  
✅ **SweetAlert2** – Başarılı ve hatalı durum bildirimleri için güzel popup’lar.

---

## 🌟 Özellikler

- **Backend’ten form tanımını alır** (GET /api/forms/{formName})  
- **Angular Reactive Forms** ile alanları dinamik oluşturur  
- **Alan bazlı validasyon**: MinLength, MaxLength, Regex, MinValue, MaxValue gibi kuralları otomatik uygular  
- **Formu submit eder** (POST /api/forms/{formName}/submit)  
- **Doldurulmuş formlar readonly gelir, sadece görüntülenebilir**  
- **Liste ekranı**: Doldurulmuş ve doldurulmamış formları ayırt eder, her 5 saniyede bir otomatik günceller.

---

## 🔧 Dikkat Edilecekler

👉 **form.service.ts** dosyasındaki `apiUrl` değişkeni default olarak `http://localhost:5185/api/forms`’e ayarlanmıştır.  
👉 Backend API başka bir portta çalışıyorsa bu değeri güncellemeyi unutmayın!  
```typescript
private apiUrl = 'http://localhost:5185/api/forms';
```
Backend URL’sini projeye uygun şekilde ayarlayın.

---

## 🌐 Backend API
Bu frontend uygulaması **.NET Core tabanlı backend API** ile çalışır:  
👉 [dynamic-form-backend (GitHub)](https://github.com/slmngs/dynamic-form-backend/)

---

## 📝 Lisans
Bu proje MIT Lisansı ile lisanslanmıştır.

---

### 🎯 Sonuç
✅ Artık **tamamen dinamik, özelleştirilebilir ve şık** bir form builder frontend’imiz var! 🚀✨
