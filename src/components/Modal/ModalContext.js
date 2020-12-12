import React, { createContext } from "react";
import useModal from "./useModal";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const { isOpen, toggle, onOpen, onClose } = useModal();

  return (
    <ModalContext.Provider value={{ isOpen, toggle, onOpen, onClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
