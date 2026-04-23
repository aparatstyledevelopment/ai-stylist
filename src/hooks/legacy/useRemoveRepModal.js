import { useOverlay } from '../../context/OverlayContext.jsx';

export function useRemoveRepModal() {
  const { openModal } = useOverlay();

  const showRemoveModal = (name, initials, phone, orders) => {
    openModal('remove-modal', { name, initials, phone, orders });
  };

  return { showRemoveModal };
}
