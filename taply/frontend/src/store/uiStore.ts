export type UiStoreState = {
  sidebarOpen: boolean;
  activeModal: "create-project" | "none";
};

let state: UiStoreState = {
  sidebarOpen: true,
  activeModal: "none",
};

export const uiStore = {
  getState(): UiStoreState {
    return state;
  },
  setSidebarOpen(next: boolean) {
    state = {
      ...state,
      sidebarOpen: next,
    };
  },
  setActiveModal(next: UiStoreState["activeModal"]) {
    state = {
      ...state,
      activeModal: next,
    };
  },
};
