import { useNavigation } from '../context/NavigationContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useOverlay } from '../context/OverlayContext.jsx';
import { useFormPrimitives } from './legacy/useFormPrimitives.js';
import { useAddTileStepper } from './legacy/useAddTileStepper.js';
import { useOrderActions } from './legacy/useOrderActions.js';
import { usePriceManagement } from './legacy/usePriceManagement.js';
import { useCart } from './legacy/useCart.js';
import { useShopCart } from './legacy/useShopCart.js';
import { useFilterSheet } from './legacy/useFilterSheet.js';
import { useWarehouseAssign } from './legacy/useWarehouseAssign.js';
import { useRemoveRepModal } from './legacy/useRemoveRepModal.js';
import { useExcelAi } from './legacy/useExcelAi.js';
import { useB2bConnect } from './legacy/useB2bConnect.js';

// Facade over the legacy action hooks. The underlying hooks mutate the DOM
// directly, mirroring the original prototype's JS — this works because every
// page preserves the same markup / classNames / ids.
export function useLegacyActions() {
  const { goTo, goBack } = useNavigation();
  const { toast } = useToast();
  const { openSheet, closeSheet, openModal, closeModal } = useOverlay();

  return {
    goTo,
    goBack,
    toast,
    openSheet,
    closeSheet,
    openModal,
    closeModal,
    ...useFormPrimitives(),
    ...useAddTileStepper(),
    ...useOrderActions(),
    ...usePriceManagement(),
    ...useCart(),
    ...useShopCart(),
    ...useFilterSheet(),
    ...useWarehouseAssign(),
    ...useRemoveRepModal(),
    ...useExcelAi(),
    ...useB2bConnect(),
  };
}
