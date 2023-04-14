import create from 'zustand';
import jwt_decode from "jwt-decode";
import { Socket, io } from 'socket.io-client';

interface LoginState {
  user: any;
  userToken: boolean;
  loadingFromToken: boolean;
  setUser: (user: any) => void;
  setToken: (token : any) => void;
  loadFromToken: () => void;
  logout: () => void;
  errorInput: any;
  setErorInput: (errorInput: any) => void;
  requestList: any[] | null;
  setRequestList: (requestList: any[]) => void;
  updateRequestList: (id: any) => void;
  recipientId: any;
  setRecipientId: (recipientId: string) => void;
  socket: any;
  setSocket: (socket: any) => void;
  conversationList: any;
  setConversationList: (conversationList: any) => void;
  activeSidebar: boolean;
  setActiveSidebar: (activeSidebar : boolean) => void;
}

const useUserStore = create<LoginState>((set) => ({
  user: undefined,
  errorInput: null,
  loadingFromToken: true,
  userToken: false,
  requestList: null,
  recipientId: null,
  socket: null,
  conversationList: null,
  activeSidebar: false,

  setUser: (user) => set({ user, loadingFromToken: false }),
  setSocket: (socket) => set({socket: socket}),

  loadFromToken: () => {
    const token = localStorage.getItem("token");
    set({
      user: token ? jwt_decode(token) : undefined,
      loadingFromToken: false,
      userToken: true
    });
  },

  setRequestList: (list: any[]) => set({ requestList: list }),

  updateRequestList: (id: any) => set((state) => ({
    requestList: state.requestList?.filter((request) => request._id !== id)
  })),

  setRecipientId: (recipientId: any) => set({ recipientId: recipientId }),

  setConversationList: (conversationList: any) => set({ conversationList: conversationList }),

  setActiveSidebar: (activeSidebar : boolean) => set({ activeSidebar: activeSidebar }),

  setToken: (token: any) => {
    localStorage.setItem("token", token);

    set((state) => ({
      user: {
        ...(state.user || {}),
        ...jwt_decode(token),
      },
    }));
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: undefined,
    });
  },

  setErorInput: (error) => {
    set({
      errorInput: error,
    })
  }
}));

export default useUserStore;
