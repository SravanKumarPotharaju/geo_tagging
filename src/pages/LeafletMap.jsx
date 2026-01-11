import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { usePlants } from '../context/PlantsContext';
import { Card } from '../components/common/Card';
import { MapPin, Info, Globe } from 'lucide-react';

// Fix for default marker icons in Leaflet + React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export const LeafletMap = () => {
    const { plants } = usePlants();

    // Default center if no plants (approx center of a typical farm area or 0,0)
    const defaultCenter = [20.5937, 78.9629]; // India center for demo
    const center = plants.length > 0 ? [plants[0].latitude, plants[0].longitude] : defaultCenter;

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Globe className="text-blue-500" />
                        Leaflet Map (Tile-Based GIS)
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Standard geographic visualization using OpenStreetMap tiles.
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start gap-3 max-w-md">
                    <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-blue-700">
                        <strong>Leaflet Challenge:</strong> Notice the "tile loading" feel and how styling markers is limited compared to our custom Farm Map.
                    </p>
                </div>
            </div>

            <Card className="p-0 overflow-hidden border-slate-200 shadow-xl overflow-hidden rounded-xl">
                <div className="h-[600px] w-full z-0">
                    <MapContainer
                        center={center}
                        zoom={13}
                        scrollWheelZoom={true}
                        className="h-full w-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {plants.map((plant) => (
                            <Marker
                                key={plant.id}
                                position={[plant.latitude, plant.longitude]}
                            >
                                <Popup className="custom-popup">
                                    <div className="p-1">
                                        <h3 className="font-bold text-slate-900 border-b pb-1 mb-2">{plant.name}</h3>
                                        <img
                                            src={plant.imageUrl}
                                            alt={plant.name}
                                            className="w-full h-32 object-cover rounded mb-2 shadow-sm"
                                        />
                                        <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                                            <MapPin size={12} className="text-red-500" />
                                            <span>{plant.latitude.toFixed(6)}, {plant.longitude.toFixed(6)}</span>
                                        </div>
                                        <div className="text-xs text-slate-500 italic">
                                            Uploaded: {new Date(plant.timestamp).toLocaleDateString()}
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-3">Leaflet Advantages</h3>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                        <li>Automatic handling of GPS coordinates (Lat/Long).</li>
                        <li>Built-in map tiles from global providers.</li>
                        <li>Great for widespread geographic locations.</li>
                        <li>Mature ecosystem of plugins.</li>
                    </ul>
                </div>
                <div className="bg-green-50 p-5 rounded-xl border border-green-100 shadow-sm">
                    <h3 className="font-bold text-green-800 mb-3 text-emerald-800">Why Our Farm Map is Better Here</h3>
                    <ul className="text-sm text-emerald-700 space-y-2 list-disc pl-4">
                        <li><strong>High Precision:</strong> No tile pixelation at extreme zoom levels.</li>
                        <li><strong>Custom Styling:</strong> LED-style blinking and complex animations.</li>
                        <li><strong>Privacy:</strong> No external map API requests needed.</li>
                        <li><strong>Performance:</strong> Lightweight, no heavy tile loading overhead.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};


