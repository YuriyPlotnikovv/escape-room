import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap';
import {Place} from '../../types/map';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const/const';

const defaultMarker = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [23, 42],
  iconAnchor: [11.5, 42],
});

const selectedMarker = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [23, 42],
  iconAnchor: [11.5, 42],
});

export type BookingMapProps = {
  places: Place[];
  selectedId?: string;
  onSelect?: (placeId: string) => void;
};

function Map({places, selectedId, onSelect}: BookingMapProps) {
  const mapRef = useRef(null);
  const coords = places.find((place) => place.id === selectedId)?.location.coords || places[0].location.coords;
  const map = useMap(mapRef, coords);

  useEffect(() => {
    if (!map) {
      return;
    }

    places.forEach((place) => {
      const [lat, lng] = place.location.coords;
      const marker = new Marker([lat, lng], {
        icon: place.id === selectedId ? selectedMarker : defaultMarker,
      });

      marker.on('click', () => onSelect?.(place.id));
      marker.addTo(map);
    });

    if (selectedId) {
      const place = places.find((item) => item.id === selectedId);

      if (place) {
        const [lat, lng] = place.location.coords;
        map.setView([lat, lng], 11);
      }
    }
  }, [map, places, selectedId, onSelect]);

  return (
    <div className="map">
      <div className="map__container" ref={mapRef}></div>
    </div>
  );
}

export default Map;
