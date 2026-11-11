"use client";

import { useState } from "react";
import { X, MapPin, Radio, Sprout, Calendar, User, CheckCircle2, Loader2 } from "lucide-react";
import { MOCK_FARMERS } from "@/lib/mock-data";
import { api } from "@/lib/api/endpoints";
import type { Plot } from "@/types";

interface RegisterPlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlotRegistered: (newPlot: Plot) => void;
}

export function RegisterPlotModal({
  isOpen,
  onClose,
  onPlotRegistered,
}: RegisterPlotModalProps) {
  const [farmerId, setFarmerId] = useState(MOCK_FARMERS[0].id);
  const [parcelName, setParcelName] = useState("Argungu Rice Basin Parcel D1");
  const [riceVariety, setRiceVariety] = useState("FARO 44 (Sippi)");
  const [calculatedArea, setCalculatedArea] = useState("1.85");
  const [sensorId, setSensorId] = useState("SENS-KB-006");
  const [plantingDate, setPlantingDate] = useState("2026-10-01");
  const [gpsBoundary, setGpsBoundary] = useState(
    JSON.stringify(
      [
        [4.546, 12.744],
        [4.55, 12.7442],
        [4.5498, 12.7405],
        [4.5458, 12.7402],
        [4.546, 12.744],
      ],
      null,
      2
    )
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let parsedCoords;
      try {
        parsedCoords = JSON.parse(gpsBoundary);
      } catch {
        parsedCoords = [
          [4.546, 12.744],
          [4.55, 12.7442],
          [4.5498, 12.7405],
          [4.5458, 12.7402],
          [4.546, 12.744],
        ];
      }

      const response = await api.plots.create({
        farm: parcelName,
        farmer: farmerId,
        rice_variety: riceVariety,
        calculated_area: parseFloat(calculatedArea) || 1.85,
        boundary: {
          type: "Polygon",
          coordinates: [parsedCoords],
        },
      });

      setSuccessMessage(`Plot ${response.data.id} successfully registered into cooperative registry!`);
      setTimeout(() => {
        onPlotRegistered(response.data);
        setIsSubmitting(false);
        setSuccessMessage(null);
        onClose();
      }, 1000);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-green-950/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl border border-neutral-purple-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-purple-200 flex items-center justify-between bg-neutral-purple-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-green-700 flex items-center justify-center text-white shadow-xs">
              <MapPin className="w-4 h-4 text-primary-green-100" />
            </div>
            <div>
              <h3 id="modal-title" className="text-base font-bold text-neutral-purple-900">
                Enroll Rice Plot to Cooperative
              </h3>
              <p className="text-xs text-neutral-purple-500">
                Kebbi Green Rice Growers Union AWD Verification Registry
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-purple-400 hover:text-neutral-purple-800 hover:bg-neutral-purple-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {successMessage && (
            <div className="p-3 bg-status-success-bg border border-primary-green-300 rounded-lg flex items-center gap-2 text-status-success-text text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-primary-green-700 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Farmer Selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-purple-800 mb-1">
              Assigned Cooperative Smallholder Farmer
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={farmerId}
                onChange={(e) => setFarmerId(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-purple-200 bg-white text-neutral-purple-900 focus:outline-hidden focus:border-primary-green-600 focus:ring-1 focus:ring-primary-green-600"
              >
                {MOCK_FARMERS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.first_name} {f.last_name} ({f.phone_number}) — {f.identity_information.id_type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Parcel Name & Variety Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-purple-800 mb-1">
                Farm Cluster / Parcel Name
              </label>
              <input
                type="text"
                value={parcelName}
                onChange={(e) => setParcelName(e.target.value)}
                required
                placeholder="e.g. Argungu Parcel D1"
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-purple-200 bg-white text-neutral-purple-900 focus:outline-hidden focus:border-primary-green-600 focus:ring-1 focus:ring-primary-green-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-purple-800 mb-1">
                Rice Variety
              </label>
              <div className="relative">
                <Sprout className="w-4 h-4 text-neutral-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={riceVariety}
                  onChange={(e) => setRiceVariety(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-purple-200 bg-white text-neutral-purple-900 focus:outline-hidden focus:border-primary-green-600 focus:ring-1 focus:ring-primary-green-600"
                >
                  <option value="FARO 44 (Sippi)">FARO 44 (Sippi - 105 days)</option>
                  <option value="FARO 52 (Wita 4)">FARO 52 (Wita 4 - 125 days)</option>
                  <option value="Gauna Rice">Gauna Rice (Aromatic)</option>
                  <option value="Jasmine 85">Jasmine 85</option>
                </select>
              </div>
            </div>
          </div>

          {/* Calculated Area & Sensor ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-purple-800 mb-1">
                Surveyed Area (Hectares)
              </label>
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="50"
                value={calculatedArea}
                onChange={(e) => setCalculatedArea(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs font-mono font-bold tabular-nums rounded-lg border border-neutral-purple-200 bg-white text-neutral-purple-900 focus:outline-hidden focus:border-primary-green-600 focus:ring-1 focus:ring-primary-green-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-purple-800 mb-1">
                Piezometer Sensor Tag
              </label>
              <div className="relative">
                <Radio className="w-4 h-4 text-neutral-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={sensorId}
                  onChange={(e) => setSensorId(e.target.value)}
                  placeholder="e.g. SENS-KB-006"
                  className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-lg border border-neutral-purple-200 bg-white text-neutral-purple-900 focus:outline-hidden focus:border-primary-green-600 focus:ring-1 focus:ring-primary-green-600"
                />
              </div>
            </div>
          </div>

          {/* Planting Date */}
          <div>
            <label className="block text-xs font-semibold text-neutral-purple-800 mb-1">
              Planting / Transplanting Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-neutral-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-purple-200 bg-white text-neutral-purple-900 focus:outline-hidden focus:border-primary-green-600 focus:ring-1 focus:ring-primary-green-600"
              />
            </div>
          </div>

          {/* GeoJSON Boundary Coordinates */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-neutral-purple-800">
                GPS Boundary Polygon (Lng, Lat Ring)
              </label>
              <span className="text-[10px] text-neutral-purple-500 font-mono">
                GeoJSON Polygon
              </span>
            </div>
            <textarea
              rows={4}
              value={gpsBoundary}
              onChange={(e) => setGpsBoundary(e.target.value)}
              className="w-full px-3 py-2 text-[11px] font-mono rounded-lg border border-neutral-purple-200 bg-neutral-purple-50 text-neutral-purple-800 focus:outline-hidden focus:border-primary-green-600 focus:ring-1 focus:ring-primary-green-600"
            />
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-3 border-t border-neutral-purple-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-neutral-purple-700 hover:text-neutral-purple-900 hover:bg-neutral-purple-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-accent-orange-500 hover:bg-accent-orange-600 active:bg-accent-orange-700 disabled:opacity-50 rounded-lg transition-colors shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Registering Plot...</span>
                </>
              ) : (
                <>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Enroll Plot to Cooperative</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

