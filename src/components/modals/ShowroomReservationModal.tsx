import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, MapPin, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Showroom } from '../../content';
import { LUXURY_EASE, microButton } from '../../lib/animations';
import { useModalBehaviour } from '../../lib/useModalBehaviour';
import { useScrollLock } from '../../lib/useScrollLock';
import { buildWaLink, allowWaOpen } from '../../lib/wa';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

interface ShowroomReservationModalProps {
  isOpen: boolean;
  showroom: Showroom;
  onClose: () => void;
}

const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 9; h <= 17; h++) {
    for (const m of [0, 30]) {
      if (h === 17 && m === 30) continue;
      slots.push(`${String(h).padStart(2, '0')}.${m === 0 ? '00' : '30'} WIB`);
    }
  }
  return slots;
})();

const todayISO = new Date().toISOString().split('T')[0];

const formatPhoneID = (digits: string) => {
  if (!digits) return '';
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}-${digits.slice(11)}`;
};

const formatDateID = (iso: string) => {
  if (!iso) return '-';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const ShowroomReservationModal: React.FC<ShowroomReservationModalProps> = ({
  isOpen,
  showroom,
  onClose,
}) => {
  const { containerRef } = useModalBehaviour(isOpen, onClose);
  useScrollLock(isOpen);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState(TIME_SLOTS[0]);
  const [confirmed, setConfirmed] = useState(false);
  const [website, setWebsite] = useState('');

  const formStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) formStartRef.current = Date.now();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setPhone('');
      setVisitDate('');
      setVisitTime(TIME_SLOTS[0]);
      setConfirmed(false);
      setWebsite('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!confirmed) formStartRef.current = Date.now();
  }, [confirmed]);

  const message = [
    'Halo Nusa Atelier,',
    '',
    'Saya ingin melakukan reservasi kunjungan showroom:',
  ].join('\n');

  const detailRows = [
    { label: 'Nama', value: name },
    { label: 'No. WA', value: phone ? `+62 ${formatPhoneID(phone)}` : phone },
    { label: 'Showroom', value: showroom.name },
    { label: 'Alamat', value: showroom.address },
    { label: 'Tanggal', value: formatDateID(visitDate) },
    { label: 'Waktu', value: visitTime },
  ];

  const waUrl = buildWaLink(
    `${message}\n\n${detailRows.map((r) => `- ${r.label} : ${r.value}`).join('\n')}\n\nMohon konfirmasi ketersediaan jadwalnya. Terima kasih.`,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isBot =
      website.trim() !== '' ||
      (formStartRef.current !== null && Date.now() - formStartRef.current < 2500);
    if (isBot || !isPhoneValid) return;
    setConfirmed(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.replace(/[^A-Za-z\s]/g, ''));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, '');
    if (digits.startsWith('0')) digits = digits.slice(1);
    setPhone(digits.slice(0, 13));
  };

  const isPhoneValid = /^8\d{8,12}$/.test(phone);

  return (
    <AnimatePresence>
      {isOpen && (
        <div ref={containerRef} className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: LUXURY_EASE }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Dialog */}
          <div className="h-full flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="bg-[#F9F8F6] max-w-xl w-full border border-[#E5E3DF] shadow-2xl overflow-hidden relative z-10 max-h-full flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Reservasi Kunjungan Showroom"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-[#E5E3DF] bg-white flex items-start justify-between gap-3 shrink-0">
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.25em] sm:tracking-[0.3em] text-[#8C8276] block">
                    Reservasi Kunjungan Showroom
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-normal text-[#1A1A1A] leading-snug mt-1 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#26496C] shrink-0 mt-1" />
                    <span className="line-clamp-2">{showroom.name}</span>
                  </h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={onClose}
                  className="p-2 text-[#6B6B5F] hover:text-[#1A1A1A] hover:bg-[#F9F8F6] transition-colors cursor-pointer border border-transparent hover:border-[#E5E3DF] shrink-0"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="min-h-0 flex-1 overflow-y-auto" data-lenis-prevent>
                <div className="p-5 sm:p-8 min-h-0 flex flex-col">
                  <AnimatePresence mode="wait">
                    {confirmed ? (
                      <motion.div
                        key="reservation-confirmed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex min-h-0 flex-1 flex-col text-center"
                      >
                        {/* Success Header */}
                        <div className="w-12 h-12 rounded-full bg-[#E7F4EC] text-[#1FBA5A] flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h4 className="font-serif text-2xl font-normal text-[#1A1A1A] mb-1.5">
                          Riwayat Pembuatan Chat Berhasil
                        </h4>
                        <p className="text-sm text-[#6B6B5F] font-light leading-relaxed max-w-md mx-auto mb-6">
                          Periksa kembali detail di bawah, lalu kirim via WhatsApp — tim kami akan membalas konfirmasi jadwal.
                        </p>

                        {/* WhatsApp Preview Card */}
                        <div className="text-left bg-white border border-[#E5E3DF] overflow-hidden shadow-sm min-h-0 flex flex-1 flex-col">
                          <div className="px-4 py-2.5 border-b border-[#E5E3DF] flex items-center justify-between bg-[#F9F8F6]">
                            <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#8C8276]">
                              Preview Pesan WhatsApp
                            </span>
                            <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-[#5A5A40] border border-[#E5E3DF] bg-white px-2 py-0.5">
                              1 Pesan
                            </span>
                          </div>

                          <div className="bg-[#ECE5DD] min-h-0 flex flex-1 flex-col">
                            {/* WA Header */}
                            <div className="bg-[#075E54] px-4 py-2.5 flex items-center gap-2.5 shrink-0">
                              <div className="w-8 h-8 bg-[#F9F8F6] text-[#1A1A1A] font-serif font-bold text-[11px] flex items-center justify-center shrink-0">
                                NA
                              </div>
                              <div className="min-w-0">
                                <p className="text-white text-sm font-medium leading-tight">
                                  Nusa Atelier
                                </p>
                                <p className="text-[#A8BBB5] text-[10px] leading-tight">online</p>
                              </div>
                            </div>

                            {/* WA Messages */}
                            <div
                              className="p-3.5 sm:p-4 min-h-0 flex-1 overflow-y-auto space-y-2.5"
                              data-lenis-prevent
                            >
                              <div className="text-center">
                                <span className="inline-block bg-white text-[9px] uppercase tracking-wide text-[#6B6B5F] px-2 py-1 rounded shadow-sm">
                                  Hari ini
                                </span>
                              </div>

                              <div className="ml-auto w-full max-w-[92%] sm:max-w-[85%] bg-[#DCF8C6] rounded-lg rounded-tr-none shadow-sm p-3.5 sm:p-4">
                                <div className="text-xs sm:text-[13px] text-[#1A1A1A] leading-relaxed">
                                  <p>Halo Nusa Atelier,</p>
                                  <p className="mt-1.5">Saya ingin melakukan reservasi kunjungan showroom:</p>

                                  <div className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                                    {detailRows.map((row) => (
                                      <div key={row.label} className="contents">
                                        <span className="font-medium text-[#4A4A3A] whitespace-nowrap">
                                          {row.label}:
                                        </span>
                                        <span className="text-[#1A1A1A] break-words min-w-0">
                                          {row.value}
                                        </span>
                                      </div>
                                    ))}
                                  </div>

                                  <p className="mt-2.5">Mohon konfirmasi ketersediaan jadwalnya. Terima kasih.</p>
                                </div>

                                <div className="flex items-center justify-end gap-1 mt-2">
                                  <span className="text-[9px] text-[#6B6B5F]">
                                    {formatDateID(visitDate)} · {visitTime}
                                  </span>
                                  <svg viewBox="0 0 16 11" className="w-4 h-3 fill-[#34B7F1]" aria-hidden="true">
                                    <path d="M11.5 8.6L7.9 5.3 6.3 6.8l5.2 4.9L16 3.9l-1.5-1.3z" />
                                    <path d="M6 9.2l-.6-.5-1.4-1.3-.2-.2L1.5 5 0 6.3l2.9 2.7.9.9L6 10.3z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 shrink-0">
                          <motion.a
                            {...microButton}
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => {
                              if (!allowWaOpen()) {
                                event.preventDefault();
                              }
                            }}
                            className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1FBA5A] text-white w-full py-4 text-[11px] sm:text-xs uppercase font-bold tracking-[0.2em] whitespace-nowrap transition-colors shadow-md"
                          >
                            <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                            <span>Kirim Reservasi via WhatsApp</span>
                          </motion.a>

                          <div className="mt-3.5 flex items-center justify-center gap-3 text-[#6B6B5F]">
                            <motion.button
                              whileHover={{ x: -2 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setConfirmed(false)}
                              className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-[0.2em] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                            >
                              <ArrowLeft className="w-3 h-3 shrink-0" />
                              <span>Edit Data</span>
                            </motion.button>
                            <span className="w-1 h-1 bg-[#D9D7D2] rounded-full shrink-0" />
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={onClose}
                              className="text-[10px] uppercase font-bold tracking-[0.2em] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                            >
                              Tutup
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="reservation-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <div aria-hidden="true" className="sr-only">
                          <label htmlFor="reservation-website">Website</label>
                          <input
                            id="reservation-website"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                          />
                        </div>

                        <div className="p-3.5 bg-white border border-[#E5E3DF] border-l-4 border-l-[#26496C] text-xs sm:text-sm text-[#6B6B5F] font-light leading-relaxed">
                          <p className="font-semibold text-[#1A1A1A] mb-0.5">Lokasi Kunjungan: {showroom.name}</p>
                          <p>{showroom.address}</p>
                          <p className="text-[#8C8276] mt-0.5 text-xs">Jam Operasional: {showroom.hours}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C8276] mb-1.5">
                              Nama Lengkap *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Bpk / Ibu..."
                              value={name}
                              onChange={handleNameChange}
                              className="w-full bg-white border border-[#E5E3DF] text-xs sm:text-sm p-3 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                            />
                          </div>
<div className="text-left">
                              <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C8276] mb-1.5">
                                No. WhatsApp *
                              </label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-[#8C8276] select-none pointer-events-none">
                                  +62
                                </span>
                                <input
                                  type="tel"
                                  required
                                  inputMode="numeric"
                                  placeholder="812-xxxx-xxxx"
                                  value={formatPhoneID(phone)}
                                  onChange={handlePhoneChange}
                                  className={`w-full bg-white border text-xs sm:text-sm p-3 pl-12 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] ${
                                    phone && !isPhoneValid ? 'border-[#C0392B]' : 'border-[#E5E3DF]'
                                  }`}
                                />
                              </div>
                              {phone && !isPhoneValid && (
                                <p className="text-[10px] text-[#C0392B] font-medium mt-1">
                                  Nomor WhatsApp tidak valid — contoh: 8123-4567-8901
                                </p>
                              )}
                              {!phone && (
                                <p className="text-[10px] text-[#8C8276] font-light mt-1">
                                  Gunakan format: 8123-4567-8901
                                </p>
                              )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C8276] mb-1.5">
                              Tanggal Kunjungan *
                            </label>
                            <input
                              type="date"
                              required
                              min={todayISO}
                              value={visitDate}
                              onChange={(e) => setVisitDate(e.target.value)}
                              className="w-full bg-white border border-[#E5E3DF] text-xs sm:text-sm p-2.5 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C8276] mb-1.5">
                              Waktu Kunjungan *
                            </label>
                            <select
                              required
                              value={visitTime}
                              onChange={(e) => setVisitTime(e.target.value)}
                              className="w-full bg-white border border-[#E5E3DF] text-xs sm:text-sm p-2.5 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                            >
                              {TIME_SLOTS.map((slot) => (
                                <option key={slot} value={slot}>
                                  {slot}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="pt-2">
                          <motion.button
                            {...microButton}
                            type="submit"
                            disabled={!isPhoneValid}
                            className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1FBA5A] text-white w-full py-4 text-[11px] sm:text-xs uppercase font-bold tracking-[0.2em] whitespace-nowrap transition-colors shadow-md disabled:opacity-50 disabled:hover:bg-[#25D366] disabled:cursor-not-allowed disabled:shadow-none"
                          >
                            <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                            <span>Konfirmasi & Siapkan Chat</span>
                          </motion.button>
                        </div>

                        <p className="text-[11px] text-[#8C8276] text-center font-light mt-2">
                          Reservasi tidak dipungut biaya. Detail Anda hanya digunakan untuk konfirmasi jadwal kunjungan.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};