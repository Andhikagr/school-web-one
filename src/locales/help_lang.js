/**
 * Ambil data berdasarkan bahasa dari objek multibahasa.
 * Bisa menangani:
 * - Object bahasa: { id, en, ar }
 * - Object biasa
 * - Array campuran (string, object)
 * - Nilai primitif
 *
 * @param {object} obj - Objek bahasa lengkap
 * @param {string} lang - Bahasa yang diambil, misal "id", "en", atau "ar"
 * @param {string} path - Path internal untuk debugging, default ""
 * @returns {object} - Objek baru dengan bahasa yang dipilih
 */
export const getLangResource = (obj, lang, path = "") => {
  const result = {}; // Objek hasil akhir

  for (const key in obj) {
    const value = obj[key];
    const currentPath = path ? `${path}.${key}` : key; // Untuk debug error

    try {
      // 1️⃣ Jika value adalah array
      if (Array.isArray(value)) {
        // Map tiap item: jika object → rekursif, jika primitif → langsung
        result[key] = value.map(
          (item) =>
            typeof item === "object" && item !== null
              ? getLangResource(item, lang) // rekursi untuk object
              : item // string/number tetap
        );
      }
      // 2️⃣ Jika object bahasa (id/en/ar)
      else if (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "en" in value &&
        "ar" in value
      ) {
        result[key] = value[lang] ?? null; // ambil bahasa yang diminta
      }
      // 3️⃣ Object biasa (bukan object bahasa)
      else if (typeof value === "object" && value !== null) {
        result[key] = getLangResource(value, lang, currentPath); // rekursi tiap property
      }
      // 4️⃣ Nilai primitif (string, number, boolean)
      else {
        result[key] = value ?? null;
      }
    } catch (err) {
      // Tangani error: tetap lanjut, tidak crash
      console.error(`Error parsing key "${currentPath}"`, err);
      result[key] = null;
    }
  }

  return result;
};

/*
Tips belajar & best practice

Pisahkan tipe data

Array → map tiap item

Object bahasa → langsung ambil bahasa

Object biasa → rekursif

Primitif → langsung ambil
Ini membuat fungsi fleksibel untuk data campuran, termasuk array string path gambar.

Gunakan try/catch

Aman kalau ada field unexpected, tidak crash aplikasi.

Path debug (currentPath) membantu mengetahui key mana yang error.

Array string vs object

Jangan rekursif semua item array → string akan jadi error

Cek dulu typeof item === "object" && item !== null sebelum rekursi.

Default null

Untuk key yang tidak punya bahasa (value[lang] undefined), set null → mempermudah handling di React.

Skalabilitas

Fungsi ini bisa dipakai di seluruh aplikasi: section_title, fasilitas, kepsek, unit pendidikan, dll.

Bisa dicampur array string/object tanpa perlu penyesuaian tiap section.

*/
