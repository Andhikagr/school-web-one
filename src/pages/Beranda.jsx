import React from "react";
import Slider from "../components/Slider";

const Beranda = () => {
  const features = [
    {
      title: "Akreditasi Unggul",
      subtitle:
        "Kampus kami memiliki akreditasi A, menunjukkan standar pendidikan yang tinggi dan diakui secara nasional. Setiap program studi dirancang untuk memastikan lulusan siap menghadapi tantangan akademik dan profesional dengan kompetensi yang mumpuni.",
      icon: "verified",
    },
    {
      title: "Mahasiswa Nusantara",
      subtitle:
        "Mahasiswa kami datang dari seluruh penjuru Indonesia, menciptakan lingkungan belajar yang multikultural dan dinamis. Keberagaman ini memperkaya interaksi, diskusi, dan kolaborasi, membentuk pengalaman pendidikan yang lebih luas dan inklusif.",
      icon: "public",
    },
    {
      title: "Prestasi Mahasiswa",
      subtitle:
        "Mahasiswa aktif meraih berbagai prestasi, baik di bidang akademik, olahraga, maupun seni, di tingkat regional maupun nasional. Hal ini menunjukkan komitmen kampus dalam mendukung pengembangan potensi setiap mahasiswa secara menyeluruh.",
      icon: "emoji_events",
    },
    {
      title: "Pengajar Ahli",
      subtitle:
        "Dosen dan pengajar kami adalah profesional berpengalaman dengan latar belakang akademik dan praktis yang kuat. Mereka berdedikasi membimbing mahasiswa, mengembangkan kemampuan kritis, dan menyiapkan lulusan untuk sukses di dunia profesional maupun akademik.",
      icon: "how_to_reg",
    },
  ];
  return (
    <main className="overflow-hidden ">
      <section>
        <Slider />
      </section>
      <section className="min-h-screen py-20 px-[7%] flex flex-col  text-amber-950">
        <div className="flex flex-col justify-center items-center relative">
          <h2>Kenapa Memilih Kami</h2>
          <span className="mt-5 w-36 mx-auto border-b-[7.5px] border-amber-900 rounded-2xl z-20"></span>
          <span className="-mt-1 w-[70%] mx-auto border-b-4 border-gray-200 z-10"></span>
          <h5 className="mt-5 text-center">
            Pendidikan menyeluruh yang memadukan ilmu agama dan sains,
            berorientasi pada keunggulan dan inklusivitas
          </h5>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-10 mt-16  ">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex-1  rounded-2xl p-10 h-auto relative"
              style={{ boxShadow: "0 5px 25px rgba(0,0,0,0.1)" }}
            >
              <h5>{item.title}</h5>
              <p className="text-start mt-2">{item.subtitle}</p>
              <div className="absolute -top-5 -left-5 bg-amber-100 rounded-full p-2 flex items-center justify-center">
                <span
                  class="material-symbols-outlined"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
                >
                  {item.icon}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Beranda;
