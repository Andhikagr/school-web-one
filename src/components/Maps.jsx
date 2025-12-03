import React, { useEffect, useState, useRef } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { useTranslation } from "react-i18next";
import i18next from "../locales/index_lang";
import { getLangResource } from "../locales/help_lang";

const defaultStyle = {
  fillColor: "#451a03",
  color: "#451a03",
  weight: 1,
  fillOpacity: 1,
};

const highlightStyle = {
  fillColor: "#FFE082",
  weight: 2,
  fillOpacity: 1,
};

// mengatur zoom peta
const ResponsiveZoom = ({ zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setZoom(zoom);
  }, [zoom, map]);

  return null;
};

const CustomMap = () => {
  const [t] = useTranslation();
  const translate = t("home", { returnObjects: true });
  const [geoData, setGeoData] = useState(null);
  const alumnusData = translate.section_count_alumnus;
  const [currentLang, setCurrentLang] = useState(i18next.language);

  useEffect(() => {
    const handleLanguageChange = (lng) => setCurrentLang(lng);
    i18next.on("languageChanged", handleLanguageChange);
    return () => i18next.off("languageChanged", handleLanguageChange);
  }, []);

  useEffect(() => {
    fetch("/assets/data/indonesia.json")
      .then((res) => res.json())
      .then((data) => {
        data.features.forEach((a) => {
          a.properties.NAME_1 = a.properties.NAME_1.replace(
            /([a-z])([A-Z])/g,
            "$1 $2"
          ) // contoh: JawaBarat → Jawa Barat
            .trim();
        });
        setGeoData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // mengatur zoom peta
  const [zoom, setZoom] = useState(4.5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setZoom(3);
      else if (window.innerWidth < 992) setZoom(4);
      else if (window.innerWidth < 1024) setZoom(4.5);
      else setZoom(5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //isi data
  const onEachFeature = (feature, layer) => {
    const provName = feature.properties.NAME_1;
    const data = alumnusData.list.find((a) => a.province === provName);
    const count = data ? data.alumni_count : 0;

    layer.on({
      mouseover: (e) => e.target.setStyle(highlightStyle),
      mouseout: (e) => e.target.setStyle(defaultStyle),
    });

    const displayname = alumnusData.name_map?.[provName] || provName;

    layer.bindTooltip(`${displayname}: ${count}`, {
      sticky: true,
    });
  };

  return (
    <div className="py-5 flex  flex-col items-center rounded-2xl relative cursor-default ">
      <div className="absolute bottom-0 right-25 flex flex-col items-center z-50">
        <h3 className="">{translate.section_maps.number}</h3>
        <h5>({translate.section_maps.subtitle})</h5>
      </div>
      <div className="w-full h-[300px] md:h-[450px] relative ">
        <MapContainer
          center={[-2.548926, 118.0148634]}
          zoom={zoom}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#fff",
          }}
          zoomControl={false}
          scrollWheelZoom={false}
          attributionControl={false}
          dragging={false}
          boxZoom={false}
          touchZoom={false}
          doubleClickZoom={false}
        >
          {" "}
          {/* zoom peta */}
          <ResponsiveZoom zoom={zoom} />
          {geoData && (
            <GeoJSON
              key={currentLang}
              data={geoData}
              style={defaultStyle}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default CustomMap;
