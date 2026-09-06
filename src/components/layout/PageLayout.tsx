import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { ShowroomReservationModal } from '../modals/ShowroomReservationModal';
import { SHOWROOMS_DATA } from '../../content';
import { useSmoothScroll } from '../../lib/useLenis';
import { useScrollLock } from '../../lib/useScrollLock';
import { scrollToTop, setSectionHash, smoothScrollTo } from '../../lib/scroll';
import { WaLimitToast } from '../ui/WaLimitToast';

interface PageActions {
  openReservation: () => void;
}

const PageActionsContext = createContext<PageActions>({
  openReservation: () => {},
});

export const usePageActions = () => useContext(PageActionsContext);

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  useSmoothScroll();

  const location = useLocation();
  const navigate = useNavigate();

  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useScrollLock(isReservationOpen);

  useEffect(() => {
    const pendingScroll = (location.state as { scrollTo?: string } | null)?.scrollTo;

    if (pendingScroll) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          smoothScrollTo(pendingScroll);
          setSectionHash(pendingScroll);
        });
      });
      navigate(location.pathname, { replace: true, state: null });
    } else {
      scrollToTop(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const actions: PageActions = {
    openReservation: () => setIsReservationOpen(true),
  };

  return (
    <PageActionsContext.Provider value={actions}>
      <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#1A1A1A] antialiased selection:bg-[#1A1A1A] selection:text-white">
        <Header onOpenReservation={actions.openReservation} />

        <main className="flex-grow">{children}</main>

        <Footer onOpenReservation={actions.openReservation} />

        <ShowroomReservationModal
          isOpen={isReservationOpen}
          showroom={SHOWROOMS_DATA[0]}
          onClose={() => setIsReservationOpen(false)}
        />

        <FloatingWhatsApp />
        <WaLimitToast />
      </div>
    </PageActionsContext.Provider>
  );
};