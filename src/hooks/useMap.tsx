import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Map, TileLayer, control} from 'leaflet';

const useMap = (
  mapRef: MutableRefObject<HTMLElement | null>,
  coords: [number, number]
): Map | null => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        zoomControl: false
      }).setView(coords, 17);

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
        }
      );
      instance.addLayer(layer);
      control.zoom({ position: 'topright' }).addTo(instance);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, coords, map]);

  return map;
};

export default useMap;
